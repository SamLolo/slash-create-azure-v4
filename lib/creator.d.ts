import { FormattedAllowedMentions, MessageAllowedMentions } from './util';
import { ImageFormat, AnyRequestData, RawRequest, CommandUser, InteractionRequestData, CommandAutocompleteRequestData } from './constants';
import { SlashCommand } from './command';
import { TypedEventEmitter } from './util/typedEmitter';
import { Collection } from './util/collection';
import { SlashCreatorAPI } from './api';
import { Server, TransformedRequest, RespondFunction } from './server';
import { CommandContext } from './structures/interfaces/commandContext';
import { ComponentContext } from './structures/interfaces/componentContext';
import { AutocompleteContext } from './structures/interfaces/autocompleteContext';
import { ModalInteractionContext } from './structures/interfaces/modalInteractionContext';
import { RequestHandler, RESTOptions } from './rest/requestHandler';
import { AzureFunctionServer } from './web';
declare const BaseSlashCreator_base: new () => TypedEventEmitter<SlashCreatorEvents>;
/** The base class for SlashCreators. */
export declare class BaseSlashCreator extends BaseSlashCreator_base {
    /** The options from constructing the creator */
    options: SlashCreatorOptions;
    /** The request handler for the creator */
    readonly requestHandler: RequestHandler;
    /** The API handler for the creator */
    readonly api: SlashCreatorAPI;
    /** The commands loaded onto the creator */
    readonly commands: Collection<string, SlashCommand<any>>;
    /** The server being used in the creator */
    server?: Server | AzureFunctionServer;
    /** The client being passed to this creator */
    client?: any;
    /** The formatted allowed mentions from the options */
    readonly allowedMentions: FormattedAllowedMentions;
    /** The command to run when an unknown command is used. */
    unknownCommand?: SlashCommand;
    /** @hidden */
    _componentCallbacks: Map<string, ComponentCallback>;
    /** @hidden */
    _modalCallbacks: Map<string, ModalCallback>;
    /** @param opts The options for the creator */
    constructor(opts: SlashCreatorOptions, requestHandlerOverrides?: any);
    /**
     * Registers a single command
     * @param command Either a Command instance, or a constructor for one
     * @see SlashCreator#registerCommands
     */
    registerCommand(command: any): SlashCommand<any>;
    /**
     * Registers multiple commands
     * @param commands An array of Command instances or constructors
     * @param ignoreInvalid Whether to skip over invalid objects without throwing an error
     */
    registerCommands(commands: any[], ignoreInvalid?: boolean): SlashCommand<this>[];
    /**
     * Registers all commands in a directory. The files must export a Command class constructor or instance.
     * @param commandsPath The path to the command directory
     * @param extensionsOrFilter An array of custom file extensions (with `.js` and `.cjs` already included) or a function that filters file names
     * @example
     * await creator.registerCommandsIn(require('path').join(__dirname, 'commands'));
     */
    registerCommandsIn(commandPath: string, extensionsOrFilter?: string[] | FileFilter): Promise<SlashCommand[]>;
    /**
     * Unregisters a command.
     * @param command Command to unregister
     */
    unregisterCommand(command: SlashCommand): void;
    /**
     * Attaches a server to the creator.
     * @param server The server to use
     */
    withServer(server: Server): this;
    /** Starts the server, if one was defined. */
    startServer(): Promise<void>;
    /**
     * Sync all commands to Discord. This ensures that commands exist when handling them.
     * <warn>This requires you to have your token set in the creator config.</warn>
     */
    syncCommands(opts?: SyncCommandOptions): Promise<void>;
    /**
     * Sync guild commands.
     * <warn>This requires you to have your token set in the creator config.</warn>
     * @param guildID The guild to sync
     * @param deleteCommands Whether to delete command not found in the creator
     */
    syncCommandsIn(guildID: string, deleteCommands?: boolean): Promise<void>;
    /**
     * Sync global commands.
     * <warn>This requires you to have your token set in the creator config.</warn>
     * @param deleteCommands Whether to delete command not found in the creator
     */
    syncGlobalCommands(deleteCommands?: boolean): Promise<void>;
    /**
     * Updates the command IDs internally in the creator.
     * Use this if you make any changes to commands in the API.
     * @param skipGuildErrors Whether to prevent throwing an error if the API failed to get guild commands
     */
    collectCommandIDs(skipGuildErrors?: boolean): Promise<void>;
    /**
     * Registers a global component callback. Note that this will have no expiration, and should be invoked by the returned name.
     * @param custom_id The custom ID of the component to register
     * @param callback The callback to use on interaction
     */
    registerGlobalComponent(custom_id: string, callback: ComponentRegisterCallback): void;
    /**
     * Unregisters a global component callback.
     * @param custom_id The custom ID of the component to unregister
     */
    unregisterGlobalComponent(custom_id: string): boolean;
    /**
     * Registers a global modal callback. Note that this will have no expiration, and should be invoked by the returned name.
     * @param custom_id The custom ID of the modal to register
     * @param callback The callback to use on interaction
     */
    registerGlobalModal(custom_id: string, callback: ModalRegisterCallback): void;
    /**
     * Unregisters a global modal callback.
     * @param custom_id The custom ID of the component to unregister
     */
    unregisterGlobalModal(custom_id: string): boolean;
    /**
     * Cleans any awaiting component callbacks from command contexts.
     */
    cleanRegisteredComponents(): void;
    protected _getCommandFromInteraction(interaction: InteractionRequestData | CommandAutocompleteRequestData): SlashCommand<any> | undefined;
    protected _verify(body: string, signature: string, timestamp: string): Promise<boolean>;
    protected _onRequest(treq: TransformedRequest, respond: RespondFunction, context?: unknown): Promise<any>;
    protected _onInteraction(interaction: AnyRequestData, respond: RespondFunction | null, webserverMode: boolean, serverContext: unknown): Promise<any>;
    private _runCommand;
    private _createGatewayRespond;
}
/**
 * The events typings for the {@link BaseSlashCreator}.
 * @private
 */
