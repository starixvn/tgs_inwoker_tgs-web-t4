import i18n from "./i18n";

export const errorSwitcher = (err, info = "") => {
  switch (err) {
    case 101:
      return i18n.t("error.ERR101");
    case 201:
      return i18n.t("error.ERR201");
    case 202:
      return i18n.t("error.ERR202");
    case 401:
      return i18n.t("error.ERR401");
    default:
      return info;
  }
};
