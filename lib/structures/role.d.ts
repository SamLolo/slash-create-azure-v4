import { ImageFormat, ResolvedRole, RoleTags } from '../constants';
import { BaseSlashCreator } from '../creator';
import { Permissions } from './permissions';
/** Represents a resolved role object. */
export declare class Role {
    /** The role's ID */
    readonly id: string;
    /** The role's name */
    readonly name: string;
    /** The role's position */
    readonly position: number;
    /** The role's color integer */
    readonly color: number;
    /** Whether the role is being hoisted */
    readonly hoist: boolean;
    /** The role icon hash */
    readonly icon?: string;
    /** Whether the role is being managed by an application */
    readonly managed: boolean;
    /** Whether the role is mentionable by everyone */
    readonly mentionable: boolean;
    /** The role unicode emoji */
    readonly unicodeEmoji?: string;
    /** The role's tags */
    readonly tags?: RoleTags;
    /** The creator of the role class. */
    private _creator;
    private _permissionsBitfield?;
    private _permissions;
    /**
     * @param data The data for the member
     */
    constructor(data: ResolvedRole, creator: BaseSlashCreator);
    /** The URL of the role icon. */
    get iconURL(): string | null;
    /**
     * Get the role's icon with the given format and size.
     * @param format The format of the icon
     * @param size The size of the icon
     */
    dynamicIconURL(format?: ImageFormat, size?: number): string | null;
    /** The string that mentions this role. */
    get mention(): string;
    /** The role's color in hexadecimal, with a leading hashtag */
    get colorHex(): string;
    /** The permissions the member has. */
    get permissions(): Permissions;
    /** @hidden */
    toString(): string;
}
