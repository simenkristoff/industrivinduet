import nodemailer from 'nodemailer';

const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

/**
 * Setup a mail transporter
 */
const transporter = nodemailer.createTransport({
  port: parseInt(SMTP_PORT as string),
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: true,
});

export default transporter;
