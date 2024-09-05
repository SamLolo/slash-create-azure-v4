"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInteractionContext = void 0;
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const message_1 = require("../message");
const baseInteraction_1 = require("./baseInteraction");
/** Represents a interaction context that handles messages. */
class MessageInteractionContext extends baseInteraction_1.BaseInteractionContext {
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data.
     * @param respond The response function for the interaction.
     * @param serverContext The context of the server.
     */
    constructor(creator, data, respond, serverContext) {
        super(creator, data, serverContext);
        /** Whether the initial response was sent. */
        this.initiallyResponded = false;
        /** Whether there is a deferred message available. */
        this.deferred = false;
        this._respond = respond;
    }
    /**
     * Fetches a message.
     * @param messageID The ID of the message, defaults to the original message
     */
    async fetch(messageID = '@original') {
        const data = await this.creator.api.fetchInteractionMessage(this.creator.options.applicationID, this.interactionToken, messageID);
        if (messageID === '@original')
            this.messageID = data.id;
        return new message_1.Message(data, this.creator, this);
    }
    /**
     * Sends a message, if it already made an initial response, this will create a follow-up message.
     * IF the context has created a deferred message, it will edit that deferred message,
     * and future calls to this function create follow ups.
     * This will return a boolean if it's an initial response, otherwise a {@link Message} will be returned.
     * Note that when making a follow-up message, the `ephemeral` option is ignored.
     * @param content The content of the message
     */
    async send(content) {
        if (this.expired)
            throw new Error('This interaction has expired');
        const options = typeof content === 'string' ? { content } : content;
        if (typeof options !== 'object')
            throw new Error('Message options is not an object.');
        if (!options.content && !options.embeds && !options.files)
            throw new Error('No valid options were given.');
        if (options.ephemeral && !options.flags)
            options.flags = constants_1.InteractionResponseFlags.EPHEMERAL;
        const allowedMentions = options.allowedMentions
            ? (0, util_1.formatAllowedMentions)(options.allowedMentions, this.creator.allowedMentions)
            : this.creator.allowedMentions;
        if (!this.initiallyResponded) {
            this.initiallyResponded = true;
            clearTimeout(this._timeout);
            await this._respond({
                status: 200,
                body: {
                    type: constants_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        tts: options.tts,
                        content: options.content,
                        embeds: options.embeds,
                        flags: options.flags,
                        allowed_mentions: allowedMentions,
                        components: options.components,
                        attachments: options.attachments
                    }
                },
                files: options.files
            });
            return true;
        }
        else if (this.initiallyResponded && this.deferred)
            return this.editOriginal(content);
        else
            return this.sendFollowUp(options);
    }
    /**
     * Sends a follow-up message.
     * @param content The content of the message
     */
    async sendFollowUp(content) {
        if (this.expired)
            throw new Error('This interaction has expired');
        const options = typeof content === 'string' ? { content } : content;
        if (typeof options !== 'object')
            throw new Error('Message options is not an object.');
        if (!options.content && !options.embeds && !options.files)
            throw new Error('Message content, embeds or files need to be given.');
        if (options.ephemeral && !options.flags)
            options.flags = constants_1.InteractionResponseFlags.EPHEMERAL;
        const allowedMentions = options.allowedMentions
            ? (0, util_1.formatAllowedMentions)(options.allowedMentions, this.creator.allowedMentions)
            : this.creator.allowedMentions;
        const data = await this.creator.api.followUpMessage(this.creator.options.applicationID, this.interactionToken, {
            tts: options.tts,
            content: options.content,
            embeds: options.embeds,
            allowed_mentions: allowedMentions,
            components: options.components,
            flags: options.flags,
            attachments: options.attachments
        }, options.files);
        return new message_1.Message(data, this.creator, this);
    }
    /**
     * Edits a message.
     * @param messageID The message's ID
     * @param content The content of the message
     */
    async edit(messageID, content) {
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
        const data = await this.creator.api.updateInteractionMessage(this.creator.options.applicationID, this.interactionToken, messageID, {
            content: options.content,
            embeds: options.embeds,
            allowed_mentions: allowedMentions,
            components: options.components,
            attachments: options.attachments
        }, options.files);
        return new message_1.Message(data, this.creator, this);
    }
    /**
     * Edits the original message.
     * Note: This will error with ephemeral messages or deferred ephemeral messages.
     * @param content The content of the message
     * @param options The message options
     */
    async editOriginal(content) {
        this.deferred = false;
        const message = await this.edit('@original', content);
        this.messageID = message.id;
        return message;
    }
    /**
     * Deletes a message. If the message ID was not defined, the original message is used.
     * @param messageID The message's ID
     */
    async delete(messageID) {
        if (this.expired)
            throw new Error('This interaction has expired');
        await this.creator.api.deleteInteractionMessage(this.creator.options.applicationID, this.interactionToken, messageID);
        if (!messageID || messageID === '@original')
            this.messageID = undefined;
    }
    /**
     * Creates a deferred message. To users, this will show as
     * "Bot is thinking..." until the deferred message is edited.
     * @param ephemeral Whether to make the deferred message ephemeral.
     * @returns Whether the deferred message passed
     */
    async defer(ephemeral = false) {
        if (!this.initiallyResponded && !this.deferred) {
            this.initiallyResponded = true;
            this.deferred = true;
            clearTimeout(this._timeout);
            await this._respond({
                status: 200,
                body: {
                    type: constants_1.InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        flags: ephemeral ? constants_1.InteractionResponseFlags.EPHEMERAL : 0
                    }
                }
            });
            return true;
        }
        return false;
    }
    /**
     * Creates a message that prompts the user for a premium subscription.
     * @returns Whether the message passed
     * @deprecated Use `ComponentButtonPremium` instead.
     */
    async promptPremium() {
        if (!this.initiallyResponded && !this.deferred) {
            this.initiallyResponded = true;
            this.deferred = true;
            clearTimeout(this._timeout);
            await this._respond({
                status: 200,
                body: {
                    type: constants_1.InteractionResponseType.PREMIUM_REQUIRED,
                    data: {}
                }
            });
            return true;
        }
        return false;
    }
    /**
     * Launches the activity this app is associated with.
     * @returns Whether the message passed
     */
    async launchActivity() {
        if (!this.initiallyResponded && !this.deferred) {
            this.initiallyResponded = true;
            this.deferred = true;
            clearTimeout(this._timeout);
            await this._respond({
                status: 200,
                body: {
                    type: constants_1.InteractionResponseType.LAUNCH_ACTIVITY,
                    data: {}
                }
            });
            return true;
        }
        return false;
    }
    /**
     * Registers a component callback from the initial message.
     * This unregisters automatically when the context expires.
     * @param custom_id The custom ID of the component to register
     * @param callback The callback to use on interaction
     * @param expiration The expiration time of the callback in milliseconds. Use null for no expiration (Although, in this case, global components might be more consistent).
     * @param onExpired A function to be called when the component expires.
     */
    registerComponent(custom_id, callback, expiration = 1000 * 60 * 15, onExpired) {
        if (!this.initiallyResponded || this.deferred)
            throw new Error('You must send a message before registering components');
        if (!this.messageID)
            throw new Error('Fetch your original message or use deferred messages before registering components');
        this.creator._componentCallbacks.set(`${this.messageID}-${custom_id}`, {
            callback,
            expires: expiration != null ? Date.now() + expiration : undefined,
            onExpired
        });
        if (expiration != null && this.creator.options.componentTimeouts)
            setTimeout(() => {
                if (this.creator._componentCallbacks.has(`${this.messageID}-${custom_id}`)) {
                    if (onExpired)
                        onExpired();
                    this.creator._componentCallbacks.delete(`${this.messageID}-${custom_id}`);
                }
            }, expiration);
    }
    /**
     * Registers a component callback from a message.
     * This unregisters automatically when the context expires.
     * @param message_id The message ID of the component to register
     * @param custom_id The custom ID of the component to register
     * @param callback The callback to use on interaction
     * @param expiration The expiration time of the callback in milliseconds. Use null for no expiration (Although, in this case, global components might be more consistent).
     * @param onExpired A function to be called when the component expires.
     */
    registerComponentFrom(message_id, custom_id, callback, expiration = 1000 * 60 * 15, onExpired) {
        this.creator._componentCallbacks.set(`${message_id}-${custom_id}`, {
            callback,
            expires: expiration != null ? Date.now() + expiration : undefined,
            onExpired
        });
        if (expiration != null && this.creator.options.componentTimeouts)
            setTimeout(() => {
                if (this.creator._componentCallbacks.has(`${message_id}-${custom_id}`)) {
                    if (onExpired)
                        onExpired();
                    this.creator._componentCallbacks.delete(`${message_id}-${custom_id}`);
                }
            }, expiration);
    }
    /**
     * Unregisters a component callback.
     * @param custom_id The custom ID of the component to unregister
     * @param message_id The message ID of the component to unregister, defaults to initial message ID if any
     */
    unregisterComponent(custom_id, message_id) {
        if (!message_id) {
            if (!this.messageID)
                throw new Error('The initial message ID was not provided by the context!');
            else
                message_id = this.messageID;
        }
        return this.creator._componentCallbacks.delete(`${message_id}-${custom_id}`);
    }
    /**
     * Registers a wildcard component callback on a message.
     * This unregisters automatically when the context expires.
     * @param message_id The message ID of the component to register
     * @param callback The callback to use on interaction
     * @param expiration The expiration time of the callback in milliseconds. Use null for no expiration (Although, in this case, global components might be more consistent).
     * @param onExpired A function to be called when the component expires.
     */
    registerWildcardComponent(message_id, callback, expiration = 1000 * 60 * 15, onExpired) {
        if (this.expired)
            throw new Error('This interaction has expired');
        this.creator._componentCallbacks.set(`${message_id}-*`, {
            callback,
            expires: expiration != null ? this.invokedAt + expiration : undefined,
            onExpired
        });
        if (expiration != null && this.creator.options.componentTimeouts)
            setTimeout(() => {
                if (this.creator._componentCallbacks.has(`${message_id}-*`)) {
                    if (onExpired)
                        onExpired();
                    this.creator._componentCallbacks.delete(`${message_id}-*`);
                }
            }, expiration);
    }
    /**
     * Unregisters a component callback.
     * @param message_id The message ID of the component to unregister, defaults to the invoking message ID.
     */
    unregisterWildcardComponent(message_id) {
        return this.creator._componentCallbacks.delete(`${message_id}-*`);
    }
}
exports.MessageInteractionContext = MessageInteractionContext;
