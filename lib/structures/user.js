"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const constants_1 = require("../constants");
const userFlags_1 = require("./userFlags");
/** Represents a user on Discord. */
class User {
    /**
     * @param data The data for the user
     * @param creator The instantiating creator
     */
    constructor(data, creator) {
        this._creator = creator;
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.globalName = data.global_name;
        if (data.avatar)
            this.avatar = data.avatar;
        if (data.avatar_decoration_data)
            this.avatarDecorationData = data.avatar_decoration_data;
        this._flags = data.public_flags;
        this.bot = data.bot || false;
    }
    /** The public flags for the user. */
    get flags() {
        if (!this._flagsBitfield)
            this._flagsBitfield = new userFlags_1.UserFlags(this._flags);
        return this._flagsBitfield;
    }
    /** A string that mentions the user. */
    get mention() {
        return `<@${this.id}>`;
    }
    /** @hidden */
    toString() {
        return `[User ${this.id}]`;
    }
    /** The hash for the default avatar of a user if there is no avatar set. */
    get defaultAvatar() {
        if (this.discriminator === '0')
            return Number((BigInt(this.id) >> 22n) % 6n);
        return parseInt(this.discriminator) % 5;
    }
    /** The URL of the user's default avatar. */
    get defaultAvatarURL() {
        return `${constants_1.CDN_URL}${constants_1.Endpoints.DEFAULT_USER_AVATAR(this.defaultAvatar)}.png`;
    }
    /** The URL of the user's avatar. */
    get avatarURL() {
        return this.dynamicAvatarURL();
    }
    /**
     * Get the user's avatar with the given format and size.
     * @param format The format of the avatar
     * @param size The size of the avatar
     */
    dynamicAvatarURL(format, size) {
        if (!this.avatar)
            return this.defaultAvatarURL;
        if (!format || !constants_1.ImageFormats.includes(format.toLowerCase()))
            format = this.avatar.startsWith('a_') ? 'gif' : this._creator.options.defaultImageFormat;
        if (!size || size < constants_1.ImageSizeBoundaries.MINIMUM || size > constants_1.ImageSizeBoundaries.MAXIMUM || size & (size - 1))
            size = this._creator.options.defaultImageSize;
        return `${constants_1.CDN_URL}${constants_1.Endpoints.USER_AVATAR(this.id, this.avatar)}.${format}?size=${size}`;
    }
    /** The URL of the user's avatar decoration. */
    get avatarDecorationURL() {
        if (!this.avatarDecorationData)
            return null;
        return `${constants_1.CDN_URL}${constants_1.Endpoints.USER_AVATAR_DECORATION_PRESET(this.avatarDecorationData.asset)}.png`;
    }
}
exports.User = User;
