import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";

import TextField from "@material-ui/core/TextField";
import { withSnackbar } from "notistack";
import { AccountService } from "@Inwoker/tgs-api";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";
const Container = styled.div`
  width: 506px;
  height: 360px;
  background: url(${LoginBGPNG});
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 28px;

  color: #000;
`;

const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "46px",
    margin: 0,
    marginTop: "13px",
    float: "left",
    background: "white",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);

const LinkStyle = styled.a`
  font-size: 14px;

  margin-top: 5px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  text-align: center;
  display: inline-block;
  width: 100%;

  font-size: 14px;

  color: #ffffff;
`;

const ContactUsLink = styled(LinkStyle)`
  font-size: 13px;
`;
const StyleButton = styled.div`
  width: 135px;
  height: 46px;

  color: #fff;
  font-size: 20px;

  border-radius: 6px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  text-align: center;
  padding-top: 8px;
  float: right;
  margin: 13px 0 0 0;
  &:hover {
    cursor: pointer;

    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
const Button = styled(StyleButton)`
  width: 100%;
  height: 46px;
  float: left;

  margin-top: 15px;

  float: left;
`;
class ForgotPasswordPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.phone,
      code: this.props.code,
      countdown: 0,
      securityKey: this.props.securityKey,
    };
  }

  timer = null;
  componentDidMount() {}
  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  onhandleGetCodeClick = () => {
    if (this.state.countdown <= 0) {
      if (this.state.phone.length > 0) {
        AccountService.VerifyForgotPassword(this.state.phone).then(
          (response) => {
            if (response.IsSuccess) {
              this.setState({ securityKey: response.data });
              this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
                variant: "info",
              });
            } else {
              this.props.enqueueSnackbar(response.info, {
                variant: "error",
              });
            }
          }
        );
        this.setState({ ...this.state, countdown: 60 });
        this.checkCountdown();
      } else {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterPhone"), {
          variant: "error",
        });
      }
      // AccountService.GetPhoneVerificationCode(
      //   "",
      //   this.state.phone,
      //   "resetPassword"
      // ).then(response => {
      //   // this.setState({ ...this.state, message: response.msg });
      //   if (response.IsSuccess) {
      //     this.props.enqueueSnackbar(response.msg, {
      //       variant: "info"
      //     });
      //   } else {
      //     this.props.enqueueSnackbar(response.msg, {
      //       variant: "error"
      //     });
      //   }
      //   this.setState({ ...this.state, countdown: response.data });
      //   this.checkCountdown();
      // });
    }
  };
  onhandleNextClick = () => {
    if (this.state.code.length > 0 && this.state.securityKey.length > 0) {
      this.props.onhandleNextClick(
        this.state.code,
        this.state.phone,
        this.state.securityKey
      );
    } else {
      this.props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
        variant: "error",
      });
    }
  };
  checkCountdown = () => {
    if (this.state.countdown > 0) {
      this.timer = setTimeout(() => {
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
        this.checkCountdown();
      }, 1000);
    }
  };
  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>

        <FormContainer>
          <CustomText
            placeholder={i18n.t("common.msgEnterPhone")}
            variant="outlined"
            value={this.state.phone}
            onChange={this.handlePhoneChange}
            autoComplete="off"
            style={{
              width: "345px",
              height: "46px",
            }}
          />
          <CustomText
            placeholder={i18n.t("common.msgEnterCode")}
            variant="outlined"
            onChange={this.handleCodeChange}
            value={this.state.code}
            type={"number"}
            autoComplete="off"
            style={{
              width: "208px",
              height: "46px",
            }}
          />
          <StyleButton
            onClick={this.onhandleGetCodeClick}
            disable={this.state.countdown > 0}
          >
            {this.state.countdown <= 0
              ? i18n.t("common.msgSendToken")
              : i18n.t("common.btnTokenResendLabel") +
                "(" +
                this.state.countdown +
                "s)"}
          </StyleButton>

          <Button onClick={this.onhandleNextClick}>
            {i18n.t("common.nextStep")}
          </Button>
          <Description>
            {i18n.t("common.support")}
            <ContactUsLink onClick={this.props.onhandleOnlineSupport}>
              {i18n.t("common.contactus")}
            </ContactUsLink>
          </Description>
        </FormContainer>
      </Container>
    );
  }
}

export default withSnackbar(ForgotPasswordPhone);
