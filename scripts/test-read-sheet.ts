/**
 * Test script to read data from Google Sheets
 * This will show you what's actually in your sheet
 */

import dotenv from 'dotenv';
import { google } from 'googleapis';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function readSheet() {
  try {
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!credentials || !spreadsheetId) {
      throw new Error('Missing environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Read all data from Applications sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Applications!A:M',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('❌ No data found in the sheet.');
      return;
    }

    console.log('✅ Found', rows.length, 'rows in the sheet:\n');
    
    // Print header
    console.log('HEADERS:');
    console.log(rows[0].join(' | '));
    console.log('-'.repeat(150));

    // Print all data rows
    if (rows.length > 1) {
      console.log('\nDATA ROWS:');
      for (let i = 1; i < rows.length; i++) {
        console.log(`\nRow ${i + 1}:`);
        rows[0].forEach((header, index) => {
          console.log(`  ${header}: ${rows[i][index] || '(empty)'}`);
        });
      }
    } else {
      console.log('\n⚠️ No data rows yet - only headers exist.');
      console.log('Submit an application from the careers page to test!');
    }

  } catch (error) {
    console.error('❌ Error reading sheet:', error);
  }
}

readSheet();
