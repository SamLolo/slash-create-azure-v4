import { RespondFunction } from '../../server';
import { BaseSlashCreator } from '../../creator';
import { AnyCommandOption, ApplicationCommandType, InteractionRequestData } from '../../constants';
import { ModalSendableContext } from './modalSendableContext';
/** Context representing a command interaction. */
export declare class CommandContext<ServerContext extends any = unknown> extends ModalSendableContext<ServerContext> {
    /** The full interaction data. */
    readonly data: InteractionRequestData;
    /** The command's type. */
    readonly commandType: ApplicationCommandType;
    /** The command's name. */
    readonly commandName: string;
    /** The command's ID. */
    readonly commandID: string;
    /** The ID of the target user/message. */
    readonly targetID?: string;
    /** The options given to the command. */
    readonly options: {
        [key: string]: any;
    };
    /** The subcommands the member used in order. */
    readonly subcommands: string[];
    /** Whether the context is from a webserver. */
    private webserverMode;
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data for the context.
     * @param respond The response function for the interaction.
     * @param webserverMode Whether the interaction was from a webserver.
     * @param deferEphemeral Whether the context should auto-defer ephemeral messages.
     * @param useTimeout Whether to use the deferral timeout.
     */
    constructor(creator: BaseSlashCreator, data: InteractionRequestData, respond: RespondFunction, webserverMode: boolean, deferEphemeral: boolean | undefined, useTimeout: boolean | undefined, serverContext: ServerContext);
    /**
     * The target message of the interaction.
     * Will be `null` if it's not from a message command.
     */
    get targetMessage(): import("../message").Message | null | undefined;
    /**
     * The target user of the interaction.
     * Will be `null` if it's not from a user command.
     */
    get targetUser(): import("../user").User | null | undefined;
    /**
     * The target member of the interaction.
     * Will be `null` if it's not from a user command.
     */
    get targetMember(): import("../resolvedMember").ResolvedMember | null | undefined;
    /** @private */
    static convertOptions(options: AnyCommandOption[]): {
        [key: string]: any;
    };
    /** @private */
    static getSubcommandArray(options: AnyCommandOption[]): string[];
}
export declare const Context: typeof CommandContext;
