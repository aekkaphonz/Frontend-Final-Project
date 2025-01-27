import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
 
  const loginUrl = new URL("/signin", req.url);

 
  const userSession = req.cookies.get("session");


  if (!userSession) {
    return NextResponse.redirect(loginUrl);
  }

 
  return NextResponse.next();
}


export const config = {
  matcher: ["/profile/:path*"], 
};
