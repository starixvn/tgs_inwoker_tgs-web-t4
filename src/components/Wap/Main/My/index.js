import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { AppHistory } from "../../../../history/History";
import { accountAction, walletAction } from "@Inwoker/tgs-api";

import CircularProgress from "@material-ui/core/CircularProgress";

import IconProfileDepositPNG from "../../../../assets/images/wap/icon-profile-deposit.png";
import IconProfileTransferPNG from "../../../../assets/images/wap/icon-profile-transfer.png";

import IconProfileWithdrawalPNG from "../../../../assets/images/wap/icon-profile-withdrawal.png";

import IconProfileProfilePNG from "../../../../assets/images/wap/icon-profile-profile.png";
import IconProfileInboxPNG from "../../../../assets/images/wap/icon-profile-inbox.png";
import IconProfileCashflowPNG from "../../../../assets/images/wap/icon-profile-cashflow.png";
import IconProfileReportPNG from "../../../../assets/images/wap/icon-profile-report.png";
import IconProfileCardPNG from "../../../../assets/images/wap/icon-profile-card.png";
import IconProfileRecommendPNG from "../../../../assets/images/wap/icon-profile-recommend.png";

import IconProfileAboutPNG from "../../../../assets/images/wap/icon-profile-about.png";
import IconProfileLanguagePNG from "../../../../assets/images/wap/icon-profile-language.png";
import AvatarPNG from "../../../../assets/images/avatar.png";
import BtnLogout from "../../../Share/ButtonBlankWap";
import Common from "../../../../utils/Common";

import BgProfilePNG from "../../../../assets/images/wap/bg-profile2.jpg";
import BgProfile2PNG from "../../../../assets/images/wap/bg-profile-2.png";
import i18n from "../../../../utils/i18n";
const StyledAppBar = withStyles((theme) => ({
  root: {
    height: "370px",
    display: "block",
    background: theme.palette.primary.main,

    background:
      `linear-gradient(rgba(` +
      theme.palette.primary.mainRgb +
      `, 0.8), rgba(` +
      theme.palette.primary.mainGradientRgb +
      `, 0.8)), url(${BgProfilePNG})`,
  },
}))(AppBar);
const Container = styled.div`
  width: 100%;
`;
const LevelContainer = styled.div`
  float: right;

  margin: 30px 20px 0 0;
`;
const VipLevelLabel = styled.span`
  font-size: 28px;
  margin-top: 2px;
  display: inline-block;
  color: #01f1fe;
`;

const AvatarContainer = styled.div`
  width: 188px;
  height: 188px;
  float: left;
  margin: 20px 0 0 70px;
`;
const AvatarImg = styled.img`
  width: 170px;
`;
const InfoContainer = styled.div`
  float: left;
  margin: 20px 0 0 0px;
  width: 460px;
  overflow: visible;
`;

const NameContainer = styled.div`
  float: left;

  font-size: 40px;
  font-weight: 600;

  color: #fff;
`;

const MainWalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;
const TotalWalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;
const WalletLabel = styled.div`
  color: #eeeeee;
  float: left;
`;
const WalletAmount = styled.div`
  color: #f5f5f5;
  font-weight: 500;
  float: left;
  margin-left: 15px;
`;
const IconContainer = styled.div`
  width: 716px;
  height: 190px;
  border-radius: 30px;
  box-shadow: 0px 3px 12px 0 rgba(0, 0, 0, 0.6);
  border: solid 1px #a9a9a9;
  background-image: linear-gradient(to top, #e0e0e0, #ffffff);

  margin: 10px auto 30px auto;
  padding: 40px 30px 0 30px;
`;
const IconColumn = styled.div`
  width: 33%;
  float: left;
  position: relative;
`;
const IconImg = styled.div`
  background: url(${(props) => props.src}) no-repeat center center;
  width: 65px;
  height: 60px;
  margin: 0 auto;
  display: block;
`;
const IconLabel = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;

const ListView = styled.div`
  padding: 480px 30px 90px 30px;
`;
const ListItem = styled.div`
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #ffffff;
  background-image: linear-gradient(to top, #e0e0e0, #ffffff);

  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: center 40px;

  width: 166px;
  height: 154px;
  border-radius: 6px;
  box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.8);
  border: solid 1px #ffffff;

  font-size: 20px;

  float: left;
  margin: 15px 32px;

  text-align: center;
  color: ${(props) =>
    props.disabled ? `rgba(61, 61, 61, 0.3)` : props.theme.secondary};
  padding-top: 110px;
  position: relative;
`;
const RedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e23a3f;
  border-radius: 50%;
  position: absolute;
`;

const MessageRedDot = styled(RedDot)`
  top: 15px;
  right: 15px;
