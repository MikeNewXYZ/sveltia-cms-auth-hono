import type { APIRoute } from "astro";
import { SveltiaCMSAuthApp } from "@sveltia-cms-auth-hono/core";

export const ALL: APIRoute = (context) => SveltiaCMSAuthApp.fetch(context.request);
