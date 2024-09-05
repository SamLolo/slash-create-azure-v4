"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSLambdaServer = void 0;
const server_1 = require("../server");
const lambdaHeaders_1 = require("../util/lambdaHeaders");
const multipartData_1 = require("../util/multipartData");
/**
 * A server for AWS Lambda proxy integrations
 * @see https://aws.amazon.com/lambda/
 * @see https://aws.amazon.com/api-gateway/
 */
class AWSLambdaServer extends server_1.Server {
    /**
     * @param moduleExports The exports for your module, must be `module.exports`
     * @param target The name of the exported lambda handler (only HTTP APIs with payload version 2.0 are supported)
     */
    constructor(moduleExports, target = 'interactions') {
        super({ alreadyListening: true });
        moduleExports[target] = this._onRequest.bind(this);
    }
    _onRequest(event, _context, callback) {
        if (event.version !== '2.0') {
            return callback('Only payload format version 2.0 is supported.');
        }
        if (!this._handler) {
            return callback(null, { statusCode: 503, body: 'Server has no handler.' });
        }
        this._handler({
            headers: (0, lambdaHeaders_1.splitHeaders)(event.headers),
            body: event.body ? JSON.parse(event.body) : {},
            request: event,
            response: callback,
            rawBody: event.body ?? ''
        }, async (response) => {
            const responseHeaders = (0, lambdaHeaders_1.joinHeaders)(response.headers);
            // Content-Type is not set automatically when overwriting headers
            responseHeaders['Content-Type'] = 'application/json';
            if (response.files) {
                const data = new multipartData_1.MultipartData();
                responseHeaders['Content-Type'] = 'multipart/form-data; boundary=' + data.boundary;
                for (const i in response.files)
                    data.attach(`files[${i}]`, response.files[i].file, response.files[i].name);
                data.attach('payload_json', JSON.stringify(response.body));
                callback(null, {
                    statusCode: response.status || 200,
                    headers: responseHeaders,
                    body: Buffer.concat(data.finish()).toString('base64'),
                    isBase64Encoded: true
                });
            }
            else {
                responseHeaders['Content-Type'] = 'application/json';
                callback(null, {
                    statusCode: response.status || 200,
                    headers: responseHeaders,
                    body: JSON.stringify(response.body)
                });
            }
        });
    }
    /** @private */
    createEndpoint(path, handler) {
        this._handler = handler;
    }
}
exports.AWSLambdaServer = AWSLambdaServer;
