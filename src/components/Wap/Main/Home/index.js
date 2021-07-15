import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import Slider from "./Slider";
import DoubleMarquee from "react-marquee-double";
import { withRouter } from "react-router-dom";

import { GameTypeEnum } from "@Inwoker/tgs-api";
import Common from "../../../../utils/Common";

import IconDepositPNG from "../../../../assets/images/wap/icon-deposit.png";
import IconWithdrawalPNG from "../../../../assets/images/wap/icon-withdrawal.png";
import IconTransferPNG from "../../../../assets/images/wap/icon-transfer.png";

import BtnSignupPNG from "../../../../assets/images/wap/btn-signup.png";
import BtnStartGamePNG from "../../../../assets/images/wap/btn-start-game.png";

import i18n from "../../../../utils/i18n";

import HomeProfilePNG from "../../../../assets/images/wap/home-profile.png";
import Marquee from "./Marquee";
const StyledAppBar = withStyles({
  root: {
    height: "550px",
    boxShadow: "none",
  },
})(AppBar);

const FixedContainer = styled.div`
  background-color: #fff;
  height: 265px;
  border-radius: 20px 20px 0 0;
  width: 100%;
  position: absolute;
  bottom: -2px;
`;
const AnnouncementContainer = styled.div`
  margin: 10px 23px;
`;
const AnnouncementTitle = styled.div`
  font-size: 28px;

  color: #000;
  font-weight: bold;
  float: left;
`;
const MarqueeContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 21px;

  float: left;
  line-hight: 26px;
  overflow: hidden;
  margin: 5px 0 0 8px;
  color: #f6f6f6;
  width: 640px;
  height: 36px;
  border-radius: 17px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;
const ProfileContainer = styled.div`
  width: 723px;
  height: 192px;
  margin: 0 auto;
`;
const ProfileContainerTop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px 10px 0 0;

  padding: 15px 25px 0 26px;
`;
const ProfileContainerBottom = styled.div`
  width: 100%;

  padding: 0 25px 0 26px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;
const WelcomeLabel = styled.div`
  float: left;
  font-family: SourceHanSansCN;
  font-size: 22px;

  color: #dfdfdf;
`;
const WelcomeUsernameLabel = styled(WelcomeLabel)`
  color: #fde73f;
  font-weight: bold;
`;

const ProfileLink = styled(WelcomeLabel)`
  float: right;
`;
const BalanceContainer = styled.div`
  float: left;
`;
const BalanceAmount = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  width: 100%;
  margin-top: 35px;
`;
const WalletTypeLabel = styled(WelcomeLabel)`
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;
const WalletActionContainer = styled.div`
  float: right;
`;
const WalletActionUL = styled.ul`
  text-align: center;

  margin-top: 15px;

  font-size: 28px;

  color: #ffffff;
`;
const WalletActionLI = styled.li`
  display: inline-table;
  padding: 0 10px;

  text-align: center;
`;
const WalletActionIcon = styled.div`
  ${(props) => `background:url(${props.img}) no-repeat center center; `}
  background-color: ${(props) => props.theme.secondary};
  margin: 0 auto;
  border-radius: 50%;
  background-size: 60px;
  width: 80px;
  height: 80px;
`;
const ButtonSignup = styled.div`
  width: 195px;
  height: 71px;
  background: url(${BtnSignupPNG}) no-repeat;
  margin: 40px 0 0 60px;
  color: #fff;
  text-align: center;
  padding: 17px 0;
  font-size: 28px;
`;

const ButtonStartGame = styled.div`
width: 148px;
height: 43px;
background: url(${BtnStartGamePNG}) no-repeat;
background-size: 100%;
margin: 150px 0 0 76px;
font-size:16px;
font-weight:bold;
line-height:37px;
text-align:center;
color:#000;
}
`;
const GameSelectionContainer = styled.div`
  font-size: 48px;
  position: absolute;
  top: 550px;
  left: 0;
`;
const GameSelectionUL = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #cdcdcd;
  margin: 0;

  padding: 0 0px;
  width: 176px;
  overflow-y: auto;
  height: calc(100vh - 640px);
`;
const GameSelectionEmpty = styled.div`
  height: 90px;
  width: 130px;
`;
const GameSelectionLI = styled.div`
  width: 130px;
  height: 69px;
  border-radius: 10px;

  border: solid 2px #adadad;
  background-color: #ededed;
  margin: 16px auto 0 auto;

  font-size: 35.5px;

  line-height: 1.7;

  color: ${({ theme }) => theme.secondary};
  text-align: center;
  ${(props) =>
    props.selected
      ? ` 
  color: #fde73f;

  border: solid 2px #000;

  background-image: linear-gradient(to top, ` +
        props.theme.primaryGradient +
        `, ` +
        props.theme.primary +
        `);`
      : ``}
`;

const GameListContainer = styled.div`
  padding-top: 570px;
  padding-bottom: 100px;
  padding-left: 175px;
  background-color: #fff;
