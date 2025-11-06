import { google } from 'googleapis';

/**
 * Google Sheets Service
 * Handles appending career application data to Google Sheets
 */

export interface CareerApplication {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  experience: string;
  availability: string;
  expectedSalary: string;
  whyJoin: string;
  position: string;
  department: string;
  appliedAt: string;
  resumeFileName?: string;
}

/**
 * Initialize Google Sheets API client
 */
function getGoogleSheetsClient() {
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
  
  if (!credentials) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS environment variable is not set');
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw new Error('Failed to initialize Google Sheets client');
  }
}

/**
 * Append a career application to Google Sheets
 * @param application - Career application data
 * @returns Promise<boolean> - Success status
 */
export async function appendCareerApplication(application: CareerApplication): Promise<boolean> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
    }

    const sheets = getGoogleSheetsClient();

    // Prepare row data
    const values = [
      [
        application.appliedAt,
        application.position,
        application.department,
        application.fullName,
        application.email,
        application.phone,
        application.linkedIn,
        application.portfolio,
        application.experience,
        application.availability,
        application.expectedSalary,
        application.whyJoin,
        application.resumeFileName || 'Not uploaded',
      ],
    ];

    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Applications!A:M', // Sheet name: Applications, Columns A-M
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Application saved to Google Sheets:', response.data);
    return true;
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    throw error;
  }
}

/**
 * Create headers in the Google Sheet if they don't exist
 * Run this once to set up your sheet
 */
export async function initializeGoogleSheet(): Promise<boolean> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID environment variable is not set');
    }

    const sheets = getGoogleSheetsClient();

    // Check if sheet exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === 'Applications'
    );

    // Create sheet if it doesn't exist
    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Applications',
                },
              },
            },
          ],
        },
      });
    }

    // Add headers
    const headers = [
      [
        'Applied At',
        'Position',
        'Department',
        'Full Name',
        'Email',
        'Phone',
        'LinkedIn',
        'Portfolio',
        'Experience',
        'Availability',
        'Expected Salary',
        'Why Join',
        'Resume',
      ],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Applications!A1:M1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: headers,
      },
    });

    // Format header row (bold, background color)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.2,
                    green: 0.4,
                    blue: 0.8,
                  },
                  textFormat: {
                    bold: true,
                    foregroundColor: {
                      red: 1,
                      green: 1,
                      blue: 1,
                    },
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
        ],
      },
    });

    console.log('Google Sheet initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Google Sheet:', error);
    throw error;
  }
}
