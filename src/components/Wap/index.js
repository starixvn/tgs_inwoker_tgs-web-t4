import React, { Component } from "react";

import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router";
import { AppHistory } from "../../history/History";
import { withRouter } from "react-router-dom";

import {
  UPDATING_SCREEN_SIZE,
  SHOW_LOGIN,
  uiAction,
  gameAction,
  generalAction,
  walletAction,
  accountAction,
  inboxAction,
} from "@Inwoker/tgs-api";
import debounce from "lodash.debounce";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Wapp, setConfigApi, seti18n } from "@Inwoker/tgs-wap-t1";

import Loading from "./Share/Loading";

import Main from "./Main/index";

import config from "../../config/config";
import Login from "./Login/index";
import Slot from "./Slot/index";
import Profile from "./Profile/index";

import NameVefiry from "./Profile/NameVerify";
import WeChat from "./Profile/WeChat";
import QQ from "./Profile/QQ";
import Email from "./Profile/Email";
import ChangeEmail from "./Profile/ChangeEmail";
import ChangePhone from "./Profile/ChangePhone";
import Phone from "./Profile/Phone";
import ChangePassword from "./Profile/ChangePassword";

import WithdrawalPassword from "./Profile/WithdrawalPassword";
import ChangeWithdrawalPassword from "./Profile/ChangeWithdrawalPassword";
import ResetWithdrawalPassword from "./Profile/ResetWithdrawalPassword";

import Promotion from "./Promotion/index";
import PromotionDetails from "./Promotion/Details";

import Aboutus from "./Aboutus/index";

import Inbox from "./Inbox/index";
import InboxDetails from "./Inbox/Details";

import Transfer from "./Transfer/index";

import Withdrawal from "./Withdrawal/index";
import WithdrawalDetails from "./Withdrawal/Details";
import Deposit from "./Deposit/index";
import DepositPayment from "./Deposit/Payment";
import DepositDetails from "./Deposit/Details";
import DepositManual from "./Deposit/Manual";

import Card from "./Card/index";
import AddCard from "./Card/AddCard";
// import NameVerification from "./Card/NameVerification";
// import PassSetting from "./Card/PassSetting";

import Report from "./Report/index";
import { SupportService } from "@Inwoker/tgs-api";
// import CustomerService from "./CustomerService/index";
import CustomerServiceChat from "./CustomerService/index";

import ForgotPassword from "./ForgotPassword/index";

import SettingLanguage from "./Setting/Language";

import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import styled from "styled-components";
import i18n from "../../utils/i18n";
import BlowFishEncryption from "../../utils/BlowFishEncryption";
import Common from "../../utils/Common";

const baseRouteUrl = Common.baseRouteUrl;

const StyledModal = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "500px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 20px 45px;
  color: #4a4a4a;
