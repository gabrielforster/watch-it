import { randomUUID } from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = process.env.BUCKET_NAME;

export class UploadFileUseCase {
  protected s3Client: S3Client;

  constructor () {
    this.s3Client = new S3Client({
      region: "sa-east-1",
      credentials: {
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER"
      },
      endpoint: "http://localhost:4566",
      forcePathStyle: true,
    });
  }

  async execute (input: Input) {
    const key = randomUUID();

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `uploads/${key}`,
      ContentType: input.contentType
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });

    return { url, key };
  }
}

export type Input = {
  contentType: string;
}
