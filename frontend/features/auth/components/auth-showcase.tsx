import { Brain, History, Search } from "lucide-react";

const POINTS = [
  { icon: Brain, text: "Remembers preferences, goals and context across sessions" },
  { icon: Search, text: "Hybrid vector and graph retrieval on every message" },
  { icon: History, text: "Picks up where you left off — no re-explaining" },
];

// Decorative brand panel shown beside the auth forms on large screens.
export function AuthShowcase() {
  return (
    <aside className="relative isolate hidden overflow-hidden border-l bg-foreground text-background lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 -z-10 size-[28rem] rounded-full bg-brand/40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 -z-10 size-[24rem] rounded-full bg-brand/20 blur-3xl"
      />

      <p className="font-mono text-xs tracking-widest text-background/60 uppercase">AIMemory</p>

      <div className="max-w-md">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-balance">
          Your assistant, with a memory of its own.
        </h2>
        <ul className="mt-10 space-y-5">
          {POINTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-background/80">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-background/15 bg-background/5">
                <Icon className="size-4" />
              </span>
              <span className="pt-1 text-sm leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-background/50">Open source · Built with hybrid search</p>
    </aside>
  );
}
