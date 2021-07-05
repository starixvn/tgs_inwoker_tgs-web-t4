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

class QQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member_qq: this.props.account.info.member_qq
        ? this.props.account.info.member_qq
        : "",
    };
  }

  onhandleTextChange = (e) => {
    this.setState({ member_qq: e.target.value });
  };

  onhandleClick = () => {
    const re = new RegExp("^[1-9]\\d{4,14}$");
    if (!this.state.member_qq.match(re)) {
      this.props.enqueueSnackbar(i18n.t("profile.qq.msgInvalidQQ"), {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateQQ(this.state.member_qq).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_qq: this.state.member_qq.substring(0, 1) + "**",
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
          placeholder={i18n.t("profile.qq.qqAccount")}
          adornment={IconInputReceivePNG}
          handleTextFieldChange={this.onhandleTextChange}
          defaultValue={this.state.member_qq}
        ></CustomTextField>

        <CustomButton
          name={i18n.t("common.submit")}
          handleClick={this.onhandleClick}
        ></CustomButton>
      </Container>
    );
  }
}
export default connect(null, null)(withSnackbar(QQ));
