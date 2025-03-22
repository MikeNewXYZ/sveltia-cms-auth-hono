"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("../../../node_modules/.pnpm/hono@4.7.4/node_modules/hono/dist/helper/cookie/index.cjs"),a=({c:t,provider:e="unknown",token:o})=>{const i=JSON.stringify({provider:e,token:o});return n.deleteCookie(t,"auth_state"),n.deleteCookie(t,"provider"),t.html(`
    <!doctype html><html><body><script>
    (() => {
      window.addEventListener('message', ({ data, origin }) => {
      if (data === 'authorizing:${e}') {
        window.opener?.postMessage(
        'authorization:${e}:success:${i}',
        origin
        );
      }
      });
      window.opener?.postMessage('authorizing:${e}', '*');
    })();
    <\/script></body></html>
  `)};exports.generateOAuthCallbackHTML=a;
//# sourceMappingURL=generate-oauth-callback-html.cjs.map
