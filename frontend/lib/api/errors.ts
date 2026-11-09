import axios from "axios";

// Matches the backend error body: { code, message, details? }. better-auth
// errors use the same { code, message } shape.
export interface ApiErrorBody {
  code?: string;
  message?: string;
  details?: unknown;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  // 4xx errors won't succeed on retry; network errors (status 0) and 5xx may.
  get isClientError() {
    return this.status >= 400 && this.status < 500;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isCancel(error)) {
    return new ApiError(0, "CANCELLED", "Request was cancelled");
  }

  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      const code = error.code === "ECONNABORTED" ? "TIMEOUT" : "NETWORK_ERROR";
      return new ApiError(0, code, "Unable to reach the server. Check your connection.");
    }

    const { status, data } = error.response;
    return new ApiError(
      status,
      data?.code ?? "UNKNOWN_ERROR",
      data?.message ?? error.message,
      data?.details,
    );
  }

  if (error instanceof Error) {
    return new ApiError(0, "UNKNOWN_ERROR", error.message);
  }

  return new ApiError(0, "UNKNOWN_ERROR", "Something went wrong");
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (error instanceof ApiError && error.message) return error.message;
  return fallback;
}
