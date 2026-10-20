export const locales = ['en', 'ru', 'nl', 'fr', 'es', 'pt-BR', 'zh-Hans', 'ko', 'ja'] as const;
export type Locale = typeof locales[number];
export const openGraphLocales: Record<Locale, string> = { en: 'en_US', ru: 'ru_RU', nl: 'nl_NL', fr: 'fr_FR', es: 'es_ES', 'pt-BR': 'pt_BR', 'zh-Hans': 'zh_CN', ko: 'ko_KR', ja: 'ja_JP' };
export const languageNames: Record<Locale, string> = { en: 'English', ru: 'Русский', nl: 'Nederlands', fr: 'Français', es: 'Español', 'pt-BR': 'Português', 'zh-Hans': '简体中文', ko: '한국어', ja: '日本語' };
export function isLocale(value: unknown): value is Locale { return typeof value === 'string' && (locales as readonly string[]).includes(value); }
export const countryLanguages: Record<string, Locale> = { RU: 'ru', NL: 'nl', FR: 'fr', ES: 'es', BR: 'pt-BR', PT: 'pt-BR', CN: 'zh-Hans', KR: 'ko', JP: 'ja' };
export function browserLocale(header: string): Locale {
  const candidates = header.slice(0, 2048).split(',').map((part, index) => { const [tag, ...params] = part.trim().split(';'); const q = params.find(p => p.trim().startsWith('q=')); return { tag, weight: q ? Number(q.trim().slice(2)) : 1, index }; }).filter(v => Number.isFinite(v.weight) && v.weight > 0 && v.weight <= 1).sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const { tag } of candidates) { const base = tag.toLowerCase().split('-')[0]; const found = locales.find(l => l.toLowerCase() === tag.toLowerCase() || l.toLowerCase().split('-')[0] === base); if (found) return found; }
  return 'en';
}
export function detectLocale(cookie: unknown, country: string | null, acceptLanguage: string): Locale { return isLocale(cookie) ? cookie : countryLanguages[country || ''] || browserLocale(acceptLanguage); }
export function stripLocale(path: string) { const parts = path.split('/'); if (isLocale(parts[1])) parts.splice(1, 1); return parts.join('/') || '/'; }
export function localizedPath(locale: Locale, path: string) { return `/${locale}${stripLocale(path) === '/' ? '' : stripLocale(path)}`; }
