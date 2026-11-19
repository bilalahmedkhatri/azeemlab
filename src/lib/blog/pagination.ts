import { blogConfig } from './config';

export function normalizeBlogPage(value: number) {
  return Number.isSafeInteger(value) ? Math.min(blogConfig.maxPage, Math.max(1, value)) : 1;
}

export function blogPageNumbers(page: number) {
  const start = Math.floor((normalizeBlogPage(page) - 1) / 10) * 10 + 1;
  return Array.from({ length: 10 }, (_, index) => start + index).filter(value => value <= blogConfig.maxPage);
}

const labels: Record<string, [string, string, string, string]> = {
  en: ['Pagination', 'Previous page', 'Next page', 'Page'],
  ru: ['Навигация по страницам', 'Предыдущая страница', 'Следующая страница', 'Страница'],
  nl: ['Paginering', 'Vorige pagina', 'Volgende pagina', 'Pagina'],
  fr: ['Pagination', 'Page précédente', 'Page suivante', 'Page'],
  es: ['Paginación', 'Página anterior', 'Página siguiente', 'Página'],
  'pt-BR': ['Paginação', 'Página anterior', 'Próxima página', 'Página'],
  'zh-Hans': ['分页导航', '上一页', '下一页', '第'],
  ko: ['페이지 탐색', '이전 페이지', '다음 페이지', '페이지'],
  ja: ['ページ送り', '前のページ', '次のページ', 'ページ'],
};

export const blogPaginationLabels = (locale: string) => labels[locale] || labels.en;
