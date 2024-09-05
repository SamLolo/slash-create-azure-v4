"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VercelServer = void 0;
const server_1 = require("../server");
const multipartData_1 = require("../util/multipartData");
/**
 * A server for Vercel.
 * @see https://vercel.com/
 * @see https://vercel.com/guides/handling-node-request-body
 */
class VercelServer extends server_1.Server {
    constructor() {
        super({ alreadyListening: true });
        /** The endpoint Vercel uses for serverless functions. */
        this.vercelEndpoint = (req, res) => {
            if (!this._handler)
                return res.status(503).send('Server has no handler.');
            if (req.method !== 'POST')
                return res.status(405).send('Server only supports POST requests.');
            this._handler({
                headers: req.headers,
                body: req.body,
                request: req,
                response: res
            }, async (response) => {
                res.status(response.status || 200);
                if (response.headers)
                    for (const key in response.headers)
                        res.setHeader(key, response.headers[key]);
                if (response.files) {
                    const data = new multipartData_1.MultipartData();
                    res.setHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
                    for (const i in response.files)
                        data.attach(`files[${i}]`, response.files[i].file, response.files[i].name);
                    data.attach('payload_json', JSON.stringify(response.body));
                    res.send(Buffer.concat(data.finish()));
                }
                else
                    res.send(response.body);
            });
        };
    }
    /** @private */
    createEndpoint(path, handler) {
        this._handler = handler;
    }
}
exports.VercelServer = VercelServer;
