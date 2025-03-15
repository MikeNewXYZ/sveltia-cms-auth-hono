import { SveltiaCMSAuthApp, handleVercel } from "@sveltia-cms-auth-hono/core";

export const runtime = "edge";

export const GET = handleVercel(SveltiaCMSAuthApp);
export const POST = handleVercel(SveltiaCMSAuthApp);
