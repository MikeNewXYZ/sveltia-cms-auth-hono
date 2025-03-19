import type { CreateAuthAppProps } from "@/types";
import { Hono } from "hono/tiny";
import { setCookie } from "hono/cookie";
import { GitHub, generateState } from "arctic";

import { authQueryValidator } from "@/validators/auth-validator";
import { callbackQueryValidator, callbackCookieValidator } from "@/validators/callback-validator";

import { generateOAuthCallbackHTML } from "@/lib/generate-oauth-callback-html";

const createAuthApp = ({ authCredentials, options = { basePath: "/api" } }: CreateAuthAppProps) => {
	const { githubClientId, githubClientSecret } = authCredentials;
	const { allowedDomains, basePath } = options;

	const app = new Hono().basePath(basePath);

	const github = new GitHub(githubClientId, githubClientSecret, null);

	app.get("/auth", authQueryValidator(allowedDomains), (c) => {
		const { provider, scope } = c.req.valid("query");
		const state = generateState();
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

	app.get("/callback", callbackQueryValidator, callbackCookieValidator, async (c) => {
		const { code } = c.req.valid("query");
		const { provider } = c.req.valid("cookie");
		const tokens = await github.validateAuthorizationCode(code);
		const accessToken = tokens.accessToken();

		return generateOAuthCallbackHTML({ c, provider, token: accessToken });
	});

	return app;
};

export { createAuthApp };
