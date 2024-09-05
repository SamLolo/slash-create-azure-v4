import { ComponentActionRow } from '../../constants';
import { ModalRegisterCallback, BaseSlashCreator } from '../../creator';
import { RespondFunction } from '../../server';
import { MessageInteractionContext } from './messageInteraction';
/** Represents an interaction that can send modals. */
export declare class ModalSendableContext<ServerContext extends any = unknown> extends MessageInteractionContext<ServerContext> {
    constructor(creator: BaseSlashCreator, data: any, respond: RespondFunction, serverContext: ServerContext);
    /**
     * Sends a modal to the user.
     * If a callback is not defined, you are required to provide a custom ID in the options.
     * If a callback is defined, a custom ID will be generated if not defined.
     * @param options The message options
     * @param callback The callback of the modal
     * @returns The custom ID of the modal
     */
    sendModal(options: ModalOptions, callback?: ModalRegisterCallback): Promise<string>;
}
export interface ModalOptions {
    /** The title of the modal */
    title: string;
    /** The custom ID of the modal. If a callback is provided but not a custom ID, one will be generated and returned. */
    custom_id?: string;
    /** The components of the modal. */
    components: ComponentActionRow[];
}
