import { NextRequest, NextResponse } from 'next/server';
import { isLocale } from '@/i18n/config';

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 128) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  let body: unknown;
  try { const text = await request.text(); if (text.length > 128) return NextResponse.json({ error: 'Payload too large' }, { status: 413 }); body = JSON.parse(text); } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }
  const locale = body && typeof body === 'object' && 'locale' in body ? body.locale : null;
  if (!isLocale(locale)) return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  const response = NextResponse.json({ success: true });
  response.cookies.set('AZEEMLAB_LOCALE', locale, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 31536000 });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