interface SlashCreatorEvents {
    ping: (user?: CommandUser) => void;
    synced: () => void;
    rawREST: (request: RawRequest) => void;
    warn: (warning: Error | string) => void;
    debug: (message: string) => void;
    error: (err: Error) => void;
    unverifiedRequest: (treq: TransformedRequest) => void;
    unknownInteraction: (interaction: any) => void;
    rawInteraction: (interaction: AnyRequestData) => void;
    commandInteraction: (interaction: InteractionRequestData, respond: RespondFunction, webserverMode: boolean) => void;
    componentInteraction: (ctx: ComponentContext) => void;
    modalInteraction: (ctx: ModalInteractionContext) => void;
    autocompleteInteraction: (ctx: AutocompleteContext, command?: SlashCommand) => void;
    commandRegister: (command: SlashCommand) => void;
    commandUnregister: (command: SlashCommand) => void;
    commandReregister: (command: SlashCommand, oldCommand: SlashCommand) => void;
    commandBlock: (command: SlashCommand, ctx: CommandContext, reason: string, data: any) => void;
    commandError: (command: SlashCommand, err: Error, ctx: CommandContext) => void;
    commandRun: (command: SlashCommand, promise: Promise<any>, ctx: CommandContext) => void;
    rawRequest: (treq: TransformedRequest) => void;
}
/** The options for the {@link SlashCreator}. */
export interface SlashCreatorOptions {
    /** Your Application's ID */
    applicationID: string;
    /**
     * The public key for your application.
     * Required for webservers.
     */
    publicKey?: string;
    /**
     * The bot/client token for the application.
     * Recommended to set this in your config.
     */
    token?: string;
    /** The path where the server will listen for interactions. */
    endpointPath?: string;
    /** The port where the server will listen on. */
    serverPort?: number;
    /** The host where the server will listen on. */
    serverHost?: string;
    /**
     * Whether to respond to an unknown command with an ephemeral message.
     * If an unknown command is registered, this is ignored.
     */
    unknownCommandResponse?: boolean;
    /**
     * Whether to hand off command interactions to the `commandInteraction` event
     * rather than handle it automatically.
     */
    handleCommandsManually?: boolean;
    /** Whether to disable automatic defer/acknowledge timeouts. */
    disableTimeouts?: boolean;
    /** Whether to enable automatic component timeouts. */
    componentTimeouts?: boolean;
    /** The default allowed mentions for all messages. */
    allowedMentions?: MessageAllowedMentions;
    /** The default format to provide user avatars in. */
    defaultImageFormat?: ImageFormat;
    /** The default image size to provide user avatars in. */
    defaultImageSize?: number;
    /** The options passed to the request handler. */
    rest?: RESTOptions;
    /** The client to pass to the creator */
    client?: any;
}
/** The options for {@link SlashCreator#syncCommands}. */
interface SyncCommandOptions {
    /** Whether to delete commands that do not exist in the creator. */
    deleteCommands?: boolean;
    /** Whether to sync guild-specific commands. */
    syncGuilds?: boolean;
    /**
     * Whether to skip over guild syncing errors.
     * Guild syncs most likely can error if that guild no longer exists.
     */
    skipGuildErrors?: boolean;
}
/** A component callback from {@see MessageInteractionContext#registerComponent}. */
export declare type ComponentRegisterCallback = (ctx: ComponentContext) => void;
/** A component callback from {@see ModalSendableContext#sendModal}. */
export declare type ModalRegisterCallback = (ctx: ModalInteractionContext) => void;
/** A function to filter files in {@see SlashCreator#registerCommandsIn}. */
export declare type FileFilter = (path: string, index: number, array: string[]) => boolean;
/** @hidden */
interface BaseCallback<T> {
    callback: T;
    expires?: number;
    onExpired?: () => void;
}
/** @hidden */
interface ComponentCallback extends BaseCallback<ComponentRegisterCallback> {
}
/** @hidden */
interface ModalCallback extends BaseCallback<ModalRegisterCallback> {
}
export {};
