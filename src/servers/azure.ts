import { Server, ServerRequestHandler } from '../server';
// @ts-ignore
import type { HttpRequest, InvocationContext, HttpResponseInit } from '@azure/functions';
import { MultipartData } from '../util/multipartData';

/**
 * A server for Azure Function integration
 * @see https://docs.microsoft.com/en-us/azure/azure-functions/
 */
export class AzureFunctionServer extends Server {
  private _handler?: ServerRequestHandler;

  constructor() {
    super({ alreadyListening: true });
  }

  public async handleRequest(request: HttpRequest, context: InvocationContext,): Promise<HttpResponseInit> {
    if (!this._handler) {
      return {
        status: 503,
        body: 'Server has no handler'
      }
    }
    if (request.method !== 'POST') {
      return {
        status: 400,
        body: 'Server only supports POST requests.'
      }
    }
    this._handler!(
      {
        headers: request.headers,
        body: request.body,
        request: request,
        response: context.res
      },
      async (response) => {
        if (response.files) {
          const data = new MultipartData();
          for (const i in response.files) {
            data.attach(`files[${i}]`, response.files[i].file, response.files[i].name);
          };
          data.attach('payload_json', JSON.stringify(response.body));
          return {
            status: response.status || 200,
            headers: { 'Content-Type': `multipart/form-data; boundary=${data.boundary}` },
            body: Buffer.concat(data.finish())
          }
        } else {
          return {
            status: response.status || 200,
            headers: { 'Content-Type': 'application/json' },
            jsonBody: response.body
          }
        }
      }
    );
  }

  /** @private */
  createEndpoint(path: string, handler: ServerRequestHandler) {
    this._handler = handler;
    console.log("Hello from create endpoint");
    console.log(this._handler)
  }
}
