import React, { Component } from "react";
import styled from "styled-components";
import IconProfileRedPNG from "../../../../assets/images/icon-profile.png";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import LoginBGPNG from "../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../assets/images/icon-login-close.png";
import { accountAction, SHOWING_DIALOG } from "@Inwoker/tgs-api";
import { withStyles } from "@material-ui/core/styles";
// import Address from "./Address";
import ChangePassword from "./ChangePassword";
import Email from "./Email";
import WithdrawalPassword from "./WithdrawalPassword";
import ChangeWithdrawalPassword from "./ChangeWithdrawalPassword";
import config from "../../../../config/config";
import IDVerification from "./IDVerification";
import PhoneVerification from "./PhoneVerification";
// import SecurityQuestion from "./SecurityQuestion";
// import ResetSecurityQuestion from "./ResetSecurityQuestion";

import QQ from "./QQ";
import Wechat from "./Wechat";
import i18n from "../../../../utils/i18n";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #eaeaea;
  width: 100%;
  min-height: 611px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconProfileRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  height: 610px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  border-radius: 10px;
`;
const ContentWrap = styled.div`
  margin-top: 12px;
  height: 44px;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
`;
const ContentLabel = styled.div`
  color: #747474;
  float: left;
  width: 160px;
  margin-left: 18px;
  margin-top: 10px;
`;
const ContentValue = styled.div`
  color: #16242a;
  float: left;
  margin-top: 10px;
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ContentButton = styled.div`
  min-width: 89px;
  padding: 0 10px
  height: 32px;
  border-radius: 3.8px;
  color: #fff;
  float: right;
  margin-right: 5px;

  border-radius: 6px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(to top, ${({ theme }) =>
    theme.primaryGradient},
      ${({ theme }) => theme.primary});

  &:hover {
    cursor: pointer;

    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
// const ButtonDisable = styled(ContentButton)`
//   color: #747474;
//   background-color: #fff;
//   &:hover {
//     background: #fff;
//   }
// `;
const ContentButtonLabel = styled.div`
  text-align: center;
  margin-top: 5px;
`;

function GetContentWrap(accountInfo, label, attr, func, label2) {
  let attrValue = accountInfo[attr];
  if (attr === "member_address") {
    if (attrValue !== "") {
      attrValue +=
        " | " +
        accountInfo["member_address_surename"] +
        " | " +
        accountInfo["member_address_phone"];
    }
  }

  if (attr === "member_wechat") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_wechat"]
        ? accountInfo["member_wechat"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_qq") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_qq"]
        ? accountInfo["member_qq"].substring(0, 1) + "**"
        : "";
    }
  }
  if (attr === "member_phone") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_phone"]
        ? accountInfo["member_phone"].substring(0, 1) + "**"
        : "";
    }
  }

  let isDisable = false;
  let buttonValue = i18n.t("profile.edit");
  let requiredVerify =
    attr === "member_name" ||
    // attr === "member_email" ||
    attr === "member_phone" ||
    attr === "member_birthday";

  let isVerify = false;

  if (requiredVerify) {
    if (attr === "member_name" || attr === "member_birthday") {
      isVerify =
        config.brand !== "HKJP"
          ? accountInfo.check_pass_account
          : accountInfo.member_name !== "";
    }
    if (attr === "member_email") {
      isVerify = accountInfo.check_pass_email;
    }
    if (attr === "member_phone") {
      isVerify = accountInfo.check_pass_phone;
    }
  }

  if (attr === "member_question") {
    if (attrValue === 0) {
      attrValue = "";
    } else {
      attrValue = i18n.t("profile.setted");
      buttonValue = i18n.t("profile.edit");
    }
  }
  if (attrValue === "" || attrValue == null) {
    if (requiredVerify) {
      attrValue = i18n.t("profile.notVerify");
      buttonValue = i18n.t("profile.nowVerify");
    } else {
      attrValue = i18n.t("profile.notSet");
      buttonValue = i18n.t("profile.setNow");
    }
    isDisable = true;
  }
  if (attr === "member_password") {
    attrValue = i18n.t("profile.setted");
    buttonValue = i18n.t("profile.edit");
    isDisable = false;
  } else if (attr === "member_safe_password") {
    if (attrValue === "set") {
      attrValue = i18n.t("profile.setted");
      buttonValue = i18n.t("common.reset");
      isDisable = false;
    }
  } else if (attr === "member_name" || attr === "member_birthday") {
    if (isVerify || attr === "member_birthday") {
      buttonValue = "";
    }
    if (attr === "member_name") {
      if (isVerify === false) {
        buttonValue = i18n.t("profile.nowVerify");
      } else {
        buttonValue = i18n.t("profile.details");
      }
    }
  }

  return (
    <ContentWrap>
      <ContentLabel>{label}:</ContentLabel>
      <ContentValue style={isDisable ? { color: "#acacac" } : {}}>
        {attrValue}
      </ContentValue>
      {(() => {
        if (buttonValue !== "") {
          return (
            <ContentButton onClick={() => func(attr)}>
              <ContentButtonLabel>{buttonValue}</ContentButtonLabel>
            </ContentButton>
          );
        }
      })()}
    </ContentWrap>
  );
}
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  paper: {
    background: `url(${LoginBGPNG}) no-repeat transparent`,
    backgroundSize: "cover",
    borderRadius: "15px",
    border: "solid 1px #ffffff",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 27px 32px;

  display: table;
`;
const DialogCloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat center;
  width: 50px;
  height: 100%;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const DialogHeader = styled.div`
  height: 50px;
`;
const DialogHeadertitle = styled.div`
  text-align: center;
  margin-left: 45px;
  padding-top: 12px;
  float: left;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.secondary};
  width: 320px;
