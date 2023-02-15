import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import zh_tw from "./zh-TW.json";

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh_tw,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "zh", // 如果 detect 語言不支援，預設為此語言
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
