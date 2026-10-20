import { getLocale } from 'next-intl/server';
import { isLocale, type Locale } from '@/i18n/config';

export default async function Loading() {
  const value = await getLocale();
  const labels: Record<Locale, string> = { en: 'Loading page…', ru: 'Загрузка страницы…', nl: 'Pagina laden…', fr: 'Chargement de la page…', es: 'Cargando página…', 'pt-BR': 'Carregando página…', 'zh-Hans': '正在加载页面…', ko: '페이지 로딩 중…', ja: 'ページを読み込み中…' };
  return <div role="status" className="min-h-[50vh] flex items-center justify-center bg-background text-foreground"><p>{labels[isLocale(value) ? value : 'en']}</p></div>;
}
