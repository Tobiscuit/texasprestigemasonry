export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}) => {
  // Use a third-party API like Resend or Mailgun via simple fetch for Edge workers,
  // since the AWS SDK is 10MB+ and breaks Cloudflare Worker limits.
  console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
  return { MessageId: 'mock-id-edge' };
};
