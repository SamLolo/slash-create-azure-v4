import { Server, ServerRequestHandler } from '../server';
/**
 * A server for Azure Function integration
 * @see https://docs.microsoft.com/en-us/azure/azure-functions/
 */
export declare class AzureFunctionServer extends Server {
    private _handler?;
    constructor();
    getHandler(): (request: any, context: any) => Promise<any>;
    private _onRequest;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
}
