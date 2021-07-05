import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import { AccountService, UPDATE_INFO } from "@Inwoker/tgs-api";

import { withSnackbar } from "notistack";
import IconInputReceivePNG from "../../../../assets/images/icon-input-receive.png";
const Container = styled.div``;

class Wechat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member_wechat: this.props.account.info.member_wechat
        ? this.props.account.info.member_wechat
        : "",
    };
  }
  onhandleTextChange = (e) => {
    this.setState({ member_wechat: e.target.value });
  };

  onhandleClick = () => {
    const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    if (!this.state.member_wechat.match(re)) {
      this.props.enqueueSnackbar(i18n.t("profile.wechat.msgInvalidWeChat"), {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateWechat(this.state.member_wechat).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_wechat: this.state.member_wechat.substring(0, 1) + "**",
          },
        });
        this.props.handleCloseDialog();
      } else {
        this.props.enqueueSnackbar(response.info, {
          variant: "error",
        });
      }
    });
  };
  render() {
    return (
      <Container>
        <CustomTextField
          placeholder={i18n.t("profile.wechat.weChatAccount")}
          adornment={IconInputReceivePNG}
          handleTextFieldChange={this.onhandleTextChange}
          defaultValue={this.state.member_wechat}
          type={"text"}
        ></CustomTextField>

        <CustomButton
          name={i18n.t("common.submit")}
          handleClick={this.onhandleClick}
        ></CustomButton>
      </Container>
    );
  }
}
export default connect(null, null)(withSnackbar(Wechat));
