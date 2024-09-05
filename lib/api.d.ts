import { ApplicationCommand, BulkUpdateCommand, PartialApplicationCommand } from './constants';
import { BaseSlashCreator } from './creator';
import type { FileContent } from './rest/requestHandler';
import type { MessageData } from './structures/message';
/** The API handler for {@link SlashCreator}. */
export declare class SlashCreatorAPI {
    /** The parent creator. */
    private readonly _creator;
    /** @param creator The instantiating creator. */
    constructor(creator: BaseSlashCreator);
    /**
     * Gets the commands from an applicaton.
     * @param guildID The guild ID to get commands from. If undefined, global commands are fetched.
     * @param withLocalizations Whether to include localizations within the commands.
     */
    getCommands(guildID?: string, withLocalizations?: boolean): Promise<ApplicationCommand[]>;
    /**
     * Creates a command.
     * @param command The command to create.
     * @param guildID The guild ID to put the command on. If undefined, the command is global.
     */
    createCommand(command: PartialApplicationCommand, guildID?: string): Promise<ApplicationCommand>;
    /**
     * Updates a command.
     * @param commandID The command ID to update.
     * @param command The payload to update the command to.
     * @param guildID The guild ID to put the command on. If undefined, the global command is updated.
     */
    updateCommand(commandID: string, command: PartialApplicationCommand, guildID?: string): Promise<ApplicationCommand>;
    /**
     * Updates multiple commands.
     * @param commands The payload to update the commands to.
     * @param guildID The guild ID to put the command on. If undefined, the global command is updated.
     */
    updateCommands(commands: BulkUpdateCommand[], guildID?: string): Promise<ApplicationCommand[]>;
    /**
     * Deletes a command.
     * @param commandID The command ID to delete.
     * @param guildID The guild ID to delete the command. If undefined, the global command is deleted.
     */
    deleteCommand(commandID: string, guildID?: string): Promise<unknown>;
    /**
     * Creates a follow up message.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param body The body to send.
     * @param files The files to send.
     */
    followUpMessage(interactionID: string, interactionToken: string, body: any, files?: FileContent[]): Promise<MessageData>;
    /**
     * Fetches a message from an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param messageID The message ID to fetch.
     */
    fetchInteractionMessage(interactionID: string, interactionToken: string, messageID: string): Promise<MessageData>;
    /**
     * Updates a message from an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param messageID The message ID to update.
     * @param body The body to send.
     * @param files The files to send.
     */
    updateInteractionMessage(interactionID: string, interactionToken: string, messageID: string, body: any, files?: FileContent[]): Promise<MessageData>;
    /**
     * Deletes a message from an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param messageID The message ID to delete.
     */
    deleteInteractionMessage(interactionID: string, interactionToken: string, messageID?: string): Promise<void>;
    /**
     * Responds to an interaction.
     * @param interactionID The interaction's ID.
     * @param interactionToken The interaction's token.
     * @param body The body to send.
     * @param files The files to send.
     */
    interactionCallback(interactionID: string, interactionToken: string, body: any, files?: FileContent[]): Promise<unknown>;
}
export declare const API: typeof SlashCreatorAPI;
