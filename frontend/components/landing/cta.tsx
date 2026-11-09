import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center text-background sm:px-16">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -z-10 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand/40 blur-3xl"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
            Start a conversation that never forgets
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-background/70">
            Create a free account and AIMemory starts learning what matters to you from the first
            message.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 h-11 rounded-full px-6"
            nativeButton={false}
            render={<Link href="/signup" />}
          >
            Get started free
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
