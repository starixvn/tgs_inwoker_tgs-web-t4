import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Router, Route, Switch, Redirect } from "react-router";
import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import IconDepositPNG from "../../../assets/images/icon-deposit.png";
import IconWithdrawPNG from "../../../assets/images/icon-withdraw.png";
import IconTransferPNG from "../../../assets/images/icon-transfer.png";
import IconReportPNG from "../../../assets/images/icon-report.png";
import IconProfilePNG from "../../../assets/images/icon-profile.png";

import IconBonusPNG from "../../../assets/images/icon-bonus.png";
import IconInboxPNG from "../../../assets/images/icon-inbox.png";

import IconDepositActivePNG from "../../../assets/images/icon-deposit-active.png";
import IconWithdrawActivePNG from "../../../assets/images/icon-withdraw-active.png";
import IconTransferActivePNG from "../../../assets/images/icon-transfer-active.png";
import IconReportActivePNG from "../../../assets/images/icon-report-active.png";
import IconProfileActivePNG from "../../../assets/images/icon-profile-active.png";

import IconBonusActivePNG from "../../../assets/images/icon-bonus-active.png";
import IconInboxActivePNG from "../../../assets/images/icon-inbox-active.png";

import Header from "./Header";
import Profile from "./Profile/index";

import Inbox from "./Inbox/index";
import Report from "./Report/index";
import Transfer from "./Transfer/index";
import Deposit from "./Deposit/index";

import { walletAction } from "@Inwoker/tgs-api";
import Withdrawal from "./Withdrawal/index";

import i18n from "../../../utils/i18n";
import BGJPG from "../../../assets/images/background.jpg";
import Common from "../../../utils/Common";
const baseRouteUrl = Common.baseRouteUrl;
const Container = styled.div`
  width: 100%;
  background: url(${BGJPG});
  margin-top: 100px;
`;
const InnerContainer = styled.div`
  margin: 35px auto;
  width: 1230px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding-bottom: 15px;
  border-radius: 20px;
`;

const Main = styled.div`
  margin-left: 12px;

  height: 100%;
  width: 1206px;

  border-radius: 10px;

  background-color: #d9d9d9;
`;
const LeftMenu = styled.div`
  background-color: #d9d9d9;
  width: 216px;
  height: 100%;
  float: left;
  padding: 0px 12px;
`;
const RightContent = styled.div`
  width: 990px;
  height: 100%;
  float: right;
`;
const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;

  margin-top: 20px;

  color: ${({ theme }) => theme.secondary};
`;
const MenuButtonDiv = styled.div`
  width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #7f7f7f;
  color: ${({ theme }) => theme.secondary};
  border-radius: 3px;
  margin: 5px;

  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.active
      ? ` background-color: ` +
        props.theme.primary +
        `;
      color: #fff;`
      : " background-color: #ededed;"};
`;
const MenuButtonSpan = styled.span`
  float: right;
  width: 122px;
  display: block;
  margin-top: 10px;
`;
const MenuImgFrame = styled.div`
  height: 41px;
  width: 45px;
  float: left;
  display: block;
`;
const MenuDepositImg = styled(MenuImgFrame)`
  background-size: 25px 25px;
  ${(props) =>
    props.active
      ? `background: url(${IconDepositActivePNG}) no-repeat center center;`
      : `background: url(${IconDepositPNG}) no-repeat center center;`}
`;
const MenuWithdrawImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconWithdrawActivePNG}) no-repeat center center;`
      : `background: url(${IconWithdrawPNG}) no-repeat center center;`}
  background-size:25px 25px;
`;
const MenuTransferImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconTransferActivePNG}) no-repeat center center;`
      : `background: url(${IconTransferPNG}) no-repeat center center;`}
  background-size:25px 25px;
`;
const MenuReportImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconReportActivePNG}) no-repeat center center;`
      : `background: url(${IconReportPNG}) no-repeat center center;`}

  background-size:25px 25px;
`;
const MenuProfileImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconProfileActivePNG}) no-repeat center center;`
      : `background: url(${IconProfilePNG}) no-repeat center center;`}

  background-size:25px 25px;
`;

const MenuBonusImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconBonusActivePNG}) no-repeat center center;`
      : `background: url(${IconBonusPNG}) no-repeat center center;`}

  background-size:25px 25px;
`;
const MenuInboxImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconInboxActivePNG}) no-repeat center center;`
      : `background: url(${IconInboxPNG}) no-repeat center center;`}

  background-size:25px 25px;
