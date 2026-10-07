import Groq from 'groq-sdk';

export async function callGroq(params: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<string> {
  const groq = new Groq({ apiKey: params.apiKey });
  const modelName = params.model || 'llama-3.3-70b-versatile';

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: params.systemPrompt },
      { role: 'user', content: params.userPrompt },
    ],
    model: modelName,
    temperature: 0.7,
  });

  const content = chatCompletion.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Groq returned an empty response');
  }

  return content;
}
