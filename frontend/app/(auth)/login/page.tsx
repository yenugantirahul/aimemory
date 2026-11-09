import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Log in · AIMemory",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Log in to your AIMemory workspace"
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-foreground hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      {/* LoginForm reads ?next= via useSearchParams, which needs a Suspense boundary. */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
