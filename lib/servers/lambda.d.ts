import { Server, ServerRequestHandler } from '../server';
/**
 * A server for AWS Lambda proxy integrations
 * @see https://aws.amazon.com/lambda/
 * @see https://aws.amazon.com/api-gateway/
 */
export declare class AWSLambdaServer extends Server {
    private _handler?;
    /**
     * @param moduleExports The exports for your module, must be `module.exports`
     * @param target The name of the exported lambda handler (only HTTP APIs with payload version 2.0 are supported)
     */
    constructor(moduleExports: any, target?: string);
    private _onRequest;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
}
