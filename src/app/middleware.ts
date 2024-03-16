import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//TODO: ver se ta funfando

export function middleware(request: NextRequest) {
  const urlSearchParams = new URLSearchParams(request.url.split("?")[1]);
  const requestHeaders = new Headers(request.headers);
  urlSearchParams.forEach((value, key) => {
    requestHeaders.set(`x-url-${key}`, value);
  });

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
