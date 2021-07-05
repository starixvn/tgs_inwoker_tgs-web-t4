import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import { AppHistory } from "../../../history/History";

import IconIDPNG from "../../../assets/images/wap/icon-user.png";

import IconPasswordPNG from "../../../assets/images/wap/icon-unlock.png";
import IconMobilePNG from "../../../assets/images/wap/icon-phone.png";

import IconWithdrawalPasswordPNG from "../../../assets/images/wap/icon-piggy.png";
import IconEmailPNG from "../../../assets/images/wap/icon-email.png";
import BtnBackPNG from "../../../assets/images/wap/btn-back.png";
import i18n from "../../../utils/i18n";
import IconQQPNG from "../../../assets/images/wap/icon-qq.png";
import IconWechatPNG from "../../../assets/images/wap/icon-wechat.png";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;
`;

const BlockLabel = styled.div`
  font-size: 32px;
  font-weight: 600;

  color: #2b2b2b;
  margin: 30px 0 10px 60px;
`;
const BlockContainer = styled.div`
  background-color: #fff;
  width: 700px;
  padding: 30px 0;
  border-radius: 20px;
  margin: 30px auto;
`;
const ItemContainer = styled.div`
  height: 100px;

  margin: 30px 0 0 30px;
`;
const ItemIconContainer = styled.div`
  width: 48px;
  float: left;
  margin: 0 10px 0 30px;
`;
const ItemIcon = styled.div`
  height: 48px;
  margin-top: 20px;
  width: 48px;
  background: url(${(props) => props.icon}) no-repeat left center;
  background-size: contain;
`;
const ItemContentContainer = styled.div`
  float: left;
  margin: 0 0 0 10px;
`;
const ItemTitle = styled.div`
  font-size: 32px;
  font-weight: 500;

  color: #2c2c2c;
`;
const NotSetLabel = styled.div`
  margin-top: 5px;

  font-size: 32px;

  color: #afafaf;
`;
const SettedLabel = styled(NotSetLabel)`
  color: ${({ theme }) => theme.secondary};
`;
const BtnBack = styled.div`
  height: 100px;

  width: 50px;
  background: url(${BtnBackPNG}) no-repeat right center;
  float: right;
  margin: 0 50px 0 0px;
`;
const ContentItem = (
  icon,
  title,
  isConfigured,
  onClickEvent,
  configuredValue = i18n.t("profile.setted")
) => {
  var configureElement = isConfigured ? (
    <SettedLabel>{configuredValue}</SettedLabel>
  ) : (
    <NotSetLabel>{i18n.t("profile.notSet")}</NotSetLabel>
  );
  return (
    <ItemContainer onClick={onClickEvent}>
      <ItemIconContainer>
        <ItemIcon icon={icon}></ItemIcon>
      </ItemIconContainer>
      <ItemContentContainer>
        <ItemTitle>{title}</ItemTitle>
        {configureElement}
      </ItemContentContainer>

      <BtnBack></BtnBack>
    </ItemContainer>
  );
};

class Profile extends Component {
  state = {};
  componentDidMount() {
    if (this.props.account.token === null) {
      AppHistory.replace("/" + i18n.language + "/");
    }
  }
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleNavigate = (path) => {
    AppHistory.push("/" + i18n.language + path);
  };
  isConfigured(value) {
    if (value) return true;
    return false;
  }
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("profile.title")}
        ></Header>

        <BlockContainer>
          <BlockLabel>{i18n.t("profile.basicInfo")}</BlockLabel>
          {ContentItem(
            IconIDPNG,
            i18n.t("profile.nameVerify.icNum"),
            this.isConfigured(
              this.props.account.info.member_name !== "" &&
                this.props.account.info.member_name !== null
            ),
            () => {
              this.handleNavigate("/profile/name");
            },
            this.props.account.info.member_name
          )}

          {/* {ContentItem(
            IconMobilePNG,
            i18n.t("profile.phone.title"),
            this.isConfigured(this.props.account.info.member_phone),
            () => {
              this.handleNavigate("/profile/phone");
            },
            this.props.account.info.member_phone
          )} */}

          {ContentItem(
            IconEmailPNG,
            i18n.t("common.emailAddress"),
            this.isConfigured(this.props.account.info.member_email),
            () => {
              this.handleNavigate("/profile/email");
            },
            this.props.account.info.member_email
          )}
        </BlockContainer>

        <BlockContainer>
          <BlockLabel>{i18n.t("profile.otherInfo")}</BlockLabel>
          {ContentItem(
            IconQQPNG,
            i18n.t("common.qqNumber"),
            this.isConfigured(this.props.account.info.member_qq),
            () => {
              this.handleNavigate("/profile/qq");
            },
            this.props.account.info.member_qq
          )}

          {ContentItem(
            IconWechatPNG,
            i18n.t("common.wechatNumber"),
            this.isConfigured(this.props.account.info.member_wechat),
            () => {
              this.handleNavigate("/profile/wechat");
            },
            this.props.account.info.member_wechat
          )}
        </BlockContainer>

        <BlockContainer>
          <BlockLabel>{i18n.t("profile.securityInfo")}</BlockLabel>
          {ContentItem(
            IconPasswordPNG,
            i18n.t("profile.password.title"),
            true,
            () => {
              this.handleNavigate("/profile/changepassword");
            },
            ""
          )}

          {ContentItem(
            IconWithdrawalPasswordPNG,
            i18n.t("profile.withdrawalPassword.title"),
            this.isConfigured(this.props.account.info.member_safe_password),
            () => {
              if (this.props.account.info.check_pass_email === false) {
                this.props.alert("", i18n.t("profile.msgPlsBindEmailAddress"));
                this.handleNavigate("/profile/email");
              } else {
                if (this.props.account.info.member_safe_password === "set") {
                  this.handleNavigate("/profile/changewithdrawalpassword");
                } else {
                  this.handleNavigate("/profile/withdrawalpassword");
                }
              }
            }
          )}
        </BlockContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(withRouter(Profile));