`;
const GameListWrap = styled.div`
  width: 557px;
  padding: 25px 18px;
  border-radius: 10px;
  background-color: #ededed;
`;
const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 225px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
`;

class Home extends Component {
  state = {
    value: 0,
    marqueeText: [],
    banner_list: [],
    gameTypeListSorting: [],
    selectedGameType: 0,
    tab1: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
      verifyList: [],
    },
    tab2: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
    },
    loading: true,
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.props.game.homePageGameList.length > 0) {
      var gameTypeListSorting = this.formatSortedGameList();
      this.setState({
        ...this.state,
        gameTypeListSorting: gameTypeListSorting,
        selectedGameType: gameTypeListSorting[0],
      });
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var gameTypeListSorting = this.formatSortedGameList();
      this.setState({
        ...this.state,
        gameTypeListSorting: gameTypeListSorting,
        selectedGameType: gameTypeListSorting[0],
      });
    }
  }

  formatSortedGameList() {
    var currentType = -1;
    var gameTypeListSorting = [];
    var displayGameType = Common.GetDisplayGameType();

    this.props.game.homePageGameList
      .filter((a) => displayGameType.indexOf(a.type) >= 0)
      .sort((a, b) => {
        return a.type - b.type;
      })
      .map((row, index) => {
        if (currentType !== row.type) {
          gameTypeListSorting.push(row.type);
        }
        currentType = row.type;
      });
    return gameTypeListSorting;
  }
  handleScroll = (e) => {
    const doc = document.documentElement;

    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    top = top + 670;

    var D = document;
    var docHeight = Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
    var gameTypeListSorting = this.state.gameTypeListSorting;
    let gameType = gameTypeListSorting[0];
    if (window.innerHeight + window.scrollY >= docHeight - 2) {
      gameType = gameTypeListSorting[gameTypeListSorting.length - 1];
    } else {
      for (var i = gameTypeListSorting.length - 1; i >= 0; i--) {
        if (
          top >
          document.getElementById("gameType" + gameTypeListSorting[i]).offsetTop
        ) {
          gameType = gameTypeListSorting[i];
          break;
        }
      }
    }

    this.setState({ ...this.state, selectedGameType: gameType });
  };
  handleGameTypeClick = (gameType) => {
    let pos = document.getElementById("gameType" + gameType).offsetTop;

    window.scrollTo({ top: pos - 575, behavior: "smooth" });
  };
  handleGameClick = (type, params, game_platform_id) => {
    if (!this.props.account.token) {
      this.props.navigate("/");
      return;
    }
    if (
      type === GameTypeEnum.SLOT ||
      type === GameTypeEnum.TIGERSLOT ||
      type === GameTypeEnum.TABLEGAME ||
      type === GameTypeEnum.FISH
    ) {
      this.props.navigate(`/slots/${params}/${type}`);
    } else {
      Common.PopupCenter(
        "/" + i18n.language + "/joinlobbygame/" + type + "/" + params
      );
    }
  };
  handleSignupClick = () => {
    this.props.navigate("/");
  };
  convertGameTypeToText(gameType) {
    switch (gameType) {
      case GameTypeEnum.LIVE:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.LIVELOBBY:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.QIPAI:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.QIPAILOBBY:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.SPORTS:
        return i18n.t("wap.main.home.gameTab.sports");
      case GameTypeEnum.ESPORTS:
        return i18n.t("wap.main.home.gameTab.esports");
      case GameTypeEnum.LOTTERYLOBBY:
        return i18n.t("wap.main.home.gameTab.lottery");
      case GameTypeEnum.SLOT:
        return i18n.t("wap.main.home.gameTab.slot");
      case GameTypeEnum.FISH:
        return i18n.t("wap.main.home.gameTab.fish");
      case GameTypeEnum.TIGERSLOT:
      default:
        return i18n.t("wap.main.home.gameTab.electron");
    }
  }
  getImgPrefix(gameType) {
    switch (gameType) {
      case GameTypeEnum.FISH:
        return "fish";
      case GameTypeEnum.LIVE:
        return "live";
      case GameTypeEnum.LIVELOBBY:
        return "live";
      case GameTypeEnum.LOTTERYLOBBY:
        return "lottery";
      case GameTypeEnum.QIPAI:
        return "chess";
      case GameTypeEnum.QIPAILOBBY:
        return "chess";
      case GameTypeEnum.SLOT:
        return "slot";
      case GameTypeEnum.SPORTS:
        return "sports";
      case GameTypeEnum.ESPORTS:
        return "esports";
      case GameTypeEnum.TIGERSLOT:
        return "slot";
      case GameTypeEnum.TABLEGAME:
        return "table";
      default:
        return "";
    }
  }

  render() {
    return (
      <>
        <StyledAppBar position="fixed" color="default">
          {/* {(() => {
            if (this.props.ui.board_list.length === 0) {
              return <></>;
            } else {
              return <Slider list={this.props.ui.board_list}></Slider>;
            }
          })()} */}
          <Slider></Slider>;
          <FixedContainer>
            <AnnouncementContainer>
              <AnnouncementTitle>
                {i18n.t("wap.main.home.profile.announcement")}
              </AnnouncementTitle>
              <MarqueeContainer>
                <Marquee />
              </MarqueeContainer>
            </AnnouncementContainer>
            <ProfileContainer src={HomeProfilePNG}>
              <ProfileContainerTop>
                {(() => {
                  if (this.props.account.token != null) {
                    return (
                      <>
                        <WelcomeLabel>
                          {i18n.t("wap.main.home.profile.welcomeBack")}
                        </WelcomeLabel>
                        <WelcomeUsernameLabel>
                          {this.props.account.info.member_username}
                        </WelcomeUsernameLabel>
                      </>
                    );
                  } else {
                    return (
                      <WelcomeLabel>
                        {i18n.t("wap.main.home.profile.pleaseLogin")}
                      </WelcomeLabel>
                    );
                  }
                })()}

                <ProfileLink onClick={() => this.props.navigate("/profile")}>
                  {i18n.t("wap.main.home.profile.profile")}
                </ProfileLink>
              </ProfileContainerTop>
              <ProfileContainerBottom>
                <BalanceContainer>
                  {(() => {
                    if (this.props.account.token != null) {
                      return (
                        <>
                          <BalanceAmount>
                            {this.props.wallet.mainSymbol}{" "}
                            {Common.formatNumberWithThousand(
                              this.props.wallet.mainBalance
                            )}
                          </BalanceAmount>
                          <WalletTypeLabel>
                            {i18n.t("wap.main.home.profile.mainAccount")}
                          </WalletTypeLabel>
                        </>
                      );
                    } else {
                      return (
                        <ButtonSignup onClick={this.handleSignupClick}>
                          {i18n.t("wap.main.home.profile.loginRegister")}
                        </ButtonSignup>
                      );
                    }
                  })()}
                </BalanceContainer>
                <WalletActionContainer>
                  <WalletActionUL>
                    <WalletActionLI
                      onClick={() => this.props.navigate("/deposit")}
                    >
                      <WalletActionIcon img={IconDepositPNG}></WalletActionIcon>
                      {i18n.t("common.deposit")}
                    </WalletActionLI>
                    <WalletActionLI
                      onClick={() => this.props.navigate("/transfer")}
                    >
                      <WalletActionIcon
                        img={IconTransferPNG}
                      ></WalletActionIcon>
                      {i18n.t("common.transfer")}
                    </WalletActionLI>
                    <WalletActionLI
                      onClick={() => this.props.navigate("/withdrawal")}
                    >
                      <WalletActionIcon
                        img={IconWithdrawalPNG}
                      ></WalletActionIcon>
                      {i18n.t("common.withdrawal")}
                    </WalletActionLI>
                  </WalletActionUL>
                </WalletActionContainer>
              </ProfileContainerBottom>
            </ProfileContainer>
          </FixedContainer>
          <GameSelectionContainer>
            <GameSelectionUL>
              {(() => {
                return this.state.gameTypeListSorting.map((type, index) => {
                  return (
                    <GameSelectionLI
                      style={
                        i18n.language === "en-US"
                          ? { fontSize: "29px", paddingTop: "6px" }
                          : {}
                      }
                      key={index}
                      selected={this.state.selectedGameType === type}
                      onClick={() => this.handleGameTypeClick(type)}
                    >
                      {this.convertGameTypeToText(type)}
                    </GameSelectionLI>
                  );
                });
              })()}
            </GameSelectionUL>
          </GameSelectionContainer>
        </StyledAppBar>
        <GameListContainer>
          <GameListWrap>
            {(() => {
              var displayGameType = Common.GetDisplayGameType();
              var currentType = -1;
              return this.props.game.homePageGameList
                .filter((a) => displayGameType.indexOf(a.type) >= 0)
                .sort(function (a, b) {
                  return a.type - b.type;
                })
                .map((row, index) => {
                  var jsx = (
                    <GameFrameImg
                      src={`${
                        process.env.PUBLIC_URL
                      }/assets/images/wapGame/${this.getImgPrefix(
                        row.type
                      )}-${row.abbreviation.toLowerCase()}.png`}
                      key={index}
                      id={
                        currentType !== row.type
                          ? `gameType${row.type}`
                          : `gameId${row.id}`
                      }
                      onClick={() =>
                        this.handleGameClick(
                          row.type,
                          row.abbreviation,
                          row.game_platform_id
                        )
                      }
                    >
                      <ButtonStartGame>
                        {i18n.t("common.startGame")}
                      </ButtonStartGame>
                    </GameFrameImg>
                  );
                  currentType = row.type;
                  return jsx;
                });
            })()}
          </GameListWrap>
        </GameListContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    wallet: state.wallet,
    game: state.game,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     closeModal: () => {
//       dispatch({ type: "close" });
//     }
//   };
// };
export default connect(mapStateToProps, null)(withSnackbar(withRouter(Home)));
