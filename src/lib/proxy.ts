import { NextRequest, NextResponse } from "next/server";
import { API_INTERNAL_URL } from "@/lib/api";

// Relays a same-origin POST from the browser to the (possibly plain-HTTP)
// backend server-side. Browsers block "mixed content" - an HTTPS page
// can't fetch() a plain-HTTP endpoint directly - but a Node.js fetch here
// runs on the server and isn't subject to that restriction, so this lets
// client forms keep working even while the backend has no SSL of its own.
//
// Forwards the raw body and original Content-Type unchanged (rather than
// assuming JSON) so this works for both JSON requests (contact,
// newsletter) and multipart/form-data with file uploads (careers) - a
// multipart body's boundary lives in its Content-Type header, so that
// header must be passed through as-is for the backend to parse it.
export async function proxyPost(request: NextRequest, backendPath: string) {
  const contentType = request.headers.get("content-type") ?? "application/json";
  const body = await request.arrayBuffer();
  try {
    const res = await fetch(`${API_INTERNAL_URL}${backendPath}`, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });
    const data = await res.arrayBuffer();
    return new NextResponse(data, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json({ detail: "backend unreachable" }, { status: 502 });
  }
}
