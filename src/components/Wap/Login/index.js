import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import ButtonSwitch from "./ButtonSwitch";

import IconCheckedPNG from "../../../assets/images/wap/icon-checked.png";
import Textbox from "./Textbox";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { AppHistory } from "../../../history/History";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import {
  accountAction,
  generalAction,
  walletAction,
  gameAction,
  GeneralService,
  inboxAction,
} from "@Inwoker/tgs-api";

import ButtonWap from "../../Share/ButtonWap";
import Loading from "../../Wap/Share/Loading";

import i18n from "../../../utils/i18n";
import BlowFishEncryption from "../../../utils/BlowFishEncryption";
import LoginBgJPG from "../../../assets/images/wap/login-bg.jpg";
import IconUserPNG from "../../../assets/images/wap/icon-user.png";
import IconUnlockPNG from "../../../assets/images/wap/icon-unlock.png";
import IconPromoPNG from "../../../assets/images/wap/icon-promo.png";
import config from "../../../config/config";
const Container = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${LoginBgJPG}) no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const ContentWrap = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 750px;
  padding-bottom: 60px;
`;
const Logo = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/logo/${config.brand}.png`})
    no-repeat center center;
  width: 400px;
  height: 200px;
  margin: 60px auto 60px auto;

  background-size: contain;
`;
const RememberPassContainer = styled.div`
  float: left;
  margin: 10px 0 0 90px;
`;
const RememberPassLabel = styled.div`
  float: left;
  font-size: 28px;
  margin-top: 14px;
  color: ${({ theme }) => theme.secondary};
`;
const CustomCheck = withStyles({
  root: {
    width: "50px",
    height: "50px",
    fontSize: "50px",
    float: "left",
  },
})(Checkbox);
const ForgotPassContainer = styled.div`
  float: righht;
  margin: 10px 100px 0 0;
`;
const ForgotPassLabel = styled(RememberPassLabel)`
  float: right;
`;
const LoginActionContainer = styled.div`
  margin: 100px 0 0 0;
`;

const LanguageWrap = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  margin-top: 20px;
`;
const LanguageLink = styled.span`
  text-align: center;
  ${(props) =>
    props.selected == true ? `color:` + props.theme.primary + `;` : ``}
`;

