"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const permissions_1 = require("./permissions");
const resolvedMember_1 = require("./resolvedMember");
/** Represents a Discord guild member. */
class Member extends resolvedMember_1.ResolvedMember {
    /**
     * @param data The data for the member
     * @param creator The instantiating creator
     */
    constructor(data, creator, guildID) {
        super(data, data.user, creator, guildID);
        this.mute = data.mute;
        this.deaf = data.deaf;
        this._permissions = data.permissions;
    }
    /** The permissions the member has. */
    get permissions() {
        if (!this._permissionsBitfield)
            this._permissionsBitfield = new permissions_1.Permissions(BigInt(this._permissions));
        return this._permissionsBitfield;
    }
    /** @hidden */
    toString() {
        return `[Member ${this.id}]`;
    }
}
exports.Member = Member;
