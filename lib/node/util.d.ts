/**
 * Validates a payload from Discord against its signature and key.
 *
 * @param rawBody The raw payload data
 * @param signature The signature from the `X-Signature-Ed25519` header
 * @param timestamp The timestamp from the `X-Signature-Timestamp` header
 * @param clientPublicKey The public key from the Discord developer dashboard
 * @returns Whether or not validation was successful
 */
export declare function verifyKey(body: string, signature: string, timestamp: string, clientPublicKey: string): Promise<boolean>;
export declare function getFiles(folderPath: string): Promise<string[]>;
