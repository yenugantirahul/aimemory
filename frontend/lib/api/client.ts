import axios from "axios";
import { toApiError } from "./errors";

export const API_BASE_URL = "/api";

// Same-origin requests; next.config.ts proxies /api/* to the backend, so auth
// cookies are first-party and sent automatically.
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Every rejected request surfaces as an ApiError, so callers never have to
// inspect axios internals.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toApiError(error)),
);
