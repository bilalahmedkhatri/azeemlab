import { isLocale, type Locale } from '../config';
import en from './messages/en.json';
import ru from './messages/ru.json';
import nl from './messages/nl.json';
import fr from './messages/fr.json';
import es from './messages/es.json';
import pt from './messages/pt-BR.json';
import zh from './messages/zh-Hans.json';
import ko from './messages/ko.json';
import ja from './messages/ja.json';

export const pricingMessages: Record<Locale, string[]> = { en, ru, nl, fr, es, 'pt-BR': pt, 'zh-Hans': zh, ko, ja };
const keys = new Map(en.map((source, index) => [source, index]));

export function pricingTranslator(locale: string) {
  const dictionary = pricingMessages[isLocale(locale) ? locale : 'en'];
  return (source: string) => {
    const index = keys.get(source);
    if (index === undefined || !dictionary[index]) throw new Error(`Missing pricing translation: ${locale}: ${source}`);
    return dictionary[index];
  };
}
