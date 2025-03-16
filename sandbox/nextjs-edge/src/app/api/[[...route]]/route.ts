import { createAuthApp } from "sveltia-cms-auth-hono";
import { handleVercel } from "sveltia-cms-auth-hono/platforms/vercel";

export const runtime = "edge";

const app = createAuthApp();

export const GET = handleVercel(app);
export const POST = handleVercel(app);
