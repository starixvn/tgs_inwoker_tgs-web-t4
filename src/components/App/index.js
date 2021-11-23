import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { AppHistory } from "../../history/History";
import { withSnackbar } from "notistack";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import {
  GeneralService,
  gameAction,
  walletAction,
  uiAction,
  generalAction,
  accountAction,
  inboxAction,
  SHOW_LOGIN,
} from "@Inwoker/tgs-api";

import BlowFishEncryption from "../../utils/BlowFishEncryption";
import LiveGame from "./LiveGame/index";
import Slots from "./Slots/index";
import SlotPlay from "./Slots/Play";
import Qipai from "./Qipai/index";
import Sports from "./Sports/index";
import SportsPlay from "./Sports/Play";
import Lottery from "./Lottery/index";
import LotteryPlay from "./Lottery/Play";
import Promotion from "./Promotion/index";
import PromotionDetails from "./Promotion/Details";
import Home from "./Home/index";

// import Maintenance from "./Maintenance";
import Account from "./Account/index";

import Header from "./Header";
import Common from "../../utils/Common";
import Footer from "./Footer";
import Loading from "./Loading";
// import RegisterSuccess from "./RegisterSuccess";
import Download from "./Download/index";

// import VIP from "./VIP/index";

import { SupportService } from "@Inwoker/tgs-api";

import i18n from "../../utils/i18n";
import Fishing from "./Fishing";
import Maintenance from "../Share/Maintenance";
import Banned from "./Banned";
import config from "../../config/config";
import FloatPanel from "./Home/FloatPanel";
const baseRouteUrl = Common.baseRouteUrl;
const Main = styled.div`
  min-height: 600px;
`;
const EmptyHeader = styled.div`
  height: 45px;
  background-color: ${(props) => props.theme.primary};
  background: black;
`;
let csWindowTab = null;

