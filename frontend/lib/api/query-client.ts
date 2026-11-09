import { QueryCache, QueryClient } from "@tanstack/react-query";
import { redirectToLogin } from "./auth-redirect";
import { ApiError } from "./errors";

const MAX_RETRIES = 2;

export function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      // A 401 from any query means the session expired; send the user to log
      // in and come back here afterwards. The session query itself returns
      // null rather than throwing, so this never fires on public pages.
      onError: (error) => {
        if (error instanceof ApiError && error.isUnauthorized) redirectToLogin();
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.isClientError) &&
          failureCount < MAX_RETRIES,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
