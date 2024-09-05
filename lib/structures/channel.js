"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const permissions_1 = require("./permissions");
/** Represents a resolved channel object. */
class Channel {
    /**
     * @param data The data for the member
     * @param userData The data for the member's user
     * @param creator The instantiating creator
     */
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.lastMessageID = data.last_message_id || null;
        this.flags = data.flags || 0;
        this.name = data.name;
        this.topic = data.topic;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.position = data.position;
        this.parentID = data.parent_id;
        this.nsfw = data.nsfw;
        this.guildID = data.guild_id;
        this._permissions = data.permissions;
        this.rtcRegion = data.rtc_region;
        this.bitrate = data.bitrate;
        this.userLimit = data.user_limit;
        this.threadMetadata = data.thread_metadata;
        this.totalMessageSent = data.total_message_sent;
        this.messageCount = data.message_count;
        this.memberCount = data.member_count;
        this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user;
        this.defaultSortOrder = data.default_sort_order;
        this.defaultReactionEmoji = data.default_reaction_emoji;
        this.defaultForumLayout = data.default_forum_layout;
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.availableTags = data.available_tags;
        this.appliedTags = data.applied_tags;
    }
    /** The string that mentions this channel. */
    get mention() {
        return `<#${this.id}>`;
    }
    /** The computed permissions for the invoking user in the channel, including overwrites, excluding implicit permissions. */
    get permissions() {
        if (!this._permissions)
            return null;
        if (!this._permissionsBitfield)
            this._permissionsBitfield = new permissions_1.Permissions(BigInt(this._permissions));
        return this._permissionsBitfield;
    }
    /** @hidden */
    toString() {
        return `[Channel ${this.id}]`;
    }
}
exports.Channel = Channel;
