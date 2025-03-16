import type { Context } from "hono";
import type { AppContext } from "@/types";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// TODO: Write a test for this function
const isDomainAllowed = (siteId: string, allowedDomains: string) => {
	const patterns = allowedDomains.split(",").map((p) => p.trim());

	return patterns.some((pattern) => {
		const escapedPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
		const regexPattern = `^${escapedPattern.replace(/\*/g, ".*")}$`;
		return new RegExp(regexPattern).test(siteId);
	});
};

const authQuerySchema = z.object({
	provider: z.enum(["github"], { message: "The selected backend is not supported." }),
	site_id: z.string(),
	scope: z.string(),
});

export const authQueryValidator = zValidator(
	"query",
	authQuerySchema,
	(result, c: Context<AppContext>) => {
		const { ALLOWED_DOMAINS } = c.get("appEnv");

		if (!result.success) return c.text(result.error.issues[0].message, { status: 422 });

		// Check if the domain is allowed
		if (ALLOWED_DOMAINS && !isDomainAllowed(result.data.site_id, ALLOWED_DOMAINS)) {
			return c.text("Your domain is not authorized to use this authenticator.", { status: 403 });
		}
	},
);
