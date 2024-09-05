"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SequentialBucket_instances, _SequentialBucket_handler, _SequentialBucket_hash, _SequentialBucket_majorParameter, _SequentialBucket_mutex, _SequentialBucket_execute, _SequentialBucket_handle, _SequentialBucket_setGlobalTimeout;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequentialBucket = void 0;
const mutex_1 = require("./mutex");
const DiscordHTTPError_1 = require("./DiscordHTTPError");
const DiscordRESTError_1 = require("./DiscordRESTError");
/**
 * Utility function to parse the response.
 * @arg res The response.
 */
async function parseResponse(res) {
    if (res.headers.get('content-type') === 'application/json')
        return await res.json();
    return null;
}
/**
 * Utility function to parse the ratelimit scope.
 * @arg scope The X-RateLimit-Scope header.
 */
function parseScope(scope) {
    switch (scope) {
        case 'user':
            return 'User';
        case 'global':
            return 'Global';
        case 'shared':
            return 'Shared';
        default:
            return 'Unexpected';
    }
}
/**
 * Represents a bucket for handling ratelimiting.
 */
class SequentialBucket {
    /**
     * Represents a bucket for handling ratelimiting.
     * @arg rest Represents the RequestHandler.
     * @arg hash The hash used to identify the bucket.
     * @arg majorParameter The major parameter of the requests.
     */
    constructor(rest, hash, majorParameter) {
        _SequentialBucket_instances.add(this);
        /** The maximum requests that can be made by the bucket. */
        this.limit = 1;
        /** The remaining requests that can be made by the bucket. */
        this.remaining = 1;
        /** The timestamp of the next reset. */
        this.reset = 0;
        /** Represents the RequestHandler. */
        _SequentialBucket_handler.set(this, void 0);
        /** The hash used to identify the bucket. */
        _SequentialBucket_hash.set(this, void 0);
        /** The major parameter of the requests. */
        _SequentialBucket_majorParameter.set(this, void 0);
        /** A simple tool to synchronize async operations. */
        _SequentialBucket_mutex.set(this, new mutex_1.Mutex());
        __classPrivateFieldSet(this, _SequentialBucket_handler, rest, "f");
        __classPrivateFieldSet(this, _SequentialBucket_hash, hash, "f");
        __classPrivateFieldSet(this, _SequentialBucket_majorParameter, majorParameter, "f");
    }
    /**
     * The identifier of the bucket.
     * @readonly
     */
    get id() {
        return `${__classPrivateFieldGet(this, _SequentialBucket_hash, "f")}:${__classPrivateFieldGet(this, _SequentialBucket_majorParameter, "f")}`;
    }
    /**
     * Whether the bucket is no longer in use.
     * @readonly
     */
    get inactive() {
        return !this.limited && !__classPrivateFieldGet(this, _SequentialBucket_handler, "f").limited && !__classPrivateFieldGet(this, _SequentialBucket_mutex, "f").locked;
    }
    /**
     * Whether the bucket is currently limited.
     * @readonly
     */
    get limited() {
        return this.remaining <= 0 && Date.now() < this.reset;
    }
    /**
     * Enqueue a request to be sent.
     * @arg request The request to enqueue.
     * @arg next Whether to insert the request at the start of the queue.
     * @returns Resolves with the returned JSON data.
     */
    async add(request, next) {
        const release = await __classPrivateFieldGet(this, _SequentialBucket_mutex, "f").acquire(next);
        try {
            return (await __classPrivateFieldGet(this, _SequentialBucket_instances, "m", _SequentialBucket_execute).call(this, request));
        }
        finally {
            release();
        }
    }
}
exports.SequentialBucket = SequentialBucket;
_SequentialBucket_handler = new WeakMap(), _SequentialBucket_hash = new WeakMap(), _SequentialBucket_majorParameter = new WeakMap(), _SequentialBucket_mutex = new WeakMap(), _SequentialBucket_instances = new WeakSet(), _SequentialBucket_execute = 
/**
 * Makes a request to the API.
 * @arg request The request to execute.
 * @arg attempts The amount of attempts.
 * @returns Resolves with the returned JSON data.
 */
