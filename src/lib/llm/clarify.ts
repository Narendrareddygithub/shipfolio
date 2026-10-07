import { generateWithLLM } from './client';
import { CLARIFYING_PROMPT } from './prompts/clarifying';

export interface ClarifyingQuestion {
  id: string;
  question: string;
  options: string[];
  allowFreeText: boolean;
}

export interface ClarifyResult {
  sufficient: boolean;
  questions: ClarifyingQuestion[];
}

export async function evaluateContextAndGetQuestions(params: {
  projectContext: string;
  updateContent?: string;
  techStack?: string[];
  userApiKey?: string;
  userProvider?: 'gemini' | 'groq';
}): Promise<ClarifyResult> {
  const userPrompt = `
PROJECT CONTEXT:
${params.projectContext || 'None provided'}

TECH STACK:
${params.techStack?.join(', ') || 'None provided'}

LATEST UPDATE NOTES:
${params.updateContent || 'Initial campaign content generation'}
`;

  try {
    const response = await generateWithLLM({
      systemPrompt: CLARIFYING_PROMPT,
      userPrompt,
      userApiKey: params.userApiKey,
      userProvider: params.userProvider,
    });

    // Parse JSON from LLM response
    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { sufficient: true, questions: [] };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      sufficient: Boolean(parsed.sufficient),
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
    };
  } catch (error) {
    console.error('Context evaluation error:', error);
    // On error, default to direct generation without blocking user
    return { sufficient: true, questions: [] };
  }
}
