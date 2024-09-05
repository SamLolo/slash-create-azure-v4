import { BitField, BitFieldResolvable } from '../util/bitfield';
/**
 * Data structure that makes it easy to interact with a permission bitfield.
 * All {@link Member}s have a set of permissions.
 */
export declare class Permissions extends BitField {
    /** Permission flags. Check the source of this property for available permissions. */
    static FLAGS: {
        [perm: string]: bigint;
    };
    /** @param bits Bit(s) to read from. */
    constructor(bits?: BitFieldResolvable);
}
