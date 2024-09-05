"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedMember = void 0;
const constants_1 = require("../constants");
const user_1 = require("./user");
/** Represents a resolved member object. */
class ResolvedMember {
    /**
     * @param data The data for the member
     * @param userData The data for the member's user
     * @param creator The instantiating creator
     * @param guildID The ID of the guild this member belongs to
     */
    constructor(data, userData, creator, guildID) {
        this._creator = creator;
        if (data.nick)
            this.nick = data.nick;
        this.joinedAt = Date.parse(data.joined_at);
        this.roles = data.roles;
        if (data.premium_since)
            this.premiumSince = Date.parse(data.premium_since);
        if (data.communication_disabled_until)
            this.communicationDisabledUntil = Date.parse(data.communication_disabled_until);
        this.flags = data.flags;
        this.pending = data.pending;
        this.guildID = guildID;
        this.id = userData.id;
        if (data.avatar)
            this.avatar = data.avatar;
        this.user = new user_1.User(userData, creator);
    }
    /** The string that mentions this member. */
    get mention() {
        return `<@!${this.id}>`;
    }
    /** @hidden */
    toString() {
        return `[ResolvedMember ${this.id}]`;
    }
    /** The display name for this member. */
    get displayName() {
        return this.nick || this.user.globalName || this.user.username;
    }
    /** The URL to the member's avatar. */
    get avatarURL() {
        return this.dynamicAvatarURL();
    }
    /**
     * Get the member's avatar with the given format and size.
     * If the member does not have a server avatar, their user avatar is used instead.
     * @param format The format of the avatar
     * @param size The size of the avatar
     */
    dynamicAvatarURL(format, size) {
        if (!this.avatar)
            return this.user.dynamicAvatarURL(format, size);
        if (!format || !constants_1.ImageFormats.includes(format.toLowerCase()))
            format = this.avatar.startsWith('a_') ? 'gif' : this._creator.options.defaultImageFormat;
        if (!size || size < constants_1.ImageSizeBoundaries.MINIMUM || size > constants_1.ImageSizeBoundaries.MAXIMUM)
            size = this._creator.options.defaultImageSize;
        return `${constants_1.CDN_URL}${constants_1.Endpoints.GUILD_MEMBER_AVATAR(this.guildID, this.id, this.avatar)}.${format}?size=${size}`;
    }
}
exports.ResolvedMember = ResolvedMember;
