import { ChannelType, CommandChannel, ForumDefaultReaction, ForumTag, ThreadMetadata } from '../constants';
import { Permissions } from './permissions';
/** Represents a resolved channel object. */
export declare class Channel {
    /** The channel's type */
    readonly type: ChannelType;
    /** The channel's ID */
    readonly id: string;
    /** The ID of the last message sent in the channel */
    readonly lastMessageID: string | null;
    /** The channel's flags as a bitfield */
    readonly flags: number;
    /** The channel's name (Guild channels only) */
    readonly name?: string;
    /** The ID of the guild the channel is in (Guild channels only) */
    readonly guildID?: string;
    /** The channel's topic (Guild channels only) */
    readonly topic?: string | null;
    /** The amount of seconds the channel's slowmode is set to (Guild channels only) */
    readonly rateLimitPerUser?: number;
    /** The channel's position (Guild channels only) */
    readonly position?: number;
    /** The ID of the channel's parent channel (Guild channels only) */
    readonly parentID?: string | null;
    /** Whether the channel is marked as NSFW (Guild channels only) */
    readonly nsfw?: boolean;
    /** The voice channel's RTC region if set (Voice channels only) */
    readonly rtcRegion?: string | null;
    /** The voice channel's bitrate (Voice channels only) */
    readonly bitrate?: number;
    /** The voice channel's user limit (Voice channels only) */
    readonly userLimit?: number;
    /** The thread metadata (Threads only) */
    readonly threadMetadata?: ThreadMetadata;
    /** The amount of messages ever sent in the thread, not decrementing from deleted messages (Threads only) */
    readonly totalMessageSent?: number;
    /** The amount of messages in the thread, excluding the original message and deleted messages (Threads only)  */
    readonly messageCount?: number;
    /** The approximate count of users in a thread (Threads only) */
    readonly memberCount?: number;
    /** The default rate limit per user for posts (Forum channels only) */
    readonly defaultThreadRateLimitPerUser?: number;
    /** The default sort order of posts (Forum channels only) */
    readonly defaultSortOrder?: number | null;
    /** The default reaction emoji for posts */
    readonly defaultReactionEmoji?: ForumDefaultReaction | null;
    /** The default layout of posts (Forum channels only) */
    readonly defaultForumLayout?: number;
    /** The default auto archive duration of posts (Forum channels only) */
    readonly defaultAutoArchiveDuration?: number;
    /** The available tags that can be used in posts (Forum channels only) */
    readonly availableTags?: ForumTag[];
    /** The applied tags of the thread (Threads inside forums only) */
    readonly appliedTags?: string[];
    private _permissionsBitfield?;
    private _permissions?;
    /**
     * @param data The data for the member
     * @param userData The data for the member's user
     * @param creator The instantiating creator
     */
    constructor(data: CommandChannel);
    /** The string that mentions this channel. */
    get mention(): string;
    /** The computed permissions for the invoking user in the channel, including overwrites, excluding implicit permissions. */
    get permissions(): Permissions | null;
    /** @hidden */
    toString(): string;
}
