import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";

export type GenerateOAuthCallbackHTMLProps = {
	c: Context;
	provider?: string;
	token: string;
};

// Creates HTML page with JS that communicates with opener window to pass auth data
export const generateOAuthCallbackHTML = ({
	c,
	provider = "unknown",
	token,
}: GenerateOAuthCallbackHTMLProps) => {
	const jsonContent = JSON.stringify({ provider, token });

	deleteCookie(c, "auth_state");
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
