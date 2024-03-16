import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: "dengsong2022@gmail.com",
      from: "1487907946@qq.com",
      subject: "Testing Nest MailerModule ✔",
      html: `Hello`,
      // template: './welcome',
      // context: {
      //   // Data to be sent to template engine.
      //   code: 'cf1a3f828287',
      //   username: 'walker lee',
      // },
    });
  }
}
