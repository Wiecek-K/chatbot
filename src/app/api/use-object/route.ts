import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import z from "zod";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { lastBotMessage, userMessage, currentFormState } = await req.json();

  const prompt = `
    You are a chatbot helping to complete a form. Here is the current form state:
    ${JSON.stringify(currentFormState)}.
    The user, when asked by our agent "${lastBotMessage}", responded: "${userMessage}".
    Based on the missing fields, respond with:
    1. Updated form state as a JSON object.
    2. The next question to ask, if necessary.
  `;

  const result = streamObject({
    model: openai("gpt-4-turbo"),
    schema: z.object({
      updatedFormState: formSchema,
      nextQuestion: z.string().nullable(),
    }),
    prompt,
  });

  return result.toTextStreamResponse();
}
