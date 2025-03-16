import type { CreateAuthAppProps, AppContext } from "@/types";
import { Hono } from "hono/tiny";
import { setCookie } from "hono/cookie";
import * as arctic from "arctic";

import { authEnvValidation } from "@/middleware/auth-env-validation";
import { githubAuth } from "@/middleware/github-auth";

import { authQueryValidator } from "@/validators/auth-validator";

const createAuthApp = ({ authEnv, basePath = "/api" }: CreateAuthAppProps = {}) => {
	const app = new Hono<AppContext>().basePath(basePath);

	// Middleware to check if the Environment Variables are set.
	app.use(authEnvValidation(authEnv));

	// Middleware to create a new GitHub Auth instance.
	app.use(githubAuth);

	app.get("/auth", authQueryValidator, (c) => {
		const { provider, scope } = c.req.valid("query");
		const github = c.get("github");
		const state = arctic.generateState();
		const authURL = github.createAuthorizationURL(state, scope.split(","));

		setCookie(c, "cookie_state", state, {
			path: "/",
			httpOnly: true,
			secure: true,
			maxAge: 600,
		});

		setCookie(c, "provider", provider, {
			path: "/",
			httpOnly: true,
			secure: true,
			maxAge: 600,
		});

		return c.redirect(authURL.href);
	});

	app.get("/callback", (c) => {
		return c.json({
			message: "Callback",
		});
	});

	app.get("*", (c) => c.redirect(basePath + "/auth"));

	return app;
};

export { createAuthApp };
