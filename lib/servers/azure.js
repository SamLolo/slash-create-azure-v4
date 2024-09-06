"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureFunctionServer = void 0;
const server_1 = require("../server");
const multipartData_1 = require("../util/multipartData");
/**
 * A server for Azure Function integration
 * @see https://docs.microsoft.com/en-us/azure/azure-functions/
 */
class AzureFunctionServer extends server_1.Server {
    constructor() {
        super({ alreadyListening: true });
    }
    getHandler() {
        return this._onRequest.bind(this);
    }
    async _onRequest(request, context) {
        if (!this._handler) {
            return {
                status: 503,
                body: 'Server has no handler'
            };
        }
        if (request.method !== 'POST') {
            return {
                status: 400,
                body: 'Server only supports POST requests.'
            };
        }
        const body = await request.text();
        console.log(`HEADERS: ${request.headers.entries()}`);
        console.log(`BODY: ${body}`);
        this._handler({
            headers: request.headers.entries(),
            body: body,
            request: request,
            response: context.res
        }, async (response) => {
            if (response.files) {
                const data = new multipartData_1.MultipartData();
                for (const i in response.files) {
                    data.attach(`files[${i}]`, response.files[i].file, response.files[i].name);
                }
                ;
                data.attach('payload_json', JSON.stringify(response.body));
                return {
                    status: response.status || 200,
                    headers: { 'Content-Type': `multipart/form-data; boundary=${data.boundary}` },
                    body: Buffer.concat(data.finish())
                };
            }
            else {
                return {
                    status: response.status || 200,
                    headers: { 'Content-Type': 'application/json' },
                    jsonBody: response.body
                };
            }
        });
    }
    /** @private */
    createEndpoint(path, handler) {
        this._handler = handler;
    }
}
exports.AzureFunctionServer = AzureFunctionServer;
