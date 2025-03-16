import type { CreateAuthAppProps, AppContext } from "@/types";
import { Hono } from "hono/tiny";

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
		return c.json({
			message: "Auth",
		});
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
