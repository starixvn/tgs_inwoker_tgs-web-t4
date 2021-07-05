import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "@Inwoker/tgs-api";
import Textbox from "../Share/Textbox";
import i18n from "../../../utils/i18n";
import { AccountService } from "@Inwoker/tgs-api";
import BaseProfile from "./BaseProfile";
import { withSnackbar } from "notistack";
class QQ extends BaseProfile {
  state = {
    qq: "",
  };
  componentDidMount() {
    this.setState({ qq: this.props.account.info.member_qq });
  }

  handleChangeNumber = (e) => {
    this.setState({ qq: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.qq;
  };

  handleSubmitClicked = () => {
    const qq = this.state.qq;
    //validate here
    //sdasdasdasda
    const re = new RegExp("^[1-9]\\d{4,14}$");
    if (!qq.match(re)) {
      this.props.alert("", i18n.t("profile.qq.msgInvalidQQ"));
      // this.props.enqueueSnackbar("QQ号码格式不正确", {
      //   key: "error"
      // });
      return;
    }

    this.showLoading(true);
    //api
    AccountService.UpdateQQ(qq)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                qq: qq,
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
      i18n.t("common.qqNumber"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.qq}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("profile.qq.plsEnterQQ")}
        type={"text"}
        label={i18n.t("common.qqNumber")}
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
)(withRouter(withSnackbar(QQ)));
