import Groq from 'groq-sdk';

export async function callGroq(params: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<string> {
  const groq = new Groq({ apiKey: params.apiKey });
  const primaryModel = params.model || 'llama-3.1-8b-instant';

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
    console.warn(`Groq model ${primaryModel} failed, trying mixtral-8x7b-32768:`, err.message);
    const fallbackCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
    });
    const fallbackContent = fallbackCompletion.choices[0]?.message?.content;
    if (fallbackContent) return fallbackContent;
  }

  throw new Error('Groq returned an empty response');
}
