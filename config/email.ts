import { MailerModule } from '@nestjs-modules/mailer';

export default MailerModule.forRootAsync({
  useFactory: () => ({
    transport: 'smtps://1487907946@qq.com:fvktrvkbrcnpbafc@smtp.qq.com',
    defaults: {
      from: '"dengsong" <1487907946@qq.com>',
    },
  }),
});
