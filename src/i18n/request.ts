import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { isLocale } from './config';

export default getRequestConfig(async () => {
  const locale = (await headers()).get('x-azeemlab-locale');
  return { locale: isLocale(locale) ? locale : 'en', messages: {} };
});
