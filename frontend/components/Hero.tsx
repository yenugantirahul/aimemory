import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, History } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            A chatbot that actually remembers you
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            AIMemory keeps track of what matters across every conversation —
            your preferences, your context, your history — and brings it
            back exactly when it&apos;s relevant. No re-explaining yourself
            every time you open a new chat.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/chat">
              <Button
                size="lg"
                className="cursor-pointer rounded-full px-6 font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Start chatting
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>

            <Link href="https://github.com/yenugantirahul/aimemory" target="_blank">
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer rounded-full px-6 font-medium"
              >
                View on GitHub
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Open source · Remembers across sessions · Built with hybrid search
          </p>
        </div>

        {/* Right: chat mockup showing memory recall */}
        <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-muted text-xs font-semibold">
              A
            </div>
            <span className="text-sm font-medium">AIMemory</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>

          <div className="flex flex-col gap-3 p-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">Monday</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="self-end max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-4 py-2.5 text-sm text-background">
              I&apos;m training for a half marathon in October.
            </div>

            <div className="self-start max-w-[80%] rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-2.5 text-sm">
              Got it — I&apos;ll keep that in mind for anything related to
              training or nutrition.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">Thursday</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="self-end max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-4 py-2.5 text-sm text-background">
              What should I eat before a long run?
            </div>

            <div className="flex flex-col gap-1.5 self-start max-w-[80%]">
              <div className="rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-2.5 text-sm">
                Since you&apos;re training for your half marathon, aim for a
                carb-heavy meal 2–3 hours before — oatmeal or toast with
                banana works well.
              </div>
              <span className="flex items-center gap-1 pl-1 text-xs text-muted-foreground">
                <History className="h-3 w-3" />
                Remembered from Monday
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}