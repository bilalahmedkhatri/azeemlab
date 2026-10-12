import { NextResponse } from 'next/server';

const projectTypes = new Set(['web-design', 'branding', 'seo', 'ecommerce', 'ai-integrations', 'ai-automation', 'consulting', 'other']);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid object');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Please send valid form data.' }, { status: 400 });
  }
  const text = (key: string) => typeof body[key] === 'string' ? (body[key] as string).trim() : '';
  const name = text('name'), email = text('email'), phone = text('phone'), projectType = text('projectType'), message = text('message');
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 60 || !projectTypes.has(projectType) || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: 'Please check your name, email, service and project details (10–5,000 characters).' }, { status: 400 });
  }
  const endpoint = process.env.WHATSAPP_API_URL;
  if (!endpoint) return NextResponse.json({ error: 'The enquiry form is temporarily unavailable. Please email bilalahmedkhatri@outlook.com.' }, { status: 503 });
  try {
    const response = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      // A visitor's phone is contact information, never the delivery destination.
      body: JSON.stringify({ number: process.env.WHATSAPP_RECIPIENT_NUMBER || '923213009321', message: `New AzeemLab project enquiry\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${projectType}\n\n${message}` }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || result?.success !== true || result.error) throw new Error('Delivery failed');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Your enquiry could not be delivered. Please email bilalahmedkhatri@outlook.com.' }, { status: 502 });
  }
}
