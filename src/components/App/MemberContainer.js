import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import InboxIconPNG from "../../assets/images/inbox-icon.png";
import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  float: right;
`;
const BtnStyle1 = styled.div`
  width: 68px;
  height: 35px;
  border-radius: 4px;

  float: right;
  margin-right: 10px;
  text-align: center;
  line-height: 220%;
  border: solid 1px #ffffff;
  color: #fff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    border: solid 1px #fde73f;
    color: #fde73f;
    cursor: pointer;
  }
`;
const BtnLogout = styled.div`
  color: #ffffff;
  text-align: right;
  padding: 10px 0px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
    color: #fde73f;
  }
`;

const BtnTransfer = styled(BtnStyle1)``;
const BtnDeposit = styled(BtnStyle1)``;

const BalanceContainer = styled.div`
  color: #ffffff;
  text-align: right;
  padding: 10px 10px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const RefreshBalance = styled.div`
  margin: 2px 0 0 0;

  width: 16px;
  height: 16px;
  float: right;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${IconRefreshBalancePNG});
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;

  &:hover {
    background-image: url(${IconRefreshBalanceHoverPNG});
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: #fde73f;
`;
const MemberUserName = styled.span`
  color: #fde73f;
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 12px 10px 0px 10px;
  float: right;
  background-color: rgba(255, 255, 255, 0.2);
`;
const InboxContainer = styled(BalanceContainer)`
  color: #ffffff;
  text-align: right;
  padding: 10px 0px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const InboxIconImg = styled.img`
  display: inline-block;
  float: right;
  margin-top: 2px;
`;
const InboxCountLabel = styled.span`
  margin-left: 6px;
  color: #fde73f;
  display: inline-block;
  float: right;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: #f6f6f6;
  float: right;
  margin-right: 0px;
  padding: 10px 0 0 0;
  max-width: 300px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;
class MemberContainer extends Component {
  render() {
    return (
      <Container>
        <BtnTransfer onClick={this.props.onhandleTransfer}>
          {i18n.t("web.header.transfer")}
        </BtnTransfer>
        <BtnDeposit onClick={this.props.onhandleDeposit}>
          {i18n.t("web.header.deposit")}
        </BtnDeposit>
        <BalanceContainer>
          <span>{i18n.t("web.header.mainAccount")}</span>
          <BalanceAmountLabel onClick={this.props.onhandleTransfer}>
            {Common.formatNumberWithThousand(this.props.mainBalance)}
          </BalanceAmountLabel>
          <span>{i18n.t("web.header.dollor")}</span>
          <RefreshBalance onClick={this.props.onhandleRefreshBalanceClick}>
            <RefreshBalanceIcon></RefreshBalanceIcon>
          </RefreshBalance>
        </BalanceContainer>
        <Spliter></Spliter>
        <InboxContainer onClick={this.props.onhandleInboxClick}>
          <InboxCountLabel>
            {this.props.account.info.message_num}
          </InboxCountLabel>
          <InboxIconImg src={InboxIconPNG}></InboxIconImg>
        </InboxContainer>
        <Spliter></Spliter>
        <BtnLogout onClick={this.props.onhandleLogout}>
          {i18n.t("web.header.logout")}
        </BtnLogout>
        <Spliter></Spliter>
        <WelcomeContainer>
          <CustomLink to={"/" + i18n.language + "/account/profile"}>
            {i18n.t("web.header.welcomBack")}
            <MemberUserName>
              {this.props.account.info.member_username}
            </MemberUserName>
          </CustomLink>
        </WelcomeContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    mainBalance: state.wallet.mainBalance,
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(MemberContainer);
