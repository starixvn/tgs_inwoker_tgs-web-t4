import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import BaseProfile from "./BaseProfile";
import { AccountService, accountAction } from "@Inwoker/tgs-api";

import BottomNote from "../Share/BottomNote";
import { withSnackbar } from "notistack";
import i18n from "../../../utils/i18n";
class Phone extends BaseProfile {
  state = {
    countdownToken: 0,
    phone: "",
    code: "",
    isNew: false,
    isConfigured: false,
    securityKey: "",
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.check_pass_phone) isConfigured = true;
    this.setState({
      ...this.state,
      phone: isConfigured ? this.props.account.info.member_phone : "",
      code: "",
      isNew: !this.props.account.info.check_pass_phone,
      isConfigured: isConfigured,
    });
  }

  handleChangePhone = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
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
          this.setState({
            ...this.state,
            countdownToken: 60,
            securityKey: response.data,
          });
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showErrorMessage(response.info);
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err);

        this.showLoading(false);
      });
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
          this.props.getAccountInfo().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                code: "",
                securityKey: "",
                countdownToken: 0,
                isNew: false,
                isConfigured: true,
              });
            }
            this.showLoading(false);
          });
        } else {
          this.showErrorMessage(response.info);
          this.showLoading(false);
        }
      })
      .catch((err) => {
        this.showErrorMessage(err);
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("common.phoneNumber"),
      <>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.phone}
          onChange={this.handleChangePhone}
          placeholder={i18n.t("common.msgEnterPhone")}
          label={i18n.t("common.phoneNumber")}
          disabled={this.state.isConfigured}
        ></Textbox>
        {(() => {
          if (!this.state.isConfigured) {
            return (
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
              ></TextboxWithButton>
            );
          }
        })()}
      </>,
      this.state.isConfigured
        ? i18n.t("common.configured")
        : i18n.t("common.complete"),
      (() => {
        if (this.state.isConfigured) {
          return (
            <BottomNote
              text1={i18n.t("profile.phone.toEdit")}
              link={"./changephone"}
              text2={i18n.t("profile.phone.here")}
            ></BottomNote>
          );
        }
      })()
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
)(withRouter(withSnackbar(Phone)));
