import { Controller, Get } from "@nestjs/common";
import { EmailService } from "./email.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("公共")
@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * 发送邮件
   */
  @Get()
  sendEmail(): string {
    this.emailService.sendEmail();
    return "Message sent";
  }
}
