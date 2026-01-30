import { API_URL } from "../config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class HttpError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

async function parseBodySafe(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function http<T>(
  path: string,
  options?: {
    method?: HttpMethod;
    body?: unknown;
    signal?: AbortSignal;
  }
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    signal: options?.signal,
  });

  if (!res.ok) {
    const payload = await parseBodySafe(res);
    const message =
      (payload && typeof payload === "object" && "message" in payload && (payload as any).message) ||
      res.statusText ||
      "Error en la solicitud";
    throw new HttpError(message, res.status, payload);
  }

  const data = (await parseBodySafe(res)) as T;
  return data;
}
