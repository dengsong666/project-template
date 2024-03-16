import { Controller, Get } from "@nestjs/common";
import { OssService } from "./oss.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("公共")
// @ApiBearerAuth()
@Controller("oss")
export class OssController {
  constructor(private readonly oss: OssService) {}
  /**
   * 获取oss签名
   */
  @Get("signature")
  getOssSignature() {
    return this.oss.getSignature();
  }
}
