import type { APIRoute } from "astro";
import { createAuthApp } from "sveltia-cms-auth-hono";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = import.meta.env;

const app = createAuthApp({
	provider: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		},
	},
});

export const ALL: APIRoute = (context) => app.fetch(context.request);
