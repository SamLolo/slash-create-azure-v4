/// <reference types="node" />
import type { fetch as UndiciFetch, FormData as UndiciFormData, Response } from 'undici';
import type { FileContent, RequestHandler, RequestOptions } from './requestHandler';
import type { Blob as NodeBlob } from 'node:buffer';
/**
 * Represents the request.
 */
export declare class Request {
    #private;
    /** The data to be set for the request body. */
    data?: UndiciFormData | string;
    /** The RequestHandler. */
    handler: RequestHandler;
    /**
     * The headers to attach to the request.
     * @type {Object}
     */
    headers: Record<string, string>;
    /** The major parameter of the request. */
    majorParameter: string;
    /** An uppercase HTTP method. */
    method: string;
    /** Data regarding the request. */
    options: RequestOptions;
    /** The endpoint to make the request to. */
    path: string;
    /** The route to make the request to. */
    route: string;
    /** The URL to make the request to. */
    url: URL;
    /**
     * Represents the request.
     * @arg handler Represents the RequestHandler.
     * @arg method An uppercase HTTP method.
     * @arg path The endpoint to make the request to.
     * @arg options Data regarding the request.
     */
    constructor(handler: RequestHandler, method: string, path: string, options: RequestOptions, overrides?: {
        fetch?: typeof UndiciFetch;
        FormData?: typeof UndiciFormData;
        Blob?: typeof NodeBlob;
    });
    /**
     * The identifier of the request.
     * @readonly
     */
    get id(): string;
    /**
     * Sends the request to Discord.
     * @returns The response.
     */
    send(): Promise<Response>;
    /**
     * Attach data to the request.
     * @arg body Optional data to attach to the request.
     * @arg files Optional files to attach to the request.
     */
    setBody(body?: Record<string, any>, files?: FileContent[]): Request;
}
