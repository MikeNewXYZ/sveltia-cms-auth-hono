const { serve } = require("@hono/node-server");
const { createAuthApp } = require("sveltia-cms-auth-hono");

require("dotenv/config");

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = createAuthApp({
	provider: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		},
	},
	options: { baseURL: "/" },
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
	console.log(`Server is running on http://localhost:${info.port}`);
});
