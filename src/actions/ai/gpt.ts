import { generateText } from 'ai';
import { gptModel } from '@/lib/aisdk';

export const generateTextWithGpt = async ({
  system,
  prompt,
}: {
  system: string;
  prompt: string;
}) => {
  'use server';
  const { text } = await generateText({
    model: gptModel,
    system,
    prompt,
  });
  return text;
};

import { generateObject } from 'ai';
import { z } from 'zod';

export const generateObjectWithGpt = async ({
  schema,
  prompt,
}: {
  schema: z.ZodType;
  prompt: string;
}) => {
  'use server';
  const { object } = await generateObject({
    model: gptModel,
    schema,
    prompt,
  });
  return object;
};
// generateObjectWithGpt({
//   schema: z.object({
//     recipe: z.object({
//       name: z.string().describe('The name of our version of lasagne'),
//       ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
//       steps: z.array(z.string()),
//     }),
//   }),
//   prompt: 'Generate a lasagna recipe.',
// })
