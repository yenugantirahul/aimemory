import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign up · AIMemory",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Start a workspace that remembers you"
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-foreground hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <Suspense>
        <SignupForm />
      </Suspense>
    </AuthCard>
  );
}
