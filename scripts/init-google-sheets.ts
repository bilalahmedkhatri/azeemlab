/**
 * Google Sheets Initialization Script
 * Run this once to set up your Google Sheet with proper headers
 * 
 * Usage:
 *   npx tsx scripts/init-google-sheets.ts
 */

import dotenv from 'dotenv';
import { initializeGoogleSheet } from '../src/lib/google-sheets';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function main() {
  console.log('🚀 Initializing Google Sheet for career applications...\n');

  try {
    await initializeGoogleSheet();
    console.log('\n✅ Success! Your Google Sheet is ready to receive applications.');
    console.log('\n📊 Sheet Structure:');
    console.log('   - Sheet Name: Applications');
    console.log('   - Columns: Applied At, Position, Department, Full Name, Email,');
    console.log('              Phone, LinkedIn, Portfolio, Experience, Availability,');
    console.log('              Expected Salary, Why Join, Resume');
    console.log('\n🎯 Next Steps:');
    console.log('   1. Visit your careers page');
    console.log('   2. Submit a test application');
    console.log('   3. Check your Google Sheet to confirm it appears');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error initializing Google Sheet:');
    console.error(error);
    console.log('\n🔍 Troubleshooting:');
    console.log('   1. Check that GOOGLE_SHEETS_ID is set in .env.local');
    console.log('   2. Check that GOOGLE_SHEETS_CREDENTIALS is set in .env.local');
    console.log('   3. Verify you shared the sheet with the service account email');
    console.log('   4. Make sure the service account has Editor permissions');
    console.log('\n📖 See GOOGLE_SHEETS_SETUP.md for detailed instructions');
    process.exit(1);
  }
}

main();
