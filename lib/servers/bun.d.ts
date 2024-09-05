import { Server, ServerRequestHandler } from '../server';
/**
 * A server for the Bun runtime.
 * @see https://bun.sh/docs/api/http#bun-serve
 */
export declare class BunServer extends Server {
    private _handler?;
    private _options;
    /**
     * @param options The options to use when creating a Bun server
     */
    constructor(options?: any);
    /**
     * The fetch handler for the server. You can call this function to run the handler or use `listen` to create a server that uses the handler.
     * @example
     * export const workerServer = new CloudflareWorkerServer();
     * creator.withServer(workerServer);
     * export default workerServer;
     */
    readonly fetch: (request: any) => Promise<any>;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
    /** @private */
    listen(port?: number, host?: string): Promise<void>;
}
