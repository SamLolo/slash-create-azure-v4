import { BitField } from '../util/bitfield';
/** Data structure that makes it easy to interact with a {@link User#flags} bitfield. */
export declare class UserFlags extends BitField {
    /** The flags for users. Check the source of this property for available flags. */
    static FLAGS: {
        [perm: string]: number;
    };
}
