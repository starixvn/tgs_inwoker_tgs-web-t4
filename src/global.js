import { createGlobalStyle } from "styled-components";
import i18n from "./utils/i18n";

const languageSwitcher = (language) => {
  switch (language) {
    case "en-US":
      return `Arial`;
    case "zh-CN":
      return `"Microsoft JhengHei", "微軟正黑體", "Arial"`;
    case "zh-TW":
      return `"Microsoft JhengHei", "微軟正黑體"`;
    case "th-TH":
      return ``;
  }
};

export const GlobalStyles = createGlobalStyle`
  @media (max-width: 800px) {
    * {
      font-family: ${languageSwitcher(i18n.language)};
    }
  }
 

  body {
    background: ${({ theme }) => theme.bodyBackground};
    background-size: 100%;
  }


`;
