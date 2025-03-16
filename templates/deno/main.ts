import { createAuthApp } from "npm:sveltia-cms-auth-hono";

const app = createAuthApp({
	basePath: "",
	authEnv: {
		GITHUB_CLIENT_ID: Deno.env.get("GITHUB_CLIENT_ID") as string,
		GITHUB_CLIENT_SECRET: Deno.env.get("GITHUB_CLIENT_SECRET") as string,
	},
});

Deno.serve(app.fetch);
