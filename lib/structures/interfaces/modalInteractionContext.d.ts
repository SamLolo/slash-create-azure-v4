import { ComponentActionRow, ModalSubmitRequestData } from '../../constants';
import { BaseSlashCreator } from '../../creator';
import { RespondFunction } from '../../server';
import { Message } from '../message';
import { EditMessageOptions, MessageInteractionContext } from './messageInteraction';
/** Represents an interaction context from a modal submission. */
export declare class ModalInteractionContext<ServerContext extends any = unknown> extends MessageInteractionContext<ServerContext> {
    /** The request data. */
    readonly data: ModalSubmitRequestData;
    /** The ID of the component to identify its origin from. */
    readonly customID: string;
    /** The message this interaction came from, will be partial for ephemeral messages. */
    readonly message?: Message;
    /** The values defined in the modal submission. */
    readonly values: {
        [key: string]: string;
    };
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data for the context.
     * @param respond The response function for the interaction.
     * @param useTimeout Whether to use the deferral timeout.
     * @param serverContext The context of the server.
     */
    constructor(creator: BaseSlashCreator, data: ModalSubmitRequestData, respond: RespondFunction, useTimeout: boolean | undefined, serverContext: ServerContext);
    static convertComponents(components: ComponentActionRow[]): {
        [key: string]: string;
    };
    /**
     * Acknowledges the interaction without replying.
     * @returns Whether the acknowledgement passed
     */
    acknowledge(): Promise<boolean>;
    editParent(content: string | EditMessageOptions): Promise<boolean | Message>;
}
