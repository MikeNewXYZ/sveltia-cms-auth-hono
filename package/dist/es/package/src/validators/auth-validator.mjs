import s from "../../../node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs";
import { zValidator as n } from "../../../node_modules/.pnpm/@hono_zod-validator@0.4.3_hono@4.7.4_zod@3.24.2/node_modules/@hono/zod-validator/dist/index.mjs";
const i = (r, t) => t.split(",").map((e) => e.trim()).some((e) => {
  const o = `^${e.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`;
  return new RegExp(o).test(r);
}), u = s.object({
  provider: s.enum(["github"], { message: "The selected backend is not supported." }),
  site_id: s.string(),
  scope: s.string()
}), m = (r) => n("query", u, (t, a) => {
  if (!t.success) return a.text(t.error.issues[0].message, { status: 422 });
  const e = t.data.site_id;
  if (r && !i(e, r))
    return a.text("Your domain is not authorized to use this authenticator.", { status: 403 });
});
export {
  m as authQueryValidator
};
//# sourceMappingURL=auth-validator.mjs.map
