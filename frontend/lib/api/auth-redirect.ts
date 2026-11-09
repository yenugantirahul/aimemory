// Full page navigation so all client state from the expired session is dropped.
export function redirectToLogin() {
  const next = window.location.pathname + window.location.search;
  window.location.assign(`/login?next=${encodeURIComponent(next)}`);
}
