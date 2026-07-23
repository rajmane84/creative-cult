import type { SendVerificationEmailPayload } from '../../../types/email';

export function generateVerificationEmailHtml(
  payload: SendVerificationEmailPayload
) {
  const name = payload.name ? payload.name.trim() : 'there';
  const url = payload.url;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your Creative Cult email address</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; padding: 40px 32px;">
          <!-- Header Logo / Eyebrow -->
          <tr>
            <td style="padding-bottom: 24px; border-bottom: 1px solid #27272a;">
              <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #f97316;">
                / CREATIVE CULT
              </div>
            </td>
          </tr>
          
          <!-- Heading -->
          <tr>
            <td style="padding-top: 32px; padding-bottom: 16px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Verify your email address
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding-bottom: 32px; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
              Hi ${name},<br><br>
              Thank you for registering with Creative Cult. Please verify your email address to secure your account and unlock full access to all features.
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <a href="${url}" target="_blank" style="display: inline-block; background-color: #f97316; color: #000000; font-family: monospace; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; padding: 14px 28px; border-radius: 6px;">
                Verify Email Address →
              </a>
            </td>
          </tr>

          <!-- Direct Link Fallback -->
          <tr>
            <td style="padding-top: 24px; border-top: 1px solid #27272a; font-size: 12px; line-height: 1.5; color: #71717a;">
              If the button above does not work, copy and paste the following link into your web browser:<br>
              <a href="${url}" style="color: #f97316; word-break: break-all; text-decoration: underline;">${url}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #52525b; text-align: center;">
              © Creative Cult. If you did not create an account, you can safely ignore this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Hi ${name},

Please verify your email address for Creative Cult by clicking the following link:
${url}

If you did not request this email, please ignore it.
  `.trim();

  return { html, text };
}
