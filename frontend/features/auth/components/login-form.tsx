"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { FormAlert } from "@/components/form/form-alert";
import { FormInputField } from "@/components/form/form-input-field";
import { SubmitButton } from "@/components/form/submit-button";
import { getErrorMessage } from "@/lib/api/errors";
import { useSignIn } from "../auth.hooks";
import { loginSchema, type LoginInput } from "../auth.schema";

export function LoginForm() {
  const signIn = useSignIn();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit((values) => signIn.mutate(values))} noValidate>
      <FieldGroup>
        <FormInputField
          control={form.control}
          name="email"
          label="Email address"
          type="email"
          icon={AtSign}
          placeholder="name@company.com"
          autoComplete="email"
        />
        <FormInputField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <FormAlert
          message={
            signIn.isError &&
            getErrorMessage(signIn.error, "Unable to sign in. Please try again.")
          }
        />
        <SubmitButton
          size="lg"
          className="h-10 w-full"
          isPending={signIn.isPending || signIn.isSuccess}
          pendingText="Signing in..."
        >
          Log in
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
