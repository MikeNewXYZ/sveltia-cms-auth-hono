import { Context } from 'hono';
export type GenerateOAuthCallbackHTMLProps = {
    c: Context;
    provider?: string;
    token: string;
};
export declare const generateOAuthCallbackHTML: ({ c, provider, token, }: GenerateOAuthCallbackHTMLProps) => Response;
