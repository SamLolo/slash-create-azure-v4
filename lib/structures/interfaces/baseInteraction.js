"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInteractionContext = void 0;
const member_1 = require("../member");
const user_1 = require("../user");
const permissions_1 = require("../permissions");
const collection_1 = require("../../util/collection");
const channel_1 = require("../channel");
const message_1 = require("../message");
const resolvedMember_1 = require("../resolvedMember");
const role_1 = require("../role");
/** Represents a basic interaction context. */
class BaseInteractionContext {
    /**
     * @param creator The instantiating creator.
     * @param data The interaction data.
     * @param serverContext The context of the server.
     */
    constructor(creator, data, serverContext) {
        /** The time when the interaction was created. */
        this.invokedAt = Date.now();
        /** The resolved users of the interaction. */
        this.users = new collection_1.Collection();
        /** The resolved members of the interaction. */
        this.members = new collection_1.Collection();
        /** The resolved roles of the interaction. */
        this.roles = new collection_1.Collection();
        /** The resolved channels of the interaction. */
        this.channels = new collection_1.Collection();
        /** The resolved messages of the interaction. */
        this.messages = new collection_1.Collection();
        /** The resolved attachments of the interaction. */
        this.attachments = new collection_1.Collection();
        this.creator = creator;
        this.serverContext = serverContext;
        this.interactionToken = data.token;
        this.interactionID = data.id;
        this.channelID = data.channel_id;
        this.guildID = 'guild_id' in data ? data.guild_id : undefined;
        this.locale = 'locale' in data ? data.locale : undefined;
        this.guildLocale = 'guild_locale' in data ? data.guild_locale : undefined;
        this.member = 'guild_id' in data ? new member_1.Member(data.member, this.creator, data.guild_id) : undefined;
        this.user = new user_1.User('guild_id' in data ? data.member.user : data.user, this.creator);
        this.channel = new channel_1.Channel(data.channel);
        this.appPermissions = data.app_permissions ? new permissions_1.Permissions(BigInt(data.app_permissions)) : undefined;
        this.entitlements = data.entitlements;
        if ('authorizing_integration_owners' in data)
            this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        if ('context' in data)
            this.context = data.context;
        if (data.data.resolved) {
            if (data.data.resolved.users)
                Object.keys(data.data.resolved.users).forEach((id) => this.users.set(id, new user_1.User(data.data.resolved.users[id], this.creator)));
            if (data.data.resolved.members)
                Object.keys(data.data.resolved.members).forEach((id) => this.members.set(id, new resolvedMember_1.ResolvedMember(data.data.resolved.members[id], data.data.resolved.users[id], this.creator, this.guildID)));
            if (data.data.resolved.roles)
                Object.keys(data.data.resolved.roles).forEach((id) => this.roles.set(id, new role_1.Role(data.data.resolved.roles[id], this.creator)));
            if (data.data.resolved.channels)
                Object.keys(data.data.resolved.channels).forEach((id) => this.channels.set(id, new channel_1.Channel(data.data.resolved.channels[id])));
            if (data.data.resolved.messages)
                Object.keys(data.data.resolved.messages).forEach((id) => this.messages.set(id, new message_1.Message(data.data.resolved.messages[id], this.creator)));
            if (data.data.resolved.attachments)
                Object.keys(data.data.resolved.attachments).forEach((id) => this.attachments.set(id, data.data.resolved.attachments[id]));
        }
    }
    /** Whether the interaction has expired. Interactions last 15 minutes. */
    get expired() {
        return this.invokedAt + 1000 * 60 * 15 < Date.now();
    }
}
exports.BaseInteractionContext = BaseInteractionContext;
