//const config = require("./config." + process.env.REACT_APP_CUSTOM_NODE_ENV);
import { isMobileOnly } from "react-device-detect";

var template = 4; //2 for T2, 3 for T3 (based on .xd file)

const config = {
  baseUrl: window?.env ? "/api/" : "https://dev-t1.rpgp.cc/api/",
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || "HKJP",
  languages: window?.env?.languages
    ? window?.env?.languages
    : [
        { name: "zh-CN", label: "简体" },
        { name: "zh-TW", label: "繁體" },
        { name: "en-US", label: "English" },
        { name: "th-TH", label: "Thai" },
      ],
  bannerCount: window?.env?.bannerCount || 2,
  wapVersion: template,
  theme: isMobileOnly ? `wapT${template}` : window?.env?.theme || "black",

  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
};

export default config;
