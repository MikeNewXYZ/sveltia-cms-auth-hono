import { createAuthApp } from "sveltia-cms-auth-hono";
import { handleVercel } from "sveltia-cms-auth-hono/platforms/vercel";

export const runtime = "edge";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = createAuthApp({
	authCredentials: {
		githubClientId: GITHUB_CLIENT_ID as string,
		githubClientSecret: GITHUB_CLIENT_SECRET as string,
	},
});

export const GET = handleVercel(app);
export const POST = handleVercel(app);
