import type { AppEnv, CreateAuthAppProps } from "@/types";
import { createMiddleware } from "hono/factory";
import { env } from "hono/adapter";

export const authEnvValidation = (authEnv: CreateAuthAppProps["authEnv"]) => {
	return createMiddleware(async (c, next) => {
		// Usually "c.env" or "env(c)" is able to get the environment variables,
		// however if both are not working you can set the environment variables manually
		// by passing the "authEnv" prop to the "createAuthApp" function directly.
		let appEnv: Partial<AppEnv> | undefined;
		if (authEnv) {
			appEnv = authEnv;
		} else {
			appEnv = c.env ? c.env : env(c);
		}

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

		c.set("appEnv", appEnv as AppEnv);

		return next();
	});
};
