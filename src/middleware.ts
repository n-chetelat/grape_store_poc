import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/libs/session";

const protectedRoutes = ["/merchant", "/customer"];

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((pr) => path.startsWith(pr));

  if (session?.userId && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
