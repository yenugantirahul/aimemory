import { Brain, GitBranch, Lock, Search, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "Long-term memory",
    description:
      "Facts, preferences and goals are extracted from every conversation and kept for good, not just for one session.",
    className: "md:col-span-2",
  },
  {
    icon: Search,
    title: "Hybrid retrieval",
    description: "Vector similarity finds what's related; a knowledge graph finds what's connected.",
  },
  {
    icon: GitBranch,
    title: "Knowledge graph",
    description: "Memories are linked as entities and relationships, so context compounds over time.",
  },
  {
    icon: Zap,
    title: "Streaming replies",
    description: "Responses stream token by token, with relevant memories recalled before the first word.",
  },
  {
    icon: Lock,
    title: "Private by design",
    description: "Memories are scoped to your account and only ever recalled in your own conversations.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Context that carries over"
          description="Everything you tell AIMemory makes the next conversation better."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, className }) => (
            <div
              key={title}
              className={cn("group relative bg-background p-8 transition-colors hover:bg-muted/40", className)}
            >
              <div className="mb-5 flex size-10 items-center justify-center rounded-xl border bg-background shadow-xs transition-colors group-hover:border-brand/40 group-hover:text-brand">
                <Icon className="size-5" />
              </div>
              <h3 className="font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
