const nodemailer = require('nodemailer');
const env = require('./env');

let transporter = null;

/**
 * Get or create the mail transporter.
 * In development without SMTP credentials, OTPs are logged to console.
 */
const getTransporter = () => {
  if (transporter) return transporter;

  if (env.SMTP_USER && env.SMTP_PASSWORD) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
    return transporter;
  }

  return null;
};

/**
 * Send an email. Falls back to console log in dev if SMTP is not configured.
 * @param {Object} options - { to, subject, text, html }
 */
const sendMail = async ({ to, subject, text, html }) => {
  const transport = getTransporter();

  if (!transport) {
    // Development fallback: log to console
    console.log('\n📧 ═══════════════════════════════════════');
    console.log('   EMAIL (Dev Mode - SMTP not configured)');
    console.log('═══════════════════════════════════════════');
    console.log(`   To:      ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body:    ${text}`);
    console.log('═══════════════════════════════════════════\n');
    return { accepted: [to], messageId: 'dev-mode' };
  }

  const mailOptions = {
    from: `"StockSense IMS" <${env.SMTP_FROM}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transport.sendMail(mailOptions);
  return info;
};

module.exports = { sendMail };
