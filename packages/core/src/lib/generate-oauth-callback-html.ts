import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";

type GenerateOAuthCallbackHTMLProps = {
	c: Context;
	provider?: string;
	token: string;
};

export const generateOAuthCallbackHTML = ({
	c,
	provider = "unknown",
	token,
}: GenerateOAuthCallbackHTMLProps) => {
	const jsonContent = JSON.stringify({ provider, token });

	deleteCookie(c, "cookie_state");
	deleteCookie(c, "provider");

	return c.html(/*html*/ `
    <!doctype html><html><body><script>
    (() => {
      window.addEventListener('message', ({ data, origin }) => {
      if (data === 'authorizing:${provider}') {
        window.opener?.postMessage(
        'authorization:${provider}:success:${jsonContent}',
        origin
        );
      }
      });
      window.opener?.postMessage('authorizing:${provider}', '*');
    })();
    </script></body></html>
  `);
};
