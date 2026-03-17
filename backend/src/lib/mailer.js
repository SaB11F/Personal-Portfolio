import nodemailer from "nodemailer";

const getTransport = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.CONTACT_TO_EMAIL
  ) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendContactNotification = async ({
  name,
  email,
  company,
  subject,
  message,
}) => {
  const transporter = getTransport();

  if (!transporter) {
    return { sent: false, reason: "SMTP is not configured." };
  }

  await transporter.sendMail({
    from: process.env.PORTFOLIO_MAIL_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Portfolio contact: ${subject || `Message from ${name}`}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      "",
      message,
    ].join("\n"),
  });

  return { sent: true };
};
