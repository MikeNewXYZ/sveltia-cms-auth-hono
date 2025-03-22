import { deleteCookie as o } from "../../../node_modules/.pnpm/hono@4.7.4/node_modules/hono/dist/helper/cookie/index.mjs";
const a = ({
  c: e,
  provider: t = "unknown",
  token: n
}) => {
  const i = JSON.stringify({ provider: t, token: n });
  return o(e, "auth_state"), o(e, "provider"), e.html(
    /*html*/
    `
    <!doctype html><html><body><script>
    (() => {
      window.addEventListener('message', ({ data, origin }) => {
      if (data === 'authorizing:${t}') {
        window.opener?.postMessage(
        'authorization:${t}:success:${i}',
        origin
        );
      }
      });
      window.opener?.postMessage('authorizing:${t}', '*');
    })();
    <\/script></body></html>
  `
  );
};
export {
  a as generateOAuthCallbackHTML
};
//# sourceMappingURL=generate-oauth-callback-html.mjs.map
