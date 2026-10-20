import { resolvePage, pageMetadata } from '@/i18n/pages';
import { pageLoaders, layoutLoaders } from '@/generated/zh-Hans/registry';
type Props = { params: Promise<{ path?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
export async function generateMetadata({ params }: Props) { const { path } = await params; return pageMetadata('zh-Hans', path, pageLoaders, layoutLoaders); }
export default async function Page({ params, searchParams }: Props) {
  const { path } = await params;
  const page = await resolvePage('zh-Hans', path, pageLoaders);
  const Component = page.module.default;
  return <Component params={page.params} searchParams={searchParams} />;
}
