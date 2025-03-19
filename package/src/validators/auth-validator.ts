import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// Checks if the provided site ID matches any of the allowed domain patterns
const isDomainAllowed = (siteID: string, allowedDomains: string) => {
	const patterns = allowedDomains.split(",").map((p) => p.trim());

	return patterns.some((pattern) => {
		// Escape special regex characters to treat them as literals (e.g. '.' becomes '\.')
		const escapedPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");

		// Convert wildcard (*) to regex equivalent (.*) and anchor the pattern
		// This means *.example.com would match blog.example.com, store.example.com, etc
		const regexPattern = `^${escapedPattern.replace(/\*/g, ".*")}$`;

		// Test if the site ID matches the current pattern
		return new RegExp(regexPattern).test(siteID);
	});
};

const authQuerySchema = z.object({
	provider: z.enum(["github"], { message: "The selected backend is not supported." }),
	site_id: z.string(),
	scope: z.string(),
});

// Creates a validator middleware for authentication query parameters
export const authQueryValidator = (allowedDomains?: string) => {
	return zValidator("query", authQuerySchema, (result, c) => {
		if (!result.success) return c.text(result.error.issues[0].message, { status: 422 });

		// If allowedDomains is provided, perform domain access control checks
		const siteID = result.data.site_id;
		if (allowedDomains && !isDomainAllowed(siteID, allowedDomains)) {
			return c.text("Your domain is not authorized to use this authenticator.", { status: 403 });
		}
	});
};
