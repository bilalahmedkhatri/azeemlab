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
  <title>Application Received - SooooLab</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0; text-align: center; background-color: #6366f1;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">SooooLab</h1>
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
          <strong>The SooooLab Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          © ${new Date().getFullYear()} SooooLab. All rights reserved.
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
The SooooLab Team

---
This is an automated confirmation email. Please do not reply to this message.
© ${new Date().getFullYear()} SooooLab. All rights reserved.
    `.trim();

    await transporter.sendMail({
      from: `"SooooLab Careers" <${from}>`,
      to: params.applicantEmail,
      subject: `Application Received - ${params.position} at SooooLab`,
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
      from: `"SooooLab Careers System" <${from}>`,
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
