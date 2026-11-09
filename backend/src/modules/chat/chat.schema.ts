import { z } from "zod";

export const chatBodySchema = z.object({
  prompt: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "prompt is required"
          : "prompt must be a string",
    })
    .trim()
    .min(1, "prompt cannot be empty")
    .max(8000, "prompt must be at most 8000 characters"),
});

export const messagesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  // Id of the oldest message already loaded; returns messages before it.
  before: z.string().min(1).optional(),
});

export type ChatBody = z.infer<typeof chatBodySchema>;
export type MessagesQuery = z.infer<typeof messagesQuerySchema>;
