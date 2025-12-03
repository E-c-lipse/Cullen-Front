const API_BASE = "http://localhost:8000";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}: ${res.statusText}`;
    try {
      const err = await res.json();
      message = err?.detail || err?.message || message;
    } catch {
      // ignore parsing errors
    }
    throw new Error(message);
  }

  return res.json();
}

export const http = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body?: any) =>
    request<T>(url, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(url: string, body?: any) =>
    request<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
};
