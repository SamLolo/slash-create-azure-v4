"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Creator = exports.SlashCreator = void 0;
const undici_1 = require("undici");
const node_buffer_1 = require("node:buffer");
const node_path_1 = require("node:path");
const creator_1 = require("../creator");
const util_1 = require("../node/util");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
/** The main class for using commands and interactions. */
class SlashCreator extends creator_1.BaseSlashCreator {
    /** @param opts The options for the creator */
    constructor(opts) {
        // eslint-disable-next-line constructor-super
        super(opts, { fetch: undici_1.fetch, FormData: undici_1.FormData, Blob: node_buffer_1.Blob });
    }
    /**
     * Registers all commands in a directory. The files must export a Command class constructor or instance.
     * @param commandsPath The path to the command directory
     * @param extensionsOrFilter An array of custom file extensions (with `.js` and `.cjs` already included) or a function that filters file names
     * @example
     * await creator.registerCommandsIn(require('path').join(__dirname, 'commands'));
     */
    async registerCommandsIn(commandPath, extensionsOrFilter = []) {
        const extensions = ['.js', '.cjs', ...(Array.isArray(extensionsOrFilter) ? extensionsOrFilter : [])];
        const files = await (0, util_1.getFiles)(commandPath);
        const filter = typeof extensionsOrFilter == 'function' ? extensionsOrFilter : (file) => extensions.includes((0, node_path_1.extname)(file));
        const filteredFiles = files.filter(filter);
        const commands = [];
        for (const filePath of filteredFiles) {
            try {
                commands.push(require(filePath));
            }
            catch (e) {
                this.emit('error', new Error(`Failed to load command ${filePath}: ${e}`));
            }
        }
        return this.registerCommands(commands, true);
    }
    /**
     * Validates a payload from Discord against its signature and key.
     */
    async _verify(body, signature, timestamp) {
        try {
            return tweetnacl_1.default.sign.detached.verify(Buffer.from(timestamp + body), Buffer.from(signature, 'hex'), Buffer.from(this.options.publicKey, 'hex'));
        }
        catch {
            return false;
        }
    }
}
exports.SlashCreator = SlashCreator;
exports.Creator = SlashCreator;
