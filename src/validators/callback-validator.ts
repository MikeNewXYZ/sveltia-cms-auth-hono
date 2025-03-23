import { getCookie } from "hono/cookie";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const callbackQuerySchema = z.object({
	code: z.string({ message: "Missing code query." }),
	state: z.string({ message: "Missing state query." }),
});

const callbackCookieSchema = z.object({
	auth_state: z.string({
		message: "Missing cookie state cookie.",
	}),
	provider: z.string({
		message: "Missing provider information cookie.",
	}),
});

// Validates callback query parameters and verifies state parameter to prevent CSRF attacks
export const callbackQueryValidator = zValidator("query", callbackQuerySchema, (result, c) => {
	const authState = getCookie(c, "auth_state");

	if (result.data.state !== authState) {
		return c.text(
			"A security issue was detected (CSRF attack). Please restart the authentication process and try again.",
			{ status: 403 },
		);
	}

	if (!result.success) return c.text(result.error.issues[0].message, { status: 422 });
});

// Validates presence of required cookies set during auth initialization
export const callbackCookieValidator = zValidator("cookie", callbackCookieSchema, (result, c) => {
	if (!result.success) {
		return c.text(result.error.issues[0].message, { status: 422 });
	}
});
