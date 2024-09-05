import type { Response } from 'undici';
import type { Request } from './request';
/** An Discord error from a request. */
export declare class DiscordRESTError extends Error {
    /** The client request of the error. */
    readonly req: Request;
    /** The response from the server. */
    readonly res: Response;
    /** The response class from a {@link Server}. */
    readonly response: any;
    /** The error code from the response. */
    readonly code: number;
    /** The message of the error. */
    readonly message: string;
    /** The error stack. */
    readonly stack: string;
    /**
     * @param req A client request
     * @param res An incoming message from the server
     * @param response A response's body
     * @param stack The error stack
     */
    constructor(req: Request, res: Response, response: any, stack: string);
    get name(): string;
    private flattenErrors;
}
