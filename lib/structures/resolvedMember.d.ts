import { CommandUser, ResolvedMemberData, ImageFormat } from '../constants';
import { BaseSlashCreator } from '../creator';
import { User } from './user';
/** Represents a resolved member object. */
export declare class ResolvedMember {
    /** The member's ID */
    readonly id: string;
    /** The member's nickname */
    readonly nick?: string;
    /** The timestamp the member joined the guild */
    readonly joinedAt: number;
    /** An array of role IDs that the user has. */
    readonly roles: string[];
    /** The time of when this member boosted the server. */
    readonly premiumSince?: number;
    /** The timestamp when the member's timeout will expire */
    readonly communicationDisabledUntil?: number;
    /** The guild member flags represented as a bit set */
    readonly flags?: number;
    /** Whether the member is pending verification */
    readonly pending: boolean;
    /** The member's guild avatar hash */
    readonly avatar?: string;
    /** The user object for this member */
    readonly user: User;
    /** The ID of the guild this member belongs to. */
    readonly guildID: string;
    /** The creator of the member class. */
    private readonly _creator;
    /**
     * @param data The data for the member
     * @param userData The data for the member's user
     * @param creator The instantiating creator
     * @param guildID The ID of the guild this member belongs to
     */
    constructor(data: ResolvedMemberData, userData: CommandUser, creator: BaseSlashCreator, guildID: string);
    /** The string that mentions this member. */
    get mention(): string;
    /** @hidden */
    toString(): string;
    /** The display name for this member. */
    get displayName(): string;
    /** The URL to the member's avatar. */
    get avatarURL(): string;
    /**
     * Get the member's avatar with the given format and size.
     * If the member does not have a server avatar, their user avatar is used instead.
     * @param format The format of the avatar
     * @param size The size of the avatar
     */
    dynamicAvatarURL(format?: ImageFormat, size?: number): string;
}
