import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Textbox from "../Share/Textbox";

import BaseProfile from "./BaseProfile";
import i18n from "../../../utils/i18n";
import { AccountService } from "@Inwoker/tgs-api";
import { withSnackbar } from "notistack";
import { accountAction } from "@Inwoker/tgs-api";
class WeChat extends BaseProfile {
  state = {
    wechat: "",
  };
  componentDidMount() {
    this.setState({ wechat: this.props.account.info.member_wechat });
  }

  handleChangeNumber = (e) => {
    this.setState({ wechat: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.wechat;
  };
  handleSubmitClicked = () => {
    const wechat = this.state.wechat;
    //validate here
    //sdasdasdasda
    const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    if (!wechat.match(re)) {
      this.props.alert("", i18n.t("profile.wechat.msgInvalidWeChat"));
      // this.props.enqueueSnackbar("微信号码格式不正确", {
      //   key: "error"
      // });
      return;
    }

    this.showLoading(true);
    //api
    AccountService.UpdateWechat(wechat)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                wechat: wechat,
              });
            }
            this.showLoading(false);
          });
        } else {
          this.props.alert("", response.msg);
          this.showLoading(false);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }
      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("common.wechatNumber"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.wechat}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("profile.wechat.plsEnterWechat")}
        label={i18n.t("common.wechatNumber")}
      ></Textbox>
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(WeChat)));