class App extends Component {
  state = {
    showCS: false,
    isIpRestrict: false,
    inbox: "",
  };
  async componentDidMount() {
    if (this.props.general.token == "") {
      this.props.getSiteToken();
    } else {
      this.props.getBrandCommunicationList();
      this.props.getMarquee(i18n.language);
      this.props.getLiveChatURL();
      this.props.getBrandLanguage();
      this.props.getBanner();
      this.props.getBrand();
    }

    // if (response.IsSuccess) {
    //   localStorage.setItem("client-token", response.data.token);
    // }
    // this.props.getMobilePrefix();
    //this.props.getMarquee();
    // this.props.getBanner();
    // this.props.getGamePlatformList();
    //this.props.getHomePageGameList();

    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("goto")) {
      const gotoValue = urlParams.get("goto");
      if (gotoValue) {
        window.location.href = gotoValue;
      }
    }
    if (urlParams.has("open")) {
      const openValue = urlParams.get("open");
      if (openValue) {
        AppHistory.replace("/" + i18n.language + "/" + openValue);
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
          localStorage.removeItem("token0");
          break;
        case "login_token":
          const decryptedToken = BlowFishEncryption.Decrypt(
            urlParams.get("token")
          );

          localStorage.setItem("token0", decryptedToken);
          AppHistory.replace("/");
          break;
      }
    } else {
      //  this.props.getWalletBalance();
    }
  }
  async componentDidUpdate(preProps) {
    if (preProps.general.token !== this.props.general.token) {
      if (this.props.general.token == null || this.props.general.token == "") {
        this.props.getSiteToken();
      } else {
        localStorage.setItem("client-token", this.props.general.token);

        const localStorageToken = localStorage.getItem("token0");
        if (
          localStorageToken != null &&
          this.props.account.token == null &&
          this.props.account.info.token === ""
        ) {
          const responseToken = await this.props.checkTokenIsValid();
          if (responseToken.IsSuccess) {
            this.props.getAccountInfo();
            // this.props.checkGame();
            // this.props.getBankList();
            this.props.getBalanceList();
            this.props.getMessageList(i18n.language, 0, 99);
            this.props.getBankCardList();
            this.props.getAutoTransferStatus();

            // if (inbox.IsSuccess) {
            //   this.setState({ inbox: inbox.data });
            // }
            // this.props.getIDCardNo();
            // this.props.getInviteLink();
            // this.props.getDepositChannel();
          }
        }
        //this.props.getMarquee();
        GeneralService.GetLocalization().then((response) => {
          if (response.IsSuccess) {
            ErrorSwitcher.setTranslation(response.data);
          }
        });
        this.props.getHomePageGameList();
        this.props.getBrandCommunicationList();
        this.props.getMarquee(i18n.language);
        this.props.getLiveChatURL();
        this.props.getBrandLanguage();
        this.props.getBanner();
        this.props.getBrand();
      }
    }
    if (
      preProps.game.providerList.length !==
        this.props.game.providerList.length &&
      this.props.account.token !== null
    ) {
      this.props.game.providerList
        .filter((item) => item.status === 0 && item.transferwallet === true)
        .map((a) => {
          this.props.getGameBalance(a.abbreviation);
        });
    }
    if (
      preProps.general.isMaintenance !== this.props.general.isMaintenance &&
      this.props.general.isMaintenance === true
    ) {
      this.props.history.push("/" + i18n.language + "/maintenance");
    }
  }
  GetSupportUrl = (userid, name, question, email) => {
    var newURL = this.props.general.livechat
      ? this.props.general.livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (newURL.length) {
      Common.PopupCenter(newURL, "", 785, 750);
    } else {
    }
  };

  handleShowCSClick = () => {
    this.GetSupportUrl(
      this.props.account.info.member_id,
      this.props.account.info.member_username,
      "",
      this.props.account.info.member_email
    );
  };

  handleDepositClick = () => {
    if (this.props.account.token == null) {
      this.props.showLogin(true);
    } else {
      this.props.history.push("/" + i18n.language + "/account/deposit");
    }
  };

  path = window.location.pathname.split("/");
  maintenance = this.path[2] == "maintenance";

  render() {
    return (
      <Router history={AppHistory}>
        {(() => {
          if (
            (this.state.isIpRestrict ||
              this.props.general.token == "" ||
              this.props.general.token == null) &&
            this.props.general.isMaintenance === false
          ) {
            return <Loading show={true} opacity={1}></Loading>;
          } else {
            return (
              <>
                <Header
                  inbox={this.state.inbox}
                  onhandleShowCSClick={this.handleShowCSClick}
                ></Header>
                <EmptyHeader></EmptyHeader>
                <Main>
                  <Switch>
                    <Route
                      exact
                      path={[
                        baseRouteUrl + "/",
                        baseRouteUrl + "/a/:promotionid",
                        baseRouteUrl + "/t/:promotionid",
                        baseRouteUrl + "/f/:promotionid",
                      ]}
                      render={(props) => (
                        <Home
                          onhandleShowCSClick={this.handleShowCSClick}
                          onhandleDepositClick={this.handleDepositClick}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/live"}
                      component={LiveGame}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/chess"}
                      component={Qipai}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/sports"}
                      component={Sports}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/sports/play/:params/:type"}
                      component={SportsPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/lottery"}
                      component={Lottery}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/lottery/play/:params?"}
                      component={LotteryPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/slots/:platform?"}
                      component={Slots}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/electron/:platform?"}
                      component={Slots}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/fish/:platform?"}
                      component={Slots}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/slots/play/:type/:params"}
                      component={SlotPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/electron/play/:type/:params"}
                      component={SlotPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/fish/play/:type/:params"}
                      component={SlotPlay}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/promotion"}
                      render={(props) => (
                        <Promotion token={this.props.account.token} />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/promotion/:id"}
                      render={(props) => <PromotionDetails />}
                    />
                    {/* <Route
                      exact
                      path={baseRouteUrl + "/vip"}
                      render={(props) => (
                        <VIP vip={this.props.account.vip.curr_vip.title} />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/maintenance"}
                      render={(props) => <Maintenance />}
                    /> 
                    <Route
                      exact
                      path={baseRouteUrl + "/registersuccess/:username"}
                      component={RegisterSuccess}
                    />*/}{" "}
                    <Route
                      exact
                      path={baseRouteUrl + "/maintenance"}
                      render={(props) => (
                        <Maintenance
                          onhandleCSClick={this.GetSupportUrl}
                          brandComm={this.props.getBrandCommunicationList}
                          alert={this.props.enqueueSnackbar}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/banned"}
                      render={(props) => (
                        <Banned onhandleCSClick={this.GetSupportUrl} />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/account/:tab/:popup?"}
                      render={(props) => (
                        <Account
                          token={this.props.account.token}
                          onhandleCSClick={this.GetSupportUrl}
                          inbox={this.state.inbox}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={baseRouteUrl + "/download"}
                      component={Download}
                    />
                    <Redirect to={"/" + i18n.language} />
                  </Switch>
                </Main>
                {config.brand === "HK28" && (
                  <FloatPanel
                    onhandleShowCSClick={this.handleShowCSClick}
                  ></FloatPanel>
                )}

                <Footer target={"_blank"}></Footer>
              </>
            );
          }
        })()}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },

    checkTokenIsValid: () => dispatch(accountAction.checkTokenIsValid()),

    getBankCardList: () => dispatch(walletAction.getBankCardList()),

    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),

    getSiteToken: () => dispatch(generalAction.getSiteToken()),

    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
    getBrandLanguage: () => dispatch(generalAction.getBrandLanguage()),
    getBrand: () => dispatch(generalAction.getBrand()),
    getBanner: () => {
      dispatch(generalAction.getBanner());
    },
    getMarquee: (language) => {
      dispatch(uiAction.getMarquee(language));
    },
    getLiveChatURL: () => dispatch(generalAction.getLiveChatURL()),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(App)));
