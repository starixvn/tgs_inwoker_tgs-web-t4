import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "../config/config";
import en from "../assets/translations/en-US.json";
import cn from "../assets/translations/zh-CN.json";
import tw from "../assets/translations/zh-TW.json";
import th from "../assets/translations/th-TH.json";
i18n.on("languageChanged", function (lng) {
  // if the language we switched to is the default language we need to remove the /en from URL
  //   if (lng === i18n.options.fallbackLng[0]) {
  //     if (window.location.pathname.includes("/" + i18n.options.fallbackLng[0])) {
  //       const newUrl = window.location.pathname.replace(
  //         "/" + i18n.options.fallbackLng[0],
  //         ""
  //       );
  //       window.location.replace(newUrl);
  //     }
  //   }
});

i18n.use(LanguageDetector).init({
  resources: {
    "en-US": {
      translation: en,
    },
    "zh-CN": {
      translation: cn,
    },
    "zh-TW": {
      translation: tw,
    },
    "th-TH": {
      translation: th,
    },
  },
  whitelist: config.languages.map((item) => {
    return item.name;
  }),
  fallbackLng: [config.defaultLanguage],
  detection: {
    order: ["path"],
    lookupFromPathIndex: 0,
    checkWhitelist: true,
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ".",
  },
});

export default i18n;
