import { NextResponse } from 'next/server';
import { sendPartnerApplicationEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 32000) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }

    const body = JSON.parse(raw);
    const { name, agency, email, phone, website, partnerType, scope, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!partnerType || typeof partnerType !== 'string') {
      return NextResponse.json({ error: 'Please select a partnership track.' }, { status: 400 });
    }

    const emailSent = await sendPartnerApplicationEmail({
      name: name.trim(),
      agency: typeof agency === 'string' ? agency.trim() : '',
      email: email.trim(),
      phone: typeof phone === 'string' ? phone.trim() : '',
      website: typeof website === 'string' ? website.trim() : '',
      partnerType: partnerType.trim(),
      scope: typeof scope === 'string' ? scope.trim() : '',
      message: typeof message === 'string' ? message.trim() : '',
    });

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Your application could not be delivered. Please email bilal.azeemlab@gmail.com.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error handling partner application submission:', err);
    return NextResponse.json(
      { error: 'Your application could not be delivered. Please email bilal.azeemlab@gmail.com.' },
      { status: 500 }
    );
  }
}
