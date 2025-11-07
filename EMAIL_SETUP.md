# Email Configuration for Career Applications

## Overview
When users submit a career application, the system now sends:
1. **Confirmation email to the applicant** - Professional email confirming receipt of their application
2. **Internal notification to HR** - Alert to the hiring team with applicant details

## Email Service Setup

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings → Security
   - Select "2-Step Verification"
   - Scroll to "App passwords"
   - Create a new app password for "Mail"
   - Copy the 16-character password

3. **Add to `.env.local`**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=oukqfqcntlhwpamv
EMAIL_FROM=your-email@gmail.com
EMAIL_HR=hr@yourcompany.com
```

### Option 2: Outlook/Office 365

```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=your-email@outlook.com
EMAIL_HR=hr@yourcompany.com
```

### Option 3: Custom SMTP Server

```env
EMAIL_HOST=smtp.yourcompany.com
EMAIL_PORT=465
EMAIL_USER=careers@yourcompany.com
EMAIL_PASSWORD=your-smtp-password
EMAIL_FROM=careers@yourcompany.com
EMAIL_HR=hr@yourcompany.com
```

### Option 4: SendGrid (Production Recommended)

1. Sign up at https://sendgrid.com
2. Create an API key
3. Configure:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=careers@yourcompany.com
EMAIL_HR=hr@yourcompany.com
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com                    # SMTP server hostname
EMAIL_PORT=587                               # SMTP port (587 for TLS, 465 for SSL)
EMAIL_USER=your-email@gmail.com             # SMTP username/email
EMAIL_PASSWORD=your-app-password            # SMTP password or app password
EMAIL_FROM=your-email@gmail.com             # "From" address for all emails
EMAIL_HR=hr@yourcompany.com                 # HR/admin email for internal notifications (optional, defaults to EMAIL_USER)

# Existing Google Sheets Configuration
GOOGLE_SHEETS_ID=your-spreadsheet-id
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account"...}
```

## Email Features

### Applicant Confirmation Email
- **Subject**: `Application Received - [Position] at SooooLab`
- **Content**:
  - Professional greeting with applicant's name
  - Confirmation of position and department applied for
  - Application summary table
  - Timeline expectations (5-7 business days)
  - Company branding and footer

### HR Internal Notification
- **Subject**: `New Application: [Name] for [Position]`
- **Content**:
  - Applicant contact details
  - Position and department
  - Experience level
  - Link to resume (if provided)
  - Timestamp of submission
  - Reminder to check Google Sheets for full details

## Testing Email Configuration

Create a test script `scripts/test-email.ts`:

```typescript
import 'dotenv/config';
import { sendApplicationConfirmationEmail } from '../src/lib/email';

async function test() {
  const result = await sendApplicationConfirmationEmail({
    applicantName: 'Test User',
    applicantEmail: 'your-test-email@example.com', // Change this!
    position: 'Senior Full-Stack Developer',
    department: 'Engineering',
  });

  console.log('Email sent:', result ? 'SUCCESS' : 'FAILED');
}

test();
```

Run: `npx tsx scripts/test-email.ts`

## Production Deployment (Vercel)

Add environment variables in Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add all EMAIL_* variables
3. Redeploy your application

## Troubleshooting

### "Invalid login" error with Gmail
- Make sure you're using an **App Password**, not your regular Gmail password
- Enable 2-Factor Authentication first
- App Password must be 16 characters without spaces

### Emails not sending
- Check that all EMAIL_* environment variables are set correctly
- Verify SMTP credentials are valid
- Check if your SMTP provider requires additional authentication
- Look at server logs for detailed error messages

### Emails going to spam
- Set up SPF, DKIM, and DMARC records for your domain
- Use a professional email service (SendGrid, AWS SES, etc.)
- Avoid using personal Gmail/Outlook accounts in production

### Port issues
- Port 587: STARTTLS (recommended)
- Port 465: SSL/TLS
- Port 25: Usually blocked by hosting providers

## Email Flow

```
User Submits Application
         ↓
   Save to Google Sheets ✅
         ↓
   Send Confirmation Email to Applicant
         ↓
   Send Notification to HR
         ↓
   Return Success Response

Note: Email failures won't block the application submission
```

## Security Best Practices

1. **Never commit email credentials to git**
2. **Use app-specific passwords** for Gmail
3. **Use environment variables** for all sensitive data
4. **Rotate passwords regularly**
5. **Use dedicated email service** (SendGrid, AWS SES) in production
6. **Monitor email sending logs** for suspicious activity

## Cost Considerations

- **Gmail**: Free (limited to 500 emails/day)
- **SendGrid**: Free tier: 100 emails/day
- **AWS SES**: $0.10 per 1,000 emails
- **Mailgun**: Free tier: 100 emails/day
