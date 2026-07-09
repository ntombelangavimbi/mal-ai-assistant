import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runMal } from "./mal-run.server";
import { SUMMARIZER_SYSTEM, PLANNER_SYSTEM } from "./mal-prompts.server";

const TextInput = z.object({ input: z.string().min(1).max(20000) });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TextInput.parse(data))
  .handler(async ({ data }) => runMal(SUMMARIZER_SYSTEM, data.input));

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => TextInput.parse(data))
  .handler(async ({ data }) => runMal(PLANNER_SYSTEM, data.input));
