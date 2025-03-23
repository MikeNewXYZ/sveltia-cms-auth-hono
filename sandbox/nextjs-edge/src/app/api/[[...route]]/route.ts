import { handle } from "hono/vercel";
import { createAuthApp } from "sveltia-cms-auth-hono";

export const runtime = "edge";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = createAuthApp({
	provider: {
		github: {
			clientId: GITHUB_CLIENT_ID as string,
			clientSecret: GITHUB_CLIENT_SECRET as string,
		},
	},
});

export const GET = handle(app);
export const POST = handle(app);
