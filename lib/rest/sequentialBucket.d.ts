import type { RequestHandler } from './requestHandler';
import type { Request } from './request';
/**
 * Represents a bucket for handling ratelimiting.
 */
export declare class SequentialBucket {
    #private;
    /** The maximum requests that can be made by the bucket. */
    limit: number;
    /** The remaining requests that can be made by the bucket. */
    remaining: number;
    /** The timestamp of the next reset. */
    reset: number;
    /**
     * Represents a bucket for handling ratelimiting.
     * @arg rest Represents the RequestHandler.
     * @arg hash The hash used to identify the bucket.
     * @arg majorParameter The major parameter of the requests.
     */
    constructor(rest: RequestHandler, hash: string, majorParameter: string);
    /**
     * The identifier of the bucket.
     * @readonly
     */
    get id(): string;
    /**
     * Whether the bucket is no longer in use.
     * @readonly
     */
    get inactive(): boolean;
    /**
     * Whether the bucket is currently limited.
     * @readonly
     */
    get limited(): boolean;
    /**
     * Enqueue a request to be sent.
     * @arg request The request to enqueue.
     * @arg next Whether to insert the request at the start of the queue.
     * @returns Resolves with the returned JSON data.
     */
    add<T = unknown>(request: Request, next?: boolean): Promise<T>;
}
