import { createAuthApp } from "sveltia-cms-auth-hono";

const app = createAuthApp({
	authEnv: {
		GITHUB_CLIENT_ID: Bun.env.GITHUB_CLIENT_ID as string,
		GITHUB_CLIENT_SECRET: Bun.env.GITHUB_CLIENT_SECRET as string,
	},
});

export default {
	port: 3000,
	fetch: app.fetch,
};
