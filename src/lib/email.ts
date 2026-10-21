import nodemailer from 'nodemailer';

/**
 * Email Service for sending application confirmations
 * Uses SMTP configuration from environment variables
 */

export interface SendConfirmationEmailParams {
  applicantName: string;
  applicantEmail: string;
  position: string;
  department: string;
}

/**
 * Create email transporter
 */
function getEmailTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    throw new Error(
      'Email configuration is incomplete. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, and EMAIL_FROM in environment variables.'
    );
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: parseInt(port) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send application confirmation email to applicant
 */
export async function sendApplicationConfirmationEmail(
  params: SendConfirmationEmailParams
): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();
    const from = process.env.EMAIL_FROM!;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - AzeemLab</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background-color: #6366f1;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">AzeemLab</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1f2937; margin: 0 0 20px;">Application Received!</h2>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          Dear <strong>${params.applicantName}</strong>,
        </p>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          Thank you for applying to the <strong>${params.position}</strong> position in our <strong>${params.department}</strong> department.
        </p>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          We have successfully received your application and our team will review it carefully. If your qualifications match our requirements, we will contact you within the next 5-7 business days to discuss the next steps.
        </p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">Application Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Position:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${params.position}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Department:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${params.department}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Applicant:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${params.applicantName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${params.applicantEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Submitted:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          In the meantime, feel free to explore our website and learn more about our company culture and values.
        </p>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
          Best regards,<br>
          <strong>The AzeemLab Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          © ${new Date().getFullYear()} AzeemLab. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const textContent = `
Application Received!

Dear ${params.applicantName},

Thank you for applying to the ${params.position} position in our ${params.department} department.

We have successfully received your application and our team will review it carefully. If your qualifications match our requirements, we will contact you within the next 5-7 business days to discuss the next steps.

Application Summary:
- Position: ${params.position}
- Department: ${params.department}
- Applicant: ${params.applicantName}
- Email: ${params.applicantEmail}
- Submitted: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

In the meantime, feel free to explore our website and learn more about our company culture and values.

Best regards,
The AzeemLab Team

---
This is an automated confirmation email. Please do not reply to this message.
© ${new Date().getFullYear()} AzeemLab. All rights reserved.
    `.trim();

    await transporter.sendMail({
      from: `"AzeemLab Careers" <${from}>`,
      to: params.applicantEmail,
      subject: `Application Received - ${params.position} at AzeemLab`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Confirmation email sent successfully to:', params.applicantEmail);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw - we don't want email failures to block the application submission
    return false;
  }
}

/**
 * Send internal notification email to HR/admin
 */
