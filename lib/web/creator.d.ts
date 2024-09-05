import { BaseSlashCreator, SlashCreatorOptions } from '../creator';
/**
 * The main class for using commands and interactions for web environments.
 * @hidden
 */
export declare class SlashCreator extends BaseSlashCreator {
    #private;
    constructor(opts: SlashCreatorOptions);
    protected _verify(body: string, signature: string, timestamp: string): Promise<boolean>;
}
export declare const Creator: typeof SlashCreator;
