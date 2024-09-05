import { ApplicationCommandOption, ApplicationCommandType, ApplicationIntegrationType, InteractionContextType, PartialApplicationCommand } from './constants';
import { CommandContext } from './structures/interfaces/commandContext';
import { BaseSlashCreator } from './creator';
import { AutocompleteContext } from './structures/interfaces/autocompleteContext';
/** Represents a Discord slash command. */
export declare class SlashCommand<T = any> {
    /** The command's name. */
    readonly commandName: string;
    /** The localiztions for the command name. */
    nameLocalizations?: Record<string, string>;
    /** The type of command this is. */
    readonly type: ApplicationCommandType;
    /** The command's description. */
    readonly description?: string;
    /** The localiztions for the command description. */
    descriptionLocalizations?: Record<string, string>;
    /** The options for the command. */
    options?: ApplicationCommandOption[];
    /** The guild ID(s) for the command. */
    readonly guildIDs?: string[];
    /** The default member permissions required to use the command. */
    readonly requiredPermissions?: string[];
    /** Whether to check the member's permission within command execution, regardless of admin-set command permissions. */
    readonly forcePermissions: boolean;
    /** The throttling options for this command. */
    readonly throttling?: ThrottlingOptions;
    /** Whether this command is used for unknown commands. */
    readonly unknown: boolean;
    /** Whether responses from this command should defer ephemeral messages. */
    readonly deferEphemeral: boolean;
    /** Whether this command is age-restricted. */
    readonly nsfw: boolean;
    /**
     * Whether to enable this command in direct messages.
     * @deprecated Use {@link SlashCommand#contexts} instead.
     */
    readonly dmPermission: boolean;
    /** The contexts where this command is available. */
    readonly integrationTypes: ApplicationIntegrationType[];
    /** The contexts where this command can be used. */
    readonly contexts: InteractionContextType[];
    /**
     * The file path of the command.
     * Used for refreshing the require cache.
     * Set this to `__filename` in the constructor to enable cache clearing.
     */
    filePath?: string;
    /**
     * A map of command IDs with its guild ID (or 'global' for global commands), used for syncing command permissions.
     * This will populate when syncing or collecting with {@link SlashCreator#collectCommandIDs}.
     */
    ids: Map<string, string>;
    /** The creator responsible for this command. */
    readonly creator: BaseSlashCreator;
    /** @private */
    private _throttles;
    /**
     * @param creator The instantiating creator.
     * @param opts The options for the command.
     */
    constructor(creator: BaseSlashCreator, opts: SlashCommandOptions);
    /**
     * The command object serialized into JSON.
     * @param global Whether the command is global or not.
     */
    toCommandJSON(global?: boolean): PartialApplicationCommand;
    /**
     * Get a string that mentions the user. Retuens null if the ID is not collected.
     * @param guild The guild to fetch the ID from.
     */
    getMention(guild?: string): string | null;
    /**
     * The internal key name for the command.
     * @private
     */
    get keyName(): string;
    /** The client passed from the creator */
    get client(): T;
    /**
     * Checks whether the context member has permission to use the command.
     * @param ctx The triggering context
     * @return {boolean|string} Whether the member has permission, or an error message to respond with if they don't
     */
    hasPermission(ctx: CommandContext): boolean | string;
    /**
     * Called when the command is prevented from running.
     * @param ctx Command context the command is running from
     * @param reason Reason that the command was blocked
     * (built-in reasons are `permission`, `throttling`)
     * @param data Additional data associated with the block.
     * - permission: `response` ({@link string}) to send
     * - throttling: `throttle` ({@link Object}), `remaining` ({@link number}) time in seconds
     */
    onBlock(ctx: CommandContext, reason: string, data?: any): any;
    /**
     * Called when the command produces an error while running.
     * @param err Error that was thrown
     * @param ctx Command context the command is running from
     */
    onError(err: Error, ctx: CommandContext): any;
    /**
     * Called when the command's localization is requesting to be updated.
     */
    onLocaleUpdate(): any;
    /**
     * Called when the command is being unloaded.
     */
    onUnload(): any;
    /**
     * Called in order to throttle command usages before running.
     * @param ctx The context being throttled
     */
    throttle(ctx: CommandContext): Promise<ThrottleResult | null>;
    /** Unloads the command. */
    unload(): void;
    /**
     * Runs the command.
     * @param ctx The context of the interaction
     */
    run(ctx: CommandContext): Promise<any>;
    /**
     * Runs an autocomplete function.
     * @param ctx The context of the interaction
     */
    autocomplete(ctx: AutocompleteContext): Promise<any>;
    /**
     * Finalizes the return output
     * @param response The response from the command
     * @param ctx The context of the interaction
     * @private
     */
    finalize(response: any, ctx: CommandContext): any;
    /**
     * Validates {@link SlashCommandOptions}.
     * @private
     */
    static validateOptions(opts: SlashCommandOptions): void;
}
export declare const Command: typeof SlashCommand;
/** The options for a {@link SlashCommand}. */
export interface SlashCommandOptions {
    /** The type of command this is. Defaults to chat input, or a regular slash command. */
    type?: ApplicationCommandType;
    /** The name of the command. */
    name: string;
    /** The localiztions for the command name. */
    nameLocalizations?: Record<string, string>;
    /** The description of the command. */
    description?: string;
    /** The localiztions for the command description. */
    descriptionLocalizations?: Record<string, string>;
    /** The guild ID(s) that this command will be assigned to. */
    guildIDs?: string | string[];
    /** The default member permissions required to use the command. Use an empty array to resemble a `false` default permission. */
    requiredPermissions?: string[];
    /** Whether to check the member's permission within command execution, regardless of admin-set command permissions. */
    forcePermissions?: boolean;
    /** The command's options. */
    options?: ApplicationCommandOption[];
    /** The throttling options for the command. */
    throttling?: ThrottlingOptions;
    /** Whether this command is used for unknown commands. */
    unknown?: boolean;
    /** Whether responses from this command should defer ephemeral messages. */
    deferEphemeral?: boolean;
    /**
     * Whether to enable this command in direct messages. `true` by default.
     * @deprecated Use {@link SlashCommandOptions#contexts} instead.
     */
    dmPermission?: boolean;
    /** Whether this command is age-restricted. `false` by default. */
    nsfw?: boolean;
    /** The contexts where this command is available. */
    integrationTypes?: ApplicationIntegrationType[];
    /** The contexts where this command can be used. */
    contexts?: InteractionContextType[];
}
/** The throttling options for a {@link SlashCommand}. */
export interface ThrottlingOptions {
    /** Maximum number of usages of the command allowed in the time frame. */
    usages: number;
    /** Amount of time to count the usages of the command within (in seconds). */
    duration: number;
}
/** @private */
export interface ThrottleObject {
    start: number;
    usages: number;
    timeout: any;
}
/** @private */
export interface ThrottleResult {
    start?: number;
    limit?: number;
    remaining?: number;
    retryAfter: number;
}
