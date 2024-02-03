import { APIGatewayProxyEvent, Context, ProxyResult } from "aws-lambda";

import { LambdaResponse } from "../../../shared/lambda/response";

import { UploadFileUseCase } from "@usecases/uploadFile";

export async function handler (event: APIGatewayProxyEvent, context: Context): Promise<ProxyResult> {
  try {
    const code = event.headers.code;

    console.info(code);

    const { url, key } = await new UploadFileUseCase().execute({ contentType: "video/mp4" });

    return new LambdaResponse()
      .setStatusCode(201)
      .setBody({ url })
      .setHeader("x-video-key", key)
      .value;
  } catch (error) {
    return new LambdaResponse()
      .setStatusCode(500)
      .setBody({ message: "Internal Server Error" })
      .value;
  }
}
