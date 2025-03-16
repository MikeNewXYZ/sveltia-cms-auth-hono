import * as arctic from "arctic";

export type AppEnv = {
	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
	ALLOWED_DOMAINS?: string;
};

export type Variables = {
	appEnv: AppEnv;
	github: arctic.GitHub;
};

export type CreateAuthAppProps = {
	authEnv?: AppEnv;
	basePath?: string;
};

export type AppContext = {
	Bindings: AppEnv;
	Variables: Variables;
};
