import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import Header from "../Share/Header";

import { AccountService } from "@Inwoker/tgs-api";

import Textbox from "../../Wap/Share/Textbox";
import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
import Button from "../../Wap/Share/Button";

import i18n from "../../../utils/i18n";

class ForgotPassword extends Component {
  state = {
    email: "",
    code: "",
    step: 1,
    countdownToken: 0,
    loading: false,
    password: "",
    password2: "",
    securityKey: "",
  };
  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;

    if (!this.state.email)
      return this.showErrorMessage(i18n.t("common.msgEnterEmail"));

    AccountService.VerifyForgotPassword(this.state.email).then((response) => {
      this.getCodeResponse(response);
    });
  };

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handlePassword2Change = (e) => {
    this.setState({ ...this.state, password2: e.target.value });
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
      this.props.alert("", i18n.t("common.msgTokenSent"));

      this.setState({
        ...this.state,
        securityKey: response.data,
        loading: true,
      });
    } else {
      if (response.code === 201) {
        this.props.alert("", i18n.t("error.ERR201"));
      } else {
        this.props.alert("", response.info);
      }
    }
  };
  handleNextClick = () => {
    if (this.state.step === 1) {
      if (this.state.code.length === 6) {
        this.setState({ ...this.state, step: 2 });
      }
    } else {
      if (this.state.password !== this.state.password2) {
        this.props.alert("", i18n.t("forgotPassword.invalidConfirmPass"));
      } else {
        AccountService.ResetPassword(
          this.state.securityKey,
          this.state.code,
          this.state.password
        ).then((response) => {
          if (response.IsSuccess) {
            this.props.alert("", i18n.t("forgotPassword.updateSuccess"));
            AppHistory.replace("/" + i18n.language + "/");
          } else {
            this.props.alert("", response.info);
          }
        });
      }
    }
  };
  checkCountdown = () => {
    if (this.state.countdownToken > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          ...this.state,
          countdownToken: this.state.countdownToken - 1,
        });
        this.checkCountdown();
      }, 1000);
    }
  };
  handleCSClick = () => {
    this.props.GetSupportUrl("", "", "");
  };

  handleBackClick = () => {
    if (this.state.step === 2) {
      this.setState({ ...this.state, step: 1 });
    } else {
      AppHistory.goBack();
    }
  };

  render() {
    return (
      <>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("forgotPassword.title")}
        ></Header>
        {(() => {
          if (this.state.step === 1) {
            return (
              <>
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder={i18n.t("common.msgEnterEmail")}
                  type={"text"}
                  label={i18n.t("common.emailAddress")}
                ></Textbox>
                <TextboxWithButton
                  buttonlabel={i18n.t("common.msgSendToken")}
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.code}
                  onChange={this.handleCodeChange}
                  placeholder={i18n.t("common.msgEnterCode")}
                  label={i18n.t("common.token")}
                  onClick={this.handleGetCodeClick}
                  type={"text"}
                ></TextboxWithButton>
              </>
            );
          } else if (this.state.step === 2) {
            return (
              <>
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder={i18n.t("common.msgEnterNewPass")}
                  type={"password"}
                  label={i18n.t("common.NewPass")}
                ></Textbox>

                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.password2}
                  onChange={this.handlePassword2Change}
                  placeholder={i18n.t("common.msgEnterConfirmPass")}
                  type={"password"}
                  label={i18n.t("common.ConfirmPass")}
                ></Textbox>
              </>
            );
          }
        })()}

        <Button
          style={{ margin: "40px auto 0 auto" }}
          disabled={
            (this.state.step === 1 &&
              (this.state.email.length < 1 || this.state.code.length < 6)) ||
            (this.state.step === 2 &&
              (this.state.password.length < 8 ||
                this.state.password2.length < 8))
          }
          label={
            this.state.step === 1
              ? i18n.t("common.nextStep")
              : i18n.t("common.confirm")
          }
          onClick={this.handleNextClick}
        ></Button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    token: state.account.token,
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(withSnackbar(ForgotPassword)));
