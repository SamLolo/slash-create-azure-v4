"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SlashCreator_instances, _SlashCreator_encoder, _SlashCreator_publicKey, _SlashCreator_getPublicKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creator = exports.SlashCreator = void 0;
const creator_1 = require("../creator");
// https://gist.github.com/devsnek/77275f6e3f810a9545440931ed314dc1
function hex2bin(hex) {
    const buf = new Uint8Array(Math.ceil(hex.length / 2));
    for (var i = 0; i < buf.length; i++) {
        buf[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return buf;
}
/**
 * The main class for using commands and interactions for web environments.
 * @hidden
 */
class SlashCreator extends creator_1.BaseSlashCreator {
    constructor(opts) {
        super(opts, { fetch, FormData, Blob });
        _SlashCreator_instances.add(this);
        _SlashCreator_encoder.set(this, new TextEncoder());
        _SlashCreator_publicKey.set(this, void 0);
    }
    async _verify(body, signature, timestamp) {
        return await crypto.subtle.verify('NODE-ED25519', await __classPrivateFieldGet(this, _SlashCreator_instances, "m", _SlashCreator_getPublicKey).call(this), hex2bin(signature), __classPrivateFieldGet(this, _SlashCreator_encoder, "f").encode(timestamp + body));
    }
}
exports.SlashCreator = SlashCreator;
_SlashCreator_encoder = new WeakMap(), _SlashCreator_publicKey = new WeakMap(), _SlashCreator_instances = new WeakSet(), _SlashCreator_getPublicKey = async function _SlashCreator_getPublicKey() {
    if (__classPrivateFieldGet(this, _SlashCreator_publicKey, "f"))
        return __classPrivateFieldGet(this, _SlashCreator_publicKey, "f");
    // @ts-expect-error Node.js needs to know this is a public key
    __classPrivateFieldSet(this, _SlashCreator_publicKey, await crypto.subtle.importKey('raw', hex2bin(this.options.publicKey), { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519', public: true }, true, ['verify']), "f");
    return __classPrivateFieldGet(this, _SlashCreator_publicKey, "f");
};
exports.Creator = SlashCreator;
