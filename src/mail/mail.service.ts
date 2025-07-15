import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter, SendMailOptions } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter<any>;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: Number(this.configService.get<string>('MAIL_PORT')),
      auth: this.configService.get<string>('MAIL_USER')
        ? {
            user: this.configService.get<string>('MAIL_USER'),
            pass: this.configService.get<string>('MAIL_PASSWORD'),
          }
        : undefined,
    }) as Transporter<any>;
  }

  async sendMail(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<any> {
    const from = this.configService.get<string>('MAIL_FROM');
    const mailOptions: SendMailOptions = {
      from,
      ...options,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
