import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  isPending?: boolean;
  pendingText?: ReactNode;
}

export function SubmitButton({
  isPending = false,
  pendingText,
  disabled,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={disabled || isPending} aria-busy={isPending} {...props}>
      {isPending && <Spinner />}
      {isPending ? (pendingText ?? children) : children}
    </Button>
  );
}
