import { NextResponse } from 'next/server';

// 1. Define the TypeScript structure for the contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone?: string; // Optional field
  projectType: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // 2. Receive and type-cast the incoming body
    const body: ContactFormData = await request.json();

    const complete_message = `
      *🚀 New Project Inquiry*
      --------------------------------
      *👤 Name:* ${body.name}
      *📧 Email:* ${body.email}
      *📞 Phone:* ${body.phone || 'Not provided'}
      *💼 Project:* ${body.projectType}

      *📝 Message:*
      ${body.message}
      --------------------------------
      _Sent from Website Contact Form_`.trim();

    // 2. Prepare the payload for your Backend API
    const payload = {
      number: body.phone, // YOUR destination WhatsApp number (country code, no +)
      message: complete_message
    };

    // 3. Use an environment variable for the endpoint (Better for security/switching envs)
    // Fallback to localhost if the variable isn't set
    const EXTERNAL_API_URL = process.env.WHATSAPP_API_URL || 'http://localhost:8080/api/v1';

    const response = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // 4. Handle external API failure
    if (!response.ok) {
      throw new Error(result.error || 'External message service failed');
    }

    return NextResponse.json({
      success: true,
      message: 'Message processed successfully',
      data: result
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API_PROXY_ERROR:', errorMessage);

    return NextResponse.json(
      { error: 'Internal server error while forwarding message' },
      { status: 500 }
    );
  }
}
