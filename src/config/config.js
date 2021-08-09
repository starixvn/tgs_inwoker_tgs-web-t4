//const config = require("./config." + process.env.REACT_APP_CUSTOM_NODE_ENV);

const config = {
  baseUrl: window?.env?.baseUrl || "https://dev.operator.tgsdev.gq/api/",
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || "PGG",
  languages: window?.env?.languages
    ? window?.env?.languages
    : [
        { name: "zh-CN", label: "简体" },
        { name: "zh-TW", label: "繁體" },
        { name: "en-US", label: "English" },
        { name: "th-TH", label: "Thai" },
      ],
  defaultLanguage: window?.env?.defaultLanguage || "zh-CN",
  bannerCount: window?.env?.bannerCount || 2,
  theme: window?.env?.theme || "black",
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
};

export default config;
