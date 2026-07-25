import { NextRequest, NextResponse } from "next/server";
import { API_INTERNAL_URL } from "@/lib/api";

// Relays a same-origin POST from the browser to the (possibly plain-HTTP)
// backend server-side. Browsers block "mixed content" - an HTTPS page
// can't fetch() a plain-HTTP endpoint directly - but a Node.js fetch here
// runs on the server and isn't subject to that restriction, so this lets
// client forms keep working even while the backend has no SSL of its own.
export async function proxyPost(request: NextRequest, backendPath: string) {
  const body = await request.text();
  try {
    const res = await fetch(`${API_INTERNAL_URL}${backendPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({ detail: "backend unreachable" }, { status: 502 });
  }
}
