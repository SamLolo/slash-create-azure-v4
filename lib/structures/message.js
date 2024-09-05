"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Message_instances, _Message_convertInteractionMetadata;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const user_1 = require("./user");
/** Represents a Discord message. */
class Message {
    /**
     * @param data The data for the message
     * @param ctx The instantiating context
     */
    constructor(data, creator, ctx) {
        _Message_instances.add(this);
        if (ctx)
            this._ctx = ctx;
        this.id = data.id;
        this.type = data.type;
        this.content = data.content;
        this.channelID = data.channel_id;
        this.components = data.components || [];
        this.author = new user_1.User(data.author, creator);
        this.attachments = data.attachments;
        this.embeds = data.embeds;
        this.mentions = data.mentions.map((user) => new user_1.User(user, creator));
        this.roleMentions = data.mention_roles;
        this.mentionedEveryone = data.mention_everyone;
        this.tts = data.tts;
        this.pinned = data.pinned;
        this.call = data.call;
        this.timestamp = Date.parse(data.timestamp);
        if (data.edited_timestamp)
            this.editedTimestamp = Date.parse(data.edited_timestamp);
        this.flags = data.flags;
        if (data.message_reference)
            this.messageReference = {
                channelID: data.message_reference.channel_id,
                guildID: data.message_reference.guild_id,
                messageID: data.message_reference.message_id
            };
        this.webhookID = data.webhook_id;
        if (data.interaction)
            this.interaction = {
                id: data.interaction.id,
                type: data.interaction.type,
                name: data.interaction.name,
                user: new user_1.User(data.interaction.user, creator)
            };
        if (data.interaction_metadata)
            this.interactionMetadata = __classPrivateFieldGet(this, _Message_instances, "m", _Message_convertInteractionMetadata).call(this, data.interaction_metadata);
    }
    /**
     * Edits this message.
     * @param content The content of the message
     */
    edit(content) {
        if (!this._ctx)
            throw new Error('This message was not created from a command context.');
        return this._ctx.edit(this.id, content);
    }
    /** Deletes this message. */
    delete() {
        if (!this._ctx)
            throw new Error('This message was not created from a command context.');
        return this._ctx.delete(this.id);
    }
    /** @hidden */
    toString() {
        return `[Message ${this.id}]`;
    }
}
exports.Message = Message;
_Message_instances = new WeakSet(), _Message_convertInteractionMetadata = function _Message_convertInteractionMetadata(metadata) {
    if (!metadata)
        return undefined;
    return {
        id: metadata.id,
        type: metadata.type,
        userID: metadata.user_id,
        authorizingIntegrationOwners: metadata.authorizing_integration_owners,
        originalResponseMessageID: metadata.original_response_message_id,
        interactedMessageID: metadata.interacted_message_id,
        triggeringInteractionMetadata: __classPrivateFieldGet(this, _Message_instances, "m", _Message_convertInteractionMetadata).call(this, metadata.triggering_interaction_metadata)
    };
};
