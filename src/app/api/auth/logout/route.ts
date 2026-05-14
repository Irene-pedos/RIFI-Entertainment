import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logger } from "@/server/utils/logger";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("rifi_auth_token");
  
  logger.info("Auth: User logged out via API route");
  
  return NextResponse.json({ success: true });
}
