import type { CreateAuthAppProps } from "@/types";
import type { CookieOptions } from "hono/utils/cookie";
import { Hono } from "hono/tiny";
import { setCookie } from "hono/cookie";
import { GitHub, generateState } from "arctic";

import { authQueryValidator } from "@/validators/auth-validator";
import { callbackQueryValidator, callbackCookieValidator } from "@/validators/callback-validator";

import { generateOAuthCallbackHTML } from "@/lib/generate-oauth-callback-html";

// Default cookie options for authentication state
const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
	path: "/",
	httpOnly: true,
	secure: true,
	maxAge: 10 * 60, // 10 minutes
	sameSite: "Lax",
};

/**
 * Creates a Hono app with authentication routes for OAuth providers
 *
 * @param {CreateAuthAppProps} props - Configuration for the auth app
 * @returns {Hono} Configured Hono application with auth routes
 */
const createAuthApp = ({ authCredentials, options = { basePath: "/api" } }: CreateAuthAppProps) => {
	const { githubClientId, githubClientSecret } = authCredentials;
	const { allowedDomains, basePath } = options;

	const app = new Hono().basePath(basePath);
	const github = new GitHub(githubClientId, githubClientSecret, null);

	// Authentication initiation endpoint
	app.get("/auth", authQueryValidator(allowedDomains), (c) => {
		const { provider, scope } = c.req.valid("query");
		const state = generateState();
		const authURL = github.createAuthorizationURL(state, scope.split(","));

		// Store authentication state in a cookie
		setCookie(c, "auth_state", state, DEFAULT_COOKIE_OPTIONS);
		setCookie(c, "provider", provider, DEFAULT_COOKIE_OPTIONS);

		return c.redirect(authURL.href);
	});

	// OAuth callback endpoint
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
