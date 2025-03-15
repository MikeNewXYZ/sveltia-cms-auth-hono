import { env } from "hono/adapter";
import { Hono } from "hono/tiny";

type AppEnv = {
	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
};

type Variables = {
	appEnv?: Partial<AppEnv>;
};

type CreateAuthAppProps = {
	authEnv?: AppEnv;
	basePath?: string;
};

const createAuthApp = ({ authEnv, basePath = "/api" }: CreateAuthAppProps = {}) => {
	const app = new Hono<{ Bindings: AppEnv; Variables: Variables }>().basePath(basePath);

	// NOTE: Set appEnv Variable
	// Usually "c.env" or "env(c)" is able to get the environment variables,
	// however, if both are not working, you can set the environment variables manually
	// by passing the "authEnv" prop to the "createAuthApp" function directly.
	app.use((c, next) => {
		if (authEnv) {
			c.set("appEnv", authEnv);
		} else {
			c.set("appEnv", c.env ? c.env : env(c));
		}
		return next();
	});

	app.get("/auth", (c) => {
		const appEnv = c.get("appEnv");

		// Check if critical environment variables are set.
		if (!appEnv) {
			return c.text("Error: Environment variables not found", { status: 500 });
		}
		if (!appEnv.GITHUB_CLIENT_ID) {
			return c.text("Error: GITHUB_CLIENT_ID not found", { status: 500 });
		}
		if (!appEnv.GITHUB_CLIENT_SECRET) {
			return c.text("Error: GITHUB_CLIENT_SECRET not found", { status: 500 });
		}

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
