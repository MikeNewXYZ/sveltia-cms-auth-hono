import { Hono } from 'hono';
export type CreateAuthAppProps = {
    provider: {
        github: {
            clientId: string;
            clientSecret: string;
        };
    };
    options?: {
        allowedDomains?: string;
    };
};
export declare const createAuthApp: ({ provider, options }: CreateAuthAppProps) => Hono;