`;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.match.params.tab,
    };
  }
  async componentDidMount() {
    if (this.props.account.token === null) {
      await this.timeout(1000);
      if (this.props.account.token === null) {
        AppHistory.replace(`/${i18n.language}/`);
      }
      this.getAllGameBalance();
    }
  }
  componentDidUpdate(preProps) {
    if (
      this.props.game.providerList.length !==
        preProps.game.providerList.length &&
      this.props.game.providerList.length > 0
    ) {
      this.getAllGameBalance();
    }
  }
  getAllGameBalance = () => {
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .map((a) => {
        this.props.getGameBalance(a.abbreviation);
      });
  };
  handleRefreshClick = () => {
    this.props.updateBalanceList();
    this.getAllGameBalance();
  };
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.account.token !== this.props.account.token &&
      this.props.account.token === null
    ) {
      AppHistory.replace(`/${i18n.language}/`);
    }
    if (prevProps.match.params.tab !== this.props.match.params.tab) {
      this.setState({ ...this.state, activePage: this.props.match.params.tab });
    }
  }

  handleClickTab = (link) => {
    this.props.history.push("/" + i18n.language + "/account/" + link);
  };
  handleMoreBenefitClick = (viptitle) => {
    this.props.history.push("/" + i18n.language + "/vip");
  };
  handleIDVerifyClick = () => {
    this.props.history.push(
      "/" + i18n.language + "/account/profile/member_name"
    );
  };
  handlePhoneVerifyClick = () => {
    this.props.history.push(
      "/" + i18n.language + "/account/profile/member_phone"
    );
  };
  handleEmailVerifyClick = () => {
    this.props.history.push(
      "/" + i18n.language + "/account/profile/member_email"
    );
  };
  genImgComponent = (link) => {
    switch (link) {
      case "deposit":
        return (
          <MenuDepositImg
            active={this.state.activePage === link}
          ></MenuDepositImg>
        );
      case "withdrawal":
        return (
          <MenuWithdrawImg
            active={this.state.activePage === link}
          ></MenuWithdrawImg>
        );
      case "transfer":
        return (
          <MenuTransferImg
            active={this.state.activePage === link}
          ></MenuTransferImg>
        );
      case "report":
        return (
          <MenuReportImg
            active={this.state.activePage === link}
          ></MenuReportImg>
        );
      case "profile":
        return (
          <MenuProfileImg
            active={this.state.activePage === link}
          ></MenuProfileImg>
        );
      case "affiliate":
        return (
          <MenuBonusImg active={this.state.activePage === link}></MenuBonusImg>
        );
      case "inbox":
        return (
          <MenuInboxImg active={this.state.activePage === link}></MenuInboxImg>
        );
      default:
        return <></>;
    }
  };
  genMenuButtonDiv = (text, link) => {
    return (
      <MenuButtonDiv
        active={this.state.activePage === link}
        onClick={() => this.handleClickTab(link)}
      >
        <MenuImgFrame>{this.genImgComponent(link)}</MenuImgFrame>
        <MenuButtonSpan>{text}</MenuButtonSpan>
      </MenuButtonDiv>
    );
  };
  render() {
    return (
      <Container>
        <InnerContainer>
          <Header
            info={this.props.account.info}
            vip={this.props.account.vip}
            wallet={this.props.wallet}
            game={this.props.game}
            onhandleClickTab={this.handleClickTab}
            onhandleRefreshClick={this.handleRefreshClick}
            onhandleMoreBenefitClick={this.handleMoreBenefitClick}
            onIDVerifyClick={this.handleIDVerifyClick}
            onPhoneVerifyClick={this.handlePhoneVerifyClick}
            onEmailVerifyClick={this.handleEmailVerifyClick}
          ></Header>

          <Main>
            <LeftMenu>
              <MenuTitle>{i18n.t("web.account.fund")}</MenuTitle>
              {this.genMenuButtonDiv(i18n.t("web.account.deposit"), "deposit")}
              {this.genMenuButtonDiv(
                i18n.t("web.account.withdrawal"),
                "withdrawal"
              )}
              {this.genMenuButtonDiv(
                i18n.t("web.account.transfer"),
                "transfer"
              )}
              {this.genMenuButtonDiv(i18n.t("web.account.report"), "report")}

              <MenuTitle>{i18n.t("web.account.personal")}</MenuTitle>
              {this.genMenuButtonDiv(i18n.t("web.account.profile"), "profile")}

              {this.genMenuButtonDiv(i18n.t("web.account.inbox"), "inbox")}
              {
                //  this.genMenuButtonDiv(i18n.t("web.account.affiliate"), "affiliate")
              }
            </LeftMenu>
            <RightContent>
              <Router history={AppHistory}>
                <Switch>
                  <Route
                    exact
                    path={baseRouteUrl + "/account/deposit/:promotionid?"}
                    render={(props) => (
                      <Deposit
                        token={this.props.account.token}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={baseRouteUrl + "/account/manual/:paymentId"}
                    render={(props) => (
                      <Deposit
                        token={this.props.account.token}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={baseRouteUrl + "/account/withdrawal"}
                    render={(props) => (
                      <Withdrawal
                        token={this.props.account.token}
                        onhandleClickTab={this.handleClickTab}
                        onhandleCSClick={this.props.onhandleCSClick}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={baseRouteUrl + "/account/inbox"}
                    render={(props) => (
                      <Inbox token={this.props.account.token} />
                    )}
                  />
                  <Route
                    exact
                    path={baseRouteUrl + "/account/report"}
                    render={(props) => (
                      <Report token={this.props.account.token} />
                    )}
                  />
                  <Route
                    exact
                    path={baseRouteUrl + "/account/transfer"}
                    render={(props) => (
                      <Transfer
                        token={this.props.account.token}
                        getAllGameBalance={this.getAllGameBalance}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={baseRouteUrl + "/account/profile/:popup?"}
                    render={(props) => (
                      <Profile
                        account={this.props.account}
                        onhandleCSClick={this.props.onhandleCSClick}
                        popup={this.props.match.params.popup}
                      />
                    )}
                  />
                  {/* 
                    <Route
                    exact
                    path={baseRouteUrl + "/account/affiliate"}
                    render={(props) => (
                      <Affiliate
                        account={this.props.account}
                        onhandleCSClick={this.props.onhandleCSClick}
                        popup={this.props.match.params.popup}
                      />
                    )}
                  />
                   */}
                  <Redirect
                    to={"/" + i18n.language + "/account/profile"}
                  ></Redirect>
                </Switch>
              </Router>
            </RightContent>
          </Main>
        </InnerContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateBalanceList: () => dispatch(walletAction.updateBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
