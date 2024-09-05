"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyServer = void 0;
const server_1 = require("../server");
const multipartData_1 = require("../util/multipartData");
/**
 * A server for Fastify applications.
 * @see https://fastify.io
 */
class FastifyServer extends server_1.Server {
    /**
     * @param app The fastify application, or the options for initialization
     * @param opts The server options
     */
    constructor(app, opts) {
        super(opts);
        try {
            const fastify = require('fastify');
            if (!app) {
                app = fastify.default();
            }
            else if (!('initialConfig' in app)) {
                app = fastify.default(app);
            }
        }
        catch (e) {
            throw new Error('You must have the `fastify` package installed before using this server.');
        }
        this.app = app;
    }
    /** @private */
    createEndpoint(path, handler) {
        this.app.register(async (app) => {
            // Capture and set the raw payload with a scoped parser
            app.addContentTypeParser('application/json', { parseAs: 'string', asString: true }, (request, payload, done) => {
                request.rawBody = payload;
                app.getDefaultJsonParser('remove', 'remove')(request, payload, done);
            });
            app.post(path, (req, res) => handler({
                headers: req.headers,
                body: req.body,
                request: req,
                response: res,
                rawBody: req.rawBody
            }, async (response) => {
                res.status(response.status || 200);
                if (response.headers)
                    res.headers(response.headers);
                if (response.files) {
                    const data = new multipartData_1.MultipartData();
                    res.header('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
                    for (const i in response.files)
                        data.attach(`files[${i}]`, response.files[i].file, response.files[i].name);
                    data.attach('payload_json', JSON.stringify(response.body));
                    res.send(Buffer.concat(data.finish()));
                }
                else
                    res.send(response.body);
            }));
        });
    }
    /** @private */
    async listen(port = 8030, host = 'localhost') {
        if (this.alreadyListening)
            return;
        await this.app.listen({ port, host });
    }
}
exports.FastifyServer = FastifyServer;
