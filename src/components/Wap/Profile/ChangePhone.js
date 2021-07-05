import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import Step from "../Share/Step";
import BaseProfile from "./BaseProfile";
import { AccountService } from "@Inwoker/tgs-api";
import { accountAction } from "@Inwoker/tgs-api";
import { withSnackbar } from "notistack";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
class ChangePhone extends BaseProfile {
  componentDidMount() {
    this.setState({
      ...this.state,
      phone: this.props.account.info.member_phone,
      code: "",
      currentStep: 1,
      countdownToken: 0,
      securityKey: "",
    });
  }

  handleChangePhone = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
    this.onTextChanged();
  };
  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.phone)
      return this.showErrorMessage(i18n.t("common.msgEnterPhone"));
    this.showLoading(true);
    AccountService.VerifyPhone(this.state.phone)
      .then((response) => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          this.setState({
            ...this.state,
            countdownToken: 60,
            securityKey: response.data,
          });
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showInfoMessage(response.info);
        }

        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err.Message);
      });
  };
  handleVerifyTokenError = (err) => {
    this.showErrorMessage(err.Message);

    if (
      err.Result.RemainingSec != null &&
      isNaN(err.Result.RemainingSec) === false
    ) {
      this.setState({
        ...this.state,
        countdownToken: err.Result.RemainingSec,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    }

    this.showLoading(false);
  };
  isDisableButton = () => {
    const code = this.state.code;
    const phone = this.state.phone;
    return !(code && phone);
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };
  handleSubmitClicked = () => {
    this.showLoading(true);
    AccountService.UpdatePhone(this.state.securityKey, this.state.code)
      .then((response) => {
        if (response.IsSuccess) {
          this.showInfoMessage(i18n.t("common.msgTokenVerified"));
          this.showLoading(false);
          if (this.state.currentStep === 1) {
            this.setState({
              ...this.state,
              phone: "",
              code: "",
              securityKey: "",
              currentStep: 2,
              countdownToken: 0,
            });
          } else {
            this.props.getAccountInfo().then((responseUpdate) => {
              if (responseUpdate.IsSuccess) {
                AppHistory.replace("/" + i18n.language + "/profile/phone");
              }
            });
          }
        } else {
          if (response.code === 405) {
            this.showErrorMessage(i18n.t("common.msgInvalidPhoneCode"));
          } else {
            this.showErrorMessage(response.info);
          }
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err);
        this.showLoading(false);
      });
  };
  render() {
    return this.setupContent(
      i18n.t("profile.changePhone.title"),
      <>
        <Step
          steps={[
            { label: i18n.t("profile.changePhone.step1Title") },
            { label: i18n.t("profile.changePhone.step2Title") },
          ]}
          currentStep={this.state.currentStep}
        ></Step>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.phone}
          onChange={this.handleChangePhone}
          placeholder={i18n.t("common.msgEnterPhone")}
          disabled={this.state.currentStep === 1}
          label={i18n.t("common.phoneNumber")}
        ></Textbox>
        <TextboxWithButton
          buttonlabel={
            this.state.countdownToken <= 0
              ? i18n.t("common.msgSendToken")
              : i18n.t("common.btnTokenResendLabel") +
                "(" +
                this.state.countdownToken +
                "s)"
          }
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.code}
          onChange={this.handleChangeCode}
          placeholder={i18n.t("common.msgEnterPhoneCode")}
          label={i18n.t("common.token")}
          onClick={this.handleGetCodeClick}
          maxLength={6}
        ></TextboxWithButton>
      </>,
      this.state.currentStep === 1
        ? i18n.t("common.nextStep")
        : i18n.t("common.submit")
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(ChangePhone)));
