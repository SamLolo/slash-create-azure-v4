"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudflareWorkerServer = void 0;
const server_1 = require("../server");
/**
 * A server for Cloudflare Workers.
 * @see https://developers.cloudflare.com/workers/
 */
class CloudflareWorkerServer extends server_1.Server {
    constructor() {
        super({ alreadyListening: true });
        /**
         * The fetch handler for the server. Either export the server as default or use this function in your fetch handler to utilize this server.
         * @example
         * export const workerServer = new CloudflareWorkerServer();
         * creator.withServer(workerServer);
         * export default workerServer;
         */
        this.fetch = async (request, env, ctx) => {
            if (!this._handler)
                return new Response('Server has no handler.', { status: 503 });
            if (request.method !== 'POST')
                return new Response('Server only supports POST requests.', { status: 405 });
            const body = await request.text();
            return new Promise((resolve, reject) => {
                ctx.waitUntil(this._handler({
                    headers: Object.fromEntries(request.headers.entries()),
                    body: body ? JSON.parse(body) : body,
                    request,
                    response: null,
                    rawBody: body
                }, async (response) => {
                    if (response.files) {
                        const data = new FormData();
                        for (const file of response.files)
                            data.append(file.name, file.file, file.name);
                        data.append('payload_json', JSON.stringify(response.body));
                        resolve(new Response(data, {
                            status: response.status || 200,
                            headers: (response.headers || {})
                        }));
                    }
                    else
                        resolve(new Response(JSON.stringify(response.body), {
                            status: response.status || 200,
                            headers: {
                                ...(response.headers || {}),
                                'content-type': 'application/json'
                            }
                        }));
                }, { server: 'cloudflare', ...env }).catch(reject));
            });
        };
    }
    /** @private */
    createEndpoint(path, handler) {
        this._handler = handler;
    }
}
exports.CloudflareWorkerServer = CloudflareWorkerServer;
