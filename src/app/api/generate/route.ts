import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, projectUpdates, generatedContent } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { generateWithLLM } from '@/lib/llm/client';
import { BASE_SYSTEM_PROMPT } from '@/lib/llm/prompts/system';
import { LINKEDIN_PROMPT } from '@/lib/llm/prompts/linkedin';
import { TWITTER_PROMPT } from '@/lib/llm/prompts/twitter';
import { REDDIT_PROMPT } from '@/lib/llm/prompts/reddit';
import { MEDIUM_PROMPT } from '@/lib/llm/prompts/medium';

export async function POST(req: NextRequest) {
  try {
    const guestId = req.cookies.get('shipfolio_guest_id')?.value;
    if (!guestId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, updateId, answers, platforms } = body;

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, guestId)));

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    let updateContent = '';
    let mediaUrls: string[] = [];
    if (updateId) {
      const [update] = await db
        .select()
        .from(projectUpdates)
        .where(eq(projectUpdates.id, updateId));
      if (update) {
        updateContent = update.content;
        mediaUrls = update.mediaUrls || [];
      }
    }

    const selectedPlatforms = Array.isArray(platforms) && platforms.length > 0
      ? platforms
      : ['linkedin', 'twitter', 'reddit', 'medium'];

    // Combine system instructions
    const systemPrompt = `
${BASE_SYSTEM_PROMPT}

You will generate platform-native social media content for: ${selectedPlatforms.join(', ')}.

Platform Guidelines:
${selectedPlatforms.includes('linkedin') ? LINKEDIN_PROMPT : ''}
${selectedPlatforms.includes('twitter') ? TWITTER_PROMPT : ''}
${selectedPlatforms.includes('reddit') ? REDDIT_PROMPT : ''}
${selectedPlatforms.includes('medium') ? MEDIUM_PROMPT : ''}

OUTPUT FORMAT INSTRUCTIONS (JSON ONLY):
Return valid JSON matching this exact structure:
{
  "linkedin": "Generated LinkedIn post content text...",
  "twitter": "Generated X/Twitter post content text...",
  "reddit": "Generated Reddit post title and body content text...",
  "medium": "Generated Medium article content text..."
}
`;

    const userPrompt = `
PROJECT NAME: ${project.name}
TAGLINE: ${project.description || 'N/A'}
CONTEXT MEMORY:
${project.context || 'N/A'}

TECH STACK: ${project.techStack?.join(', ') || 'N/A'}
TARGET AUDIENCE: ${project.targetAudience || 'N/A'}

LATEST BUILD UPDATE:
${updateContent || 'Initial campaign release'}

ATTACHED SCREENSHOTS:
${mediaUrls.length > 0 ? mediaUrls.join('\n') : 'None'}

USER ANSWERS TO CLARIFYING QUESTIONS:
${answers ? JSON.stringify(answers, null, 2) : 'None provided'}
`;

    const userApiKey = req.headers.get('x-user-llm-key') || undefined;
    const userProvider = (req.headers.get('x-user-llm-provider') as 'gemini' | 'groq') || undefined;

    const result = await generateWithLLM({
      systemPrompt,
      userPrompt,
      userApiKey,
      userProvider,
    });

    // Parse JSON
    const jsonMatch = result.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('LLM did not return structured JSON output');
    }

    const parsedContent = JSON.parse(jsonMatch[0]);
    const savedRecords = [];

    // Save generated content to database
    for (const platform of selectedPlatforms) {
      if (parsedContent[platform]) {
        const [saved] = await db
          .insert(generatedContent)
          .values({
            projectId,
            updateId: updateId || null,
            platform,
            content: parsedContent[platform],
            llmProvider: result.provider,
            llmModel: result.model,
            mediaUrls,
          })
          .returning();
        savedRecords.push(saved);
      }
    }

    return NextResponse.json({
      success: true,
      contents: savedRecords,
      rawOutput: parsedContent,
      provider: result.provider,
    });
  } catch (error: any) {
    if (error.message === 'ADMIN_QUOTA_EXHAUSTED' || error.status === 429) {
      return NextResponse.json(
        {
          error: 'Free tier limits reached. Please bring your own API key to continue.',
          code: 'RATE_LIMIT_EXHAUSTED',
        },
        { status: 429 }
      );
    }
    console.error('Content generation API error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
