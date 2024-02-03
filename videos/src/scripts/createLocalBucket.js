const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  endpoint: "http://localhost:4566", // ou o IP do Docker se necessário
  region: "sa-east-1",
  credentials: {
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER"
  },
  forcePathStyle: true,
});

async function createBucket() {
  try {
    const command = new CreateBucketCommand({
      Bucket: "videos-files-storage",
      ACL: "public-read",
    });
    await s3Client.send(command);
    console.log("Bucket criado com sucesso!");
  } catch (err) {
    console.error("Erro ao criar o bucket:", err);
  }
}

createBucket();
