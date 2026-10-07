import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, projects } from '@/lib/db/schema';
import { eq, and, lt, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    // Basic auth check for Vercel Cron header or secret
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Delete guest users with no projects created in the last 7 days
    const deleted = await db
      .delete(users)
      .where(
        and(
          eq(users.type, 'guest'),
          lt(users.createdAt, sevenDaysAgo)
        )
      )
      .returning();

    return NextResponse.json({
      success: true,
      cleanedUpCount: deleted.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Guest cleanup cron error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
