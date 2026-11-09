import { apiClient } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { postEventStream } from "@/lib/api/sse";

// Mirrors the backend's chatBodySchema limit.
export const PROMPT_MAX_LENGTH = 8000;

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface MessagesPage {
  messages: ChatMessage[];
  // Id to pass as `before` to load older messages; null when none remain.
  nextCursor: string | null;
}

type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

interface StreamReplyOptions {
  signal?: AbortSignal;
  onDelta: (text: string) => void;
}

export const chatApi = {
  async getMessages(params: { limit?: number; before?: string }, signal?: AbortSignal) {
    const { data } = await apiClient.get<MessagesPage>("/chat", { params, signal });
    return data;
  },

  async streamReply(prompt: string, { signal, onDelta }: StreamReplyOptions) {
    await postEventStream<ChatStreamEvent>("/chat/stream", {
      body: { prompt },
      signal,
      onEvent: (event) => {
        if (event.type === "delta") onDelta(event.text);
        if (event.type === "error") throw new ApiError(500, "STREAM_ERROR", event.message);
      },
    });
  },
};
