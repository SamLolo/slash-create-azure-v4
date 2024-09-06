import { Server, ServerRequestHandler } from '../server';
import type { HttpHandler } from '@azure/functions';
/**
 * A server for Azure Function integration
 * @see https://docs.microsoft.com/en-us/azure/azure-functions/
 */
export declare class AzureFunctionServer extends Server {
    private _handler?;
    constructor();
    getHandler(): HttpHandler;
    private _onRequest;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
}
