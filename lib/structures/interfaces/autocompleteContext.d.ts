import { AnyCommandOption, CommandAutocompleteRequestData } from '../../constants';
import { BaseSlashCreator } from '../../creator';
import { RespondFunction } from '../../server';
import { BaseInteractionContext } from './baseInteraction';
/** Represents a autocomplete interaction context. */
export declare class AutocompleteContext<ServerContext extends any = unknown> extends BaseInteractionContext<ServerContext> {
    /** The full interaction data. */
    readonly data: CommandAutocompleteRequestData;
    /** The options given to the command. */
    readonly options: {
        [key: string]: any;
    };
    /** The option name that is currently focused.  */
    readonly focused: string;
    /** The subcommands the member used in order. */
    readonly subcommands: string[];
    /** Whether the interaction has been responded to. */
    responded: boolean;
    /** @hidden */
    protected _respond: RespondFunction;
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data.
     * @param respond The response function for the interaction.
     * @param serverContext The context of the server.
     */
    constructor(creator: BaseSlashCreator, data: CommandAutocompleteRequestData, respond: RespondFunction, serverContext: ServerContext);
    /**
     * Sends the results of an autocomplete interaction.
     * @param choices The choices to display
     */
    sendResults(choices: AutocompleteChoice[]): Promise<boolean>;
    /** @private */
    static convertOptions(options: AnyCommandOption[]): {
        [key: string]: any;
    };
    /** @private */
    static getFocusedOption(options: AnyCommandOption[]): string | undefined;
}
export interface AutocompleteChoice {
    /** The name of the choice. */
    name: string;
    /** The localiztions for the choice name. */
    name_localizations?: Record<string, string>;
    /** The value of the choice, using the value type of the option it belongs to. */
    value: string | number;
}
