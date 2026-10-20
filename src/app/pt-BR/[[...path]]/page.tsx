import { resolvePage, pageMetadata } from '@/i18n/pages';
import { pageLoaders, layoutLoaders } from '@/generated/pt-BR/registry';
type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
export async function generateMetadata({ params }: Props) { const { path } = await params; return pageMetadata('pt-BR', path, pageLoaders, layoutLoaders); }
export default async function Page({ params, searchParams }: Props) {
  const { path } = await params;
  const page = await resolvePage('pt-BR', path, pageLoaders);
  const Component = page.module.default;
  return <Component params={page.params} searchParams={searchParams} />;
}
