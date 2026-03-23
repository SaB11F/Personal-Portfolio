import { Resend } from "resend";

const DEFAULT_CONTACT_FROM = "Portfolio Contact <onboarding@resend.dev>";

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
};

export const sendContactNotification = async ({
  name,
  email,
  company,
  subject,
  message,
}) => {
  const resend = getResendClient();

  if (!resend) {
    return { sent: false, reason: "Resend is not configured." };
  }

  const safeName = escapeHeader(name);
  const safeEmail = String(email).trim();
  const safeCompany = company?.trim() || "Not provided";
  const safeSubject = subject?.trim() || `Message from ${safeName}`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_CONTACT_FROM,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `Portfolio contact: ${safeSubject}`,
      text: [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Company: ${safeCompany}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>New Portfolio Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>Company:</strong> ${escapeHtml(safeCompany)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
          <hr />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      return { sent: false, reason: error.message || "Resend delivery failed." };
    }

    return { sent: true };
  } catch (error) {
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "Resend delivery failed.",
    };
  }
};

function escapeHeader(value) {
  return String(value)
    .replaceAll(/[\r\n]/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