`;
class My extends Component {
  constructor(props) {
    super(props);
    var balance = 0;
    var loaded = true;
    if (this.props.wallet.balanceList.length > 0) {
      balance = this.getTotalBalance();
      loaded = true;
    }
    this.state = {
      balance: balance,
      balanceLoaded: loaded,
      avatarError: false,
    };
  }
  componentDidMount() {
    if (this.props.account.token === null) {
      AppHistory.replace("/" + i18n.language + "/");
    }
    if (this.props.wallet.balanceList.length <= 0) {
      this.props.getBalanceList();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.balanceList.length !==
        this.props.wallet.balanceList.length &&
      this.props.wallet.balanceList.length > 0
    ) {
      this.setState({
        ...this.state,
        balance: this.getTotalBalance(),
        balanceLoaded: true,
      });
    }
  }
  getTotalBalance = () => {
    var balance = 0;
    for (let i = 0; i < this.props.wallet.balanceList.length; i++) {
      try {
        balance += parseFloat(
          this.props.wallet.balanceList[i].balance.replace(/,/g, "")
        );
      } catch (e) {}
    }
    return balance;
  };
  handleLogoutClick = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/");
      }
    });
  };

  render() {
    return (
      <Container>
        <StyledAppBar position="fixed" color="default">
          <LevelContainer onClick={() => this.props.navigate("/vip")}>
            <VipLevelLabel>
              {this.props.account.vip.curr_vip.title}
            </VipLevelLabel>
          </LevelContainer>
          <div className="clear"></div>
          <AvatarContainer>
            <AvatarImg src={AvatarPNG}></AvatarImg>
          </AvatarContainer>
          <InfoContainer>
            <NameContainer>
              {this.props.account.info.member_username}
            </NameContainer>

            <div className="clear"></div>
            <MainWalletContainer>
              <WalletLabel>
                {i18n.t("wap.main.account.mainAccount")}
              </WalletLabel>
              <WalletAmount>
                {this.props.wallet.mainSymbol}
                {Common.formatNumberWithThousand(this.props.wallet.mainBalance)}
              </WalletAmount>
            </MainWalletContainer>
            <TotalWalletContainer>
              <WalletLabel>{i18n.t("wap.main.account.totalFund")}:</WalletLabel>
              <WalletAmount>
                {(() => {
                  if (this.state.balanceLoaded) {
                    return (
                      this.props.wallet.mainSymbol +
                      Common.formatNumberWithThousand(
                        this.props.wallet.mainBalance
                      )
                    );
                  } else {
                    return (
                      <CircularProgress
                        size={25}
                        color={"secondary"}
                        style={{ margin: "6px 0 0 10px" }}
                      ></CircularProgress>
                    );
                  }
                })()}
              </WalletAmount>
            </TotalWalletContainer>
          </InfoContainer>

          <div className="clear"></div>
          <IconContainer>
            <IconColumn onClick={() => this.props.navigate("/deposit")}>
              <IconImg src={IconProfileDepositPNG}></IconImg>
              <IconLabel>{i18n.t("common.deposit")}</IconLabel>
            </IconColumn>
            <IconColumn onClick={() => this.props.navigate("/transfer")}>
              <IconImg src={IconProfileTransferPNG}></IconImg>
              <IconLabel>{i18n.t("common.transfer")}</IconLabel>
            </IconColumn>
            <IconColumn onClick={() => this.props.navigate("/withdrawal")}>
              <IconImg src={IconProfileWithdrawalPNG}></IconImg>
              <IconLabel>{i18n.t("common.withdrawal")}</IconLabel>
            </IconColumn>
          </IconContainer>
        </StyledAppBar>
        <ListView>
          <ListItem
            icon={IconProfileProfilePNG}
            onClick={() => this.props.navigate("/profile")}
          >
            {i18n.t("wap.main.account.personalInfo")}
          </ListItem>
          <ListItem
            icon={IconProfileInboxPNG}
            onClick={() => this.props.navigate("/inbox")}
          >
            {i18n.t("wap.main.account.inbox")}

            <MessageRedDot
              style={
                this.props.account.info.message_num > 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            ></MessageRedDot>
          </ListItem>
          {/* <ListItem
            icon={IconProfileCashflowPNG}
            onClick={() => this.props.navigate("/report/1")}
          >
            {i18n.t("wap.main.account.transferReport")}
          </ListItem> */}

          <ListItem
            icon={IconProfileReportPNG}
            onClick={() => this.props.navigate("/report/2")}
          >
            {i18n.t("wap.main.account.betReport")}
          </ListItem>
          <ListItem
            icon={IconProfileCardPNG}
            onClick={() => this.props.navigate("/card")}
          >
            {i18n.t("wap.main.account.manageBank")}
          </ListItem>

          {/*   <ListItem
            icon={IconProfileRecommendPNG}
            onClick={() => this.props.navigate("/affiliate")}
          >
            {i18n.t("wap.main.account.affiliate")}
          </ListItem> */}

          {/* <ListItem
            icon={IconProfileAboutPNG}
            onClick={() => this.props.navigate("/aboutus")}
          >
            {i18n.t("wap.main.account.question")}
          </ListItem> */}

          {/* <ListItem
            icon={IconProfileDownloadPNG}
            onClick={() =>
              window.open(
                "http://app.633download.com/app/download?key=lss014",
                "_blank"
              )
            }
          >
            {i18n.t("wap.main.account.appDownload")}
          </ListItem> */}
          <ListItem
            icon={IconProfileLanguagePNG}
            onClick={() => this.props.navigate("/setting/language")}
          >
            {i18n.t("common.language")}
          </ListItem>
          <div className="clear"></div>
          <BtnLogout
            onClick={this.handleLogoutClick}
            name={i18n.t("wap.main.account.signout")}
            style={{ margin: "30px auto 10px auto" }}
          ></BtnLogout>
        </ListView>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(My);
