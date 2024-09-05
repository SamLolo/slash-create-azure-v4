import { SequentialBucket } from './sequentialBucket';
import type { Agent } from 'undici';
import type { BaseSlashCreator } from '../creator';
export interface RESTOptions {
    /** The dispatcher to use for undici. */
    agent?: Agent;
    /** The base URL to use for API requests. */
    baseURL?: string;
    /** A number of milliseconds to offset the ratelimit timing calculations by. */
    ratelimiterOffset?: number;
    /** A number of milliseconds before requests are considered timed out. */
    requestTimeout?: number;
    /** The amount of times it will retry to send the request. */
    retryLimit?: number;
}
export interface HashData {
    value: string;
    lastAccess: number;
}
export interface RequestOptions {
    /** Whether to add the "Authorization" header. */
    auth?: boolean;
    /** The data to be set for the request body. */
    body?: Record<string, any>;
    /** The headers to attach to the request. */
    headers?: Record<string, string>;
    /** The files to attach to the request body. */
    files?: FileContent[];
    /** An object of query keys and their values. */
    query?: Record<string, any>;
    /** The reason to display in the audit log. */
    reason?: string;
}
/** @private */
export interface FileContent {
    file: any;
    name: string;
}
/**
 * Represents a class to handle requests.
 */
export declare class RequestHandler {
    #private;
    /** The creator that instansiated this handler. */
    creator?: BaseSlashCreator;
    /** A map with SequentialBuckets. */
    buckets: Map<string, SequentialBucket>;
    /** Whether we are currently globally limited. */
    globalBlock: boolean;
    /** The timestamp of the next reset. */
    globalReset: number;
    /** A promise that will resolve as soon we are no longer limited. */
    globalTimeout?: Promise<void>;
    /** A map with bucket hash data. */
    hashes: Map<string, HashData>;
    /** Options for the RequestHandler. */
    options: RESTOptions;
    /**
     * Represents a class to handle requests.
     * @arg creator The creator that created the handler, if any.
     * @arg options Options for the RequestHandler.
     */
    constructor(creator?: BaseSlashCreator, options?: RESTOptions & {
        token?: string;
        overrides?: any;
    });
    /**
     * Whether we are currently globally limited.
     * @readonly
     */
    get limited(): boolean;
    /**
     * Makes a request to the API.
     * @arg method An uppercase HTTP method.
     * @arg path The endpoint to make the request to.
     * @arg options Data regarding the request.
     * @returns Resolves with the returned JSON data.
     */
    request<T = unknown>(method: string, path: string, options?: RequestOptions): Promise<T>;
}
