# Google Sheets Integration for Career Applications

This guide will help you set up Google Sheets to store career applications from your website.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Career Applications" (or any name you prefer)
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```
   Copy the `YOUR_SPREADSHEET_ID` part

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it "Career Applications" or similar

## Step 3: Enable Google Sheets API

1. In your Google Cloud project, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**
4. Search for "Google Drive API"
5. Click on it and press **Enable**

## Step 4: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - **Service account name**: `career-applications`
   - **Service account ID**: Will auto-generate
   - **Description**: "Service account for saving career applications"
4. Click **Create and Continue**
5. Skip optional steps (roles and users) - click **Done**

## Step 5: Create Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Choose **JSON** format
5. Click **Create** - a JSON file will download

## Step 6: Share Google Sheet with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `service-account@project-id.iam.gserviceaccount.com`)
3. Copy this email address
4. Go back to your Google Sheet
5. Click the **Share** button (top right)
6. Paste the service account email
7. Give it **Editor** permissions
8. Uncheck "Notify people" (it's a bot, not a person)
9. Click **Share**

## Step 7: Add Credentials to Environment Variables

1. Open your `.env.local` file
2. Add the **Spreadsheet ID**:
   ```env
   GOOGLE_SHEETS_ID=your_spreadsheet_id_here
   ```

3. Open the downloaded JSON file and copy **the entire content**
4. **Minify the JSON** (remove all line breaks) - you can use [this tool](https://codebeautify.org/jsonminifier)
5. Add it to `.env.local`:
   ```env
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"..."}
   ```

## Step 8: Initialize the Google Sheet (One-Time Setup)

The sheet needs headers before it can accept applications. Run this in your terminal:

```bash
node scripts/init-google-sheets.js
```

Or create a test file:

```typescript
// scripts/test-sheets.ts
import { initializeGoogleSheet } from '@/lib/google-sheets';

async function main() {
  try {
    await initializeGoogleSheet();
    console.log('✅ Google Sheet initialized successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
```

Run with:
```bash
npx tsx scripts/test-sheets.ts
```

## Step 9: Deploy to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add both variables:
   - `GOOGLE_SHEETS_ID`
   - `GOOGLE_SHEETS_CREDENTIALS`
4. Redeploy your project

## Sheet Structure

Your Google Sheet will have these columns:

| Applied At | Position | Department | Full Name | Email | Phone | LinkedIn | Portfolio | Experience | Availability | Expected Salary | Why Join | Resume | Resume URL |
|------------|----------|------------|-----------|-------|-------|----------|-----------|------------|--------------|-----------------|----------|--------|------------|

Applications will automatically appear in new rows when users submit the form.

Resume files are uploaded to a **Google Drive folder** named `azeemlab_career` and the URL is saved in the "Resume URL" column.

## Testing

1. Go to your careers page: `https://azeemlab.vercel.app/careers`
2. Click on any job position
3. Fill out the application form
4. Submit
5. Check your Google Sheet - the application should appear!

## Troubleshooting

### Error: "GOOGLE_SHEETS_CREDENTIALS environment variable is not set"
- Make sure you added the JSON to `.env.local`
- Make sure you restarted your dev server after adding env variables
- For Vercel: Check that environment variables are set in project settings

### Error: "The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- The service account needs **Editor** access

### Error: "Unable to parse range"
- Run the initialization script first to create the "Applications" sheet
- Make sure the sheet name is exactly "Applications"

### Applications not appearing
- Check the browser console for errors
- Check Vercel deployment logs for API errors
- Verify the spreadsheet ID is correct
- Make sure the JSON credentials are valid (no syntax errors)

## Security Notes

- ⚠️ **Never commit `.env.local` to git** - it contains sensitive credentials
- ✅ The credentials are stored securely in Vercel environment variables
- ✅ The API route runs server-side only (not exposed to browsers)
- ✅ Service accounts have limited permissions (only Google Sheets access)

## Example Environment Variables

```env
# Google Sheets Configuration
GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"career-apps-12345","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...rest of key...==\n-----END PRIVATE KEY-----\n","client_email":"career-apps@career-apps-12345.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token"}
```

---

**Need help?** Check the [Google Sheets API documentation](https://developers.google.com/sheets/api/guides/concepts) or create an issue in the repository.
