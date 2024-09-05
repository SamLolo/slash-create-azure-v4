import { Server, ServerRequestHandler, ServerOptions } from '../server';
/**
 * A server for Fastify applications.
 * @see https://fastify.io
 */
export declare class FastifyServer extends Server {
    readonly app: any;
    /**
     * @param app The fastify application, or the options for initialization
     * @param opts The server options
     */
    constructor(app?: any, opts?: ServerOptions);
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
    /** @private */
    listen(port?: number, host?: string): Promise<void>;
}
