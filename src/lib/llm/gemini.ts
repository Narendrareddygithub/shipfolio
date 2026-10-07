import { GoogleGenerativeAI } from '@google/generative-ai';

export async function callGemini(params: {
  apiKey: string;
  model?: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<string> {
  const genAI = new GoogleGenerativeAI(params.apiKey);
  // Default to gemini-2.0-flash, fallback to gemini-1.5-flash-latest
  const modelName = params.model || 'gemini-2.0-flash';
  
  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: params.systemPrompt,
    });

    const response = await model.generateContent(params.userPrompt);
    const text = response.response.text();
    if (text) return text;
  } catch (err: any) {
    console.warn(`Gemini model ${modelName} failed, trying gemini-1.5-flash-latest:`, err.message);
    const fallbackModel = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: params.systemPrompt,
    });
    const fallbackResponse = await fallbackModel.generateContent(params.userPrompt);
    const fallbackText = fallbackResponse.response.text();
    if (fallbackText) return fallbackText;
  }

  throw new Error('Gemini returned an empty response');
}
