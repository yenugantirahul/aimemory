"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/auth.hooks";
import { UserMenu } from "@/features/auth/components/user-menu";
import { Logo } from "./logo";

const GITHUB_URL = "https://github.com/yenugantirahul/aimemory";

export function Navbar() {
  const { user, isPending } = useSession();

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border/60 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isPending ? (
            <Skeleton className="size-8 rounded-full" />
          ) : user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
                nativeButton={false}
                render={<Link href="/chat" />}
              >
                Open chat
              </Button>
              <UserMenu user={user} />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
                Log in
              </Button>
              <Button
                size="sm"
                className="rounded-full px-3.5"
                nativeButton={false}
                render={<Link href="/signup" />}
              >
                Get started
                <ArrowRight data-icon="inline-end" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
