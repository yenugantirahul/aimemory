import { API_BASE_URL } from "./client";
import { ApiError, type ApiErrorBody } from "./errors";

interface StreamOptions<TEvent> {
  body: unknown;
  signal?: AbortSignal;
  onEvent: (event: TEvent) => void;
}

// POSTs JSON and parses a text/event-stream response. axios can't read a
// response body incrementally in the browser, so this uses fetch directly.
export async function postEventStream<TEvent>(
  path: string,
  { body, signal, onEvent }: StreamOptions<TEvent>,
) {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ApiError(0, "NETWORK_ERROR", "Unable to reach the server. Check your connection.");
  }

  if (!response.ok || !response.body) {
    const data: ApiErrorBody = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      data.code ?? "UNKNOWN_ERROR",
      data.message ?? "Request failed",
      data.details,
    );
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += value;
    const frames = buffer.split("\n\n");
    // The last element is an incomplete frame (or empty); keep it for later.
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      const data = frame
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart())
        .join("\n");

      if (data) onEvent(JSON.parse(data) as TEvent);
    }
  }
}
