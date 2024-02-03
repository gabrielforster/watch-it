type ResponseValue = {
  statusCode: number
  body: string | null
  headers: Record<string, string> | null
}
export class LambdaResponse {
  private statusCode: number;
  private body: Record<string, unknown>;
  private headers: Record<string, string>;

  constructor() {
    this.body = {};
    this.headers = {};
  }

  public setStatusCode(statusCode: number): LambdaResponse {
    this.statusCode = statusCode;

    return this;
  }

  public setBody(body: Record<string, unknown>): LambdaResponse {
    this.body = body;

    return this;
  }

  public setHeader(key: string, value: string): LambdaResponse {
    this.headers[key] = value;

    return this;
  }

  public get value(): ResponseValue {
    if (this.statusCode === undefined) {
      throw new Error("statusCode is not set");
    }

    return {
      statusCode: this.statusCode,
      body: this.body === null ? null : JSON.stringify(this.body),
      headers: this.headers === null ? null : this.headers,
    };
  }
}
