"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentContext = void 0;
const constants_1 = require("../../constants");
const message_1 = require("../message");
const util_1 = require("../../util");
const modalSendableContext_1 = require("./modalSendableContext");
/** Represents an interaction context from a message component. */
class ComponentContext extends modalSendableContext_1.ModalSendableContext {
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data for the context.
     * @param respond The response function for the interaction.
     * @param useTimeout Whether to use the acknowledgement timeout.
     * @param serverContext The context of the server.
     */
    constructor(creator, data, respond, useTimeout = true, serverContext) {
        super(creator, data, respond, serverContext);
        this.data = data;
        this.customID = data.data.custom_id;
        this.componentType = data.data.component_type;
        this.values = data.data.values || [];
        this.message = new message_1.Message(data.message, creator, this);
        // Auto-acknowledge if no response was given in 2 seconds
        if (useTimeout)
            this._timeout = setTimeout(() => this.acknowledge(), 2000);
    }
    /**
     * Acknowledges the interaction without replying.
     * @returns Whether the acknowledgement passed passed
     */
    async acknowledge() {
        if (!this.initiallyResponded) {
            this.initiallyResponded = true;
            clearTimeout(this._timeout);
            await this._respond({
                status: 200,
                body: {
                    type: constants_1.InteractionResponseType.DEFERRED_UPDATE_MESSAGE
                }
            });
            return true;
        }
        return false;
    }
    /**
     * Edits the message that the component interaction came from.
     * This will return a boolean if it's an initial response, otherwise a {@link Message} will be returned.
     * @param content The content of the message
     */
    async editParent(content) {
        if (this.expired)
            throw new Error('This interaction has expired');
        const options = typeof content === 'string' ? { content } : content;
        if (typeof options !== 'object')
            throw new Error('Message options is not an object.');
        if (!options.content && !options.embeds && !options.components && !options.files && !options.attachments)
            throw new Error('No valid options were given.');
        const allowedMentions = options.allowedMentions
            ? (0, util_1.formatAllowedMentions)(options.allowedMentions, this.creator.allowedMentions)
            : this.creator.allowedMentions;
        if (!this.initiallyResponded) {
            this.initiallyResponded = true;
            clearTimeout(this._timeout);
            await this._respond({
                status: 200,
                body: {
                    type: constants_1.InteractionResponseType.UPDATE_MESSAGE,
                    data: {
                        content: options.content,
                        embeds: options.embeds,
                        allowed_mentions: allowedMentions,
                        components: options.components
                    }
                },
                files: options.files
            });
            return true;
        }
        else
            return this.edit(this.message.id, content);
    }
}
exports.ComponentContext = ComponentContext;
