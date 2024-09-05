"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordHTTPError = void 0;
/** An HTTP error from a request. */
class DiscordHTTPError extends Error {
    /**
     * @param req A client request
     * @param res A response
     * @param stack The error stack
     */
    constructor(req, res, stack) {
        super(`${res.status} ${res.statusText || 'Unknown error'} on ${req.method} ${req.path}`);
        this.req = req;
        this.res = res;
        this.code = res.status;
        this.stack = '';
        if (stack)
            this.stack = this.name + ': ' + this.message + '\n' + stack;
        else
            Error.captureStackTrace(this, DiscordHTTPError);
    }
    get headers() {
        return this.res.headers;
    }
    get name() {
        return this.constructor.name;
    }
}
exports.DiscordHTTPError = DiscordHTTPError;
