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

export const authQueryValidator = (allowedDomains?: string) => {
	return zValidator("query", authQuerySchema, (result, c) => {
		// Check if the query is valid
		if (!result.success) return c.text(result.error.issues[0].message, { status: 422 });

		// Check if the domain is allowed
		const siteID = result.data.site_id;
		if (allowedDomains && !isDomainAllowed(siteID, allowedDomains)) {
			return c.text("Your domain is not authorized to use this authenticator.", { status: 403 });
		}
	});
};
