"use client";

import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export default function Page() {
  const { object, submit } = useObject({
    api: "/api/use-object",
    schema: z.object({
      updatedFormState: formSchema,
      nextQuestion: z.string().nullable(),
    }),
  });

  const handleUserMessage = (message: string) => {
    const lastBotMessage =
      object?.nextQuestion || "Let's start filling out your form.";
    submit({
      userMessage: message,
      lastBotMessage,
      currentFormState: object?.updatedFormState || {},
    });
  };

  return (
    <div>
      <div>
        {object?.updatedFormState && (
          <div>
            <h3>Form State</h3>
            <pre>{JSON.stringify(object.updatedFormState, null, 2)}</pre>
          </div>
        )}
        <p>
          {object?.nextQuestion ||
            "Welcome! Let's start filling out your form."}
        </p>
      </div>
      <UserInput onSubmit={handleUserMessage} />
    </div>
  );
}

function UserInput({ onSubmit }: { onSubmit: (message: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "message"
    ) as HTMLInputElement;
    const message = input.value.trim();
    if (message) {
      onSubmit(message);
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="message"
        placeholder="Type your message here..."
        autoComplete="off"
      />
      <button type="submit">Send</button>
    </form>
  );
}
