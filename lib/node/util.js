"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.verifyKey = void 0;
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = require("node:fs/promises");
/**
 * Validates a payload from Discord against its signature and key.
 *
 * @param rawBody The raw payload data
 * @param signature The signature from the `X-Signature-Ed25519` header
 * @param timestamp The timestamp from the `X-Signature-Timestamp` header
 * @param clientPublicKey The public key from the Discord developer dashboard
 * @returns Whether or not validation was successful
 */
async function verifyKey(body, signature, timestamp, clientPublicKey) {
    try {
        return tweetnacl_1.default.sign.detached.verify(Buffer.from(timestamp + body), Buffer.from(signature, 'hex'), Buffer.from(clientPublicKey, 'hex'));
    }
    catch {
        return false;
    }
}
exports.verifyKey = verifyKey;
async function getFiles(folderPath) {
    const fileList = await (0, promises_1.readdir)(folderPath);
    const files = [];
    for (const file of fileList) {
        const filePath = node_path_1.default.join(folderPath, file);
        const stat = await (0, promises_1.lstat)(filePath);
        if (stat.isDirectory())
            files.push(...(await getFiles(filePath)));
        else
            files.push(filePath);
    }
    return files;
}
exports.getFiles = getFiles;