export async function sendInternalNotificationEmail(
  params: SendConfirmationEmailParams & { 
    phone: string;
    experience: string;
    resumeLink: string;
  }
): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();
    const from = process.env.EMAIL_FROM!;
    const hrEmail = process.env.EMAIL_HR || process.env.EMAIL_USER!;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1f2937; margin: 0 0 20px;">New Application Received</h2>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
          A new application has been submitted for the <strong>${params.position}</strong> position.
        </p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">Applicant Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${params.applicantName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px;"><a href="mailto:${params.applicantEmail}">${params.applicantEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${params.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Position:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: bold;">${params.position}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Department:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${params.department}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Experience:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${params.experience}</td>
            </tr>
            ${params.resumeLink ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Resume:</td>
              <td style="padding: 8px 0;"><a href="${params.resumeLink}" style="color: #6366f1; text-decoration: none;">View Resume</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Submitted:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
          Check the Google Sheets for full application details.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"AzeemLab Careers System" <${from}>`,
      to: hrEmail,
      subject: `New Application: ${params.applicantName} for ${params.position}`,
      html: htmlContent,
    });

    console.log('Internal notification email sent to HR');
    return true;
  } catch (error) {
    console.error('Error sending internal notification email:', error);
    return false;
  }
}

export interface GuestPostSubmissionEmailParams {
  name: string;
  email: string;
  website?: string;
  topicTitle: string;
  topicCategory: string;
  outline: string;
  bio?: string;
}

/**
 * Send guest post pitch notification to admin and confirmation to contributor
 */
export async function sendGuestPostSubmissionEmail(
  params: GuestPostSubmissionEmailParams
): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();
    const from = process.env.EMAIL_FROM!;
    const adminEmail = process.env.EMAIL_HR || process.env.EMAIL_USER || 'bilal.azeemlab@gmail.com';

    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Guest Post Pitch</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 30px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">AzeemLab Guest Post</h1>
              <p style="color: #e0e7ff; margin: 6px 0 0; font-size: 14px;">New Pitch Submission</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="color: #0f172a; margin: 0 0 20px; font-size: 18px;">Pitch Summary</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Author Name:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${params.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td><td style="padding: 8px 0; color: #6366f1; font-size: 14px;"><a href="mailto:${params.email}" style="color: #6366f1; text-decoration: none;">${params.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Website:</td><td style="padding: 8px 0; color: #6366f1; font-size: 14px;">${params.website ? `<a href="${params.website.startsWith('http') ? params.website : 'https://' + params.website}" style="color: #6366f1; text-decoration: none;">${params.website}</a>` : 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Article Title:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${params.topicTitle}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Category:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px; text-transform: capitalize;">${params.topicCategory.replace(/-/g, ' ')}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 3px solid #6366f1;">
                <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Article Outline:</p>
                <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${params.outline}</p>
              </div>
              ${params.bio ? `
              <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 3px solid #94a3b8;">
                <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Author Bio:</p>
                <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">${params.bio}</p>
              </div>` : ''}
              <p style="color: #94a3b8; font-size: 12px; margin: 28px 0 0; padding-top: 20px; border-top: 1px solid #f1f5f9;">Submitted on ${new Date().toUTCString()} via AzeemLab Guest Post portal.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"AzeemLab Editorial" <${from}>`,
      to: adminEmail,
      subject: `New Guest Post Pitch: "${params.topicTitle}" by ${params.name}`,
      html: adminHtml,
    });

    // Send confirmation to contributor
    const confirmHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pitch Received - AzeemLab</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 30px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">AzeemLab Guest Post</h1>
              <p style="color: #e0e7ff; margin: 6px 0 0; font-size: 14px;">Pitch Received</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Dear <strong>${params.name}</strong>,</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">Thank you for submitting your guest post pitch to AzeemLab. We have received your proposal for:</p>
              <div style="padding: 16px; background-color: #f0f4ff; border: 1px solid #c7d2fe; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; color: #3730a3; font-size: 15px; font-weight: 600;">"${params.topicTitle}"</p>
                <p style="margin: 4px 0 0; color: #6366f1; font-size: 13px; text-transform: capitalize;">${params.topicCategory.replace(/-/g, ' ')}</p>
              </div>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">Our editorial team reviews all pitches within <strong>3 business days</strong>. If your pitch is a good fit, we will reply with approval and next steps. If we pass, we will let you know with brief feedback.</p>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">Questions? Reply directly to this email or reach us at <a href="mailto:bilal.azeemlab@gmail.com" style="color: #6366f1; text-decoration: none;">bilal.azeemlab@gmail.com</a>.</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #f1f5f9;">AzeemLab Editorial Team | Thoughtful Design and Dependable Development</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    try {
      await transporter.sendMail({
        from: `"AzeemLab Editorial" <${from}>`,
        to: params.email,
        subject: 'Pitch Received - AzeemLab Guest Post',
        html: confirmHtml,
      });
    } catch (confirmErr) {
      console.warn('Contributor confirmation email failed, but admin was notified:', confirmErr);
    }

    return true;
  } catch (error) {
    console.error('Error in sendGuestPostSubmissionEmail:', error);
    return false;
  }
}

export interface PartnerApplicationEmailParams {
  name: string;
  agency?: string;
  email: string;
  phone?: string;
  website?: string;
  partnerType: string;
  scope?: string;
  message?: string;
}

/**
 * Send partner application notification to admin and confirmation to partner
 */
