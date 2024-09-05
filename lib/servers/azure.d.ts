import { Server, ServerRequestHandler } from '../server';
import type { HttpRequest, InvocationContext, HttpResponseInit } from '@azure/functions';
/**
 * A server for Azure Function integration
 * @see https://docs.microsoft.com/en-us/azure/azure-functions/
 */
export declare class AzureFunctionServer extends Server {
    private _handler?;
    constructor();
    handleRequest(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit>;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
}
