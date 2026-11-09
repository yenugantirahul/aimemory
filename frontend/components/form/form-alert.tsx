import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form-level error, e.g. a server rejection that isn't tied to one field.
export function FormAlert({ message }: { message?: string | false | null }) {
  if (!message) return null;

  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
