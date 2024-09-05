"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = exports.PermissionNames = exports.ImageSizeBoundaries = exports.ImageFormats = exports.TextInputStyle = exports.ButtonStyle = exports.ComponentType = exports.EntitlementType = exports.ApplicationIntegrationType = exports.InteractionContextType = exports.ApplicationCommandPermissionType = exports.ChannelType = exports.ApplicationCommandType = exports.CommandOptionType = exports.InteractionResponseFlags = exports.InteractionResponseType = exports.InteractionType = exports.CDN_URL = exports.API_BASE_URL = exports.INTERACTION_VERSION = exports.API_VERSION = exports.VERSION = void 0;
exports.VERSION = require('../package.json').version;
exports.API_VERSION = 10;
exports.INTERACTION_VERSION = 1;
exports.API_BASE_URL = 'https://discord.com/api/v' + exports.API_VERSION;
exports.CDN_URL = 'https://cdn.discordapp.com';
/** The types of interactions. */
var InteractionType;
(function (InteractionType) {
    /** A ping. */
    InteractionType[InteractionType["PING"] = 1] = "PING";
    /** A command invocation. */
    InteractionType[InteractionType["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    /** An invocation of a message component. */
    InteractionType[InteractionType["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    /** An autocomplete invocation of a command. */
    InteractionType[InteractionType["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    /** A modal submission. */
    InteractionType[InteractionType["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionType = exports.InteractionType || (exports.InteractionType = {}));
/** The types of interaction responses. */
var InteractionResponseType;
(function (InteractionResponseType) {
    /** Acknowledge a `PING`. */
    InteractionResponseType[InteractionResponseType["PONG"] = 1] = "PONG";
    // ACKNOWLEDGE = 2,
    // CHANNEL_MESSAGE = 3,
    /** Respond with a message, showing the user's input. */
    InteractionResponseType[InteractionResponseType["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    /** Create a deferred message with source. */
    InteractionResponseType[InteractionResponseType["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    /** Acknowledge the interaction, edit the original message later. */
    InteractionResponseType[InteractionResponseType["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    /** Edits the message the component was attached to. */
    InteractionResponseType[InteractionResponseType["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    /** Responds to an autocomplete interaction request. */
    InteractionResponseType[InteractionResponseType["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    /** Respond to an interaction with a popup modal. */
    InteractionResponseType[InteractionResponseType["MODAL"] = 9] = "MODAL";
    /**
     * Respond to an interaction with prompt for a premium subscription.
     * @deprecated Use `ComponentButtonPremium` instead.
     */
    InteractionResponseType[InteractionResponseType["PREMIUM_REQUIRED"] = 10] = "PREMIUM_REQUIRED";
    /** Launch the activity for this application */
    InteractionResponseType[InteractionResponseType["LAUNCH_ACTIVITY"] = 12] = "LAUNCH_ACTIVITY";
})(InteractionResponseType = exports.InteractionResponseType || (exports.InteractionResponseType = {}));
/** Message flags for interaction responses. */
var InteractionResponseFlags;
(function (InteractionResponseFlags) {
    /** Sends a message back to the invoker, similar to messages by Clyde. */
    InteractionResponseFlags[InteractionResponseFlags["EPHEMERAL"] = 64] = "EPHEMERAL";
})(InteractionResponseFlags = exports.InteractionResponseFlags || (exports.InteractionResponseFlags = {}));
/**
 * An object mapping the types a command option can use.
 */
var CommandOptionType;
(function (CommandOptionType) {
    /** A sub-command for the application's command */
    CommandOptionType[CommandOptionType["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    /** A group of sub-commands */
    CommandOptionType[CommandOptionType["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    /** A string. */
    CommandOptionType[CommandOptionType["STRING"] = 3] = "STRING";
    /** An integer. */
    CommandOptionType[CommandOptionType["INTEGER"] = 4] = "INTEGER";
    /** A boolean. */
    CommandOptionType[CommandOptionType["BOOLEAN"] = 5] = "BOOLEAN";
    /** A user, this would return the user's ID in the interaction. */
    CommandOptionType[CommandOptionType["USER"] = 6] = "USER";
    /** A channel, this would return the channel's ID in the interaction. */
    CommandOptionType[CommandOptionType["CHANNEL"] = 7] = "CHANNEL";
    /** A role, this would return the role's ID in the interaction. */
    CommandOptionType[CommandOptionType["ROLE"] = 8] = "ROLE";
    /** Anything mentionable, returning the ID of the object. */
    CommandOptionType[CommandOptionType["MENTIONABLE"] = 9] = "MENTIONABLE";
    /** A decimal. */
    CommandOptionType[CommandOptionType["NUMBER"] = 10] = "NUMBER";
    /** An attachment. */
    CommandOptionType[CommandOptionType["ATTACHMENT"] = 11] = "ATTACHMENT";
})(CommandOptionType = exports.CommandOptionType || (exports.CommandOptionType = {}));
/** The types of application commands available. */
var ApplicationCommandType;
(function (ApplicationCommandType) {
    /** Slash commands; a text-based command that shows up when a user types `/` */
    ApplicationCommandType[ApplicationCommandType["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    /** A UI-based command that shows up when you right click or tap on a user */
    ApplicationCommandType[ApplicationCommandType["USER"] = 2] = "USER";
    /** A UI-based command that shows up when you right click or tap on a messages */
    ApplicationCommandType[ApplicationCommandType["MESSAGE"] = 3] = "MESSAGE";
})(ApplicationCommandType = exports.ApplicationCommandType || (exports.ApplicationCommandType = {}));
/** The types of channels in Discord channels. */
var ChannelType;
(function (ChannelType) {
    /** A text channel. */
    ChannelType[ChannelType["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    /** A direct message between users. */
    ChannelType[ChannelType["DM"] = 1] = "DM";
    /** A voice channel. */
    ChannelType[ChannelType["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    /** A direct message between multiple users. */
    ChannelType[ChannelType["GROUP_DM"] = 3] = "GROUP_DM";
    /** A channel category containing up to 50 channels. */
    ChannelType[ChannelType["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    /** A channel that users can follow and crosspost into their own server. */
    ChannelType[ChannelType["GUILD_NEWS"] = 5] = "GUILD_NEWS";
    /** A channel in which game developers can sell their game. */
    ChannelType[ChannelType["GUILD_STORE"] = 6] = "GUILD_STORE";
    /** A temporary sub-channel within a `GUILD_NEWS` channel. */
    ChannelType[ChannelType["GUILD_NEWS_THREAD"] = 10] = "GUILD_NEWS_THREAD";
    /** A temporary sub-channel within a `GUILD_TEXT` channel. */
    ChannelType[ChannelType["GUILD_PUBLIC_THREAD"] = 11] = "GUILD_PUBLIC_THREAD";
    /** A temporary sub-channel within a `GUILD_TEXT` channel. */
    ChannelType[ChannelType["GUILD_PRIVATE_THREAD"] = 12] = "GUILD_PRIVATE_THREAD";
    /** A voice channel for hosting events with an audience. */
    ChannelType[ChannelType["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    /** The channel in a hub containing the listed servers. */
    ChannelType[ChannelType["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    /** A channel that can only contain threads. */
    ChannelType[ChannelType["GUILD_FORUM"] = 15] = "GUILD_FORUM";
})(ChannelType = exports.ChannelType || (exports.ChannelType = {}));
/** The type of thing to apply the permission to. */
var ApplicationCommandPermissionType;
(function (ApplicationCommandPermissionType) {
    /** A Discord role. */
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["ROLE"] = 1] = "ROLE";
    /** A Discord user. */
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["USER"] = 2] = "USER";
    /** A Discord channel. */
    ApplicationCommandPermissionType[ApplicationCommandPermissionType["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionType = exports.ApplicationCommandPermissionType || (exports.ApplicationCommandPermissionType = {}));
/** The type of context an interaction can apply to. */
var InteractionContextType;
(function (InteractionContextType) {
    /** Interaction can be used within servers */
    InteractionContextType[InteractionContextType["GUILD"] = 0] = "GUILD";
    /** Interaction can be used within DMs with the app's bot user */
    InteractionContextType[InteractionContextType["BOT_DM"] = 1] = "BOT_DM";
    /**	Interaction can be used within Group DMs and DMs other than the app's bot user */
    InteractionContextType[InteractionContextType["PRIVATE_CHANNEL"] = 2] = "PRIVATE_CHANNEL";
})(InteractionContextType = exports.InteractionContextType || (exports.InteractionContextType = {}));
/** The type of context an app can install to. */
var ApplicationIntegrationType;
(function (ApplicationIntegrationType) {
    /** App is installable to guilds. */
    ApplicationIntegrationType[ApplicationIntegrationType["GUILD_INSTALL"] = 0] = "GUILD_INSTALL";
    /** App is installable to users. */
    ApplicationIntegrationType[ApplicationIntegrationType["USER_INSTALL"] = 1] = "USER_INSTALL";
})(ApplicationIntegrationType = exports.ApplicationIntegrationType || (exports.ApplicationIntegrationType = {}));
var EntitlementType;
(function (EntitlementType) {
    EntitlementType[EntitlementType["APPLICATION_SUBSCRIPTION"] = 8] = "APPLICATION_SUBSCRIPTION";
})(EntitlementType = exports.EntitlementType || (exports.EntitlementType = {}));
/** The types of components available. */
var ComponentType;
(function (ComponentType) {
    /** A row of components. */
    ComponentType[ComponentType["ACTION_ROW"] = 1] = "ACTION_ROW";
    /** A button component. */
    ComponentType[ComponentType["BUTTON"] = 2] = "BUTTON";
    /** A string select component. */
    ComponentType[ComponentType["STRING_SELECT"] = 3] = "STRING_SELECT";
    /** A text input. */
    ComponentType[ComponentType["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    /** A user select component. */
    ComponentType[ComponentType["USER_SELECT"] = 5] = "USER_SELECT";
    /** A role select component. */
    ComponentType[ComponentType["ROLE_SELECT"] = 6] = "ROLE_SELECT";
    /** A user/role select component. */
    ComponentType[ComponentType["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
    /** A channel select component. */
    ComponentType[ComponentType["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
/** The types of component button styles. */
var ButtonStyle;
(function (ButtonStyle) {
    /** A primary-colored button. */
    ButtonStyle[ButtonStyle["PRIMARY"] = 1] = "PRIMARY";
    /** A gray, secondary button. */
    ButtonStyle[ButtonStyle["SECONDARY"] = 2] = "SECONDARY";
    /** A green button. */
    ButtonStyle[ButtonStyle["SUCCESS"] = 3] = "SUCCESS";
    /** A red button. */
    ButtonStyle[ButtonStyle["DESTRUCTIVE"] = 4] = "DESTRUCTIVE";
    /** A red button. */
    ButtonStyle[ButtonStyle["DANGER"] = 4] = "DANGER";
    /** A gray button with a link icon. */
    ButtonStyle[ButtonStyle["LINK"] = 5] = "LINK";
    /** A premium button. */
    ButtonStyle[ButtonStyle["PREMIUM"] = 6] = "PREMIUM";
})(ButtonStyle = exports.ButtonStyle || (exports.ButtonStyle = {}));
var TextInputStyle;
(function (TextInputStyle) {
    /** A single-line input */
    TextInputStyle[TextInputStyle["SHORT"] = 1] = "SHORT";
    /** A multi-line input */
    TextInputStyle[TextInputStyle["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyle = exports.TextInputStyle || (exports.TextInputStyle = {}));
exports.ImageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
exports.ImageSizeBoundaries = {
    MINIMUM: 16,
    MAXIMUM: 4096
};
exports.PermissionNames = {
    CREATE_INSTANT_INVITE: 'Create instant invite',
    KICK_MEMBERS: 'Kick members',
    BAN_MEMBERS: 'Ban members',
    ADMINISTRATOR: 'Administrator',
    MANAGE_CHANNELS: 'Manage channels',
    MANAGE_GUILD: 'Manage server',
    ADD_REACTIONS: 'Add reactions',
    VIEW_AUDIT_LOG: 'View audit log',
    PRIORITY_SPEAKER: 'Priority speaker',
    STREAM: 'Video',
    VIEW_CHANNEL: 'Read messages and view channels',
    SEND_MESSAGES: 'Send messages',
    SEND_TTS_MESSAGES: 'Send TTS messages',
    MANAGE_MESSAGES: 'Manage messages',
    EMBED_LINKS: 'Embed links',
    ATTACH_FILES: 'Attach files',
    READ_MESSAGE_HISTORY: 'Read message history',
    MENTION_EVERYONE: 'Mention everyone',
    USE_EXTERNAL_EMOJIS: 'Use external emojis',
    VIEW_GUILD_INSIGHTS: 'View server insights',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute members',
    DEAFEN_MEMBERS: 'Deafen members',
    MOVE_MEMBERS: 'Move members',
    USE_VAD: 'Use voice activity',
    CHANGE_NICKNAME: 'Change nickname',
    MANAGE_NICKNAMES: 'Manage nicknames',
    MANAGE_ROLES: 'Manage roles',
    MANAGE_WEBHOOKS: 'Manage webhooks',
    MANAGE_EMOJIS_AND_STICKERS: 'Manage expressions',
    MANAGE_GUILD_EXPRESSIONS: 'Manage expressions',
    USE_APPLICATION_COMMANDS: 'Use application commands',
    REQUEST_TO_SPEAK: 'Request to speak',
    MANAGE_EVENTS: 'Manage events',
    MANAGE_THREADS: 'Manage threads',
    USE_PUBLIC_THREADS: 'Create public threads',
    CREATE_PUBLIC_THREADS: 'Create public threads',
    USE_PRIVATE_THREADS: 'Create private threads',
    CREATE_PRIVATE_THREADS: 'Create private threads',
    USE_EXTERNAL_STICKERS: 'Use external stickers',
    SEND_MESSAGES_IN_THREADS: 'Send messages in threads',
    USE_EMBEDDED_ACTIVITIES: 'Use embedded activities',
    MODERATE_MEMBERS: 'Moderate members',
    VIEW_CREATOR_MONETIZATION_ANALYTICS: 'View creator monetization insights',
    USE_SOUNDBOARD: 'Use soundboard',
    USE_EXTERNAL_SOUNDS: 'Use external sounds',
    SEND_VOICE_MESSAGES: 'Send voice messages',
    SEND_POLLS: 'Create polls',
    USE_EXTERNAL_APPS: 'Use external apps'
};
exports.Endpoints = {
    // Commands
    COMMANDS: (applicationID) => `/applications/${applicationID}/commands`,
    GUILD_COMMANDS: (applicationID, guildID) => `/applications/${applicationID}/guilds/${guildID}/commands`,
    COMMAND: (applicationID, commandID) => `/applications/${applicationID}/commands/${commandID}`,
    GUILD_COMMAND: (applicationID, guildID, commandID) => `/applications/${applicationID}/guilds/${guildID}/commands/${commandID}`,
    // Command Permissions
    GUILD_COMMAND_PERMISSIONS: (applicationID, guildID) => `/applications/${applicationID}/guilds/${guildID}/commands/permissions`,
    COMMAND_PERMISSIONS: (applicationID, guildID, commandID) => `/applications/${applicationID}/guilds/${guildID}/commands/${commandID}/permissions`,
    // Interactions
    INTERACTION_CALLBACK: (interactionID, interactionToken) => `/interactions/${interactionID}/${interactionToken}/callback`,
    MESSAGE: (applicationID, interactionToken, messageID = '@original') => `/webhooks/${applicationID}/${interactionToken}/messages/${messageID}`,
    FOLLOWUP_MESSAGE: (applicationID, interactionToken) => `/webhooks/${applicationID}/${interactionToken}`,
    // CDN
    DEFAULT_USER_AVATAR: (userDiscriminator) => `/embed/avatars/${userDiscriminator}`,
    USER_AVATAR: (userID, userAvatar) => `/avatars/${userID}/${userAvatar}`,
    USER_AVATAR_DECORATION: (userID, userDecoration) => `/avatar-decorations/${userID}/${userDecoration}`,
    USER_AVATAR_DECORATION_PRESET: (userDecoration) => `/avatar-decoration-presets/${userDecoration}`,
    ROLE_ICON: (roleID, roleIcon) => `/role-icons/${roleID}/${roleIcon}`,
    GUILD_MEMBER_AVATAR: (guildID, memberID, memberAvatar) => `/guilds/${guildID}/users/${memberID}/avatars/${memberAvatar}`
};
