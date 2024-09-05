export declare function splitHeaders(headers?: CommaDelimitedHeaders, separator?: string): ArrayHeaders;
export declare function joinHeaders(headers?: ArrayHeaders, separator?: string): JoinedCommaDelimitedHeaders;
/** @hidden */
export declare type ArrayHeaders = {
    [key: string]: string | string[] | undefined;
};
/** @hidden */
export declare type CommaDelimitedHeaders = {
    [key: string]: string | undefined;
};
/** @hidden */
export declare type JoinedCommaDelimitedHeaders = {
    [key: string]: string;
};