export async function sendPartnerApplicationEmail(
  params: PartnerApplicationEmailParams
): Promise<boolean> {
  try {
    const transporter = getEmailTransporter();
    const from = process.env.EMAIL_FROM!;
    const adminEmail = process.env.EMAIL_HR || process.env.EMAIL_USER || 'bilal.azeemlab@gmail.com';
    const primaryRecipient = adminEmail;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Partner Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 30px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">AzeemLab Partner Ecosystem</h1>
              <p style="color: #e0f2fe; margin: 6px 0 0; font-size: 14px;">New Partner Collaboration Application</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="color: #0f172a; margin: 0 0 20px; font-size: 18px;">Application Summary</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 140px;">Applicant Name:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${params.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td><td style="padding: 8px 0; color: #0ea5e9; font-size: 14px;"><a href="mailto:${params.email}" style="color: #0ea5e9; text-decoration: none;">${params.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${params.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Agency / Company:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${params.agency || 'Independent / Individual'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Website:</td><td style="padding: 8px 0; color: #0ea5e9; font-size: 14px;">${params.website ? `<a href="${params.website.startsWith('http') ? params.website : 'https://' + params.website}" style="color: #0ea5e9; text-decoration: none;">${params.website}</a>` : 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Partnership Track:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-transform: capitalize;">${params.partnerType}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Estimated Scope:</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${params.scope || 'To be discussed'}</td></tr>
              </table>
              ${params.message ? `
              <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 3px solid #0ea5e9;">
                <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Note / Project Context:</p>
                <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${params.message}</p>
              </div>` : ''}
              <p style="color: #94a3b8; font-size: 12px; margin: 28px 0 0; padding-top: 20px; border-top: 1px solid #f1f5f9;">Submitted on ${new Date().toUTCString()} via AzeemLab Partner Portal.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send internal alert to admin
    await transporter.sendMail({
      from: `"AzeemLab Partner Network" <${from}>`,
      to: primaryRecipient,
      cc: adminEmail !== primaryRecipient ? adminEmail : undefined,
      subject: `New Partner Application: ${params.name} (${params.agency || params.partnerType})`,
      html: htmlContent,
    });

    // Send confirmation to applicant
    const applicantConfirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Partner Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 30px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">AzeemLab Partner Ecosystem</h1>
              <p style="color: #e0f2fe; margin: 6px 0 0; font-size: 14px;">Application Received</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="color: #0f172a; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Dear <strong>${params.name}</strong>,</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">Thank you for your interest in joining the AzeemLab Partner Ecosystem. We have received your application for the <strong>${params.partnerType}</strong> track.</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">Our leadership team reviews all partner applications within 24 hours. A representative will reach out to schedule an introductory alignment call and share our Partner Enablement Kit.</p>
              <div style="padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-bottom: 24px;">
                <p style="margin: 0; color: #166534; font-size: 14px; font-weight: 600;">Next Step: 20-Minute Alignment Call</p>
                <p style="margin: 4px 0 0; color: #15803d; font-size: 13px;">We will confirm shared delivery standards, SLA terms, and bilateral NDA protection before kickoff.</p>
              </div>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">If you have any immediate questions, reply directly to this email or reach us at <a href="mailto:bilal.azeemlab@gmail.com" style="color: #0ea5e9; text-decoration: none;">bilal.azeemlab@gmail.com</a>.</p>
              <p style="color: #94a3b8; font-size: 12px; margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #f1f5f9;">AzeemLab Partner Operations | Thoughtful Design & Dependable Development</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    try {
      await transporter.sendMail({
        from: `"AzeemLab Partner Network" <${from}>`,
        to: params.email,
        subject: 'Application Received - AzeemLab Partner Ecosystem',
        html: applicantConfirmationHtml,
      });
    } catch (applicantEmailError) {
      console.warn('Applicant confirmation email failed, but admin was notified:', applicantEmailError);
    }

    return true;
  } catch (error) {
    console.error('Error in sendPartnerApplicationEmail:', error);
    return false;
  }
}
