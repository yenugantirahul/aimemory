"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { ChatMessage } from "../chat.api";
import type { PendingTurn } from "../chat.hooks";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";

interface MessageListProps {
  messages: ChatMessage[];
  pending: PendingTurn | null;
  hasOlder: boolean;
  isLoadingOlder: boolean;
  onLoadOlder: () => void;
  // Rendered instead of the list when there are no messages.
  empty?: ReactNode;
}

export function MessageList({
  messages,
  pending,
  hasOlder,
  isLoadingOlder,
  onLoadOlder,
  empty,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const heightBeforeLoadRef = useRef<number | null>(null);

  const firstId = messages[0]?.id;
  const lastId = messages.at(-1)?.id;

  // Keep the viewport anchored when older messages are prepended above it.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || heightBeforeLoadRef.current === null) return;
    el.scrollTop += el.scrollHeight - heightBeforeLoadRef.current;
    heightBeforeLoadRef.current = null;
  }, [firstId]);

  // Follow the conversation as new messages and streamed tokens arrive.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lastId, pending?.prompt, pending?.reply]);

  function loadOlder() {
    heightBeforeLoadRef.current = scrollRef.current?.scrollHeight ?? null;
    onLoadOlder();
  }

  const isEmpty = messages.length === 0 && !pending;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        {isEmpty ? (
          empty
        ) : (
          <div className="space-y-8" aria-live="polite">
            {hasOlder && (
              <div className="flex justify-center">
                <Button variant="outline" size="sm" className="rounded-full" onClick={loadOlder} disabled={isLoadingOlder}>
                  {isLoadingOlder && <Spinner />}
                  Load earlier messages
                </Button>
              </div>
            )}

            {messages.map((message) => (
              <MessageBubble key={message.id} role={message.role} content={message.content} />
            ))}

            {pending && (
              <>
                <MessageBubble role="user" content={pending.prompt} />
                {pending.reply ? (
                  <MessageBubble role="assistant" content={pending.reply} isStreaming />
                ) : (
                  <TypingIndicator />
                )}
              </>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
