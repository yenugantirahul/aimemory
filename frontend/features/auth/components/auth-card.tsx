import type { ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/layout/logo";

interface AuthCardProps {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}

export function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex flex-col items-center text-center">
        <LogoMark className="mb-6 size-10 rounded-xl" />
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="rounded-2xl border bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
        {children}
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
