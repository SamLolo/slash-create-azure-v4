"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const constants_1 = require("../constants");
const permissions_1 = require("./permissions");
/** Represents a resolved role object. */
class Role {
    /**
     * @param data The data for the member
     */
    constructor(data, creator) {
        this._creator = creator;
        this.id = data.id;
        this.name = data.name;
        this.position = data.position;
        this.color = data.color;
        this.hoist = data.hoist;
        if (data.icon)
            this.icon = data.icon;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        if (data.unicode_emoji)
            this.unicodeEmoji = data.unicode_emoji;
        this._permissions = data.permissions;
        if (data.tags)
            this.tags = data.tags;
    }
    /** The URL of the role icon. */
    get iconURL() {
        return this.dynamicIconURL();
    }
    /**
     * Get the role's icon with the given format and size.
     * @param format The format of the icon
     * @param size The size of the icon
     */
    dynamicIconURL(format, size) {
        if (!this.icon)
            return null;
        if (!format || !constants_1.ImageFormats.includes(format.toLowerCase())) {
            format = this._creator.options.defaultImageFormat;
        }
        if (!size || size < constants_1.ImageSizeBoundaries.MINIMUM || size > constants_1.ImageSizeBoundaries.MAXIMUM) {
            size = this._creator.options.defaultImageSize;
        }
        return `${constants_1.CDN_URL}${constants_1.Endpoints.ROLE_ICON(this.id, this.icon)}.${format}?size=${size}`;
    }
    /** The string that mentions this role. */
    get mention() {
        return `<@&${this.id}>`;
    }
    /** The role's color in hexadecimal, with a leading hashtag */
    get colorHex() {
        return `#${this.color.toString(16).padStart(6, '0')}`;
    }
    /** The permissions the member has. */
    get permissions() {
        if (!this._permissionsBitfield)
            this._permissionsBitfield = new permissions_1.Permissions(BigInt(this._permissions));
        return this._permissionsBitfield;
    }
    /** @hidden */
    toString() {
        return `[Role ${this.id}]`;
    }
}
exports.Role = Role;
