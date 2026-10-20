import { NextRequest, NextResponse } from 'next/server';
import { detectLocale, isLocale, localizedPath } from './i18n/config';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const segment = path.split('/')[1];
  if (isLocale(segment)) {
    const legacy = path.replace(`/${segment}`, '') || '/';
    const replacement = legacy === '/about-us' ? '/about' : legacy === '/services/seo-marketing' ? '/services/seo' : null;
    if (replacement) { const url = request.nextUrl.clone(); url.pathname = localizedPath(segment, replacement); return NextResponse.redirect(url, 308); }
    const headers = new Headers(request.headers);
    // Always replace client-supplied internal context.
    headers.set('x-azeemlab-locale', segment);
    return NextResponse.next({ request: { headers } });
  }
  const locale = detectLocale(request.cookies.get('AZEEMLAB_LOCALE')?.value, process.env.VERCEL === '1' ? request.headers.get('x-vercel-ip-country') : null, request.headers.get('accept-language') || '');
  const url = request.nextUrl.clone();
  url.pathname = localizedPath(locale, path);
  const response = NextResponse.redirect(url, 307);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Cookie, Accept-Language, X-Vercel-IP-Country');
  return response;
}
export const config = { matcher: ['/((?!api(?:/|$)|_next(?:/|$)|.*\\.[^/]+$).*)'] };
