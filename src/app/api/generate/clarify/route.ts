import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, projectUpdates } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { evaluateContextAndGetQuestions } from '@/lib/llm/clarify';

export async function POST(req: NextRequest) {
  try {
    const guestId = req.cookies.get('shipfolio_guest_id')?.value;
    if (!guestId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, updateId } = body;

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, guestId)));

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    let updateContent = '';
    if (updateId) {
      const [update] = await db
        .select()
        .from(projectUpdates)
        .where(eq(projectUpdates.id, updateId));
      if (update) updateContent = update.content;
    }

    const userApiKey = req.headers.get('x-user-llm-key') || undefined;
    const userProvider = (req.headers.get('x-user-llm-provider') as 'gemini' | 'groq') || undefined;

    const result = await evaluateContextAndGetQuestions({
      projectContext: project.context || '',
      updateContent,
      techStack: project.techStack || [],
      userApiKey,
      userProvider,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Clarify endpoint error:', error);
    return NextResponse.json({ sufficient: true, questions: [] });
  }
}
