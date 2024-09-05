"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.SlashCommand = void 0;
const constants_1 = require("./constants");
const util_1 = require("./util");
const permissions_1 = require("./structures/permissions");
/** Represents a Discord slash command. */
class SlashCommand {
    /**
     * @param creator The instantiating creator.
     * @param opts The options for the command.
     */
    constructor(creator, opts) {
        /**
         * A map of command IDs with its guild ID (or 'global' for global commands), used for syncing command permissions.
         * This will populate when syncing or collecting with {@link SlashCreator#collectCommandIDs}.
         */
        this.ids = new Map();
        /** @private */
        this._throttles = new Map();
        if (this.constructor.name === 'SlashCommand')
            throw new Error('The base SlashCommand cannot be instantiated.');
        this.creator = creator;
        if (!opts.unknown)
            SlashCommand.validateOptions(opts);
        this.type = opts.type || constants_1.ApplicationCommandType.CHAT_INPUT;
        this.commandName = opts.name;
        if (opts.nameLocalizations)
            this.nameLocalizations = opts.nameLocalizations;
        if (opts.description)
            this.description = opts.description;
        if (opts.descriptionLocalizations)
            this.descriptionLocalizations = opts.descriptionLocalizations;
        this.options = opts.options;
        if (opts.guildIDs)
            this.guildIDs = typeof opts.guildIDs == 'string' ? [opts.guildIDs] : opts.guildIDs;
        this.requiredPermissions = opts.requiredPermissions;
        this.forcePermissions = typeof opts.forcePermissions === 'boolean' ? opts.forcePermissions : false;
        this.nsfw = typeof opts.nsfw === 'boolean' ? opts.nsfw : false;
        this.throttling = opts.throttling;
        this.unknown = opts.unknown || false;
        this.deferEphemeral = opts.deferEphemeral || false;
        this.contexts = opts.contexts || [];
        this.integrationTypes = opts.integrationTypes || [constants_1.ApplicationIntegrationType.GUILD_INSTALL];
        this.dmPermission =
            typeof opts.dmPermission === 'boolean'
                ? opts.dmPermission
                : this.contexts.length !== 0
                    ? this.contexts.includes(constants_1.InteractionContextType.BOT_DM)
                    : true;
    }
    /**
     * The command object serialized into JSON.
     * @param global Whether the command is global or not.
     */
    toCommandJSON(global = true) {
        return {
            default_member_permissions: this.requiredPermissions
                ? new permissions_1.Permissions(this.requiredPermissions).valueOf().toString()
                : null,
            type: this.type,
            name: this.commandName,
            name_localizations: this.nameLocalizations || null,
            description: this.description || '',
            description_localizations: this.descriptionLocalizations || null,
            ...(global
                ? {
                    dm_permission: this.dmPermission,
                    contexts: this.contexts.length !== 0 ? this.contexts : null,
                    integration_types: this.integrationTypes
                }
                : {}),
            nsfw: this.nsfw,
            ...(this.type === constants_1.ApplicationCommandType.CHAT_INPUT
                ? {
                    ...(this.options
                        ? {
                            options: this.options.map((o) => ({
                                ...o,
                                name_localizations: o.name_localizations || null,
                                description_localizations: o.description_localizations || null
                            }))
                        }
                        : {})
                }
                : {})
        };
    }
    /**
     * Get a string that mentions the user. Retuens null if the ID is not collected.
     * @param guild The guild to fetch the ID from.
     */
    getMention(guild) {
        const id = this.ids.get(guild || 'global');
        if (!id)
            return null;
        return `</${this.commandName}:${id}>`;
    }
    /**
     * The internal key name for the command.
     * @private
     */
    get keyName() {
        const prefix = this.guildIDs ? this.guildIDs.join(',') : 'global';
        return `${this.type}:${prefix}:${this.commandName}`;
    }
    /** The client passed from the creator */
    get client() {
        return this.creator.client;
    }
    /**
     * Checks whether the context member has permission to use the command.
     * @param ctx The triggering context
     * @return {boolean|string} Whether the member has permission, or an error message to respond with if they don't
     */
    hasPermission(ctx) {
        if (this.requiredPermissions && this.forcePermissions && ctx.member) {
            const missing = ctx.member.permissions.missing(this.requiredPermissions);
            if (missing.length > 0) {
                if (missing.length === 1) {
                    return `The \`${this.commandName}\` command requires you to have the "${constants_1.PermissionNames[missing[0]] || missing[0]}" permission.`;
                }
                return (0, util_1.oneLine) `
          The \`${this.commandName}\` command requires you to have the following permissions:
          ${missing.map((perm) => constants_1.PermissionNames[perm] || perm).join(', ')}
        `;
            }
        }
        return true;
    }
    /**
     * Called when the command is prevented from running.
     * @param ctx Command context the command is running from
     * @param reason Reason that the command was blocked
     * (built-in reasons are `permission`, `throttling`)
     * @param data Additional data associated with the block.
     * - permission: `response` ({@link string}) to send
     * - throttling: `throttle` ({@link Object}), `remaining` ({@link number}) time in seconds
     */
    onBlock(ctx, reason, data) {
        switch (reason) {
            case 'permission': {
                if (data.response)
                    return ctx.send({ content: data.response, ephemeral: true });
                return ctx.send({
                    content: `You do not have permission to use the \`${this.commandName}\` command.`,
                    ephemeral: true
                });
            }
            case 'throttling': {
                return ctx.send({
                    content: `You may not use the \`${this.commandName}\` command again for another ${data.remaining.toFixed(1)} seconds.`,
                    ephemeral: true
                });
            }
            default:
                return null;
        }
    }
    /**
     * Called when the command produces an error while running.
     * @param err Error that was thrown
     * @param ctx Command context the command is running from
     */
    onError(err, ctx) {
        if (!ctx.expired && !ctx.initiallyResponded)
            return ctx.send({ content: 'An error occurred while running the command.', ephemeral: true });
    }
    /**
     * Called when the command's localization is requesting to be updated.
     */
    onLocaleUpdate() { }
    /**
     * Called when the command is being unloaded.
     */
    onUnload() { }
    /**
     * Called in order to throttle command usages before running.
     * @param ctx The context being throttled
     */
    async throttle(ctx) {
        if (!this.throttling)
            return null;
        const userID = ctx.user.id;
        let throttle = this._throttles.get(userID);
        if (!throttle || throttle.start + this.throttling.duration * 1000 - Date.now() < 0) {
            if (throttle)
                clearTimeout(throttle.timeout);
            throttle = {
                start: Date.now(),
                usages: 0,
                timeout: setTimeout(() => this._throttles.delete(userID), this.throttling.duration * 1000)
            };
            this._throttles.set(userID, throttle);
        }
        // Return throttle result if the user has been throttled
        if (throttle.usages + 1 > this.throttling.usages) {
            const retryAfter = (throttle.start + this.throttling.duration * 1000 - Date.now()) / 1000;
            return { retryAfter };
        }
        throttle.usages++;
        return null;
    }
    /** Unloads the command. */
    unload() {
        if (this.filePath && require.cache[this.filePath])
            delete require.cache[this.filePath];
        this.creator.unregisterCommand(this);
    }
    /**
     * Runs the command.
     * @param ctx The context of the interaction
     */
    async run(ctx) {
        throw new Error(`${this.constructor.name} doesn't have a run() method.`);
    }
    /**
     * Runs an autocomplete function.
     * @param ctx The context of the interaction
     */
    async autocomplete(ctx) {
        throw new Error(`${this.constructor.name} doesn't have a autocomplete() method.`);
    }
    /**
     * Finalizes the return output
     * @param response The response from the command
     * @param ctx The context of the interaction
     * @private
     */
    finalize(response, ctx) {
        if (!response && !ctx.initiallyResponded)
            return;
        if (typeof response === 'string' || (response && response.constructor && response.constructor.name === 'Object'))
            return ctx.send(response);
    }
    /**
     * Validates {@link SlashCommandOptions}.
     * @private
     */
    static validateOptions(opts) {
        if (typeof opts.name !== 'string')
            throw new TypeError('Command name must be a string.');
        if (!opts.type || opts.type === constants_1.ApplicationCommandType.CHAT_INPUT) {
            if (opts.name !== opts.name.toLowerCase())
                throw new Error('Command name must be lowercase.');
            if (!/^[\p{L}_\d-]{1,32}$/u.test(opts.name))
                throw new RangeError('Command name must be under 32 characters, matching this regex: /^[\\w-]{1,32}$/');
            if (typeof opts.description !== 'string')
                throw new TypeError('Command description must be a string.');
            if (opts.description.length < 1 || opts.description.length > 100)
                throw new RangeError('Command description must be under 100 characters.');
            if (opts.options) {
                if (!Array.isArray(opts.options))
                    throw new TypeError('Command options must be an array of options.');
                if (opts.options.length > 25)
                    throw new RangeError('Command options cannot exceed 25 options.');
                (0, util_1.validateOptions)(opts.options);
            }
        }
        else {
            if (opts.name.length < 1 || opts.name.length > 32)
                throw new RangeError('Command names must be between 1-32 characters.');
        }
        if (opts.requiredPermissions) {
            if (!Array.isArray(opts.requiredPermissions))
                throw new TypeError('Command required permissions must be an Array of permission key strings.');
            for (const perm of opts.requiredPermissions)
                if (!permissions_1.Permissions.FLAGS[perm])
                    throw new RangeError(`Invalid command required permission: ${perm}`);
        }
        if (opts.throttling) {
            if (typeof opts.throttling !== 'object')
                throw new TypeError('Command throttling must be an Object.');
            if (typeof opts.throttling.usages !== 'number' || isNaN(opts.throttling.usages)) {
                throw new TypeError('Command throttling usages must be a number.');
            }
            if (opts.throttling.usages < 1)
                throw new RangeError('Command throttling usages must be at least 1.');
            if (typeof opts.throttling.duration !== 'number' || isNaN(opts.throttling.duration)) {
                throw new TypeError('Command throttling duration must be a number.');
            }
            if (opts.throttling.duration < 1)
                throw new RangeError('Command throttling duration must be at least 1.');
        }
    }
}
exports.SlashCommand = SlashCommand;
exports.Command = SlashCommand;