const Version = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  color: ${({ theme }) => theme.secondary};
`;
class Login extends Component {
  state = {
    selected: 0,
    isUpdate: false,
    hidePassword: true,
    hideConfirmPassword: true,
    username: "",
    password: "",
    withPromo: localStorage.getItem("promotionId") === "" ? false : true,
    promoId: localStorage.getItem("promotionId"),
    promotionChannelId: localStorage.getItem("promotionChannelId"),
    withdrawalPassword: "",
    confirmWithdrawalPassword: "",
    withdrawalPassword: "",
    withdrawalPassword: "",
    confirmPassword: "",
    tnc: true,
    rememberMe: false,
    loading: false,
  };
  componentDidMount() {
    const promotionId = this.props.match.params.promotionid;
    const promotionChannelId = this.props.match.params.promotionchannelid;
    if (!isNaN(promotionId) && !isNaN(promotionChannelId)) {
      GeneralService.AffiliateClick(promotionId, promotionChannelId);
    }

    if (this.props.token != null) {
      AppHistory.replace("/" + i18n.language + "/main/home");
    } else {
      let urlParams = new URLSearchParams(this.props.location.search);
      if (urlParams.has("do")) {
        const doValue = urlParams.get("do");
        switch (doValue) {
          case "login":
          case "login_auth":
            this.handleChangeSelection(0);
            break;
          case "register":
          case "register_auth":
            this.handleChangeSelection(1);
            break;
        }
      } else {
        const username = localStorage.getItem("username");
        const remember = localStorage.getItem("remember");
        if (remember == "true") {
          this.setState({
            ...this.state,

            username: username,
            rememberMe: true,
          });
        } else {
          this.setState({
            ...this.state,
          });
        }
      }
    }
  }
  componentDidUpdate() {}
  handleChangeSelection = (index) => {
    if (this.state.selected !== index) {
      this.setState({
        ...this.state,
        selected: index,
        isUpdate: true,
      });
    }
  };
  handleLoginSuccess = (token) => {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("return_url")) {
      const returnValue = urlParams.get("return_url");
      if (returnValue) {
        window.location.href =
          returnValue + "?token=" + BlowFishEncryption.Encrypt(token);
      }
    }
    // this.props.getAccountInfo(token);
    // this.props.getAccountProfile(token, true);
    // this.props.getVIPInfo(token);
    // this.props.checkGame();
    this.props.getBalanceList();
    // this.props.getIDCardNo();
    // this.props.getDepositChannel();
    // this.props.getInviteLink();
    this.props.getMessageList(1, 99);
    this.props.getBankCardList();
    this.props.getPlayerPromotionList(i18n.language);
    this.props.getAccountInfo();
    if (this.state.rememberMe === true) {
      localStorage.setItem("remember", true);

      localStorage.setItem("username", this.state.username);
    } else {
      localStorage.removeItem("remember");

      localStorage.removeItem("username");
    }
    AppHistory.replace("/" + i18n.language + "/main/home");
  };
  handleBackToHomeClick = () => {
    AppHistory.replace("/" + i18n.language + "/main/home");
  };
  handleLoginClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    this.doLogin(username, password);
  };
  doLogin = (username, password) => {
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyUsername"));
      // this.props.enqueueSnackbar("用户名不能为空", {
      //   variant: "warning"
      // });
      return;
    }
    if (username === "") {
      this.props.alert("", i18n.t("web.login.errorMsg.emptyPassword"));
      // this.props.enqueueSnackbar("密码不能为空", {
      //   variant: "warning"
      // });
      return;
    }
    this.setState({ ...this.state, loading: true });
    this.props.accountLogin(username, password).then((result) => {
      if (result.IsSuccess) {
        this.handleLoginSuccess(result.data);
      } else {
        if (result.data.self_control === 1) {
          this.props.showLogin(false);
          this.setState({
            ...this.state,
            expired_time: result.data.expired_time,
            openSelfControlDialog: true,
            openDialog: false,
            loading: false,
          });
        } else {
          this.props.alert("", i18n.t("common.msgInvalidUsername"));
          // this.props.enqueueSnackbar(result.msg, {
          //   variant: "warning"
          // });
          this.setState({
            ...this.state,

            loading: false,
          });
        }
      }
    });
  };
  handleForgotpasswordClick = () => {
    AppHistory.push("/" + i18n.language + "/forgot-password");
  };
  handleUsernameChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      ...this.state,
      confirmPassword: e.target.value,
    });
  };
  handleWithdrawalPasswordChange = (e) => {
    this.setState({
      ...this.state,
      withdrawalPassword: e.target.value,
    });
  };
  handleConfirmWithdrawalPasswordChange = (e) => {
    this.setState({
      ...this.state,
      confirmWithdrawalPassword: e.target.value,
    });
  };
  handleCodeChange = (e) => {
    this.setState({
      ...this.state,
      promoId: e.target.value,
    });
  };
  handleToggleShow = () => {
    this.setState({ ...this.state, hidePassword: !this.state.hidePassword });
  };
  handleRememberMeChange = (e) => {
    this.setState({ ...this.state, rememberMe: e.target.checked });
  };
  handleToggleConfirmPasswordShow = () => {
    this.setState({
      ...this.state,
      hideConfirmPassword: !this.state.hideConfirmPassword,
    });
  };
  handleTncClick = (e) => {
    this.setState({
      ...this.state,
      tnc: !this.state.tnc,
    });
  };
  handleRegisterClick = () => {
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const withdrawalPassword = this.state.withdrawalPassword;
    const confirmWithdrawalPassword = this.state.confirmWithdrawalPassword;
    const promotion_id = this.state.promoId;
    const promotion_channel_id = this.state.promotionChannelId;
    const tnc = this.state.tnc;
    var expr = /^[a-zA-Z0-9]{6,32}$/;
    if (!expr.test(username)) {
      this.props.alert("", i18n.t("common.msgRegisterUserNameInvalid"));
      return;
    }
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.alert("", i18n.t("common.msgRegisterPassInvalid"));

      return;
    }

    if (password !== confirmPassword) {
      this.props.alert("", i18n.t("common.msgRegisterPassMatchInvalid"));

      return;
    }
    // if (withdrawalPassword.length < 6) {
    //   this.props.alert("", i18n.t("common.msgRegisterWithdrawalPassInvalid"));

    //   return;
    // }
    // if (withdrawalPassword !== confirmWithdrawalPassword) {
    //   this.props.alert("", i18n.t("common.msgRegisterWithdrawalPassMatchInvalid"));

    //   return;
    // }
    if (tnc) {
      this.setState({ ...this.state, loading: true });
      // user_account,
      // user_password,
      // pay_password,
      // mobile,
      // recommend_code,
      // mobile_code_id
      this.props
        .register(username, password, confirmPassword, promotion_id)
        .then(async (response) => {
          if (response.IsSuccess && response.data.isnew === false) {
            this.props.alert("", i18n.t("common.msgAlreadyExist"));
            this.setState({ ...this.state, loading: false });
          } else if (response.IsSuccess) {
            this.doLogin(username, password);
          } else {
            if (response.code === 206) {
              this.props.alert("", i18n.t("common.msgInvalidInvitationCode"));
            } else {
              this.props.alert("", response.info);
            }

            this.setState({ ...this.state, loading: false });
            // this.props.enqueueSnackbar(response.msg, {
            //   variant: "warning"
            // });
          }
        });
    }
  };
  render() {
    return (
      <Container
        style={{ height: this.props.screenHeight }}
        selected={this.state.selected}
      >
        <ContentWrap>
          <Logo></Logo>
          <ButtonSwitch
            handleChangeSelection={this.handleChangeSelection}
            isUpdate={this.state.isUpdate}
            selected={this.state.selected}
          ></ButtonSwitch>
          {(() => {
            if (this.state.selected === 0) {
              return (
                <>
                  <Textbox
                    icon={IconUserPNG}
                    type={"text"}
                    placeholder={i18n.t("common.username")}
                    style={{ marginTop: "60px" }}
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  ></Textbox>

                  <Textbox
                    icon={IconUnlockPNG}
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
                    placeholder={i18n.t("common.password")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>
                  <RememberPassContainer>
                    <CustomCheck
                      style={{ fontSize: "30px" }}
                      icon={
                        <CircleUnchecked
                          style={{ color: "#404040", fontSize: "38px" }}
                        />
                      }
                      checkedIcon={
                        <img src={IconCheckedPNG} style={{ width: "40px" }} />
                      }
                      checked={this.state.rememberMe}
                      onChange={this.handleRememberMeChange}
                    />
                    <RememberPassLabel>
                      {i18n.t("wap.login.rememberMe")}
                    </RememberPassLabel>
                  </RememberPassContainer>
                  <ForgotPassContainer onClick={this.handleForgotpasswordClick}>
                    <ForgotPassLabel>
                      {i18n.t("wap.login.forgetPass")}
                    </ForgotPassLabel>
                  </ForgotPassContainer>
                  <LoginActionContainer>
                    <ButtonWap
                      name={i18n.t("common.login")}
                      onClick={this.handleLoginClick}
                    ></ButtonWap>
                    <ButtonWap
                      styledtype={"2"}
                      name={i18n.t("wap.login.browse")}
                      style={{ "margin-top": "10px" }}
                      onClick={this.handleBackToHomeClick}
                    ></ButtonWap>
                  </LoginActionContainer>
                  <LanguageWrap>
                    {config.languages.map((lang, index) => {
                      return (
                        <>
                          <LanguageLink
                            selected={i18n.language === lang.name}
                            onClick={() => {
                              window.location.href = `/${lang.name}`;
                            }}
                          >
                            {lang.label}
                          </LanguageLink>

                          {index < config.languages.length - 1 ? (
                            <LanguageLink> | </LanguageLink>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </LanguageWrap>
                </>
              );
            } else {
              return (
                <>
                  <Textbox
                    icon={IconUserPNG}
                    type={"text"}
                    placeholder={i18n.t("wap.register.username")}
                    style={{ marginTop: "60px" }}
                    maxLength="32"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  ></Textbox>

                  <Textbox
                    icon={IconUnlockPNG}
                    type={this.state.hidePassword ? "password" : "text"}
                    hidePassword={this.state.hidePassword}
                    placeholder={i18n.t("wap.register.password")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleShow}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></Textbox>
                  <Textbox
                    icon={IconUnlockPNG}
                    type={this.state.hideConfirmPassword ? "password" : "text"}
                    hidePassword={this.state.hideConfirmPassword}
                    placeholder={i18n.t("wap.register.confirmPassword")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    maxLength="20"
                    toggleShow={this.handleToggleConfirmPasswordShow}
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                  ></Textbox>
                  {/* <Textbox
                    icon={IconPiggyPNG}
                    type={
                      this.state.hideWithdrawalPassword ? "password" : "text"
                    }
                    hidePassword={this.state.hideWithdrawalPassword}

                    placeholder={i18n.t("wap.register.withdrawalPassword")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    toggleShow={this.handleToggleWithdrawalPasswordShow}
                    value={this.state.withdrawalPassword}
                    onChange={this.handleWithdrawalPasswordChange}
                  ></Textbox>
                  <Textbox
                    icon={IconPiggyPNG}
                    type={
                      this.state.hideConfirmWithdrawalPassword
                        ? "password"
                        : "text"
                    }
                    hidePassword={this.state.hideConfirmWithdrawalPassword}

                    placeholder={i18n.t("wap.register.confirmWithdrawalPassword")}
                    style={{ marginTop: "20px" }}
                    password={true}
                    toggleShow={this.handleToggleConfirmWithdrawalPasswordShow}
                    value={this.state.confirmWithdrawalPassword}
                    onChange={this.handleConfirmWithdrawalPasswordChange}
                  ></Textbox> */}
                  <Textbox
                    icon={IconPromoPNG}
                    type={"text"}
                    placeholder={i18n.t("wap.register.promoteCode")}
                    style={{ marginTop: "20px" }}
                    value={this.state.promoId}
                    onChange={this.handleCodeChange}
                    disabled={this.state.withPromo ? true : false}
                  ></Textbox>

                  <ButtonWap
                    style={{ margin: "100px auto 0 auto" }}
                    name={i18n.t("common.register")}
                    onClick={this.handleRegisterClick}
                  ></ButtonWap>
                </>
              );
            }
          })()}
        </ContentWrap>

        <Version>
          Version {process.env.REACT_APP_VERSION} (
          {process.env.REACT_APP_CUSTOM_NODE_ENV})
        </Version>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    screenHeight: state.ui.screenHeight,
    token: state.account.token,
    mobilePrefix: state.general.mobilePrefix,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch({ type: "close" });
    },
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    checkGame: () => dispatch(accountAction.checkGame()),
    getAccountProfile: (token, showVip) =>
      dispatch(accountAction.getAccountProfile(token, showVip)),
    register: (
      user_account,
      user_password,
      pay_password,
      mobile,
      recommend_code,
      mobile_code_id
    ) =>
      dispatch(
        accountAction.registerAccount(
          user_account,
          user_password,
          pay_password,
          mobile,
          recommend_code,
          mobile_code_id
        )
      ),
    getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getMessageList: (pages, limit) =>
      dispatch(inboxAction.getMessages(pages, limit, true, true)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withRouter(Login)));
