import { Server, ServerRequestHandler } from '../server';
/**
 * A server for Vercel.
 * @see https://vercel.com/
 * @see https://vercel.com/guides/handling-node-request-body
 */
export declare class VercelServer extends Server {
    private _handler?;
    constructor();
    /** The endpoint Vercel uses for serverless functions. */
    vercelEndpoint: (req: any, res: any) => any;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
}
