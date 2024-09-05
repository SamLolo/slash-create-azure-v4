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
var _Request_instances, _Request_overrides, _Request_getMajorParameter, _Request_getRoute;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const util_1 = require("../util");
const USER_AGENT = `DiscordBot (https://github.com/Snazzah/slash-create, ${require('../../package.json').version})`;
/**
 * Represents the request.
 */
class Request {
    /**
     * Represents the request.
     * @arg handler Represents the RequestHandler.
     * @arg method An uppercase HTTP method.
     * @arg path The endpoint to make the request to.
     * @arg options Data regarding the request.
     */
    constructor(handler, method, path, options, overrides) {
        _Request_instances.add(this);
        /**
         * The headers to attach to the request.
         * @type {Object}
         */
        this.headers = {
            'Accept-Encoding': 'gzip,deflate',
            'User-Agent': USER_AGENT
        };
        /** Overrides for requests. */
        _Request_overrides.set(this, void 0);
        this.handler = handler;
        this.method = method;
        this.path = path;
        this.options = options;
        __classPrivateFieldSet(this, _Request_overrides, overrides, "f");
        this.url = new URL(handler.options.baseURL + path);
        if (typeof options.query === 'object') {
            for (const key in options.query) {
                if (options.query[key] !== undefined)
                    this.url.searchParams.append(key, options.query[key]);
            }
        }
        if (typeof options.headers === 'object') {
            for (const key in options.headers)
                this.headers[key] = options.headers[key];
        }
        if (options.reason) {
            this.headers['X-Audit-Log-Reason'] = encodeURIComponent(options.reason);
        }
        this.setBody(options.body, options.files);
        this.majorParameter = __classPrivateFieldGet(this, _Request_instances, "m", _Request_getMajorParameter).call(this);
        this.route = __classPrivateFieldGet(this, _Request_instances, "m", _Request_getRoute).call(this);
    }
    /**
     * The identifier of the request.
     * @readonly
     */
    get id() {
        return `${this.method}:${this.route}`;
    }
    /**
     * Sends the request to Discord.
     * @returns The response.
     */
    async send() {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), this.handler.options.requestTimeout);
        return (__classPrivateFieldGet(this, _Request_overrides, "f")?.fetch || fetch)(this.url, {
            body: this.data,
            dispatcher: this.handler.options.agent,
            headers: this.headers,
            method: this.method,
            signal: controller.signal
        });
    }
    /**
     * Attach data to the request.
     * @arg body Optional data to attach to the request.
     * @arg files Optional files to attach to the request.
     */
    setBody(body, files) {
        if (files?.length) {
            const form = new (__classPrivateFieldGet(this, _Request_overrides, "f")?.FormData || FormData)();
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    let file = files[i].file;
                    if ('Buffer' in globalThis && file instanceof Buffer)
                        file = new (__classPrivateFieldGet(this, _Request_overrides, "f")?.Blob || Blob)([file]);
                    form.append(`files[${i}]`, file, files[i].name);
                }
            }
            if (body)
                form.append('payload_json', JSON.stringify(body));
            this.data = form;
        }
        else if (body) {
            this.data = JSON.stringify(body, (k, v) => (typeof v === 'bigint' ? v.toString() : v));
            this.headers['Content-Type'] = 'application/json';
        }
        return this;
    }
}
exports.Request = Request;
_Request_overrides = new WeakMap(), _Request_instances = new WeakSet(), _Request_getMajorParameter = function _Request_getMajorParameter() {
    return /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(this.path)?.[1] ?? 'global';
}, _Request_getRoute = function _Request_getRoute() {
    const route = this.path
        .replace(/\/reactions\/.*/g, '/reactions/:id')
        .replace(/\d{16,19}/g, ':id')
        .replace(/[a-zA-Z0-9]{150,300}/g, ':token');
    let exceptions = '';
    if (this.method === 'DELETE' && route === '/channels/:id/messages/:id') {
        const messageID = this.path.slice(this.path.lastIndexOf('/') + 1);
        const createdAt = (0, util_1.getCreatedAt)(messageID);
        const diff = Date.now() - createdAt;
        if (diff >= 1209600000) {
            exceptions += ';old';
        }
        else if (diff <= 10000) {
            exceptions += ';new';
        }
    }
    return route + exceptions;
};
