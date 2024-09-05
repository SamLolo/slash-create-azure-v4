"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinHeaders = exports.splitHeaders = void 0;
function splitHeaders(headers, separator = ',') {
    const arrayHeaders = {};
    if (!headers)
        return arrayHeaders;
    Object.entries(headers).forEach(([headerKey, headerValue]) => {
        if (headerValue !== undefined && headerValue.includes(separator)) {
            arrayHeaders[headerKey.toLowerCase()] = headerValue.split(separator);
        }
        else {
            arrayHeaders[headerKey.toLowerCase()] = headerValue;
        }
    });
    return arrayHeaders;
}
exports.splitHeaders = splitHeaders;
function joinHeaders(headers, separator = ',') {
    const commaDelimitedHeaders = {};
    if (!headers)
        return commaDelimitedHeaders;
    Object.entries(headers).forEach(([headerKey, headerValue]) => {
        if (headerValue === undefined)
            return;
        if (Array.isArray(headerValue)) {
            commaDelimitedHeaders[headerKey.toLowerCase()] = headerValue.join(separator);
        }
        else {
            commaDelimitedHeaders[headerKey.toLowerCase()] = headerValue;
        }
    });
    return commaDelimitedHeaders;
}
exports.joinHeaders = joinHeaders;
