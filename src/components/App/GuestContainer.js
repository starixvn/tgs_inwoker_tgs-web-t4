import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Login from "./Login";
import { AppHistory } from "../../history/History";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import Activation from "./Activation";
import ResetPassword from "./ResetPassword";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import config from "../../config/config";
import {
  accountAction,
  walletAction,
  gameAction,
  inboxAction,
  generalAction,
  AccountService,
  SHOWING_DIALOG,
  SHOW_LOGIN,
} from "@Inwoker/tgs-api";

import Register from "./Register";

import { withSnackbar } from "notistack";

import BlowFishEncryption from "../../utils/BlowFishEncryption";
import i18n from "../../utils/i18n";
const Container = styled.div`
  margin-top: 5px;
`;
const BtnLoginRegister = styled.div`
  float: right;
  font-size: 12px;
  text-align: center;
  min-width: 70px;
  height: 25px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const BtnRegister = styled(BtnLoginRegister)`
  margin-left: 5px;
  margin-right: 10px;
  padding: 0px 5px;
  background-color: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.tertiaryText};
`;

const BtnLogin = styled(BtnLoginRegister)`
  margin-right: 5px;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.secondaryText};
`;

const BtnLoginRegisterLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 4px;
`;
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);

class GuestContainer extends Component {
  state = {
    openDialog: false,
    openDialogName: "",
    forgotToken: "",
    emailCheck: -1,
    phoneCheck: -1,
    questionCheck: -1,
    openSelfControlDialog: false,
    code: "",
    phone: "",
    email: "",
    securityKey: "",
    username: "",
    pass: "",
  };
  componentDidMount() {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("do")) {
      const doValue = urlParams.get("do");
      switch (doValue) {
        case "login":
        case "login_auth":
          this.handleClickOpenDialog("login");
          break;
        case "register":
        case "register_auth":
          this.onhandleRegister();
          break;
      }
    }
  }
  componentWillUnmount() {
    this.setState({
      ...this.state,
      openDialog: false,
      openDialogName: "",
    });
    this.props.showLogin(false);
    this.props.showDialog(false);
  }
  handleClickOpenDialog = (dialogName) => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: dialogName,
    });
    this.props.showLogin(true);
  };

  onhandleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
    this.props.showLogin(false);
  };

  // onhandleLoginSuccess = token => {
  //   this.props.handleLoginSuccess(token);
  //   this.setState({ ...this.state, openDialog: false });
  //   this.props.showLogin(false);
  // };
  onhandleRegister = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "register",
    });
    this.props.showLogin(false);
  };
  onhandleActivation = (username = "", pass = "") => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "activation",
      username: username,
      pass: pass,
    });
    this.props.showLogin(false);
  };

  onhandleForgotPassword = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "forgotpassword",
    });
    this.props.showLogin(false);
  };

  // onhandleForgotPasswordNext = (username, code, sessionId) => {
  //   AccountService.GetResetPasswordStep1(username, code, sessionId).then(
  //     (response) => {
  //       if (response.IsSuccess) {
  //         this.setState({
  //           ...this.state,
  //           openDialog: true,
  //           question: response.data.question,
  //           forgotToken: response.data.forget_token,
  //           emailCheck: response.data.email_check,
  //           phoneCheck: response.data.phone_check,
  //           questionCheck: response.data.question_check,
  //           openDialogName: "forgotpasswordoption",
  //         });
  //       } else {
  //         this.props.enqueueSnackbar(response.msg, {
  //           variant: "error",
  //         });
  //       }
  //     }
  //   );
  // };
  onhandleOptionClick = (method) => {
    let dialogName = "";

    if (method === "question") {
      dialogName = "forgotpasswordsecurityquestion";
      if (this.state.questionCheck !== 1) {
        return;
      }
    } else if (method === "phone") {
      dialogName = "forgotpasswordphone";
      if (this.state.phoneCheck !== 1) {
        return;
      }
    } else if (method === "email") {
      dialogName = "forgotpasswordemail";
      if (this.state.emailCheck !== 1) {
        return;
      }
    }
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: dialogName,
    });
  };
  onhandleResetPasswordSuccessClick = () => {
    this.setState({
      ...this.state,
      openDialog: false,
      openDialogName: "",
    });
  };
  onhandleResetPasswordClick = (
    code,
    phone,
    securityKey,
    password,
    confirmPassword
  ) => {
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "warning",
      });
      return;
    }
    if (password !== confirmPassword) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidConfirmPass"), {
        variant: "error",
      });
      return;
    }
    AccountService.ResetPassword(securityKey, code, password).then(
      (response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            openDialog: true,
            openDialogName: "resetpasswordsuccess",
          });
        } else {
          this.props.enqueueSnackbar(response.info, {
            variant: "error",
          });
        }
      }
    );
  };
  onhandleForgotPasswordBackClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "forgotpasswordoption",
    });
  };
  // onhandleForgotPasswordSecurityQuestionNext = (answer) => {
  //   if (answer !== "") {
  //     AccountService.GetResetPasswordSecurityQuestionVerify(
  //       this.state.forgotToken,
  //       answer
  //     ).then((response) => {
  //       if (response.IsSuccess) {
  //         this.setState({
  //           ...this.state,
  //           openDialog: true,
  //           openDialogName: "resetpassword",
  //         });
  //       } else {
  //         this.props.enqueueSnackbar(response.msg, {
  //           variant: "error",
  //         });
  //       }
  //     });
  //   }
  // };
  // onhandleForgotPasswordEmailClick = (code) => {
  //   if (code !== "") {
  //     AccountService.GetResetPasswordEmailVerify(
  //       this.state.forgotToken,
  //       code
  //     ).then((response) => {
  //       if (response.IsSuccess) {
  //         this.setState({
  //           ...this.state,
  //           openDialog: true,
  //           openDialogName: "resetpassword",
  //         });
  //       } else {
  //         this.props.enqueueSnackbar(response.info, {
  //           variant: "error",
  //         });
  //       }
  //     });
  //   }
  // };
  onhandleResetPasswordBackClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "forgotpassword",
    });
  };
  onhandleForgotPasswordPhoneClick = (code, phone, securityKey) => {
    if (code !== "") {
      this.setState({
        ...this.state,
        code: code,
        phone: phone,
        securityKey: securityKey,
        openDialog: true,
        openDialogName: "resetpassword",
      });
    }
  };

  onhandleForgotPasswordEmailClick = (code, email, securityKey) => {
    if (code !== "") {
      this.setState({
        ...this.state,
        code: code,
        email: email,
        securityKey: securityKey,
        openDialog: true,
        openDialogName: "resetpassword",
      });
    }
  };

  handleLoginClick = async (username, password) => {
    if (username === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyUsername"), {
        variant: "warning",
      });
      return;
    }
    if (password === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyPassword"), {
        variant: "warning",
      });
      return;
    }
    const result = await this.props.accountLogin(username, password);

    //TODO: Temporary fix modal close when found wrong password.

    if (result.code === 101 && result.IsSuccess === false) {
      this.props.showLogin(true);
    } else if (result.code === 210) {
      this.onhandleCloseDialog();
      AppHistory.replace("/" + i18n.language + "/banned");
    } else {
    }
    if (result.IsSuccess) {
      this.handleLoginSuccess(result.data);
    } else {
      this.props.enqueueSnackbar(result.info, {
        variant: "warning",
      });
      // this.props.enqueueSnackbar(i18n.t("common.msgInvalidUsername"), {
      //   variant: "warning",
      // });

      // if (result.data.self_control === 1) {
      //   this.props.showLogin(false);
      //   this.setState({
      //     ...this.state,
      //     expired_time: result.data.expired_time,
      //     openSelfControlDialog: true,
      //     openDialog: false,
      //   });
      // } else {
      //   this.props.enqueueSnackbar(result.info, {
      //     variant: "warning",
      //   });
      // }
    }
  };
  handleCloseSelfControlDialog = (token) => {
    this.setState({ ...this.state, openSelfControlDialog: false });
  };
  handleLoginSuccess = (token) => {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("return_url")) {
      const returnValue = urlParams.get("return_url");
      if (returnValue) {
        window.location.href =
          returnValue + "?token=" + BlowFishEncryption.Encrypt(token);
      }
    } else {
      // this.props.checkGame();

      this.props.getAccountInfo();
      this.props.getMessageList(i18n.language, 0, 99);
      this.props.getBankCardList();
      this.props.getBalanceList();
      this.props.getAutoTransferStatus();
      this.props.game.providerList
        .filter((item) => item.status === 0 && item.transferwallet === true)
        .map((a) => {
          this.props.getGameBalance(a.abbreviation);
        });
      // this.props.getIDCardNo();
      // this.props.getInviteLink();
      // this.props.getDepositChannel();
    }
  };
  onhandleOnlineSupport = () => {
    this.setState({ ...this.state, openDialog: false });
    this.props.showLogin(false);
    this.props.onhandleShowCSClick();
  };
  onhandleContactUs = () => {
    this.setState({ ...this.state, openDialog: false });
    this.props.showLogin(false);
    this.props.onhandleContactUsClick();
  };
  onhandleActivation = (username = "", pass = "") => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "activation",
      username: username,
      pass: pass,
    });
    this.props.showLogin(false);
  };

  handleRegisterSuccess = (username, pass) => {
    this.onhandleActivation(username, pass);
  };
  render() {
    return (
      <Container>
        {(() => {
          if (config.brand === "HKJP" || config.brand === "GPI") {
            return (
              <React.Fragment>
                <BtnRegister onClick={() => this.onhandleActivation()}>
                  <BtnLoginRegisterLabel>
                    {i18n.t("web.register.activation")}
                  </BtnLoginRegisterLabel>
                </BtnRegister>
              </React.Fragment>
            );
          }
        })()}
        <BtnRegister onClick={() => this.onhandleRegister()}>
          <BtnLoginRegisterLabel>
            {i18n.t("common.register")}
          </BtnLoginRegisterLabel>
        </BtnRegister>

        <BtnLogin onClick={() => this.handleClickOpenDialog("login")}>
          <BtnLoginRegisterLabel>
            {i18n.t("common.login")}
          </BtnLoginRegisterLabel>
        </BtnLogin>
        <StyledDialog
          open={this.state.openDialog || this.props.ui.showLogin}
          onClose={this.onhandleCloseDialog}
          onEntering={() => this.props.showDialog(true)}
          onExited={() => this.props.showDialog(false)}
        >
          {(() => {
            if (
              this.state.openDialogName === "login" ||
              this.props.ui.showLogin === true
            ) {
              return (
                <Login
                  onhandleClose={this.onhandleCloseDialog}
                  onhandleLogin={this.onhandleLogin}
                  onhandleRegister={this.onhandleRegister}
                  onhandleForgotPassword={this.onhandleForgotPassword}
                  onhandleOnlineSupport={this.onhandleOnlineSupport}
                  onhandleContactUs={this.onhandleContactUs}
                  onhandleLoginClick={this.handleLoginClick}
                ></Login>
              );
            } else {
              if (this.state.openDialogName === "register") {
                return (
                  <Register
                    onhandleClose={this.onhandleCloseDialog}
                    onRegisterSuccess={this.handleRegisterSuccess}
                    doLogin={this.handleLoginClick}
                  ></Register>
                );
              } else if (this.state.openDialogName === "activation") {
                return (
                  <Activation
                    username={this.state.username}
                    pass={this.state.pass}
                    onhandleClose={this.onhandleCloseDialog}
                    doLogin={this.handleLoginClick}
                  ></Activation>
                );
              } else if (this.state.openDialogName === "forgotpassword") {
                return (
                  <ForgotPasswordEmail
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleNextClick={this.onhandleForgotPasswordEmailClick}
                    onhandleBackClick={this.onhandleForgotPasswordBackClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                    code={this.state.code}
                    email={this.state.email}
                  ></ForgotPasswordEmail>
                );
              } else if (this.state.openDialogName === "resetpassword") {
                return (
                  <ResetPassword
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleSubmitClick={this.onhandleResetPasswordClick}
                    onhandleBackClick={this.onhandleResetPasswordBackClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                    code={this.state.code}
                    phone={this.state.phone}
                    securityKey={this.state.securityKey}
                  ></ResetPassword>
                );
              } else if (this.state.openDialogName === "resetpasswordsuccess") {
                return (
                  <ResetPasswordSuccess
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleSubmitClick={this.onhandleResetPasswordSuccessClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                  ></ResetPasswordSuccess>
                );
              } else {
                return <></>;
              }
            }
          })()}
        </StyledDialog>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    checkGame: () => dispatch(accountAction.checkGame()),
    getAccountProfile: (showVip) =>
      dispatch(accountAction.getAccountProfile(showVip)),

    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),

    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),

    getPlayerPromotionList: () =>
      dispatch(generalAction.getPlayerPromotionList(1, 99, true, "", true)),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
  };
};
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    game: state.game,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withRouter(GuestContainer)));
