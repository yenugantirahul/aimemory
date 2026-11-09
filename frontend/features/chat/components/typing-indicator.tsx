import { LogoMark } from "@/components/layout/logo";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" role="status" aria-label="Assistant is thinking">
      <LogoMark className="size-7 shrink-0" />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="flex gap-1">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </span>
        Recalling memories…
      </div>
    </div>
  );
}
