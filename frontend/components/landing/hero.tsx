import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "./product-preview";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop: grid plus a soft brand glow behind the headline. */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute top-[-10rem] left-1/2 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
        <Link
          href="/#how-it-works"
          className="group mb-8 inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-3 pl-1 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur transition-colors hover:text-foreground"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-brand">
            <Sparkles className="size-3" />
            New
          </span>
          Hybrid vector + graph memory
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="text-gradient max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
          The AI assistant that actually remembers you
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          AIMemory keeps your preferences, context and history across every
          conversation, and brings it back exactly when it&apos;s relevant. Stop
          re-explaining yourself.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-11 rounded-full px-6 text-sm shadow-lg shadow-brand/20"
            nativeButton={false}
            render={<Link href="/chat" />}
          >
            Start chatting free
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 rounded-full px-6 text-sm"
            nativeButton={false}
            render={
              <a
                href="https://github.com/yenugantirahul/aimemory"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            View on GitHub
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Open source · Free to use
        </p>

        <ProductPreview className="mt-16 sm:mt-20" />
      </div>
    </section>
  );
}
