import { Hono } from "hono/tiny";
import * as arctic from "arctic";
import { authEnvValidation } from "@/middleware/auth-env-validation";
import { githubAuth } from "@/middleware/github-auth";

type AppEnv = {
	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
};

type Variables = {
	appEnv: AppEnv;
	github: arctic.GitHub;
};

type CreateAuthAppProps = {
	authEnv?: AppEnv;
	basePath?: string;
};

const createAuthApp = ({ authEnv, basePath = "/api" }: CreateAuthAppProps = {}) => {
	const app = new Hono<{ Bindings: AppEnv; Variables: Variables }>().basePath(basePath);

	// Middleware to check if the Environment Variables are set.
	app.use(authEnvValidation(authEnv));

	// Middleware to create a new GitHub Auth instance.
	app.use(githubAuth);

	app.get("/auth", (c) => {
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
export type { AppEnv, Variables, CreateAuthAppProps };
