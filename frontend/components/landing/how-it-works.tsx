import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    title: "You chat naturally",
    description: "Talk to AIMemory like any assistant. There's nothing to tag, file or configure.",
  },
  {
    title: "Memories are extracted",
    description:
      "After each turn, durable facts are pulled out, embedded and linked into your personal knowledge graph.",
  },
  {
    title: "Context is recalled",
    description:
      "Before every reply, the most relevant memories are retrieved and given to the model, so answers fit you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Memory in three steps"
          description="A retrieval pipeline that runs quietly on every message."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border bg-background p-8 shadow-xs">
              <span className="font-mono text-sm text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
