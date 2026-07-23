import { Resend } from 'resend';
import { env } from '../../util/env';
import type {
  IEmailService,
  SendVerificationEmailPayload,
} from '../../types/email';
import { generateVerificationEmailHtml } from './templates/verification-email';

export class ResendEmailService implements IEmailService {
  private resend: Resend | null = null;

  constructor() {
    if (env.RESEND_API_KEY) {
      this.resend = new Resend(env.RESEND_API_KEY);
    }
  }

  async sendVerificationEmail(
    payload: SendVerificationEmailPayload
  ): Promise<void> {
    if (!this.resend) {
      console.warn(
        '[ResendEmailService] RESEND_API_KEY is missing. Verification email skipped.'
      );
      return;
    }

    const { html, text } = generateVerificationEmailHtml(payload);

    const { error } = await this.resend.emails.send({
      from: env.EMAIL_FROM,
      to: [payload.to],
      subject: 'Verify your email address - Creative Cult',
      html,
      text,
    });

    if (error) {
      console.error(
        '[ResendEmailService] Failed to send verification email:',
        error
      );
      throw new Error(`Resend email error: ${error.message}`);
    }

    console.log(
      `[ResendEmailService] Verification email sent to ${payload.to}`
    );
  }
}
