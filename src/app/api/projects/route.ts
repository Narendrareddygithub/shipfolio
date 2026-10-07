import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/db/schema';
import { createGuestAccount } from '@/lib/auth/guest';
import { createProjectSchema } from '@/lib/validators/schemas';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    let guestId = req.cookies.get('shipfolio_guest_id')?.value;

    if (!guestId) {
      return NextResponse.json({ projects: [] });
    }

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, guestId))
      .orderBy(desc(projects.updatedAt));

    return NextResponse.json({ projects: userProjects });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createProjectSchema.parse(body);

    let guestId = req.cookies.get('shipfolio_guest_id')?.value;
    let responseCookie = false;

    if (!guestId) {
      const guest = await createGuestAccount();
      guestId = guest.id;
      responseCookie = true;
    }

    const [newProject] = await db
      .insert(projects)
      .values({
        userId: guestId,
        name: validatedData.name,
        description: validatedData.description || null,
        context: validatedData.context || null,
        repoUrl: validatedData.repoUrl || null,
        websiteUrl: validatedData.websiteUrl || null,
        techStack: validatedData.techStack || [],
        targetAudience: validatedData.targetAudience || null,
      })
      .returning();

    const response = NextResponse.json({ success: true, project: newProject }, { status: 201 });

    if (responseCookie) {
      response.cookies.set('shipfolio_guest_id', guestId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
    }

    return response;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project campaign' }, { status: 500 });
  }
}
