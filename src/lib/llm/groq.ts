import Groq from 'groq-sdk';

export async function callGroq(params: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<string> {
  const groq = new Groq({ apiKey: params.apiKey });
  // Requested model: GPT-OSS-20B
  const primaryModel = params.model || 'openai/gpt-oss-20b';

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt },
      ],
      model: primaryModel,
      temperature: 0.7,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (content) return content;
  } catch (err: any) {
    console.warn(`Groq model ${primaryModel} failed, trying fallback model GPT-OSS-20B:`, err.message);
    const fallbackCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt },
      ],
      model: 'gpt-oss-20b',
      temperature: 0.7,
    });
    const fallbackContent = fallbackCompletion.choices[0]?.message?.content;
    if (fallbackContent) return fallbackContent;
  }

  throw new Error('Groq returned an empty response');
}
