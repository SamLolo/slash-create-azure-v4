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
var _RequestHandler_instances, _RequestHandler_token, _RequestHandler_overrides, _RequestHandler_getBucket;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const sequentialBucket_1 = require("./sequentialBucket");
const request_1 = require("./request");
const constants_1 = require("../constants");
/**
 * Represents a class to handle requests.
 */
class RequestHandler {
    /**
     * Represents a class to handle requests.
     * @arg creator The creator that created the handler, if any.
     * @arg options Options for the RequestHandler.
     */
    constructor(creator, options = {}) {
        _RequestHandler_instances.add(this);
        /** A map with SequentialBuckets. */
        this.buckets = new Map();
        /** Whether we are currently globally limited. */
        this.globalBlock = false;
        /** The timestamp of the next reset. */
        this.globalReset = 0;
        /** A map with bucket hash data. */
        this.hashes = new Map();
        /** The authentication token. */
        _RequestHandler_token.set(this, void 0);
        /** Overrides for requests. */
        _RequestHandler_overrides.set(this, void 0);
        this.creator = creator;
        this.options = {
            agent: options.agent,
            baseURL: options.baseURL ?? constants_1.API_BASE_URL,
            ratelimiterOffset: options.ratelimiterOffset ?? 0,
            requestTimeout: options.requestTimeout ?? 15000,
            retryLimit: options.retryLimit ?? 3
        };
        if (options.token)
            __classPrivateFieldSet(this, _RequestHandler_token, options.token, "f");
        if (options.overrides)
            __classPrivateFieldSet(this, _RequestHandler_overrides, options.overrides, "f");
    }
    /**
     * Whether we are currently globally limited.
     * @readonly
     */
    get limited() {
        return this.globalBlock && Date.now() < this.globalReset;
    }
    /**
     * Makes a request to the API.
     * @arg method An uppercase HTTP method.
     * @arg path The endpoint to make the request to.
     * @arg options Data regarding the request.
     * @returns Resolves with the returned JSON data.
     */
    async request(method, path, options = {}) {
        const request = new request_1.Request(this, method, path, options, __classPrivateFieldGet(this, _RequestHandler_overrides, "f"));
        if (options.auth) {
            if (!__classPrivateFieldGet(this, _RequestHandler_token, "f"))
                throw new Error('Missing required token');
            request.headers['Authorization'] = __classPrivateFieldGet(this, _RequestHandler_token, "f");
        }
        const hash = this.hashes.get(request.id)?.value ?? request.id;
        const bucket = __classPrivateFieldGet(this, _RequestHandler_instances, "m", _RequestHandler_getBucket).call(this, hash, request.majorParameter);
        return bucket.add(request);
    }
}
exports.RequestHandler = RequestHandler;
_RequestHandler_token = new WeakMap(), _RequestHandler_overrides = new WeakMap(), _RequestHandler_instances = new WeakSet(), _RequestHandler_getBucket = function _RequestHandler_getBucket(hash, majorParameter) {
    const bucket = this.buckets.get(`${hash}:${majorParameter}`);
    if (bucket)
        return bucket;
    const newBucket = new sequentialBucket_1.SequentialBucket(this, hash, majorParameter);
    this.buckets.set(newBucket.id, newBucket);
    return newBucket;
};
