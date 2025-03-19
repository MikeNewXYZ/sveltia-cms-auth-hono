import { getCookie } from "hono/cookie";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const callbackQuerySchema = z.object({
	code: z.string({ message: "Missing code query." }),
	state: z.string({ message: "Missing state query." }),
});

export const callbackQueryValidator = zValidator("query", callbackQuerySchema, (result, c) => {
	const cookieState = getCookie(c, "cookie_state");

	if (result.data.state !== cookieState) {
		return c.text(
			"A security issue was detected (CSRF attack). Please restart the authentication process and try again.",
			{ status: 403 },
		);
	}

	if (!result.success) return c.text(result.error.issues[0].message, { status: 422 });
});

const callbackCookieSchema = z.object({
	cookie_state: z.string({
		message: "Missing cookie state cookie.",
	}),
	provider: z.string({
		message: "Missing provider information cookie.",
	}),
});

export const callbackCookieValidator = zValidator("cookie", callbackCookieSchema, (result, c) => {
	if (!result.success) {
		return c.text(result.error.issues[0].message, { status: 422 });
	}
});