`;
class Profile extends Component {
  state = {
    openDialog: false,
    dialogTitle: "",
  };
  componentDidMount() {
    if (this.props.popup) {
      this.handleButtonClick(this.props.popup);
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.popup !== this.props.popup) {
      this.handleButtonClick(this.props.popup);
    }
  }
  // handleVerifyByQuestion = () => {
  //   this.setState({
  //     ...this.state,
  //     openDialog: true,
  //     dialogTitle: "安全问题验证",
  //     dialogComponent: (
  //       <SecurityQuestion
  //         handleCloseDialog={this.handleCloseDialog}
  //         token={this.props.account.token}
  //         memberQuestion={this.props.account.info.member_question}
  //         isVerify={true}
  //         onVerifySuccess={this.handleVerifySuccess}
  //       ></SecurityQuestion>
  //     ),
  //   });
  // };
  // handleEmailVerificationClick = () => {
  //   this.setState({
  //     ...this.state,
  //     openDialog: true,
  //     dialogTitle: "邮件验证",
  //     dialogComponent: (
  //       <Email
  //         handleCloseDialog={this.handleCloseDialog}
  //         email={this.props.account.info.member_email}
  //         token={this.props.account.token}
  //         onhandleVerifySuccess={this.handleVerifySuccess}
  //         isForSecurityQuestion={true}
  //       ></Email>
  //     ),
  //   });
  // };
  handlePhoneVerificationClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      dialogTitle: i18n.t("account.phoneVerification"),
      dialogComponent: (
        <PhoneVerification
          handleCloseDialog={this.handleCloseDialog}
          phone={this.props.account.info.member_phone}
          token={this.props.account.token}
          onhandleVerifySuccess={this.handleVerifySuccess}
          isForSecurityQuestion={true}
        ></PhoneVerification>
      ),
    });
  };
  backPhoneVerify = () => {
    this.handleButtonClick("member_safe_password");
  };

  handleVerifySuccess = (
    isForSecurityQuestion,
    isForWithdrawalPassword,
    smsCode
  ) => {
    if (isForSecurityQuestion) {
      // this.setState({
      //   ...this.state,
      //   openDialog: true,
      //   dialogTitle: "设置安全问题",
      //   dialogComponent: (
      //     <SecurityQuestion
      //       handleCloseDialog={this.handleCloseDialog}
      //       token={this.props.account.token}
      //       memberQuestion={0}
      //       isVerify={false}
      //       isReset={true}
      //     ></SecurityQuestion>
      //   ),
      // });
    } else if (isForWithdrawalPassword) {
      this.setState({
        ...this.state,
        openDialog: true,
        dialogTitle: i18n.t("profile.phoneVerification"),
        dialogComponent: (
          <ChangeWithdrawalPassword
            phone={this.props.account.info.member_phone}
            handleCloseDialog={this.handleCloseDialog}
            handleChangeTitle={this.handleChangeTitle}
            token={this.props.account.token}
          ></ChangeWithdrawalPassword>
        ),
      });
    }
  };
  handleButtonClick = (type) => {
    let title = "";
    let component = null;

    switch (type) {
      case "member_wechat":
        title = i18n.t("profile.wechat.weChatAccount");
        component = (
          <Wechat
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Wechat>
        );
        break;
      case "member_qq":
        title = i18n.t("profile.qq.qqAccount");
        component = (
          <QQ
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></QQ>
        );
        break;
      // case "member_address":
      //   title = "收货地址";
      //   component = (
      //     <Address
      //       handleCloseDialog={this.handleCloseDialog}
      //       account={this.props.account}
      //     ></Address>
      //   );
      //   break;
      case "member_password":
        title = i18n.t("profile.changePassword.title");
        component = (
          <ChangePassword
            handleCloseDialog={this.handleCloseDialog}
            token={this.props.account.token}
          ></ChangePassword>
        );
        break;
      case "member_email":
        title = i18n.t("profile.email.bindEmail");
        component = (
          <Email
            handleCloseDialog={this.handleCloseDialog}
            email={this.props.account.info.member_email}
            token={this.props.account.token}
            isForSecurityQuestion={false}
          ></Email>
        );
        break;
      case "member_safe_password":
        if (!this.props.account.info.check_pass_email) {
          title = i18n.t("profile.email.bindEmail");
          component = (
            <Email
              handleCloseDialog={this.handleCloseDialog}
              email={this.props.account.info.member_email}
              token={this.props.account.token}
              isForSecurityQuestion={false}
            ></Email>
          );
        } else {
          if (this.props.account.info.member_safe_password !== "set") {
            // first time
            title = i18n.t("profile.withdrawalPassword.title");
            component = (
              <WithdrawalPassword
                value={this.props.account.info.member_safe_password}
                handleCloseDialog={this.handleCloseDialog}
                token={this.props.account.token}
              ></WithdrawalPassword>
            );
          } else {
            // reset
            title = i18n.t("profile.emailVerification");
            component = (
              <ChangeWithdrawalPassword
                email={this.props.account.info.member_email}
                handleCloseDialog={this.handleCloseDialog}
                handleChangeTitle={this.handleChangeTitle}
                token={this.props.account.token}
              ></ChangeWithdrawalPassword>
            );
          }
        }

        break;
      case "member_name":
        title = i18n.t("profile.nameVerify.icNum");
        component = (
          <IDVerification
            getIDCardNo={this.props.getIDCardNo}
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></IDVerification>
        );
        break;
      case "member_phone":
        title = i18n.t("profile.phone.bindMobile");
        component = (
          <PhoneVerification
            handleCloseDialog={this.handleCloseDialog}
            phone={this.props.account.info.member_phone}
            token={this.props.account.token}
            isForSecurityQuestion={false}
          ></PhoneVerification>
        );
        break;
      // case "member_question":
      //   component = null;

      //   if (this.props.account.info.member_question === 0) {
      //     // first time
      //     title = "设置安全问题";
      //     component = (
      //       <SecurityQuestion
      //         handleCloseDialog={this.handleCloseDialog}
      //         token={this.props.account.token}
      //         memberQuestion={this.props.account.info.member_question}
      //         isVerify={false}
      //         isReset={false}
      //       ></SecurityQuestion>
      //     );
      //   } else {
      //     // reset
      //     title = "修改安全问题";
      //     component = (
      //       <ResetSecurityQuestion
      //         handleCloseDialog={this.handleCloseDialog}
      //         token={this.props.account.token}
      //         memberQuestion={this.props.account.info.member_question}
      //         passEmail={this.props.account.info.check_pass_email}
      //         passPhone={this.props.account.info.check_pass_phone}
      //         onhandleVerifyByQuestion={this.handleVerifyByQuestion}
      //         onhandlePhoneVerificationClick={this.handlePhoneVerificationClick}
      //         onhandleEmailVerificationClick={this.handleEmailVerificationClick}
      //         onhandleCSClick={this.props.onhandleCSClick}
      //       ></ResetSecurityQuestion>
      //     );
      //   }

      //   break;

      default:
        component = null;
        break;
    }
    this.setState({
      ...this.state,
      openDialog: true,
      dialogTitle: title,
      dialogComponent: component,
    });
  };
  handleChangeTitle = (title) => {
    this.setState({
      dialogTitle: title,
    });
  };
  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };
  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("profile.title")}
        </Title>
        <InnerWrap>
          {(() => {
            if (config.brand !== "HKJP" && config.brand !== "HK28") {
              return GetContentWrap(
                this.props.account.info,
                i18n.t("profile.nameVerify.icNum"),
                "member_name",
                this.handleButtonClick
              );
            }
          })()}

          {/* {GetContentWrap(
            this.props.account.info,
            i18n.t("profile.phone.title"),
            "member_phone",
            this.handleButtonClick
          )} */}
          {(() => {
            if (
              config.brand === "GPI" ||
              config.brand === "HKJP" ||
              config.brand === "WLGHK"
            ) {
              return GetContentWrap(
                this.props.account.info,
                i18n.t("common.phoneNumber"),
                "member_phone",
                this.handleButtonClick
              );
            }
          })()}

          {(() => {
            if (
              config.brand !== "HKJP" &&
              config.brand !== "GPI" &&
              config.brand !== "HK28" &&
              config.brand !== "WLGHK"
            ) {
              return GetContentWrap(
                this.props.account.info,
                i18n.t("common.emailAddress"),
                "member_email",
                this.handleButtonClick
              );
            }
          })()}
          {(() => {
            if (config.brand !== "HK28") {
              return GetContentWrap(
                this.props.account.info,
                "QQ",
                "member_qq",
                this.handleButtonClick
              );
            }
          })()}
          {(() => {
            if (config.brand !== "HK28") {
              return GetContentWrap(
                this.props.account.info,
                i18n.t("common.wechatNumber"),
                "member_wechat",
                this.handleButtonClick
              );
            }
          })()}
          {/* {GetContentWrap(
            this.props.account.info,
            "电子邮件",
            "member_email",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "QQ",
            "member_qq",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "Wechat",
            "member_wechat",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "您的生日",
            "member_birthday",
            this.handleButtonClick
          )} */}
          {/* {(() => {
            if (config.brand !== "HKJP" && config.brand !== "GPI") {
              return GetContentWrap(
                this.props.account.info,
                i18n.t("profile.withdrawalPassword.title"),
                "member_safe_password",
                this.handleButtonClick,
                i18n.t("profile.edit")
              );
            }
          })()} */}

          {GetContentWrap(
            this.props.account.info,
            i18n.t("profile.password.title"),
            "member_password",
            this.handleButtonClick
          )}
          {/* {GetContentWrap(
            this.props.account.info,
            "安全问题",
            "member_question",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "收货地址",
            "member_address",
            this.handleButtonClick
          )} */}
        </InnerWrap>
        <StyledDialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          onEntering={() => this.props.showDialog(true)}
          onExited={() => this.props.showDialog(false)}
        >
          <DialogHeader>
            <DialogHeadertitle>{this.state.dialogTitle}</DialogHeadertitle>
            <DialogCloseIconContainer
              onClick={this.handleCloseDialog}
            ></DialogCloseIconContainer>
          </DialogHeader>
          <DialogContainer>{this.state.dialogComponent}</DialogContainer>
        </StyledDialog>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};
export default connect(null, mapDispatchToProps)(Profile);
