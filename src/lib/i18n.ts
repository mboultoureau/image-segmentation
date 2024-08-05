import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import messagesEn from "../messages/en.json";
import messagesFr from "../messages/fr.json";
import messagesJa from "../messages/ja.json";


// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: messagesEn
  },
  fr: {
    translation: messagesFr
  },
  ja: {
    translation: messagesJa
  }
};

// get the lang from url ?lang=fr
const urlParams = new URLSearchParams(window.location.search);
const langFromUrl = urlParams.get('lang');

// get the lang from data-lang attribute in div#root
const rootElement = document.getElementById('root');
const langFromDataAttr = rootElement?.getAttribute('data-lang');

// get the lang from navigator
const langFromNavigator = navigator.language;

// determine the final language to use
let lang = langFromUrl || langFromDataAttr || langFromNavigator;

// extract the language code from locale (ex: fr-FR -> fr)
lang = lang.split('-')[0];

// check if lang is one of the supported languages, fallback to English if not
if (lang !== 'en' && lang !== 'fr' && lang !== 'ja') {
  lang = 'en';
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
