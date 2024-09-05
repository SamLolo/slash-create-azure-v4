"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = exports.SlashCreatorAPI = void 0;
const constants_1 = require("./constants");
/** The API handler for {@link SlashCreator}. */
class SlashCreatorAPI {
    /** @param creator The instantiating creator. */
    constructor(creator) {
        this._creator = creator;
    }
    /**
     * Gets the commands from an applicaton.
     * @param guildID The guild ID to get commands from. If undefined, global commands are fetched.
     * @param withLocalizations Whether to include localizations within the commands.
     */
    getCommands(guildID, withLocalizations = false) {
        return this._creator.requestHandler.request('GET', guildID
            ? constants_1.Endpoints.GUILD_COMMANDS(this._creator.options.applicationID, guildID)
            : constants_1.Endpoints.COMMANDS(this._creator.options.applicationID), { auth: true, query: { with_localizations: withLocalizations } });
    }
    /**
     * Creates a command.
     * @param command The command to create.
     * @param guildID The guild ID to put the command on. If undefined, the command is global.
     */
    createCommand(command, guildID) {
        return this._creator.requestHandler.request('POST', guildID
            ? constants_1.Endpoints.GUILD_COMMANDS(this._creator.options.applicationID, guildID)
            : constants_1.Endpoints.COMMANDS(this._creator.options.applicationID), { auth: true, body: command });
    }
    /**
     * Updates a command.
     * @param commandID The command ID to update.
     * @param command The payload to update the command to.
     * @param guildID The guild ID to put the command on. If undefined, the global command is updated.
     */
    updateCommand(commandID, command, guildID) {
        return this._creator.requestHandler.request('PATCH', guildID
            ? constants_1.Endpoints.GUILD_COMMAND(this._creator.options.applicationID, guildID, commandID)
            : constants_1.Endpoints.COMMAND(this._creator.options.applicationID, commandID), { auth: true, body: command });
    }
    /**
     * Updates multiple commands.
     * @param commands The payload to update the commands to.
     * @param guildID The guild ID to put the command on. If undefined, the global command is updated.
     */
    updateCommands(commands, guildID) {
        return this._creator.requestHandler.request('PUT', guildID
            ? constants_1.Endpoints.GUILD_COMMANDS(this._creator.options.applicationID, guildID)
            : constants_1.Endpoints.COMMANDS(this._creator.options.applicationID), { auth: true, body: commands });
    }
    /**
     * Deletes a command.
     * @param commandID The command ID to delete.
     * @param guildID The guild ID to delete the command. If undefined, the global command is deleted.
     */
    deleteCommand(commandID, guildID) {
        return this._creator.requestHandler.request('DELETE', guildID
            ? constants_1.Endpoints.GUILD_COMMAND(this._creator.options.applicationID, guildID, commandID)
            : constants_1.Endpoints.COMMAND(this._creator.options.applicationID, commandID), { auth: true });
    }
    /**
     * Creates a follow up message.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param body The body to send.
     * @param files The files to send.
     */
    followUpMessage(interactionID, interactionToken, body, files) {
        return this._creator.requestHandler.request('POST', constants_1.Endpoints.FOLLOWUP_MESSAGE(interactionID, interactionToken), {
            auth: true,
            body,
            files
        });
    }
    /**
     * Fetches a message from an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param messageID The message ID to fetch.
     */
    fetchInteractionMessage(interactionID, interactionToken, messageID) {
        return this._creator.requestHandler.request('GET', constants_1.Endpoints.MESSAGE(interactionID, interactionToken, messageID), {
            auth: true
        });
    }
    /**
     * Updates a message from an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param messageID The message ID to update.
     * @param body The body to send.
     * @param files The files to send.
     */
    updateInteractionMessage(interactionID, interactionToken, messageID, body, files) {
        return this._creator.requestHandler.request('PATCH', constants_1.Endpoints.MESSAGE(interactionID, interactionToken, messageID), {
            auth: true,
            body,
            files
        });
    }
    /**
     * Deletes a message from an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param messageID The message ID to delete.
     */
    deleteInteractionMessage(interactionID, interactionToken, messageID = '@original') {
        return this._creator.requestHandler.request('DELETE', constants_1.Endpoints.MESSAGE(interactionID, interactionToken, messageID), {
            auth: true
        });
    }
    /**
     * Responds to an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param body The body to send.
     * @param files The files to send.
     */
    interactionCallback(interactionID, interactionToken, body, files) {
        return this._creator.requestHandler.request('POST', constants_1.Endpoints.INTERACTION_CALLBACK(interactionID, interactionToken), { auth: false, body, files });
    }
}
exports.SlashCreatorAPI = SlashCreatorAPI;
exports.API = SlashCreatorAPI;
