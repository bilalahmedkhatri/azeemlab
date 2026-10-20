'use client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { isLocale, languageNames, locales, localizedPath } from './config';

export function LanguageSwitcher() {
  const locale = useLocale();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div><select aria-label={languageNames[isLocale(locale) ? locale : 'en']} value={locale} disabled={busy} style={{ maxWidth: '145px', border: '1px solid #d3d5dc', borderRadius: 20, padding: '8px 10px', color: '#191b20', background: '#fff', fontSize: 12 }} onChange={async event => {
    const next = event.target.value;
    if (!isLocale(next)) return;
    setBusy(true); setFailed(false);
    try {
      const response = await fetch('/api/language', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ locale: next }) });
      if (!response.ok) throw new Error('Language preference failed');
      const target = new URL(window.location.href);
      target.pathname = localizedPath(next, target.pathname);
      window.location.assign(target.href);
    } catch { setFailed(true); setBusy(false); }
  }}>{locales.map(value => <option key={value} value={value} lang={value}>{languageNames[value]}</option>)}</select>{failed && <span role="alert">⚠</span>}</div>;
}
