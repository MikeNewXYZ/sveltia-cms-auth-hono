import { createMiddleware } from "hono/factory";
import * as arctic from "arctic";

export const githubAuth = createMiddleware(async (c, next) => {
	const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = c.get("appEnv");
	const github = new arctic.GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, null);
	c.set("github", github);

	return await next();
});
