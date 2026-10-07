import { GoogleGenerativeAI } from '@google/generative-ai';

export async function callGemini(params: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<string> {
  const genAI = new GoogleGenerativeAI(params.apiKey);
  const modelName = params.model || 'gemini-1.5-flash';
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: params.systemPrompt,
  });

  const response = await model.generateContent(params.userPrompt);
  const text = response.response.text();

  if (!text) {
    throw new Error('Gemini returned an empty response');
  }

  return text;
}
