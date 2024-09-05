"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocompleteContext = void 0;
const constants_1 = require("../../constants");
const baseInteraction_1 = require("./baseInteraction");
const commandContext_1 = require("./commandContext");
/** Represents a autocomplete interaction context. */
class AutocompleteContext extends baseInteraction_1.BaseInteractionContext {
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data.
     * @param respond The response function for the interaction.
     * @param serverContext The context of the server.
     */
    constructor(creator, data, respond, serverContext) {
        super(creator, data, serverContext);
        /** Whether the interaction has been responded to. */
        this.responded = false;
        this._respond = respond;
        this.data = data;
        this.options = commandContext_1.CommandContext.convertOptions(data.data.options);
        this.subcommands = commandContext_1.CommandContext.getSubcommandArray(data.data.options);
        this.focused = AutocompleteContext.getFocusedOption(data.data.options);
    }
    /**
     * Sends the results of an autocomplete interaction.
     * @param choices The choices to display
     */
    async sendResults(choices) {
        if (this.responded)
            return false;
        this.responded = true;
        await this._respond({
            status: 200,
            body: {
                type: constants_1.InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
                data: { choices }
            }
        });
        return true;
    }
    /** @private */
    static convertOptions(options) {
        const convertedOptions = {};
        for (const option of options) {
            if ('options' in option)
                convertedOptions[option.name] = option.options ? commandContext_1.CommandContext.convertOptions(option.options) : {};
            else
                convertedOptions[option.name] = 'value' in option && option.value !== undefined ? option.value : {};
        }
        return convertedOptions;
    }
    /** @private */
    static getFocusedOption(options) {
        for (const option of options) {
            if ('focused' in option && option.focused) {
                return option.name;
            }
            if ('options' in option && option.options) {
                const nextResult = AutocompleteContext.getFocusedOption(option.options);
                if (nextResult)
                    return nextResult;
            }
        }
    }
}
exports.AutocompleteContext = AutocompleteContext;
