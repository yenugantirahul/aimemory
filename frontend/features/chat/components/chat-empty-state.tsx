import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";

const SUGGESTIONS = [
  "I'm training for a half marathon in October",
  "I prefer concise answers with code examples",
  "What do you remember about me?",
  "Help me plan my week around my goals",
];

interface ChatEmptyStateProps {
  userName?: string;
  onSuggestion: (prompt: string) => void;
}

export function ChatEmptyState({ userName, onSuggestion }: ChatEmptyStateProps) {
  const firstName = userName?.split(" ")[0];

  return (
    <div className="flex flex-col items-center pt-[12vh] text-center">
      <LogoMark className="mb-6 size-12 rounded-2xl" />
      <h1 className="text-3xl font-semibold tracking-[-0.03em]">
        {firstName ? `Hi ${firstName}, what's on your mind?` : "What's on your mind?"}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Tell me about yourself, your work or your goals. I&apos;ll remember what matters for next
        time.
      </p>

      <div className="mt-10 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSuggestion(prompt)}
            className="group flex items-start justify-between gap-3 rounded-xl border bg-card p-4 text-left text-sm shadow-xs transition-all hover:-translate-y-px hover:border-foreground/20 hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span>{prompt}</span>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
