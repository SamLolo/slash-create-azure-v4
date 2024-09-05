import { BaseSlashCreator, FileFilter, SlashCreatorOptions } from '../creator';
/** The main class for using commands and interactions. */
export declare class SlashCreator extends BaseSlashCreator {
    /** @param opts The options for the creator */
    constructor(opts: SlashCreatorOptions);
    /**
     * Registers all commands in a directory. The files must export a Command class constructor or instance.
     * @param commandsPath The path to the command directory
     * @param extensionsOrFilter An array of custom file extensions (with `.js` and `.cjs` already included) or a function that filters file names
     * @example
     * await creator.registerCommandsIn(require('path').join(__dirname, 'commands'));
     */
    registerCommandsIn(commandPath: string, extensionsOrFilter?: string[] | FileFilter): Promise<import("..").SlashCommand<this>[]>;
    /**
     * Validates a payload from Discord against its signature and key.
     */
    protected _verify(body: string, signature: string, timestamp: string): Promise<boolean>;
}
export declare const Creator: typeof SlashCreator;
