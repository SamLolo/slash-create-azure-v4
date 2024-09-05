import { AnyRequestData } from './constants';
import type { FileContent } from './rest/requestHandler';
/**
 * The base Server for {@link SlashCreator}.
 * @private
 */
export declare class Server {
    /** Whether this server is already listening to a port. */
    alreadyListening: boolean;
    /** Whether this server is a webserver. */
    isWebserver: boolean;
    /**
     * @param opts The server options
     * @param isWebserver Whether this server is a webserver
     */
    constructor(opts?: ServerOptions, isWebserver?: boolean);
    /** @private */
    addMiddleware(middleware: Function): void;
    /** @private */
    createEndpoint(path: string, handler: ServerRequestHandler): void;
    /** @private */
    handleInteraction(handler: InteractionHandler): void;
    /** @private */
    listen(port?: number, host?: string): Promise<void>;
}
/** Options for a {@link Server}. */
export interface ServerOptions {
    /** Whether or not the server is already listening to a port. */
    alreadyListening: boolean;
}
/** A general HTTP request. */
export interface TransformedRequest {
    /** The headers of the request. */
    headers: {
        [key: string]: string | string[] | undefined;
    };
    /** The body of the request. */
    body: any;
    /** The request class from a Server, depending on what server it is. */
    request: any;
    /** The response class from a Server, depending on what server it is. */
    response: any;
    /** The raw string of the body. */
    rawBody?: string;
}
/**
 * A general HTTP response.
 * @private
 */
export interface Response {
    /** The status code for the response. */
    status?: number;
    /** The headers for the response. */
    headers?: {
        [key: string]: string | string[] | undefined;
    };
    /** The body of the response. */
    body?: any;
    /** The files of the response. */
    files?: FileContent[];
}
/**
 * The response function for a {@link Server}.
 * @private
 */
export declare type RespondFunction = (response: Response) => Promise<any>;
/**
 * The handler for pushing requests to a {@link SlashCreator}.
 * @private
 */
export declare type ServerRequestHandler<ServerContext extends any = unknown> = (treq: TransformedRequest, respond: RespondFunction, serverContext?: ServerContext) => Promise<void>;
/**
 * The handler for pushing interaction events to a {@link SlashCreator}.
 * @private
 */
export declare type InteractionHandler = (interaction: AnyRequestData) => void;
