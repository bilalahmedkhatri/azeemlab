import 'dotenv/config';
import { sendApplicationConfirmationEmail } from '../src/lib/email';

/**
 * Test email configuration
 * Run: npx tsx scripts/test-email.ts
 */

async function testEmailConfiguration() {
  console.log('Testing email configuration...\n');

  // Check environment variables
  const requiredVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_FROM'];
  const missingVars = requiredVars.filter(v => !process.env[v]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.error('\nPlease add these to your .env.local file:');
    console.error('EMAIL_HOST=smtp.gmail.com');
    console.error('EMAIL_PORT=587');
    console.error('EMAIL_USER=your-email@gmail.com');
    console.error('EMAIL_PASSWORD=your-app-password');
    console.error('EMAIL_FROM=your-email@gmail.com');
    console.error('\nSee EMAIL_SETUP.md for detailed instructions.');
    process.exit(1);
  }

  console.log('✓ All required environment variables are set\n');
  console.log('Configuration:');
  console.log(`  Host: ${process.env.EMAIL_HOST}`);
  console.log(`  Port: ${process.env.EMAIL_PORT}`);
  console.log(`  User: ${process.env.EMAIL_USER}`);
  console.log(`  From: ${process.env.EMAIL_FROM}`);
  console.log(`  HR Email: ${process.env.EMAIL_HR || process.env.EMAIL_USER}\n`);

  // CHANGE THIS TO YOUR EMAIL!
  const testEmail = process.env.EMAIL_USER; // Send to yourself for testing

  console.log(`Sending test email to: ${testEmail}...\n`);

  try {
    const result = await sendApplicationConfirmationEmail({
      applicantName: 'Test User',
      applicantEmail: testEmail!,
      position: 'Senior Full-Stack Developer',
      department: 'Engineering',
    });

    if (result) {
      console.log('✅ SUCCESS! Test email sent successfully.');
      console.log(`\nCheck your inbox at: ${testEmail}`);
      console.log('(Don\'t forget to check spam folder)');
    } else {
      console.error('❌ FAILED: Email sending returned false');
      console.error('Check the error logs above for details.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
    console.error('\nCommon issues:');
    console.error('- Gmail: Make sure to use App Password (not regular password)');
    console.error('- Check SMTP credentials are correct');
    console.error('- Verify firewall isn\'t blocking SMTP port');
    console.error('\nSee EMAIL_SETUP.md for troubleshooting guide.');
    process.exit(1);
  }
}

testEmailConfiguration();
