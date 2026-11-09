import { AuthShowcase } from "@/features/auth/components/auth-showcase";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100dvh-3.5rem)] lg:grid-cols-2">
      <div className="relative isolate flex items-center justify-center px-4 py-16 sm:px-6">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-40" />
        {children}
      </div>
      <AuthShowcase />
    </div>
  );
}
