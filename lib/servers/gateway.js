"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayServer = void 0;
const server_1 = require("../server");
/** A "server" for gateway connections to pipe events into. */
class GatewayServer extends server_1.Server {
    /** @param eventHandler A function that is used to handle the event for gateway interactions. */
    constructor(eventHandler) {
        super({ alreadyListening: true }, false);
        this._eventHandler = eventHandler;
    }
    /** @private */
    handleInteraction(handler) {
        this._eventHandler(handler);
    }
}
exports.GatewayServer = GatewayServer;
