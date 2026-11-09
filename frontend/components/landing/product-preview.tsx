import { ArrowUp, Brain, History } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const MEMORIES = [
  { label: "Goal", value: "Half marathon in October" },
  { label: "Diet", value: "Vegetarian" },
  { label: "Schedule", value: "Runs before work, 6am" },
];

// Static illustration of the product: a chat recalling an earlier memory,
// with the extracted memories alongside.
export function ProductPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-5xl", className)}>
      <div
        aria-hidden
        className="absolute inset-x-10 -top-px h-px bg-linear-to-r from-transparent via-brand/60 to-transparent"
      />
      <div className="overflow-hidden rounded-2xl border bg-card/80 text-left shadow-2xl ring-1 shadow-black/5 ring-black/5 backdrop-blur">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
          <div className="flex gap-1.5">
            {["bg-red-400/80", "bg-amber-400/80", "bg-emerald-400/80"].map((c) => (
              <span key={c} className={cn("size-2.5 rounded-full", c)} />
            ))}
          </div>
          <div className="mx-auto rounded-md border bg-background px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
            AIMemory — Chat
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_17rem]">
          {/* Conversation */}
          <div className="flex flex-col gap-4 p-5 sm:p-8">
            <DayDivider label="Monday" />
            <Bubble side="user">I&apos;m training for a half marathon in October.</Bubble>
            <Bubble side="assistant">
              Nice — I&apos;ll keep that in mind for anything about training or nutrition.
            </Bubble>
            <DayDivider label="Thursday" />
            <Bubble side="user">What should I eat before a long run?</Bubble>
            <div className="flex flex-col gap-1.5">
              <Bubble side="assistant">
                Since you&apos;re vegetarian and training for October, aim for a carb-heavy
                meal 2–3 hours before: oatmeal with banana, or toast with peanut butter.
              </Bubble>
              <span className="ml-9 inline-flex items-center gap-1 text-xs text-brand">
                <History className="size-3" />
                Recalled 2 memories from Monday
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 rounded-xl border bg-background px-3 py-2 shadow-xs">
              <span className="flex-1 text-sm text-muted-foreground">Ask anything…</span>
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ArrowUp className="size-4" />
              </span>
            </div>
          </div>

          {/* Memory panel */}
          <aside className="hidden border-l bg-muted/30 p-5 md:block">
            <div className="mb-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Brain className="size-3.5" />
              Memory
            </div>
            <ul className="space-y-2">
              {MEMORIES.map((m) => (
                <li key={m.label} className="rounded-lg border bg-background p-3 shadow-xs">
                  <div className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {m.label}
                  </div>
                  <div className="mt-0.5 text-sm">{m.value}</div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

function DayDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Bubble({ side, children }: { side: "user" | "assistant"; children: React.ReactNode }) {
  if (side === "user") {
    return (
      <div className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
        {children}
      </div>
    );
  }
  return (
    <div className="flex max-w-[85%] items-start gap-2.5">
      <LogoMark className="mt-0.5 size-6 shrink-0 rounded-md" />
      <div className="rounded-2xl rounded-tl-sm border bg-background px-4 py-2.5 text-sm">
        {children}
      </div>
    </div>
  );
}
