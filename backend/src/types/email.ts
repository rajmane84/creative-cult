export interface SendVerificationEmailPayload {
  to: string;
  name?: string | null;
  url: string;
}

export interface IEmailService {
  sendVerificationEmail(payload: SendVerificationEmailPayload): Promise<void>;
}