async function _SequentialBucket_execute(request, attempts = 0) {
    const stackHolder = {};
    Error.captureStackTrace(stackHolder);
    if (stackHolder.stack.startsWith('Error\n'))
        stackHolder.stack = stackHolder.stack.substring(6);
    while (this.limited || __classPrivateFieldGet(this, _SequentialBucket_handler, "f").limited) {
        if (__classPrivateFieldGet(this, _SequentialBucket_handler, "f").limited) {
            const delay = __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalReset - Date.now();
            if (!__classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalTimeout)
                __classPrivateFieldGet(this, _SequentialBucket_instances, "m", _SequentialBucket_setGlobalTimeout).call(this, delay);
            await __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalTimeout;
            continue;
        }
        const delay = this.reset - Date.now();
        await mutex_1.Mutex.wait(delay);
    }
    if (__classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalReset < Date.now()) {
        __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalReset = Date.now() + 1000;
        __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalBlock = false;
    }
    let res;
    let latency = Date.now();
    try {
        res = await request.send();
        latency = Date.now() - latency;
    }
    catch (error) {
        if (attempts >= __classPrivateFieldGet(this, _SequentialBucket_handler, "f").options.retryLimit) {
            if (error.name === 'AbortError')
                throw new Error(`Request timed out (>${__classPrivateFieldGet(this, _SequentialBucket_handler, "f").options.requestTimeout}ms) on ${request.method} ${request.path}`);
            throw error;
        }
        return __classPrivateFieldGet(this, _SequentialBucket_instances, "m", _SequentialBucket_execute).call(this, request, ++attempts);
    }
    if (__classPrivateFieldGet(this, _SequentialBucket_handler, "f").creator?.listenerCount('rawREST'))
        __classPrivateFieldGet(this, _SequentialBucket_handler, "f").creator.emit('rawREST', {
            auth: request.options.auth ?? false,
            body: request.options.body,
            files: request.options.files,
            latency: latency,
            url: request.url,
            method: request.method,
            request,
            response: res
        });
    const retryAfter = __classPrivateFieldGet(this, _SequentialBucket_instances, "m", _SequentialBucket_handle).call(this, request, res, latency);
    __classPrivateFieldGet(this, _SequentialBucket_handler, "f").creator?.emit('debug', `${request.method} ${request.route} (${this.id}) ${res.status}: ${latency}ms | ${this.remaining}/${this.limit} left | Reset ${this.reset} (${this.reset - Date.now()}ms left)`);
    if (res.status >= 200 && res.status < 300)
        return parseResponse(res);
    if (res.status >= 400 && res.status < 500) {
        const data = await parseResponse(res);
        if (res.status === 429) {
            const delay = data.retry_after ? data.retry_after * 1000 : retryAfter;
            __classPrivateFieldGet(this, _SequentialBucket_handler, "f").creator?.emit('debug', `${parseScope(res.headers.get('x-ratelimit-scope'))} 429. Retrying in ${delay}ms (${this.id})`);
            if (delay)
                await mutex_1.Mutex.wait(delay);
            return __classPrivateFieldGet(this, _SequentialBucket_instances, "m", _SequentialBucket_execute).call(this, request, attempts);
        }
        throw new DiscordRESTError_1.DiscordRESTError(request, res, data, stackHolder.stack);
    }
    if (res.status >= 500 && res.status < 600) {
        if (attempts >= __classPrivateFieldGet(this, _SequentialBucket_handler, "f").options.retryLimit)
            throw new DiscordHTTPError_1.DiscordHTTPError(request, res, stackHolder.stack);
        return __classPrivateFieldGet(this, _SequentialBucket_instances, "m", _SequentialBucket_execute).call(this, request, ++attempts);
    }
    return null;
}, _SequentialBucket_handle = function _SequentialBucket_handle(request, response, latency) {
    const hash = response.headers.get('x-ratelimit-bucket');
    const limit = response.headers.get('x-ratelimit-limit');
    const remaining = response.headers.get('x-ratelimit-remaining');
    const resetAfter = response.headers.get('x-ratelimit-reset-after') || response.headers.get('retry-after');
    const now = Date.now();
    if (hash) {
        if (__classPrivateFieldGet(this, _SequentialBucket_hash, "f") !== hash) {
            __classPrivateFieldGet(this, _SequentialBucket_handler, "f").hashes.set(request.id, {
                value: hash,
                lastAccess: now
            });
            __classPrivateFieldGet(this, _SequentialBucket_handler, "f").creator?.emit('debug', `Updated bucket hash (${__classPrivateFieldGet(this, _SequentialBucket_hash, "f")}) to ${hash}`);
        }
        else {
            const hashData = __classPrivateFieldGet(this, _SequentialBucket_handler, "f").hashes.get(request.id);
            if (hashData)
                hashData.lastAccess = now;
        }
    }
    if (limit)
        this.limit = +limit;
    this.remaining = remaining ? +remaining : 1;
    let retryAfter = 0;
    if (resetAfter)
        retryAfter = +resetAfter * 1000 + __classPrivateFieldGet(this, _SequentialBucket_handler, "f").options.ratelimiterOffset;
    if (retryAfter > 0) {
        if (response.headers.get('x-ratelimit-global')) {
            __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalReset = now + retryAfter;
            __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalBlock = true;
        }
        else
            this.reset = now + retryAfter;
        return retryAfter;
    }
    const serverDate = response.headers.has('date') ? Date.parse(response.headers.get('date')) : now;
    const offset = now - serverDate + latency;
    this.reset =
        Math.max(+(response.headers.get('x-ratelimit-reset') || 0) * 1000 + offset, now) +
            __classPrivateFieldGet(this, _SequentialBucket_handler, "f").options.ratelimiterOffset;
}, _SequentialBucket_setGlobalTimeout = function _SequentialBucket_setGlobalTimeout(delay) {
    __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalTimeout = mutex_1.Mutex.wait(delay).then(() => {
        __classPrivateFieldGet(this, _SequentialBucket_handler, "f").globalTimeout = undefined;
    });
};
