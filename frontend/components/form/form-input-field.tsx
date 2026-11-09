"use client";

import { useState, type ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FormInputFieldProps<T extends FieldValues>
  extends Omit<ComponentProps<"input">, "name" | "defaultValue" | "value" | "onChange"> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

// A labelled input bound to react-hook-form. Password inputs get a
// show/hide toggle automatically.
export function FormInputField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  icon: Icon,
  type = "text",
  id,
  ...inputProps
}: FormInputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = id ?? name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
          <InputGroup className="h-10 bg-background shadow-xs">
            {Icon && (
              <InputGroupAddon>
                <Icon />
              </InputGroupAddon>
            )}
            <InputGroupInput
              {...inputProps}
              {...field}
              id={inputId}
              type={isPassword && showPassword ? "text" : type}
              aria-invalid={fieldState.invalid}
            />
            {isPassword && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
