export type AuthCredentials = {
	githubClientId: string;
	githubClientSecret: string;
};

export type AppOptions = {
	allowedDomains?: string;
	basePath: string | "/api";
};

export type CreateAuthAppProps = {
	authCredentials: AuthCredentials;
	options?: AppOptions;
};
