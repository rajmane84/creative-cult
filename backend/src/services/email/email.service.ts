import { env } from '../../util/env';
import type {
  IEmailService,
  SendVerificationEmailPayload,
} from '../../types/email';
import { ResendEmailService } from './resend.service';
import { NodemailerEmailService } from './nodemailer.service';

class EmailService implements IEmailService {
  private service: IEmailService;

  constructor() {
    if (env.NODE_ENV === 'production') {
      console.log('[EmailService] Using Resend provider (Production)');
      this.service = new ResendEmailService();
    } else {
      console.log('[EmailService] Using Nodemailer provider (Development)');
      this.service = new NodemailerEmailService();
    }
  }

  async sendVerificationEmail(
    payload: SendVerificationEmailPayload
  ): Promise<void> {
    return this.service.sendVerificationEmail(payload);
  }
}

export const emailService = new EmailService();
