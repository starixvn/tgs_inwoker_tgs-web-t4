import axios from "axios";
import { UNAUTHORIZE } from "@Inwoker/tgs-api";
import { AppHistory } from "../history/History";
import i18n from "../utils/i18n";
import Promise from "promise-polyfill";
import { isMobileOnly } from "react-device-detect";
export default {
  setupInterceptors: (store) => {
    // Add a response interceptor
    axios.interceptors.request.use(
      function (config) {
        const client = localStorage.getItem("client-token");
        if (client != null && client != "") {
          config.headers["Authorization"] = "bearer " + client;
        }

        const token = localStorage.getItem(
          "token" + (isMobileOnly ? "1" : "0")
        );
        if (token != null && token != "") {
          config.headers["Token"] = token;
        }
        config.headers["Content-Type"] = "application/json";

        config.headers["Accept-Language"] = localStorage.getItem("i18nextLng");

        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        var newResponse = {
          IsSuccess: false,
          info: response.data.errmsg,
          code: response.data.err,
          data: response.data.data ? response.data.data : response.data,
        };
        if (newResponse.code === 0) {
          AppHistory.replace("/" + i18n.language + "/maintenance");
        }
        if (response.data.url) {
          newResponse.data.url = response.data.url;
        }
        if (response.data.items) {
          newResponse.data = response.data;
          newResponse.IsSuccess = true;
        }
        if (response.data.token) {
          newResponse.data.token = response.data.token;
        }
        if (
          response.config.url.toUpperCase().indexOf("/API/PLAYER/LOGIN") >= 0
        ) {
          localStorage.setItem(
            "token" + (isMobileOnly ? "1" : "0"),
            response.data.token
          );
        }
        if (
          response.config.url.toUpperCase().indexOf("/API/PLAYER/LOGOUT") >= 0
        ) {
          localStorage.removeItem("token" + (isMobileOnly ? "1" : "0"));
        }

        if (newResponse.code === 0) {
          newResponse.IsSuccess = true;
        } else if (newResponse.code === 102 || newResponse.code === 101) {
          localStorage.removeItem("token" + (isMobileOnly ? "1" : "0"));
          store.dispatch({ type: UNAUTHORIZE });

          AppHistory.replace("/" + i18n.language + "/");
        }

        return newResponse;
      },
      function (error) {
        if (error.response) {
          if (
            error.response.data.err == 102 ||
            error.response.data.err == 101 ||
            error.response.data.errmsg ===
              "request platform is not matched with player login platform."
          ) {
            if (
              error.response.config.url.indexOf("Player/Login") < 0 &&
              error.response.config.url.indexOf("player/password") < 0
            ) {
              localStorage.removeItem("token" + (isMobileOnly ? "1" : "0"));
              store.dispatch({ type: UNAUTHORIZE });

              AppHistory.replace("/" + i18n.language + "/");
            }
          }
          return {
            IsSuccess: false,
            info: error.response.data.errmsg,
            code: error.response.data.err,
            data: {},
          };
        } else {
          return {
            IsSuccess: false,
            info: "Internal Server Error",
            code: "",
            data: {},
          };
        }
      }
    );
  },
};
