export { default as BlogPagination } from '@/components/blog/BlogPagination';

const labels: Record<string, [string, string, string]> = {
  en: ['Previous', 'Next', 'No published articles found.'],
  ru: ['Назад', 'Далее', 'Опубликованные статьи не найдены.'],
  nl: ['Vorige', 'Volgende', 'Geen gepubliceerde artikelen gevonden.'],
  fr: ['Précédent', 'Suivant', 'Aucun article publié trouvé.'],
  es: ['Anterior', 'Siguiente', 'No se encontraron artículos publicados.'],
  'pt-BR': ['Anterior', 'Próxima', 'Nenhum artigo publicado encontrado.'],
  'zh-Hans': ['上一页', '下一页', '未找到已发布的文章。'],
  ko: ['이전', '다음', '게시된 글이 없습니다.'],
  ja: ['前へ', '次へ', '公開された記事が見つかりません。'],
};
export function BlogEmpty({ locale }: { locale: string }) {
  return <p className="text-center text-gray-600 my-10">{(labels[locale] || labels.en)[2]}</p>;
}
const unavailableLabels: Record<string, string> = {
  en: 'More articles are temporarily unavailable. Please try again shortly.',
  ru: 'Другие статьи временно недоступны. Попробуйте немного позже.',
  nl: 'Meer artikelen zijn tijdelijk niet beschikbaar. Probeer het straks opnieuw.',
  fr: 'Les autres articles sont temporairement indisponibles. Réessayez dans un instant.',
  es: 'Los demás artículos no están disponibles temporalmente. Inténtalo de nuevo en breve.',
  'pt-BR': 'Outros artigos estão temporariamente indisponíveis. Tente novamente em breve.',
  'zh-Hans': '更多文章暂时无法加载，请稍后重试。', ko: '다른 글을 일시적으로 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.',
  ja: '他の記事を一時的に読み込めません。しばらくしてから再度お試しください。',
};
export function BlogDatabaseUnavailable({ locale }: { locale: string }) {
  return <p role="status" className="text-center text-gray-600 my-10">{unavailableLabels[locale] || unavailableLabels.en}</p>;
}
