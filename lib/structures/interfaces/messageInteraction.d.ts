import { ComponentActionRow } from '../../constants';
import { BaseSlashCreator, ComponentRegisterCallback } from '../../creator';
import { RespondFunction } from '../../server';
import { MessageAllowedMentions } from '../../util';
import { Message, MessageEmbedOptions } from '../message';
import { BaseInteractionContext } from './baseInteraction';
/** Represents a interaction context that handles messages. */
export declare class MessageInteractionContext<ServerContext extends any = unknown> extends BaseInteractionContext<ServerContext> {
    /** Whether the initial response was sent. */
    initiallyResponded: boolean;
    /** Whether there is a deferred message available. */
    deferred: boolean;
    /** The original message ID, automatically set when editing/fetching original message. */
    messageID?: string;
    /** @hidden */
    protected _respond: RespondFunction;
    /** @hidden */
    protected _timeout?: any;
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data.
     * @param respond The response function for the interaction.
     * @param serverContext The context of the server.
     */
    constructor(creator: BaseSlashCreator, data: any, respond: RespondFunction, serverContext: ServerContext);
    /**
     * Fetches a message.
     * @param messageID The ID of the message, defaults to the original message
     */
    fetch(messageID?: string): Promise<Message>;
    /**
     * Sends a message, if it already made an initial response, this will create a follow-up message.
     * IF the context has created a deferred message, it will edit that deferred message,
     * and future calls to this function create follow ups.
     * This will return a boolean if it's an initial response, otherwise a {@link Message} will be returned.
     * Note that when making a follow-up message, the `ephemeral` option is ignored.
     * @param content The content of the message
     */
    send(content: string | MessageOptions): Promise<boolean | Message>;
    /**
     * Sends a follow-up message.
     * @param content The content of the message
     */
    sendFollowUp(content: string | MessageOptions): Promise<Message>;
    /**
     * Edits a message.
     * @param messageID The message's ID
     * @param content The content of the message
     */
    edit(messageID: string, content: string | EditMessageOptions): Promise<Message>;
    /**
     * Edits the original message.
     * Note: This will error with ephemeral messages or deferred ephemeral messages.
     * @param content The content of the message
     * @param options The message options
     */
    editOriginal(content: string | EditMessageOptions): Promise<Message>;
    /**
     * Deletes a message. If the message ID was not defined, the original message is used.
     * @param messageID The message's ID
     */
    delete(messageID?: string): Promise<void>;
    /**
     * Creates a deferred message. To users, this will show as
     * "Bot is thinking..." until the deferred message is edited.
     * @param ephemeral Whether to make the deferred message ephemeral.
     * @returns Whether the deferred message passed
     */
    defer(ephemeral?: boolean): Promise<boolean>;
    /**
     * Creates a message that prompts the user for a premium subscription.
     * @returns Whether the message passed
     * @deprecated Use `ComponentButtonPremium` instead.
     */
    promptPremium(): Promise<boolean>;
    /**
     * Launches the activity this app is associated with.
     * @returns Whether the message passed
     */
    launchActivity(): Promise<boolean>;
    /**
     * Registers a component callback from the initial message.
     * This unregisters automatically when the context expires.
     * @param custom_id The custom ID of the component to register
     * @param callback The callback to use on interaction
     * @param expiration The expiration time of the callback in milliseconds. Use null for no expiration (Although, in this case, global components might be more consistent).
     * @param onExpired A function to be called when the component expires.
     */
    registerComponent(custom_id: string, callback: ComponentRegisterCallback, expiration?: number, onExpired?: () => void): void;
    /**
     * Registers a component callback from a message.
     * This unregisters automatically when the context expires.
     * @param message_id The message ID of the component to register
     * @param custom_id The custom ID of the component to register
     * @param callback The callback to use on interaction
     * @param expiration The expiration time of the callback in milliseconds. Use null for no expiration (Although, in this case, global components might be more consistent).
     * @param onExpired A function to be called when the component expires.
     */
    registerComponentFrom(message_id: string, custom_id: string, callback: ComponentRegisterCallback, expiration?: number, onExpired?: () => void): void;
    /**
     * Unregisters a component callback.
     * @param custom_id The custom ID of the component to unregister
     * @param message_id The message ID of the component to unregister, defaults to initial message ID if any
     */
    unregisterComponent(custom_id: string, message_id?: string): boolean;
    /**
     * Registers a wildcard component callback on a message.
     * This unregisters automatically when the context expires.
     * @param message_id The message ID of the component to register
     * @param callback The callback to use on interaction
     * @param expiration The expiration time of the callback in milliseconds. Use null for no expiration (Although, in this case, global components might be more consistent).
     * @param onExpired A function to be called when the component expires.
     */
    registerWildcardComponent(message_id: string, callback: ComponentRegisterCallback, expiration?: number, onExpired?: () => void): void;
    /**
     * Unregisters a component callback.
     * @param message_id The message ID of the component to unregister, defaults to the invoking message ID.
     */
    unregisterWildcardComponent(message_id: string): boolean;
}
/** The options for {@link MessageInteractionContext#edit}. */
export interface EditMessageOptions {
    /** The message content. */
    content?: string;
    /** The embeds of the message. */
    embeds?: MessageEmbedOptions[];
    /** The mentions allowed to be used in this message. */
    allowedMentions?: MessageAllowedMentions;
    /** The attachment(s) to send with the message. */
    files?: MessageFile[];
    /** The components of the message. */
    components?: ComponentActionRow[];
    /** The attachment data of the message. */
    attachments?: MessageAttachmentOptions[];
}
/** A file within {@link EditMessageOptions}. */
export interface MessageFile {
    /** The attachment to send. */
    file: any;
    /** The name of the file. */
    name: string;
}
/** A message attachment describing a file. */
export interface MessageAttachmentOptions {
    /** The name of the attachment. */
    name?: string;
    /** The ID of the attachment. For existing attachments, this must be the ID snowflake of the attachment, otherwise, this will be the index of the files being sent to Discord. */
    id: string | number;
    /** The description of the attachment. */
    description?: string;
}
/** The options for {@link MessageInteractionContext#send} and {@link MessageInteractionContext#sendFollowUp}. */
export interface MessageOptions extends EditMessageOptions {
    /** Whether to use TTS for the content. */
    tts?: boolean;
    /** The flags to use in the message. */
    flags?: number;
    /**
     * Whether or not the message should be ephemeral.
     * Ignored if `flags` is defined.
     */
    ephemeral?: boolean;
}
