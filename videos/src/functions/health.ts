import { APIGatewayProxyEvent, Context, ProxyResult } from "aws-lambda";

import { LambdaResponse } from "../../../shared/lambda/response";

export async function handler (event: APIGatewayProxyEvent, context: Context): Promise<ProxyResult> {
  return new LambdaResponse()
    .setStatusCode(200)
    .setBody({ message: "Health check passed", context, event })
    .setHeader("x-custom-header", "my custom header value")
    .value;
}

