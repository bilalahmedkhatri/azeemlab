# Email Notification Feature - Implementation Summary

## Overview
Added automatic email notifications when users submit career applications.

## What Was Added

### 1. Email Service Library (`src/lib/email.ts`)
- **`sendApplicationConfirmationEmail()`** - Sends professional confirmation email to applicant
- **`sendInternalNotificationEmail()`** - Sends alert to HR team with applicant details
- Beautiful HTML email templates with company branding
- Plain text fallback for email clients that don't support HTML
- Error handling that doesn't block application submission

### 2. Updated API Route (`src/app/api/careers/apply/route.ts`)
- Integrated email sending after successful Google Sheets save
- Non-blocking email sending (failures don't affect application submission)
- Sends both applicant confirmation and HR notification

### 3. Dependencies Installed
```json
{
  "nodemailer": "^7.0.10",
  "@types/nodemailer": "^7.0.3"
}
```

## Email Templates

### Applicant Confirmation Email
**Subject**: `Application Received - [Position] at SooooLab`

**Features**:
- Personalized greeting with applicant's name
- Professional SooooLab branding (purple header)
- Application summary table with:
  - Position
  - Department
  - Applicant name and email
  - Submission date
- Timeline expectations (5-7 business days)
- Company footer with copyright

### HR Internal Notification
**Subject**: `New Application: [Name] for [Position]`

**Features**:
- Quick applicant overview
- All contact details (name, email, phone)
- Position and department
- Experience level
- Direct link to resume (if provided)
- Timestamp of submission
- Reminder to check Google Sheets

## Required Environment Variables

Add to `.env.local`:

```env
# Email Configuration (Required)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Optional: Separate HR email (defaults to EMAIL_USER if not set)
EMAIL_HR=hr@yourcompany.com
```

## Setup Instructions

### Quick Start with Gmail

1. **Enable 2-Factor Authentication** on Gmail
2. **Generate App Password**:
   - Google Account → Security → 2-Step Verification
   - App passwords → Create new
   - Copy the 16-character password

3. **Add to `.env.local`**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx  # App password from step 2
EMAIL_FROM=your-email@gmail.com
EMAIL_HR=your-email@gmail.com  # Or separate HR email
```

4. **Test the configuration**:
```bash
npx tsx scripts/test-email.ts
```

## Testing

### Test Script: `scripts/test-email.ts`
- Verifies all EMAIL_* environment variables are set
- Sends a test confirmation email
- Provides detailed error messages
- Checks for common issues (App Password, SMTP credentials)

**Run**: `npx tsx scripts/test-email.ts`

## How It Works

```
User Submits Application
         ↓
1. Validate form data
         ↓
2. Save to Google Sheets ✅
         ↓
3. Send confirmation email to applicant 📧
         ↓
4. Send notification to HR 📧
         ↓
5. Return success response

Note: Email failures are logged but don't block the application
```

## Email Flow Example

1. **User**: John Doe applies for "Senior Full-Stack Developer"
2. **System**: Saves application to Google Sheets
3. **Applicant Email**: John receives professional confirmation at john@example.com
4. **HR Email**: HR team receives notification at hr@sooolab.com with John's details

## Production Recommendations

### For Production Use:
- ❌ Don't use personal Gmail/Outlook accounts
- ✅ Use professional email service:
  - **SendGrid** (recommended, free tier available)
  - **AWS SES** (cost-effective for high volume)
  - **Mailgun** (reliable with good deliverability)

### Why?
- Better deliverability (less likely to go to spam)
- Higher sending limits
- Better monitoring and analytics
- Professional sender reputation

## Security Notes

✅ **Best Practices**:
- Never commit `.env.local` to git (already in `.gitignore`)
- Use app-specific passwords for Gmail (never regular password)
- Rotate credentials regularly
- Monitor email sending logs

❌ **Don't**:
- Don't hardcode credentials in code
- Don't use the same password for multiple services
- Don't ignore email sending errors in logs

## Documentation

- **Full Setup Guide**: `EMAIL_SETUP.md`
- **Test Script**: `scripts/test-email.ts`
- **Email Library**: `src/lib/email.ts`

## Troubleshooting

### Gmail "Invalid login" error
→ Use App Password, not regular password
→ Enable 2-Factor Authentication first

### Emails going to spam
→ Use professional email service in production
→ Set up SPF/DKIM records for your domain

### Emails not sending
→ Check all EMAIL_* variables are set
→ Run test script: `npx tsx scripts/test-email.ts`
→ Check server logs for detailed errors

### Port blocked
→ Try port 587 (TLS) or 465 (SSL)
→ Check firewall settings

## Next Steps

1. ✅ Add EMAIL_* variables to `.env.local`
2. ✅ Run test script: `npx tsx scripts/test-email.ts`
3. ✅ Submit a test application at http://localhost:3000/careers
4. ✅ Check both applicant and HR emails
5. ✅ Deploy to Vercel with EMAIL_* environment variables

## Benefits

✅ **Professional UX**: Users get instant confirmation
✅ **HR Efficiency**: Team gets immediate alerts
✅ **Branding**: Professional emails with company identity
✅ **Reliability**: Email failures don't block applications
✅ **Tracking**: All applications still saved to Google Sheets
