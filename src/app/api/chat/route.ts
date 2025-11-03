import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // For now, we'll just echo the message back with a prefix.
    // This can be replaced with more complex logic later.
    const botResponse = `You said: "${userMessage}"`;

    return NextResponse.json({ reply: botResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
