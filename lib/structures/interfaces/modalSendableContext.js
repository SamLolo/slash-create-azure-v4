"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalSendableContext = void 0;
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const messageInteraction_1 = require("./messageInteraction");
/** Represents an interaction that can send modals. */
class ModalSendableContext extends messageInteraction_1.MessageInteractionContext {
    constructor(creator, data, respond, serverContext) {
        super(creator, data, respond, serverContext);
    }
    /**
     * Sends a modal to the user.
     * If a callback is not defined, you are required to provide a custom ID in the options.
     * If a callback is defined, a custom ID will be generated if not defined.
     * @param options The message options
     * @param callback The callback of the modal
     * @returns The custom ID of the modal
     */
    async sendModal(options, callback) {
        if (this.expired)
            throw new Error('This interaction has expired');
        if (this.initiallyResponded)
            throw new Error('This interaction has already responded.');
        if (callback) {
            if (!options.custom_id)
                options.custom_id = (0, util_1.generateID)();
            const key = `${this.user.id}-${options.custom_id}`;
            this.creator._modalCallbacks.set(key, {
                callback,
                expires: this.invokedAt + 1000 * 60 * 15
            });
        }
        else if (!callback && !options.custom_id)
            throw new Error('Modal must have a custom_id if no callback is provided');
        this.initiallyResponded = true;
        clearTimeout(this._timeout);
        await this._respond({
            status: 200,
            body: {
                type: constants_1.InteractionResponseType.MODAL,
                data: options
            }
        });
        return options.custom_id;
    }
}
exports.ModalSendableContext = ModalSendableContext;
