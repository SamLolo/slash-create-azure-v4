import { ApplicationCommandOption } from './constants';
export declare function formatAllowedMentions(allowed: MessageAllowedMentions | FormattedAllowedMentions, defaultMentions?: FormattedAllowedMentions): FormattedAllowedMentions;
export declare function oneLine(strings: string | TemplateStringsArray, ..._: any[]): string;
export declare function validateOptions(options: ApplicationCommandOption[], prefix?: string): void;
export declare function generateID(): string;
/**
 * Calculates the timestamp in milliseconds associated with a Discord ID/snowflake
 * @param id The ID of a structure
 */
export declare function getCreatedAt(id: string): number;
/**
 * Gets the number of milliseconds since epoch represented by an ID/snowflake
 * @param id The ID of a structure
 */
export declare function getDiscordEpoch(id: string): number;
/** The allowed mentions for a {@link Message}. */
export interface MessageAllowedMentions {
    everyone: boolean;
    roles?: boolean | string[];
    users?: boolean | string[];
}
/**
 * The formatted allowed_mentions for Discord.
 * @private
 */
export interface FormattedAllowedMentions {
    parse: ('everyone' | 'roles' | 'users')[];
    roles?: string[];
    users?: string[];
}
