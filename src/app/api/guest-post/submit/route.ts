import { NextResponse } from 'next/server';
import { sendGuestPostSubmissionEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 32000) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }

    const body = JSON.parse(raw);
    const { name, email, website, topicTitle, topicCategory, outline, bio } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!topicTitle || typeof topicTitle !== 'string' || topicTitle.trim().length < 5) {
      return NextResponse.json({ error: 'Please provide a working title for your article.' }, { status: 400 });
    }

    if (!topicCategory || typeof topicCategory !== 'string') {
      return NextResponse.json({ error: 'Please select a topic category.' }, { status: 400 });
    }

    if (!outline || typeof outline !== 'string' || outline.trim().length < 50) {
      return NextResponse.json({ error: 'Please provide a brief outline.' }, { status: 400 });
    }

    const emailSent = await sendGuestPostSubmissionEmail({
      name: name.trim(),
      email: email.trim(),
      website: typeof website === 'string' ? website.trim() : '',
      topicTitle: topicTitle.trim(),
      topicCategory: topicCategory.trim(),
      outline: outline.trim(),
      bio: typeof bio === 'string' ? bio.trim() : '',
    });

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Your pitch could not be delivered. Please email bilal.azeemlab@gmail.com.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error handling guest post submission:', err);
    return NextResponse.json(
      { error: 'Your pitch could not be delivered. Please email bilal.azeemlab@gmail.com.' },
      { status: 500 }
    );
  }
}
