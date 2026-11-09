"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { redirectToLogin } from "@/lib/api/auth-redirect";
import { ApiError, getErrorMessage } from "@/lib/api/errors";
import { chatApi, type ChatMessage, type MessagesPage } from "./chat.api";

const PAGE_SIZE = 50;

export const chatKeys = {
  messages: ["chat", "messages"] as const,
};

type MessagesData = InfiniteData<MessagesPage, string | undefined>;

// Pages are fetched newest-first; each page is already oldest-to-newest.
export function useChatHistory() {
  const query = useInfiniteQuery({
    queryKey: chatKeys.messages,
    queryFn: ({ pageParam, signal }) =>
      chatApi.getMessages({ limit: PAGE_SIZE, before: pageParam }, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const messages = useMemo(
    () => (query.data ? [...query.data.pages].reverse().flatMap((p) => p.messages) : []),
    [query.data],
  );

  return { ...query, messages };
}

export interface PendingTurn {
  prompt: string;
  reply: string;
}

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return { id: crypto.randomUUID(), role, content, createdAt: new Date().toISOString() };
}

// Streams a reply into `pending`, then moves the finished turn into the
// history cache so it renders like any loaded message.
export function useChatStream() {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState<PendingTurn | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const appendTurn = useCallback(
    (prompt: string, reply: string) => {
      const turn = [createMessage("user", prompt), createMessage("assistant", reply)];

      queryClient.setQueryData<MessagesData>(chatKeys.messages, (data) => {
        if (!data) {
          return { pages: [{ messages: turn, nextCursor: null }], pageParams: [undefined] };
        }
        const [newest, ...older] = data.pages;
        return {
          ...data,
          pages: [{ ...newest, messages: [...newest.messages, ...turn] }, ...older],
        };
      });
    },
    [queryClient],
  );

  // Resolves false when the prompt wasn't answered, so the caller can restore it.
  const send = useCallback(
    async (prompt: string) => {
      if (abortRef.current) return false;

      const controller = new AbortController();
      abortRef.current = controller;
      let reply = "";
      setPending({ prompt, reply });

      try {
        await chatApi.streamReply(prompt, {
          signal: controller.signal,
          onDelta: (text) => {
            reply += text;
            setPending({ prompt, reply });
          },
        });
        appendTurn(prompt, reply);
        return true;
      } catch (error) {
        if (controller.signal.aborted) {
          // Stopped by the user: keep whatever was generated so far.
          if (reply) appendTurn(prompt, reply);
          return !!reply;
        }
        if (error instanceof ApiError && error.isUnauthorized) {
          redirectToLogin();
          return false;
        }
        toast.error(getErrorMessage(error, "Failed to get a response. Please try again."));
        return false;
      } finally {
        abortRef.current = null;
        setPending(null);
      }
    },
    [appendTurn],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  return { send, stop, pending, isStreaming: pending !== null };
}
