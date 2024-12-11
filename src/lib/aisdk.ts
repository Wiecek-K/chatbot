import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const gptModel = openai('gpt-4-turbo', {
  // additional settings
});
