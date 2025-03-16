import type { AppContext } from "@/types";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { validator } from "hono/validator";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const callbackQuerySchema = z.object({
	code: z.string(),
	state: z.string(),
});

export const callbackQueryValidator = zValidator(
	"query",
	callbackQuerySchema,
	(result, c: Context<AppContext>) => {
		const cookieState = getCookie(c, "cookie_state");

		if (result.data.state !== cookieState) {
			return c.text(
				"A security issue was detected (CSRF attack). Please restart the authentication process and try again.",
				{ status: 403 },
			);
		}

		if (!result.success) return c.text(result.error.issues[0].message, { status: 422 });
	},
);

export const callbackCookieValidator = validator("cookie", (_, c: Context<AppContext>) => {
	const cookieState = getCookie(c, "cookie_state");
	const provider = getCookie(c, "provider");

	if (!cookieState) {
		return c.text("Server responded with malformed data. Please try again later.", { status: 400 });
	}

	if (!provider) {
		return c.text("Server responded with malformed data. Please try again later.", { status: 400 });
	}

	return { provider, cookieState };
});
