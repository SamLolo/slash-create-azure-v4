import type { Response } from 'undici';
import type { Request } from './request';
/** An HTTP error from a request. */
export declare class DiscordHTTPError extends Error {
    /** The client request of the error. */
    readonly req: Request;
    /** The response from the server. */
    readonly res: Response;
    /** The response class from a {@link Server}. */
    readonly response: any;
    /** The status code from the response. */
    readonly code: number;
    /** The error stack. */
    readonly stack: string;
    /**
     * @param req A client request
     * @param res A response
     * @param stack The error stack
     */
    constructor(req: Request, res: Response, stack: string);
    get headers(): import("undici").Headers;
    get name(): string;
}
