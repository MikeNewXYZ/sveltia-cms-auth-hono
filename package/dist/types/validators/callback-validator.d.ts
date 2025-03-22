export declare const callbackQueryValidator: import('hono').MiddlewareHandler<import('hono').Env, string, {
    in: {
        query: {
            code: string;
            state: string;
        };
    };
    out: {
        query: {
            code: string;
            state: string;
        };
    };
}>;
export declare const callbackCookieValidator: import('hono').MiddlewareHandler<import('hono').Env, string, {
    in: {
        cookie: {
            provider: string;
            auth_state: string;
        };
    };
    out: {
        cookie: {
            provider: string;
            auth_state: string;
        };
    };
}>;
