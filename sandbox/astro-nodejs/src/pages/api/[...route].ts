import type { APIRoute } from "astro";
import { createAuthApp } from "@sveltia-cms-auth-hono/core";

const app = createAuthApp();

export const ALL: APIRoute = (context) => app.fetch(context.request, import.meta.env);
export type SveltiaCMSAuthApp = typeof app;