`;
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;
const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;
const ButtonCancel = styled(ButtonConfirm)``;
const RouteMapping = [
  {
    path: "/",
    component: Wapp.Login,
    alert: true,
  },
  {
    path: "/a/:promotionid",
    component: Wapp.Login,
    alert: true,
  },
  {
    path: "/t/:promotionid",
    component: Wapp.Login,
    alert: true,
  },
  {
    path: "/f/:promotionid",
    component: Wapp.Login,
    alert: true,
  },
  {
    path: "/main/:page",
    component: Wapp.Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/profile",
    component: Wapp.Profile,
    alert: true,
  },
  {
    path: "/profile/name",
    component: Wapp.NameVefiry,
    alert: true,
  },
  {
    path: "/profile/wechat",
    component: Wapp.WeChat,
    alert: true,
  },
  {
    path: "/profile/qq",
    component: Wapp.QQ,
    alert: true,
  },
  {
    path: "/profile/email",
    component: Wapp.Email,
    alert: true,
  },
  {
    path: "/profile/changeemail",
    component: Wapp.ChangeEmail,
    alert: true,
  },
  {
    path: "/profile/changephone",
    component: Wapp.ChangePhone,
    alert: true,
  },
  {
    path: "/profile/phone",
    component: Wapp.Phone,
    alert: true,
  },
  {
    path: "/profile/changepassword",
    component: Wapp.ChangePassword,
    alert: true,
  },
  {
    path: "/profile/withdrawalpassword",
    component: Wapp.WithdrawalPassword,
    alert: true,
  },
  {
    path: "/profile/resetwithdrawalpassword",
    component: Wapp.ResetWithdrawalPassword,
    alert: true,
  },
  {
    path: "/profile/changewithdrawalpassword",
    component: Wapp.ChangeWithdrawalPassword,
    alert: true,
  },

  {
    path: "/slots/:platform?/:type?",
    component: Wapp.Slot,
    alert: true,
    navigate: true,
  },
  {
    path: "/promotion-list",
    component: Wapp.Promotion,
    alert: true,
    navigate: true,
  },
  {
    path: "/promotion/:id?",
    component: Wapp.PromotionDetails,
    alert: true,
    navigate: true,
    promoProps: true,
  },
  {
    path: "/aboutus",
    component: Wapp.Aboutus,
    alert: true,
    navigate: true,
  },

  {
    path: "/inbox",
    component: Wapp.Inbox,
    alert: true,
    navigate: true,
  },
  {
    path: "/inbox/details/:id",
    component: Wapp.InboxDetails,
    alert: true,
    navigate: true,
    screenHeight: true,
  },
  {
    path: "/transfer",
    component: Wapp.Transfer,
    alert: true,
    navigate: true,
  },
  {
    path: "/withdrawal",
    component: Wapp.Withdrawal,
    alert: true,
    navigate: true,
  },
  {
    path: "/withdrawal/details",
    component: Wapp.WithdrawalDetails,
    alert: true,
    navigate: true,
  },

  {
    path: "/deposit/:promotionid?",
    component: Wapp.Deposit,
    alert: true,
    navigate: true,
  },
  {
    path: "/deposit/payment/:id/:bank/:amount/:bonus?",
    component: Wapp.DepositPayment,
    alert: true,
    navigate: true,
  },
  {
    path: "/deposit/details",
    component: Wapp.DepositDetails,
    alert: true,
  },
  {
    path: "/deposit/manual",
    component: Wapp.DepositManual,
    alert: true,
  },
  {
    path: "/card",
    component: Wapp.Card,
    alert: true,
    navigate: true,
  },
  {
    path: "/card/add",
    component: Wapp.AddCard,
    alert: true,
    navigate: true,
  },
  // {
  //   path: "/card/name",
  //   component: NameVerification,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/card/pass",
  //   component: PassSetting,
  //   alert: true,
  //   navigate: true,
  // },

  {
    path: "/report/:tab?",
    component: Wapp.Report,
    alert: true,
    navigate: true,
  },
  // {
  //   path: "/customer-service",
  //   component: CustomerService,
  //   alert: true,
  //   navigate: true,
  //   popup: true,
  // },
  {
    path: "/chat/:userid?/:name?/:question?",
    component: Wapp.CustomerServiceChat,
  },
  {
    path: "/forgot-password",
    component: Wapp.ForgotPassword,
    alert: true,
  },
  // {
  //   path: "/forgot-password/option",
  //   component: ForgotPasswordStep2,
  //   alert: true,
  // },
  // {
  //   path: "/forgot-password/reset",
  //   component: ForgotPasswordReset,
  //   alert: true,
  // },

  //{
  //  path: "/affiliate",
  //  component: Affiliate,
  //  navigate: true,
  //},
  //{
  //  path: "/affiliate/member",
  //  component: AffiliateMember,
  //  screenHeight: true,
  //},
  //{
  //  path: "/affiliate/report",
  //  component: AffiliateReport,
  //  screenHeight: true,
  //},
  //{
  //  path: "/affiliate/guide",
  //  component: AffiliateGuide,
  //  screenHeight: true,
  //},
  {
    path: "/setting/language",
    component: Wapp.SettingLanguage,
    screenHeight: true,
  },
  {
    path: "/maintenance",
    component: Wapp.Maintenance,
    navigate: true,
  },
];
class Wap extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showCS: false,
    isIpRestrict: false,
    open: false,
    openPopup: false,
    popupUrl: "",
    title: "",
    message: "",
    loading: true,
  };
  GetSupportUrl = (userid, name, question) => {
    var response = SupportService.GetLiveSupport(
      userid,
      name,
      question,
      document.URL,
      document.referrer
    );
    window.open(response.data.online, "_blank");
  };
  updateScreenSize = () => {
    var w = window.screen.width;
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    const scale = w / 750;

    this.props.updateScreenSize(w, h, scale);
  };
  async componentDidMount() {
    seti18n(i18n);
    setConfigApi(config);
    Common.loadScript("/js/config.js", () => {
      Common.loadScript("/js/iovation.js", () => {});
    });
    let promotionId = "";

    if (this.props.match.path === "/:locale(zh-CN|zh-TW|en-US)/") {
      const param = this.props.location.pathname.split("/");

      if (param.length === 4) {
        if (param[2] === "a") {
          promotionId = param[3] || "";
        }
      }
    }

    localStorage.setItem("promotionId", promotionId);

    window.addEventListener(
      "resize",
      debounce(() => {
        this.updateScreenSize();
      }, 200)
    );

    this.updateScreenSize();
    // const response = await GeneralService.CheckIPRestrict();

    // if (response.code === 50000) {
    //   AppHistory.replace({
    //     pathname: "/" + i18n.language + "/ip-restrict-mobile",
    //     search: "?query=error",
    //     state: { ip: response.data.ip },
    //   });
    //   this.setState({ ...this.state, isIpRestrict: true, loading: false });
    // } else {
    if (this.props.general.token == "") {
      this.props.getSiteToken();
    }
    // this.props.getMobilePrefix();
    //this.props.getMarquee();
    // this.props.getBanner();
    // this.props.getBankList();
    //this.props.getHomePageGameList();
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("goto")) {
      const gotoValue = urlParams.get("goto");
      if (gotoValue) {
        window.location.href = gotoValue;
      }
    }

    if (urlParams.has("do")) {
      const doValue = urlParams.get("do");

      switch (doValue) {
        case "login":
        case "logout":
        case "register":
        case "login_auth":
        case "register_auth":
          localStorage.removeItem("token1");
          break;
        case "login_token":
          const decryptedToken = BlowFishEncryption.Decrypt(
            urlParams.get("token")
          );

          localStorage.setItem("token1", decryptedToken);
          AppHistory.replace("/");
          break;
      }
    }
    const localStorageToken = localStorage.getItem("token1");
    if (
      localStorageToken != null &&
      this.props.account.token == null &&
      this.props.account.info.token === ""
    ) {
      const responseToken = await this.props.checkTokenIsValid(
        localStorageToken
      );
      if (responseToken.IsSuccess) {
        // document
        //   .getElementById("ioBB")
        //   .parentNode.removeChild(document.getElementById("ioBB"));
        // this.props.checkGame();
        this.props.getAccountProfile(true);
        // const responseVIP = await this.props.getVIPInfo(
        //   responseToken.data.token
        // );
        this.props.getBalanceList();
        this.props.getMessageList(i18n.language, 1, 99);
        this.props.getBankCardList();

        // this.props.getIDCardNo();
        //this.props.getDepositChannel();

        // this.props.getInviteLink();
      }
    }
    this.setState({ ...this.state, loading: false });
    //}
    window.addEventListener("focus", this.onFocus);
    // let GAScript = `<script  async  src="https://www.googletagmanager.com/gtag/js?id=UA-156359717-1"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag() {
    //     dataLayer.push(arguments);
    //   }
    //   gtag("js", new Date());

    //   gtag("config", "UA-156359717-1");
    // </script>`;

    // if (process.env.REACT_APP_CUSTOM_NODE_ENV != "development") {
    //   var e = document.createElement("div");
    //   e.innerHTML = GAScript;
    //   document.body.appendChild(e);
    // }
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.onFocus);
  }
  onFocus = () => {
    if (this.props.account.token !== null) {
      this.props.getBalanceList();
    }
  };
  componentDidUpdate(preProps) {
    if (preProps.general.token !== this.props.general.token) {
      if (this.props.general.token == null || this.props.general.token == "") {
        this.props.getSiteToken();
      } else {
        localStorage.setItem("client-token", this.props.general.token);
        //this.props.getMarquee(i18n.language);
        this.props.getHomePageGameList();
      }
    }
  }
  handleNavigate = (page) => {
    if (
      page.indexOf("/promotion") > -1 ||
      page.indexOf("/customer-service") > -1 ||
      page.indexOf("/main/home") > -1 ||
      page.indexOf("/slot") > -1
    ) {
      page = "/" + i18n.language + page;
    } else {
      if (this.props.account.token == null) {
        page = "/" + i18n.language + "/";
      } else {
        page = "/" + i18n.language + page;
      }
    }

    AppHistory.push(page);
  };
  handleAlert = (title, message) => {
    this.setState({
      ...this.state,
      title: title,
      message: message,
      open: true,
    });
  };
  handlePopup = (url) => {
    this.setState({
      ...this.state,
      popupUrl: url,
      openPopup: true,
    });
  };
  handleOpenPopupUrl = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
    window.open(this.state.popupUrl, "_blank");
  };
  handleClosePopup = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
  };

  render() {
    const scale = this.props.screenWidth / 750;

    document
      .getElementById("viewport")
      .setAttribute(
        "content",
        "width=750, initial-scale=" +
          scale +
          ", minimum-scale=" +
          scale +
          ", maximum-scale=" +
          scale +
          ", user-scalable=no"
      );

    if (
      this.state.loading === true ||
      this.props.general.token == "" ||
      this.props.general.token == null
    ) {
      return <Loading show={this.state.loading}></Loading>;
    } else {
      return (
        <>
          <Router history={AppHistory}>
            <Switch>
              {RouteMapping.map((row, index) => {
                let propsObj = {};
                if (row.alert === true) {
                  propsObj["alert"] = this.handleAlert;
                }
                if (row.navigate === true) {
                  propsObj["navigate"] = this.handleNavigate;
                }
                if (row.popup === true) {
                  propsObj["popup"] = this.handlePopup;
                }
                if (row.screenHeight === true) {
                  propsObj["screenHeight"] = this.props.screenHeight;
                }
                propsObj["GetSupportUrl"] = this.GetSupportUrl;
                propsObj["appHistory"] = AppHistory;
                return (
                  <Route
                    exact
                    key={index}
                    path={baseRouteUrl + row.path}
                    render={(props) => {
                      if (row.path === "/deposit/manual") {
                        propsObj["order"] = props.location.state;
                      }
                      if (row.path === "/ip-restrict-mobile") {
                        propsObj["ip"] =
                          props.location.state != null
                            ? props.location.state.ip
                            : null;
                      }
                      if (row.path === "/promotion/:activityId?") {
                        propsObj["promo"] =
                          props.location.state != null
                            ? props.location.state.promo
                            : null;
                      }
                      if (row.path === "/deposit/details") {
                        propsObj["order"] = props.location.state;
                        {
                          /* propsObj["form"] =
                          props.location.state != null
                            ? props.location.state.form
                            : null; */
                        }
                      }
                      if (row.path === "/withdrawal/details") {
                        propsObj["order"] =
                          props.location.state != null
                            ? props.location.state.order
                            : null;
                      }
                      if (row.path === "/chat/:userid?/:name?/:question?") {
                        propsObj["login"] =
                          props.location.state != null
                            ? props.location.state.login
                            : null;
                      }
                      if (row.path === "/forgot-password/option") {
                        propsObj["details"] =
                          props.location.state != null
                            ? props.location.state.details
                            : null;
                      }
                      if (row.path === "/forgot-password/reset") {
                        propsObj["forget_token"] =
                          props.location.state != null
                            ? props.location.state.forget_token
                            : null;
                      }
                      if (row.path === "/card/name") {
                        propsObj["from"] =
                          props.location.state != null
                            ? props.location.state.from
                            : null;
                      }
                      return <row.component {...propsObj}></row.component>;
                    }}
                  />
                );
              })}
            </Switch>
          </Router>
          <StyledModal onClose={this.handleClose} open={this.state.open}>
            <DialoTitle>{this.state.title}</DialoTitle>
            <DialoMessage>{this.state.message}</DialoMessage>
            {(() => {
              if (this.state.message === "无法连接，请检查您的网络") {
                return (
                  <ButtonConfirm onClick={() => window.location.reload()}>
                    {i18n.t("common.reload")}
                  </ButtonConfirm>
                );
              } else {
                return (
                  <ButtonConfirm
                    onClick={() =>
                      this.setState({ ...this.state, open: false })
                    }
                  >
                    {i18n.t("common.confirm")}
                  </ButtonConfirm>
                );
              }
            })()}
          </StyledModal>
          <StyledModalPopup
            onClose={this.handleClosePopup}
            open={this.state.openPopup}
          >
            <DialoMessage>{i18n.t("common.msgPopupBlocker")}</DialoMessage>
            <ButtonCancel
              onClick={this.handleOpenPopupUrl}
              style={{ float: "left" }}
            >
              {i18n.t("common.confirm")}
            </ButtonCancel>
            <ButtonCancel
              onClick={this.handleClosePopup}
              style={{ float: "right" }}
            >
              {i18n.t("common.cancel")}
            </ButtonCancel>
          </StyledModalPopup>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateScreenSize: (width, height) => {
      dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },

    getAccountProfile: (showVip) =>
      dispatch(accountAction.getAccountProfile(showVip)),
    // checkGame: () => dispatch(accountAction.checkGame()),
    getMobilePrefix: () => dispatch(generalAction.getMobilePrefix()),
    checkTokenIsValid: () => dispatch(accountAction.checkTokenIsValid()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),

    // getBanner: () => dispatch(uiAction.getBanner()),
    // getBankList: () => dispatch(walletAction.getBankList()),
    // getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    // getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getSiteToken: () => dispatch(generalAction.getSiteToken()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wap));
