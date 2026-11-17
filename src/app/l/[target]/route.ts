import { type NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ target: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { target } = await context.params;

  switch (target) {
    case "docs":
      return NextResponse.redirect(new URL("/docs", _request.url));
  }

  // Redirect to home if the social network is unknown
  return NextResponse.redirect("/");
}
