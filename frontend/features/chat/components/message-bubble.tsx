import { LogoMark } from "@/components/layout/logo";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";
import type { ChatRole } from "../chat.api";

interface MessageBubbleProps {
  role: ChatRole;
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming = false }: MessageBubbleProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-[15px] leading-7 whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <LogoMark className="mt-1 size-7 shrink-0" />
      <div
        className={cn(
          "min-w-0 flex-1 text-[15px] leading-7",
          // Blinking caret after the last streamed token.
          isStreaming &&
            "[&>div>*:last-child]:after:ml-0.5 [&>div>*:last-child]:after:inline-block [&>div>*:last-child]:after:h-4 [&>div>*:last-child]:after:w-1.5 [&>div>*:last-child]:after:translate-y-0.5 [&>div>*:last-child]:after:animate-pulse [&>div>*:last-child]:after:rounded-sm [&>div>*:last-child]:after:bg-foreground/70 [&>div>*:last-child]:after:content-['']",
        )}
      >
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
