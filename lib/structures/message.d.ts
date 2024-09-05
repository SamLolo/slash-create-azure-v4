import { AnyComponent, ApplicationIntegrationType, InteractionType, UserObject } from '../constants';
import { EditMessageOptions } from './interfaces/messageInteraction';
import { BaseSlashCreator } from '../creator';
import { MessageInteractionContext } from './interfaces/messageInteraction';
import { User } from './user';
/** Represents a Discord message. */
export declare class Message {
    #private;
    /** The message's ID */
    readonly id: string;
    /** The message type */
    readonly type: number;
    /** The content of the message */
    readonly content: string;
    /** The ID of the channel the message is in */
    readonly channelID: string;
    /** The call ossociated with the message */
    readonly call?: MessageCall;
    /** The message's components */
    readonly components: AnyComponent[];
    /** The author of the message */
    readonly author: User;
    /** The message's attachments */
    readonly attachments: MessageAttachment[];
    /** The message's embeds */
    readonly embeds: MessageEmbed[];
    /** The message's user mentions */
    readonly mentions: User[];
    /** The message's role mentions */
    readonly roleMentions: string[];
    /** Whether the message mentioned everyone/here */
    readonly mentionedEveryone: boolean;
    /** Whether the message used TTS */
    readonly tts: boolean;
    /** Whether the message is pinned */
    readonly pinned: boolean;
    /** The timestamp of the message */
    readonly timestamp: number;
    /** The timestamp of when the message was last edited */
    readonly editedTimestamp?: number;
    /** The message's flags */
    readonly flags: number;
    /** The message that this message is referencing */
    readonly messageReference?: MessageReference;
    /** The message's webhook ID */
    readonly webhookID: string;
    /**
     * The interaction this message is apart of
     * @deprecated Discord-imposed deprecation in favor of {@see Message#interactionMetadata}
     */
    readonly interaction?: MessageInteraction;
    /** The metadata of the interaction this message is apart of */
    readonly interactionMetadata?: MessageInteractionMetadata;
    /** The context that created the message class */
    private readonly _ctx?;
    /**
     * @param data The data for the message
     * @param ctx The instantiating context
     */
    constructor(data: MessageData, creator: BaseSlashCreator, ctx?: MessageInteractionContext);
    /**
     * Edits this message.
     * @param content The content of the message
     */
    edit(content: string | EditMessageOptions): Promise<Message>;
    /** Deletes this message. */
    delete(): Promise<void>;
    /** @hidden */
    toString(): string;
}
/** A message-associated call. */
export interface MessageCall {
    /** The participants of the call. */
    participants: string;
    /** The time the call ended. */
    ended_timestamp?: string;
}
/**
 * A message interaction. */
export interface MessageInteraction {
    /** The ID of the interaction. */
    id: string;
    /** The type of interaction. */
    type: InteractionType;
    /** The name of the command. */
    name: string;
    /** The user who invoked the interaction. */
    user: User;
}
/** Th emetadata of a message interaction. */
export interface MessageInteractionMetadata {
    /** The ID of the interaction. */
    id: string;
    /** The type of interaction. */
    type: InteractionType;
    /** The ID of the user who invoked the interaction. */
    userID: string;
    /** The IDs of the installation contexts that are related to the interaction. */
    authorizingIntegrationOwners: Record<ApplicationIntegrationType, string>;
    /** ID of the original response message, only on follow-up messages. */
    originalResponseMessageID?: string;
    /** ID of the message that contained the interactive component that created this interaction. */
    interactedMessageID?: string;
    /** Metadata for the interaction that was used to open the modal, for modal submit interactions. */
    triggeringInteractionMetadata?: MessageInteractionMetadata;
}
/** A message reference. */
export interface MessageReference {
    /** The ID of the channel the reference is from. */
    channelID: string;
    /** The ID of the guild the reference is from. */
    guildID?: string;
    /** The message ID of the reference. */
    messageID?: string;
}
/** A message attachment. */
export interface MessageAttachment {
    /** The ID of the attachment. */
    id: string;
    /** The filename of the attachment. */
    filename: string;
    /** The title of the attachment. */
    title?: number;
    /** The attachment's content type. */
    content_type?: string;
    /** The size of the attachment in bytes. */
    size: number;
    /** The source URL of the attachment. */
    url: string;
    /** The proxied URL of the attachment. */
    proxy_url: string;
    /** The height of the image, if the attachment was an image. */
    height?: number;
    /** The width of the image, if the attachment was an image. */
    width?: number;
    /** Whether this attachment is ephemeral. */
    ephemeral?: boolean;
    /** The duration of the voice message. */
    duration_secs?: number;
    /** Base64 encoded bytearray representing a sampled waveform of the voice message. */
    waveform?: string;
    /** The flags of the attachment. */
    flags?: number;
}
/** Options to creating a message embed. */
export interface MessageEmbedOptions {
    author?: EmbedAuthorOptions;
    color?: number;
    description?: string;
    fields?: EmbedField[];
    footer?: EmbedFooterOptions;
    image?: EmbedImageOptions;
    thumbnail?: EmbedImageOptions;
    timestamp?: Date | string;
    title?: string;
    url?: string;
}
/** A message embed. */
export interface MessageEmbed extends Omit<MessageEmbedOptions, 'footer' | 'image' | 'thumbnail' | 'author'> {
    author?: EmbedAuthor;
    footer?: EmbedFooter;
    image?: EmbedImage;
    provider?: EmbedProvider;
    thumbnail?: EmbedImage;
    type: string;
    video?: EmbedVideo;
}
export interface EmbedAuthor extends EmbedAuthorOptions {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface EmbedAuthorOptions {
    icon_url?: string;
    name: string;
    url?: string;
    proxy_icon_url?: string;
}
export interface EmbedField {
    inline?: boolean;
    name: string;
    value: string;
}
export interface EmbedFooter extends EmbedFooterOptions {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface EmbedFooterOptions {
    icon_url?: string;
    text: string;
}
export interface EmbedImage extends EmbedImageOptions {
    height?: number;
    proxy_url?: string;
    width?: number;
}
export interface EmbedImageOptions {
    url?: string;
}
export interface EmbedProvider {
    name?: string;
    url?: string;
}
export interface EmbedVideo {
    height?: number;
    url?: string;
    proxy_url?: string;
    width?: number;
}
/** @hidden */
export interface MessageData {
    id: string;
    type: number;
    content: string;
    channel_id: string;
    components?: AnyComponent[];
    author: UserObject;
    attachments: MessageAttachment[];
    embeds: MessageEmbed[];
    mentions: UserObject[];
    mention_roles: string[];
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    call?: MessageCall;
    timestamp: string;
    edited_timestamp: string | null;
    flags: number;
    interaction?: {
        id: string;
        type: InteractionType;
        name: string;
        user: UserObject;
    };
    interaction_metadata?: {
        id: string;
        type: InteractionType;
        user_id: string;
        authorizing_integration_owners: Record<ApplicationIntegrationType, string>;
        original_response_message_id?: string;
        interacted_message_id?: string;
        triggering_interaction_metadata?: {
            id: string;
            type: InteractionType;
            user_id: string;
            authorizing_integration_owners: Record<ApplicationIntegrationType, string>;
            original_response_message_id?: string;
            interacted_message_id?: string;
        };
    };
    webhook_id: string;
    message_reference?: {
        channel_id: string;
        guild_id?: string;
        message_id?: string;
    };
}
