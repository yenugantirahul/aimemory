"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock, User } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { FormAlert } from "@/components/form/form-alert";
import { FormInputField } from "@/components/form/form-input-field";
import { SubmitButton } from "@/components/form/submit-button";
import { getErrorMessage } from "@/lib/api/errors";
import { useSignUp } from "../auth.hooks";
import { signupSchema, type SignupInput } from "../auth.schema";

export function SignupForm() {
  const signUp = useSignUp();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit((values) => signUp.mutate(values))} noValidate>
      <FieldGroup>
        <FormInputField
          control={form.control}
          name="name"
          label="Name"
          icon={User}
          placeholder="Jane Doe"
          autoComplete="name"
        />
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
          autoComplete="new-password"
          description="At least 8 characters."
        />
        <FormAlert
          message={
            signUp.isError &&
            getErrorMessage(signUp.error, "Unable to create your account. Please try again.")
          }
        />
        <SubmitButton
          size="lg"
          className="h-10 w-full"
          isPending={signUp.isPending || signUp.isSuccess}
          pendingText="Creating account..."
        >
          Sign up
        </SubmitButton>
      </FieldGroup>
    </form>
  );
}
