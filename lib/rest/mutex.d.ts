/**
 * A simple tool to synchronize async operations.
 */
export declare class Mutex {
    #private;
    /**
     * Whether the mutex instance is locked.
     */
    get locked(): boolean;
    /**
     * Returns a promise that will resolve as soon as the mutex is unlocked.
     * @arg next Whether to insert the promise at the start of the queue.
     */
    acquire(next?: boolean): Promise<unknown>;
    /**
     * Returns a promise that will resolve after `ms` miliseconds.
     * @static
     */
    static wait(ms: number): Promise<unknown>;
}
