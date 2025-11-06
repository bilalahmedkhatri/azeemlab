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