import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhTranslations from './locales/zh.json';
import enTranslations from './locales/en.json';

// 检测浏览器语言
export const getBrowserLang = () => {
  const lang = navigator.language || navigator.languages[0] || 'zh';
  if (lang.toLowerCase().startsWith('zh')) return 'zh';
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: zhTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: getBrowserLang(), // 根据浏览器语言自动切换
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;