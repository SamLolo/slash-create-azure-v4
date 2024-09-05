/** A map with a subset of extra features from [@discordjs/collection](https://npm.im/@discordjs/collection). */
export declare class Collection<K, V> extends Map<K, V> {
    /**
     * Obtains the first value(s) in this collection.
     * @param amount Amount of values to obtain from the beginning
     * @returns A single value if no amount is provided or an array of values, starting from the end if
     * amount is negative
     */
    first(): V | undefined;
    first(amount: number): V[];
    /**
     * Obtains the last value(s) in this collection.
     * @param amount Amount of values to obtain from the end
     * @returns A single value if no amount is provided or an array of values, starting from the start if
     * amount is negative
     */
    last(): V | undefined;
    last(amount: number): V[];
    /**
     * Obtains unique random value(s) from this collection.
     * @param amount Amount of values to obtain randomly
     * @returns A single value if no amount is provided or an array of values
     */
    random(): V;
    random(amount: number): V[];
    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a Collection instead of an Array.
     * @param fn The function to test with (should return boolean)
     * @param thisArg Value to use as `this` when executing function
     * @example collection.filter(user => user.username === 'Bob');
     */
    filter<K2 extends K>(fn: (value: V, key: K, collection: this) => key is K2): Collection<K2, V>;
    filter<V2 extends V>(fn: (value: V, key: K, collection: this) => value is V2): Collection<K, V2>;
    filter(fn: (value: V, key: K, collection: this) => boolean): Collection<K, V>;
    filter<This, K2 extends K>(fn: (this: This, value: V, key: K, collection: this) => key is K2, thisArg: This): Collection<K2, V>;
    filter<This, V2 extends V>(fn: (this: This, value: V, key: K, collection: this) => value is V2, thisArg: This): Collection<K, V2>;
    filter<This>(fn: (this: This, value: V, key: K, collection: this) => boolean, thisArg: This): Collection<K, V>;
    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * @param fn The function to test with (should return boolean)
     * @param thisArg Value to use as `this` when executing function
     * @example collection.find(user => user.username === 'Bob');
     */
    find<V2 extends V>(fn: (value: V, key: K, collection: this) => value is V2): V2 | undefined;
    find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    find<This, V2 extends V>(fn: (this: This, value: V, key: K, collection: this) => value is V2, thisArg: This): V2 | undefined;
    find<This>(fn: (this: This, value: V, key: K, collection: this) => boolean, thisArg: This): V | undefined;
    /**
     * Maps each item to another value into an array. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param fn Function that produces an element of the new array, taking three arguments
     * @param thisArg Value to use as `this` when executing function
     * @example collection.map(user => user.tag);
     */
    map<T>(fn: (value: V, key: K, collection: this) => T): T[];
    map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
    /**
     * Checks if there exists an item that passes a test. Identical in behavior to
     * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     * @param fn Function used to test (should return a boolean)
     * @param thisArg Value to use as `this` when executing function
     * @example collection.some(user => user.discriminator === '0000');
     */
    some(fn: (value: V, key: K, collection: this) => boolean): boolean;
    some<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): boolean;
    /**
     * Removes items that satisfy the provided filter function.
     * @param fn Function used to test (should return a boolean)
     * @param thisArg Value to use as `this` when executing function
     * @returns The number of removed entries
     */
    sweep(fn: (value: V, key: K, collection: this) => boolean): number;
    sweep<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): number;
    /**
     * Checks if all items passes a test. Identical in behavior to
     * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
     * @param fn Function used to test (should return a boolean)
     * @param thisArg Value to use as `this` when executing function
     * @example collection.every(user => !user.bot);
     */
    every<K2 extends K>(fn: (value: V, key: K, collection: this) => key is K2): this is Collection<K2, V>;
    every<V2 extends V>(fn: (value: V, key: K, collection: this) => value is V2): this is Collection<K, V2>;
    every(fn: (value: V, key: K, collection: this) => boolean): boolean;
    every<This, K2 extends K>(fn: (this: This, value: V, key: K, collection: this) => key is K2, thisArg: This): this is Collection<K2, V>;
    every<This, V2 extends V>(fn: (this: This, value: V, key: K, collection: this) => value is V2, thisArg: This): this is Collection<K, V2>;
    every<This>(fn: (this: This, value: V, key: K, collection: this) => boolean, thisArg: This): boolean;
    /**
     * Applies a function to produce a single value. Identical in behavior to
     * [Array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
     * @param fn Function used to reduce, taking four arguments; `accumulator`, `currentValue`, `currentKey`,
     * and `collection`
     * @param nitialValue Starting value for the accumulator
     * @example collection.reduce((acc, guild) => acc + guild.memberCount, 0);
     */
    reduce<T>(fn: (accumulator: T, value: V, key: K, collection: this) => T, initialValue?: T): T;
    /**
     * Creates an identical shallow copy of this collection.
     * @example const newColl = someColl.clone();
     */
    clone(): Collection<K, V>;
    /**
     * Combines this collection with others into a new collection. None of the source collections are modified.
     * @param collections Collections to merge
     * @example const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     */
    concat(...collections: Collection<K, V>[]): Collection<K, V>;
    /**
     * Checks if this collection shares identical items with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param collection Collection to compare with
     * @returns Whether the collections have identical contents
     */
    equals(collection: Collection<K, V>): boolean;
}
