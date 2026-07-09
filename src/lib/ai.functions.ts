import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import {
  createLovableAiGatewayProvider,
  MAL_CHAT_MODEL,
} from "./ai-gateway.server";
import { SUMMARIZER_SYSTEM, PLANNER_SYSTEM } from "./mal-prompts.server";

const TextInput = z.object({ input: z.string().min(1).max(20000) });

async function runMal(system: string, input: string) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI is not configured. Please try again later.");

  const gateway = createLovableAiGatewayProvider(key);

  try {
    const { text } = await generateText({
      model: gateway(MAL_CHAT_MODEL),
      system,
      prompt: input,
    });
    return { text };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("429")) {
      throw new Error("Mal is receiving a lot of requests right now. Please try again in a moment.");
    }
    if (message.includes("402")) {
      throw new Error("AI usage limit reached for this workspace. Please add credits to continue.");
    }
    throw new Error("Mal couldn't complete that request. Please try again.");
  }
}

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TextInput.parse(data))
  .handler(async ({ data }) => runMal(SUMMARIZER_SYSTEM, data.input));

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TextInput.parse(data))
  .handler(async ({ data }) => runMal(PLANNER_SYSTEM, data.input));
