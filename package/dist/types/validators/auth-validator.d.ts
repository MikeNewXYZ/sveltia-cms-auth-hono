export declare const authQueryValidator: (allowedDomains?: string) => import('hono').MiddlewareHandler<import('hono').Env, string, {
    in: {
        query: {
            provider: "github";
            site_id: string;
            scope: string;
        };
    };
    out: {
        query: {
            provider: "github";
            site_id: string;
            scope: string;
        };
    };
}>;
