import { Hono as d } from "hono";
import { setCookie as s } from "./node_modules/.pnpm/hono@4.7.4/node_modules/hono/dist/helper/cookie/index.mjs";
import "./node_modules/.pnpm/arctic@3.5.0/node_modules/arctic/dist/client.mjs";
import "./node_modules/.pnpm/@oslojs_encoding@0.4.1/node_modules/@oslojs/encoding/dist/base32.mjs";
import "./node_modules/.pnpm/@oslojs_encoding@0.4.1/node_modules/@oslojs/encoding/dist/base64.mjs";
import "./node_modules/.pnpm/@oslojs_encoding@1.1.0/node_modules/@oslojs/encoding/dist/base32.mjs";
import "./node_modules/.pnpm/@oslojs_encoding@1.1.0/node_modules/@oslojs/encoding/dist/base64.mjs";
import { generateState as h } from "./node_modules/.pnpm/arctic@3.5.0/node_modules/arctic/dist/oauth2.mjs";
import { GitHub as k } from "./node_modules/.pnpm/arctic@3.5.0/node_modules/arctic/dist/providers/github.mjs";
import { authQueryValidator as v } from "./package/src/validators/auth-validator.mjs";
import { callbackQueryValidator as b, callbackCookieValidator as f } from "./package/src/validators/callback-validator.mjs";
import { generateOAuthCallbackHTML as g } from "./package/src/lib/generate-oauth-callback-html.mjs";
const p = {
  path: "/",
  httpOnly: !0,
  secure: !0,
  maxAge: 10 * 60,
  // 10 minutes
  sameSite: "Lax"
}, U = ({ provider: l, options: u }) => {
  const { github: n } = l, { allowedDomains: m } = u ?? {}, e = new d(), c = new k(n.clientId, n.clientSecret, null);
  return e.get("/auth", v(m), (t) => {
    const { provider: o, scope: r } = t.req.valid("query"), a = h(), i = c.createAuthorizationURL(a, r.split(","));
    return s(t, "auth_state", a, p), s(t, "provider", o, p), t.redirect(i.href);
  }), e.get("/callback", b, f, async (t) => {
    const { code: o } = t.req.valid("query"), { provider: r } = t.req.valid("cookie"), i = (await c.validateAuthorizationCode(o)).accessToken();
    return g({ c: t, provider: r, token: i });
  }), e;
};
export {
  U as createAuthApp
};
//# sourceMappingURL=index.mjs.map
