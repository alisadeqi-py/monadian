const GENERIC_ERROR = "خطایی رخ داد، لطفاً دوباره تلاش کنید.";
export const NETWORK_ERROR =
  "ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.";

type BackendErrorBody = Record<string, unknown>;

// DRF returns either {"detail": "..."} for throttling/framework-level
// errors, or {"field_name": ["msg", ...]} per invalid serializer field -
// both cases are now Farsi text set by the backend (see
// config/exceptions.py and each app's serializers.py).
export async function parseApiError(res: Response) {
  let body: BackendErrorBody | null = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!body) return { fieldErrors: {} as Record<string, string>, message: GENERIC_ERROR };

  if (typeof body.detail === "string") {
    return { fieldErrors: {} as Record<string, string>, message: body.detail };
  }

  const fieldErrors: Record<string, string> = {};
  let firstMessage = "";
  for (const [field, value] of Object.entries(body)) {
    const msg = Array.isArray(value) ? String(value[0]) : String(value);
    if (!msg) continue;
    fieldErrors[field] = msg;
    if (!firstMessage) firstMessage = msg;
  }

  return { fieldErrors, message: firstMessage || GENERIC_ERROR };
}
