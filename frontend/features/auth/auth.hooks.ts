"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { authApi } from "./auth.api";

export const authKeys = {
  session: ["auth", "session"] as const,
};

const DEFAULT_REDIRECT = "/chat";

// Only follow same-origin paths, so ?next= can't be used as an open redirect.
function safeRedirect(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : DEFAULT_REDIRECT;
}

export function useSession() {
  const query = useQuery({
    queryKey: authKeys.session,
    queryFn: authApi.getSession,
    staleTime: 5 * 60_000,
  });

  return {
    ...query,
    user: query.data?.user ?? null,
    isAuthenticated: !!query.data?.user,
  };
}

function useAuthSuccessRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: authKeys.session });
    router.replace(safeRedirect(searchParams.get("next")));
  };
}

export function useSignIn() {
  const onSuccess = useAuthSuccessRedirect();
  return useMutation({ mutationFn: authApi.signIn, onSuccess });
}

export function useSignUp() {
  const onSuccess = useAuthSuccessRedirect();
  return useMutation({ mutationFn: authApi.signUp, onSuccess });
}

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      // Drop every cached query so the next user never sees this user's data.
      queryClient.clear();
      router.replace("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to log out. Please try again."));
    },
  });
}
