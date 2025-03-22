import type { CookieOptions } from "hono/utils/cookie";

import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { GitHub, generateState } from "arctic";

import { authQueryValidator } from "@/validators/auth-validator";
import { callbackQueryValidator, callbackCookieValidator } from "@/validators/callback-validator";

import { generateOAuthCallbackHTML } from "@/lib/generate-oauth-callback-html";

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: true,
  maxAge: 10 * 60, // 10 minutes
  sameSite: "Lax",
};

export type CreateAuthAppProps = {
  provider: {
    github: {
      clientId: string;
      clientSecret: string;
    };
  };
  options?: {
    allowedDomains?: string;
  };
};

export const createAuthApp = ({ provider, options }: CreateAuthAppProps): Hono => {
  const { github: githubCredentials } = provider;
  const { allowedDomains } = options ?? {};

  const app = new Hono();
  const github = new GitHub(githubCredentials.clientId, githubCredentials.clientSecret, null);

  app.get("/auth", authQueryValidator(allowedDomains), (c) => {
    const { provider, scope } = c.req.valid("query");
    const state = generateState();
    const authURL = github.createAuthorizationURL(state, scope.split(","));

    setCookie(c, "auth_state", state, DEFAULT_COOKIE_OPTIONS);
    setCookie(c, "provider", provider, DEFAULT_COOKIE_OPTIONS);

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
