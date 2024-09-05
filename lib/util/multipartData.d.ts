/// <reference types="node" />
export declare class MultipartData {
    boundary: string;
    bufs: Buffer[];
    attach(fieldName: string, data: any, filename?: string): void;
    finish(): Buffer[];
}
