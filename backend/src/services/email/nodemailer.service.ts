import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { env } from '../../util/env';
import type {
  IEmailService,
  SendVerificationEmailPayload,
} from '../../types/email';
import { generateVerificationEmailHtml } from './templates/verification-email';

export class NodemailerEmailService implements IEmailService {
  private transporter: Transporter;

  constructor() {
    const hasValidSmtpConfig =
      env.SMTP_HOST && env.SMTP_HOST !== 'smtp.example.com' && env.SMTP_USER;

    if (hasValidSmtpConfig) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT || 587,
        secure: env.SMTP_SECURE || false,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    } else {
      console.log(
        '[NodemailerEmailService] Valid SMTP_HOST not configured. Falling back to Stream Transport (console log emails).'
      );
      this.transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      });
    }
  }

  async sendVerificationEmail(
    payload: SendVerificationEmailPayload
  ): Promise<void> {
    const { html, text } = generateVerificationEmailHtml(payload);

    try {
      const info = await this.transporter.sendMail({
        from: env.EMAIL_FROM || 'Creative Cult <no-reply@creativecult.dev>',
        to: payload.to,
        subject: 'Verify your email address - Creative Cult (Dev)',
        html,
        text,
      });

      console.log(
        `[NodemailerEmailService] Verification email sent to ${payload.to}`
      );
      console.log(`[NodemailerEmailService] Verification Link: ${payload.url}`);

      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`[NodemailerEmailService] Preview URL: ${previewUrl}`);
      }
    } catch (error) {
      console.error(
        '[NodemailerEmailService] Failed to send email via Nodemailer:',
        error
      );
      throw error;
    }
  }
}
