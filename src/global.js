import { createGlobalStyle } from "styled-components";
import i18n from "./utils/i18n";
import "./assets/fonts/notosans/notosans-sc/css.css";
import "./assets/fonts/notosans/notosans-tc/css.css";

const languageSwitcher = (language) => {
  switch (language) {
    case "en-US":
      return `Arial`;
    case "zh-CN":
      return `'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'`;
    case "zh-TW":
      return `'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'`;
    case "th-TH":
      return ``;
    case "vi-VN":
      return ``;
  }
};

export const GlobalStyles = createGlobalStyle`
* {
  font-family: ${languageSwitcher(i18n.language)};
}
 

  body {
    background: ${({ theme }) => theme.bodyBackground};
    background-size: 100%;
  }


`;
