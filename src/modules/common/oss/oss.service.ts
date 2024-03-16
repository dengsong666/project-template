import { Injectable } from "@nestjs/common";
import * as Oss from "ali-oss";
import * as dayjs from "dayjs";
@Injectable()
export class OssService {
  async getSignature() {
    const config: Oss.Options = {
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, // 存储桶名字
      bucket: process.env.OSS_BUCKET, // 文件存储路径
    };
    const client = new Oss(config);
    const expiration = dayjs().add(1, "day").toISOString();
    const {
      policy,
      Signature: signature,
      OSSAccessKeyId: accessId,
    } = client.calculatePostSignature({
      expiration,
      conditions: [["content-length-range", 0, 1024 * 1024 * 10]], // 设置上传文件的大小限制为10M
    }); // 生成 bucket 域名，客户端将向此地址发送请求
    const host = client
      .generateObjectUrl(config.bucket)
      .replace(/([^\/])(\/[^\/\.]+)+/g, "$1"); // 响应给客户端的签名和策略等信息
    return { expiration, policy, signature, accessId, host };
  }
}
