import { serve } from "@hono/node-server";
import { createAuthApp } from "sveltia-cms-auth-hono";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = createAuthApp({
	provider: {
		github: {
			clientId: GITHUB_CLIENT_ID as string,
			clientSecret: GITHUB_CLIENT_SECRET as string,
		},
	},
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
