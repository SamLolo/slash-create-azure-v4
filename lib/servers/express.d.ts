import { Server, ServerRequestHandler, ServerOptions } from '../server';
/**
 * A server for Express applications.
 * @see http://expressjs.com
 */
export declare class ExpressServer extends Server {
    readonly app: any;
    /**
     * @param app The express application. Must have express.json installed as a middleware.
     * @param opts The server options
     */
    constructor(app?: any, opts?: ServerOptions);
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
    /** @private */
    listen(port?: number, host?: string): Promise<void>;
}
