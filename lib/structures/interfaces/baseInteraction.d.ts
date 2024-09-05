import { BaseSlashCreator } from '../../creator';
import { Member } from '../member';
import { User } from '../user';
import { Permissions } from '../permissions';
import { AppEntitlement, ApplicationIntegrationType, AttachmentData, InteractionContextType } from '../../constants';
import { Collection } from '../../util/collection';
import { Channel } from '../channel';
import { Message } from '../message';
import { ResolvedMember } from '../resolvedMember';
import { Role } from '../role';
/** Represents a basic interaction context. */
export declare class BaseInteractionContext<ServerContext extends any = unknown> {
    /** The creator of the interaction request. */
    readonly creator: BaseSlashCreator;
    /** Context passed by the server */
    readonly serverContext: ServerContext;
    /** The interaction's token. */
    readonly interactionToken: string;
    /** The interaction's ID. */
    readonly interactionID: string;
    /** The channel ID that the interaction was invoked in. */
    readonly channelID: string;
    /** The guild ID that the interaction was invoked in. */
    readonly guildID?: string;
    /** The user's locale */
    readonly locale?: string;
    /** The guild's perferred locale, if invoked in a guild. */
    readonly guildLocale?: string;
    /** The member that invoked the interaction. */
    readonly member?: Member;
    /** The user that invoked the interaction. */
    readonly user: User;
    /** The channel that interaction was used in. */
    readonly channel: Channel;
    /** The time when the interaction was created. */
    readonly invokedAt: number;
    /** The permissions the application has. */
    readonly appPermissions?: Permissions;
    /** The entitlements the invoking user has. */
    readonly entitlements: AppEntitlement[];
    /**
     * The map of owner IDs that this interaction was authorized for.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object
     */
    readonly authorizingIntegrationOwners?: Record<ApplicationIntegrationType, string>;
    /** The context that this interaction comes from. */
    readonly context?: InteractionContextType;
    /** The resolved users of the interaction. */
    readonly users: Collection<string, User>;
    /** The resolved members of the interaction. */
    readonly members: Collection<string, ResolvedMember>;
    /** The resolved roles of the interaction. */
    readonly roles: Collection<string, Role>;
    /** The resolved channels of the interaction. */
    readonly channels: Collection<string, Channel>;
    /** The resolved messages of the interaction. */
    readonly messages: Collection<string, Message>;
    /** The resolved attachments of the interaction. */
    readonly attachments: Collection<string, AttachmentData>;
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data.
     * @param serverContext The context of the server.
     */
    constructor(creator: BaseSlashCreator, data: any, serverContext: ServerContext);
    /** Whether the interaction has expired. Interactions last 15 minutes. */
    get expired(): boolean;
}
