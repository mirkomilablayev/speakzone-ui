import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";

// Detect Telegram user language, fall back to Uzbek
const tgLang = typeof window !== "undefined"
  ? window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code
  : null;
const supported = ["en", "uz", "ru"];
const defaultLng = supported.includes(tgLang) ? tgLang : "uz";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uz: { translation: uz },
    ru: { translation: ru },
  },
  lng: defaultLng,
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
