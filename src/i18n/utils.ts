import { ui, defaultLang, type TranslationKey } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: TranslationKey, params?: Record<string, string | number>): string {
    let text = (ui[lang] as any)?.[key] || (ui[defaultLang] as any)?.[key] || (key as string);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return text;
  };
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'es') {
    return `/es${cleanPath === '/' ? '' : cleanPath}`;
  }
  return cleanPath;
}
