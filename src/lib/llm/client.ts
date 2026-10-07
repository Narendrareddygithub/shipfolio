import { callGemini } from './gemini';
import { callGroq } from './groq';

export interface LLMRequest {
  systemPrompt: string;
  userPrompt: string;
  userApiKey?: string;
  userProvider?: 'gemini' | 'groq';
}

export interface LLMResponse {
  content: string;
  provider: 'gemini' | 'groq' | 'byok';
  model: string;
}

export async function generateWithLLM(req: LLMRequest): Promise<LLMResponse> {
  const errors: string[] = [];

  // 1. If User BYOK key is explicitly provided, use it first
  if (req.userApiKey && req.userProvider) {
    try {
      if (req.userProvider === 'gemini') {
        const content = await callGemini({
          apiKey: req.userApiKey,
          systemPrompt: req.systemPrompt,
          userPrompt: req.userPrompt,
        });
        return { content, provider: 'byok', model: 'gemini-byok' };
      } else {
        const content = await callGroq({
          apiKey: req.userApiKey,
          systemPrompt: req.systemPrompt,
          userPrompt: req.userPrompt,
        });
        return { content, provider: 'byok', model: 'groq-byok' };
      }
    } catch (err: any) {
      errors.push(`BYOK Provider error: ${err.message}`);
    }
  }

  // 2. Try Admin Gemini API Key
  const adminGeminiKey = process.env.GEMINI_API_KEY;
  if (adminGeminiKey && adminGeminiKey !== 'your-gemini-api-key-here') {
    try {
      const content = await callGemini({
        apiKey: adminGeminiKey,
        systemPrompt: req.systemPrompt,
        userPrompt: req.userPrompt,
      });
      return { content, provider: 'gemini', model: 'gemini-1.5-flash' };
    } catch (err: any) {
      console.warn('Gemini primary rate-limited or failed, cascading to Groq:', err.message);
      errors.push(`Gemini: ${err.message}`);
    }
  }

  // 3. Fallback to Admin Groq API Key
  const adminGroqKey = process.env.GROQ_API_KEY;
  if (adminGroqKey && adminGroqKey !== 'your-groq-api-key-here') {
    try {
      const content = await callGroq({
        apiKey: adminGroqKey,
        systemPrompt: req.systemPrompt,
        userPrompt: req.userPrompt,
      });
      return { content, provider: 'groq', model: 'llama-3.3-70b-versatile' };
    } catch (err: any) {
      console.warn('Groq fallback failed:', err.message);
      errors.push(`Groq: ${err.message}`);
    }
  }

  // 4. All admin quota exhausted -> throw RateLimitError to trigger BYOK modal
  const error = new Error('ADMIN_QUOTA_EXHAUSTED');
  (error as any).status = 429;
  (error as any).details = errors;
  throw error;
}
