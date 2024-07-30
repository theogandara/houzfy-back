import crypto from "crypto";
import { S3 } from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  endpoint: process.env.S3_URL,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS,
  sslEnabled: false,
  s3ForcePathStyle: true,
});

export default class UploadFile {
  constructor() {}
  key = crypto.randomUUID();

  async execute(buffer: Buffer, originalname: string) {
    const fileName = this.key + originalname.replace(/ /g, "_");
    await s3
      .putObject({
        Bucket: process.env.S3_BUCKET || "houzfy",
        Key: fileName,
        Body: buffer,
      })
      .promise();

    return {
      url: `${process.env.S3_URL}/${process.env.S3_BUCKET}/${fileName}`,
    };
  }
}
