"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const server_1 = require("../server");
const multipartData_1 = require("../util/multipartData");
let express;
try {
    express = require('express');
}
catch { }
/**
 * A server for Express applications.
 * @see http://expressjs.com
 */
class ExpressServer extends server_1.Server {
    /**
     * @param app The express application. Must have express.json installed as a middleware.
     * @param opts The server options
     */
    constructor(app, opts) {
        super(opts);
        if (!app) {
            if (!express)
                throw new Error('You must have the `express` package installed before using this server.');
            app = express();
            app.use(express.json());
        }
        this.app = app;
    }
    /** @private */
    createEndpoint(path, handler) {
        this.app.post(path, (req, res) => handler({
            headers: req.headers,
            body: req.body,
            request: req,
            response: res
        }, async (response) => {
            res.status(response.status || 200);
            if (response.headers)
                for (const key in response.headers)
                    res.set(key, response.headers[key]);
            if (response.files) {
                const data = new multipartData_1.MultipartData();
                res.set('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
                for (const i in response.files)
                    data.attach(`files[${i}]`, response.files[i].file, response.files[i].name);
                data.attach('payload_json', JSON.stringify(response.body));
                res.send(Buffer.concat(data.finish()));
            }
            else
                res.send(response.body);
        }));
    }
    /** @private */
    async listen(port = 8030, host = 'localhost') {
        if (this.alreadyListening)
            return;
        this.app.listen(port, host);
    }
}
exports.ExpressServer = ExpressServer;
