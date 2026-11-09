import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-7 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-brand to-foreground text-brand-foreground shadow-sm ring-1 ring-black/10",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
        <path
          d="M12 3 4 20h3.5l1.6-3.6h5.8l1.6 3.6H20L12 3Zm-1.7 10.4L12 9.5l1.7 3.9h-3.4Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 transition-opacity hover:opacity-80", className)}
    >
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight">AIMemory</span>
    </Link>
  );
}
