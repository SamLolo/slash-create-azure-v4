import { ComponentType, MessageComponentRequestData } from '../../constants';
import { EditMessageOptions } from './messageInteraction';
import { BaseSlashCreator } from '../../creator';
import { RespondFunction } from '../../server';
import { Message } from '../message';
import { ModalSendableContext } from './modalSendableContext';
/** Represents an interaction context from a message component. */
export declare class ComponentContext<ServerContext extends any = unknown> extends ModalSendableContext<ServerContext> {
    /** The request data. */
    readonly data: MessageComponentRequestData;
    /** The ID of the component to identify its origin from. */
    readonly customID: string;
    /** The type of component this interaction came from. */
    readonly componentType: ComponentType;
    /** The the values of the interaction, if the component was a SELECT. */
    readonly values: string[];
    /** The message this interaction came from, will be partial for ephemeral messages. */
    readonly message: Message;
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data for the context.
     * @param respond The response function for the interaction.
     * @param useTimeout Whether to use the acknowledgement timeout.
     * @param serverContext The context of the server.
     */
    constructor(creator: BaseSlashCreator, data: MessageComponentRequestData, respond: RespondFunction, useTimeout: boolean | undefined, serverContext: ServerContext);
    /**
     * Acknowledges the interaction without replying.
     * @returns Whether the acknowledgement passed passed
     */
    acknowledge(): Promise<boolean>;
    /**
     * Edits the message that the component interaction came from.
     * This will return a boolean if it's an initial response, otherwise a {@link Message} will be returned.
     * @param content The content of the message
     */
    editParent(content: string | EditMessageOptions): Promise<boolean | Message>;
}
