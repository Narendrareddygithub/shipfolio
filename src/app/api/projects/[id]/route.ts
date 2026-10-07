import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, projectUpdates, generatedContent } from '@/lib/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const guestId = req.cookies.get('shipfolio_guest_id')?.value;

    if (!guestId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), eq(projects.userId, guestId)));

    if (!project) {
      return NextResponse.json({ error: 'Project campaign not found' }, { status: 404 });
    }

    const updates = await db
      .select()
      .from(projectUpdates)
      .where(eq(projectUpdates.projectId, id))
      .orderBy(desc(projectUpdates.createdAt));

    const contents = await db
      .select()
      .from(generatedContent)
      .where(eq(generatedContent.projectId, id))
      .orderBy(desc(generatedContent.createdAt));

    return NextResponse.json({ project, updates, contents });
  } catch (error) {
    console.error('Failed to fetch project detail:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
