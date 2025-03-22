import { getCookie as i } from "../../../node_modules/.pnpm/hono@4.7.4/node_modules/hono/dist/helper/cookie/index.mjs";
import e from "../../../node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs";
import { zValidator as a } from "../../../node_modules/.pnpm/@hono_zod-validator@0.4.3_hono@4.7.4_zod@3.24.2/node_modules/@hono/zod-validator/dist/index.mjs";
const r = e.object({
  code: e.string({ message: "Missing code query." }),
  state: e.string({ message: "Missing state query." })
}), c = e.object({
  auth_state: e.string({
    message: "Missing cookie state cookie."
  }),
  provider: e.string({
    message: "Missing provider information cookie."
  })
}), m = a("query", r, (t, s) => {
  const o = i(s, "auth_state");
  if (t.data.state !== o)
    return s.text(
      "A security issue was detected (CSRF attack). Please restart the authentication process and try again.",
      { status: 403 }
    );
  if (!t.success) return s.text(t.error.issues[0].message, { status: 422 });
}), k = a("cookie", c, (t, s) => {
  if (!t.success)
    return s.text(t.error.issues[0].message, { status: 422 });
});
export {
  k as callbackCookieValidator,
  m as callbackQueryValidator
};
//# sourceMappingURL=callback-validator.mjs.map
