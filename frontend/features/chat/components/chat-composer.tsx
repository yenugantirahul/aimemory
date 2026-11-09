"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Square } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { PROMPT_MAX_LENGTH } from "../chat.api";

// Show the counter once the prompt gets close to the backend limit.
const COUNTER_THRESHOLD = PROMPT_MAX_LENGTH * 0.8;

interface ChatComposerProps {
  isStreaming: boolean;
  // Resolves false if the prompt wasn't sent, so the draft is restored.
  onSend: (prompt: string) => Promise<boolean>;
  onStop: () => void;
}

export function ChatComposer({ isStreaming, onSend, onStop }: ChatComposerProps) {
  const [draft, setDraft] = useState("");
  const prompt = draft.trim();
  const canSend = prompt.length > 0 && !isStreaming;

  async function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!canSend) return;

    setDraft("");
    const sent = await onSend(prompt);
    if (!sent) setDraft((current) => current || prompt);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Ignore Enter while an IME composition (e.g. CJK input) is in progress.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void submit();
    }
  }

  return (
    <form onSubmit={submit}>
      <InputGroup className="rounded-2xl bg-background shadow-lg shadow-black/5 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/30">
        <InputGroupTextarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AIMemory…"
          aria-label="Message"
          maxLength={PROMPT_MAX_LENGTH}
          rows={1}
          className="max-h-52 min-h-14 px-4 pt-4 text-[15px]"
          autoFocus
        />
        <InputGroupAddon align="block-end" className="px-3 pb-3">
          <InputGroupText className="text-xs">
            <kbd className="font-sans">Enter</kbd> to send ·{" "}
            <kbd className="font-sans">Shift + Enter</kbd> for a new line
          </InputGroupText>
          <div className="ml-auto flex items-center gap-2">
            {draft.length > COUNTER_THRESHOLD && (
              <InputGroupText
                className={cn(
                  "text-xs tabular-nums",
                  draft.length >= PROMPT_MAX_LENGTH && "text-destructive",
                )}
              >
                {draft.length}/{PROMPT_MAX_LENGTH}
              </InputGroupText>
            )}
            {isStreaming ? (
              <InputGroupButton
                variant="default"
                size="icon-sm"
                className="rounded-full"
                onClick={onStop}
                aria-label="Stop generating"
              >
                <Square className="size-3" fill="currentColor" />
              </InputGroupButton>
            ) : (
              <InputGroupButton
                type="submit"
                variant="default"
                size="icon-sm"
                className="rounded-full"
                disabled={!canSend}
                aria-label="Send message"
              >
                <ArrowUp />
              </InputGroupButton>
            )}
          </div>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
