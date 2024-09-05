"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mutex_instances, _Mutex_queue, _Mutex_dispatch;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
/**
 * A simple tool to synchronize async operations.
 */
class Mutex {
    constructor() {
        _Mutex_instances.add(this);
        _Mutex_queue.set(this, []);
    }
    /**
     * Whether the mutex instance is locked.
     */
    get locked() {
        return __classPrivateFieldGet(this, _Mutex_queue, "f").length > 0;
    }
    /**
     * Returns a promise that will resolve as soon as the mutex is unlocked.
     * @arg next Whether to insert the promise at the start of the queue.
     */
    acquire(next) {
        const isLocked = this.locked;
        const promise = new Promise((resolve) => {
            if (next)
                return __classPrivateFieldGet(this, _Mutex_queue, "f").unshift(resolve);
            __classPrivateFieldGet(this, _Mutex_queue, "f").push(resolve);
        });
        if (!isLocked)
            __classPrivateFieldGet(this, _Mutex_instances, "m", _Mutex_dispatch).call(this);
        return promise;
    }
    /**
     * Returns a promise that will resolve after `ms` miliseconds.
     * @static
     */
    static wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
exports.Mutex = Mutex;
_Mutex_queue = new WeakMap(), _Mutex_instances = new WeakSet(), _Mutex_dispatch = function _Mutex_dispatch() {
    const resolve = __classPrivateFieldGet(this, _Mutex_queue, "f").shift();
    if (!resolve)
        return;
    let released = false;
    resolve(() => {
        if (released)
            return;
        released = true;
        __classPrivateFieldGet(this, _Mutex_instances, "m", _Mutex_dispatch).call(this);
    });
};
