import { Server, ServerRequestHandler } from '../server';
/**
 * A server for Cloudflare Workers.
 * @see https://developers.cloudflare.com/workers/
 */
export declare class CloudflareWorkerServer extends Server {
    private _handler?;
    constructor();
    /**
     * The fetch handler for the server. Either export the server as default or use this function in your fetch handler to utilize this server.
     * @example
     * export const workerServer = new CloudflareWorkerServer();
     * creator.withServer(workerServer);
     * export default workerServer;
     */
    readonly fetch: (request: any, env: any, ctx: any) => Promise<any>;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
}
