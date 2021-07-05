import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BaseProfile from "./BaseProfile";
import ResetWithdrawalPassword from "./ResetWithdrawalPassword";

import { AccountService } from "@Inwoker/tgs-api";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Header from "../Share/Header";
import AppBar from "@material-ui/core/AppBar";

import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";

class ChangeWithdrawalPassword extends BaseProfile {
  componentDidMount() {}
  handleChangeOldPassword = (e) => {
    this.setState({ ...this.state, oldpassword: e.target.value });
    this.onTextChanged();
  };
  handleChangeNewPassword = (e) => {
    this.setState({ ...this.state, newpassword: e.target.value });
    this.onTextChanged();
  };
  handleChangeNewPassword2 = (e) => {
    this.setState({ ...this.state, newpassword2: e.target.value });
    this.onTextChanged();
  };
  handleChangeTab = (event, newValue) => {
    this.setState({
      ...this.state,
      selectedTab: newValue,
    });
  };
  handleSubmitClicked = (e) => {
    const oldpassword = this.state.oldpassword;
    const newpassword = this.state.newpassword;
    const newpassword2 = this.state.newpassword2;
    if (newpassword !== newpassword2) {
      this.props.alert("", i18n.t("common.msgInvalidConfirmPass"));
      // this.props.enqueueSnackbar("确认密码错误", {
      //   key: "error"
      // });
      return;
    }
    this.showLoading(true);
    AccountService.ChangeWithdrawalPassword(
      oldpassword,
      newpassword,
      newpassword2
    )
      .then((response) => {
        if (response.IsSuccess) {
          this.props.alert("", response.info);
          AppHistory.goBack();
        } else {
          this.props.alert("", response.info);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }

        this.showLoading(false);
      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
    //this.setState({ ...this.state, currentStep: 2 });
  };
  isDisableButton = () => {
    const oldpassword = this.state.oldpassword;
    const newpassword = this.state.newpassword;
    const newpassword2 = this.state.newpassword2;

    const isDisableButton = !(oldpassword && newpassword && newpassword2);

    return isDisableButton;
  };
  render() {
    return (
      <>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("profile.changeWithdrawalPassword.title")}
        ></Header>
        <ResetWithdrawalPassword
          alert={this.props.alert}
        ></ResetWithdrawalPassword>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(withSnackbar(ChangeWithdrawalPassword)));
