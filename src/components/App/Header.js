import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import "react-sticky-header/styles.css";
import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";

import {
  accountAction,
  walletAction,
  SHOWING_DIALOG,
  SHOW_LOGIN,
  GameTypeEnum,
  GameService,
} from "@Inwoker/tgs-api";

import TimerPNG from "../../assets/images/timer.png";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";
import Config from "../../config/config";
import i18n from "../../utils/i18n";
import LanguangeChanger from "./LanguagePicker";
const moment = require("moment");

const InnerWrap = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  font-size: 14px;
`;
const TopContainer = styled.div`
  height: 45px;
`;
const TimerContainer = styled.div`
  padding-top: 18px;
  font-family: arial;
  float: left;
  @media (max-width: 950px) {
    display: none;
  }
`;
const TimerLogo = styled.div`
  width: 11px;
  height: 11px;
  background: url(${TimerPNG}) no-repeat;
  float: left;
  margin-top: 3px;
`;
const TimerSpan = styled.span`
  color: #f6f6f6;
  float: left;
  margin-left: 5px;
  width: 190px;
`;
const LinkContainer = styled.div`
  padding-top: 2px;
  float: left;
  @media (max-width: 950px) {
    display: none;
  }
`;
const CustomLink = styled(Link)`
  color: #f6f6f6;

  &:hover {
    color: #fde73f;
    text-decoration: underline;
  }
`;
const CustomExternalLink = styled.a`
  font-family: yahei;
  ${(props) =>
    props.selected === true
      ? `
 color:#fde73f; 
font-weight:bold;
pointer-event:none;
`
      : `
color:#f6f6f6; 

&:hover {
 cursor:pointer;
 color: #fde73f;
 
 }
`}
`;
const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;
const LinkListItem = styled.li`
  display: inline;
`;
const LanguageContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

const LanguageContainer = styled.div`
  float: left;
  padding-top: 7.5px;
  padding-right: 5px;
  position: relative;
  display: inline-block;

  :hover {
    ${LanguageContent} {
      display: block;
    }
  }
`;

const RightContainer = styled.div`
  float: right;
  padding-top: 5px;
  display: flex;
  align-items: center;
`;

const BtnAppsAndCS = styled.div`
  width: 77px;

  float: right;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const BottomContainer = styled.div`
  height: 100px;
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: auto 60px;
  background-position: left center;
  width: 270px;

  float: left;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1279px) {
    display: none;
  }
`;

const RightMenuContainer = styled.div`
  float: right;
`;
const RightMenuUL = styled.ul`
  float: right;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RightMenuTextSpan = styled.span`
  font-size: 16px;

  margin: 0 auto;

  padding-top: 6px;
  text-align: center;

  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

const MouseOverContainer = styled.div`
  width: 100%;
  height: 0px;

  position: fixed;
  left: 0;
  top: 156px;
  z-index: 1;
  cursor: default;
  transition: height 0.5s;
`;
const MouseOverBackground = styled.div`
  width: 100%;

  background-color: rgba(${(props) => props.theme.primaryRgb}, 0.8);
  height: 160px;
  position: absolute;
  bottom: 30px;
`;

const RightMenuImg = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  ${(props) => `background-image:url(${props.img});`}

  ${(props) =>
    props.active
      ? `

  background-image:url(${props.hoverimg});
  `
      : `
  
  `}
`;
const MouseOverInner = styled.div`
  width: 1410px;
  height: 161px;
  margin: 0 auto;
`;

const GameImg = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  background-position: center bottom;
  background-size: auto 150px;
  height: 150px;
  overflow: visible;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px;
  transition: transform 0.6s;

  transform-origin: center bottom;
  transform: scale(1);
  &:after {
    content: "${(props) => props.text}";
    color: ${(props) => props.theme.primaryText};
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;

    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 50px;
  }
`;
const breatheAnimation = keyframes`

 to { transform:translateY(0px); }

`;
const RightMenuLI = styled.li`
  display: inline-block;
  min-width: 100px;
  padding: 0px 7.5px;
  height: 95px;
  line-height: 95px;
  text-align: center;
  color: ${(props) => props.theme.primaryText};
  border-bottom: solid 4px transparent;
  @media (max-width: 925px) {
    width: 100px;
  }
  @media (max-width: 770px) {
    width: 80px;
  }
  @media (max-width: 650px) {
    width: 100px;
  }
  &:hover {
    border-bottom: solid 4px #fde73f;
    color: #fde73f;

    cursor: pointer;
  }
  &:hover ${MouseOverContainer} {
    height: 190px;
  }
  &:hover ${RightMenuImg} {
    ${(props) => `background-image:url(${props.hoverimg});`}
  }
  &:hover ${GameImg} {
    animation-name: ${breatheAnimation};
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${(props) =>
    props.active
      ? `
  border-bottom: solid 4px #fde73f;
  color: #fde73f;


  `
      : `
  
  `}
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    background:
      "linear-gradient(180deg, rgba(" +
      theme.palette.primary.mainRgb +
      ",1) 0px, rgba(" +
      theme.palette.primary.mainRgb +
      ",1) 45px, rgba(" +
      theme.palette.primary.mainRgb +
      ",0.8) 45px)",
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
    "&.MuiPaper-elevation4": {
      boxShadow: "none",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
`;

const GameFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  height: 161px;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;

  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: not-allowed;
  pointer-event: none;
  color: white;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: bold;
`;

const GameFrame = styled.div`
  max-width: 290px;
  float: left;
  min-height: 160px;
  position: relative;
  transition: transform 0.6s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameImg}{
        filter: brightness(40%) grayscale(200%);
      }

      ${Maintenance}{

        display: flex;
      }

  
    
    
    `
      : ``;
  }}
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    height: "100px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

const MenuItemList = [
  {
    path: "live",
    title: i18n.t("common.live"),

    gameType: [GameTypeEnum.LIVELOBBY],
  },
  {
    path: "chess",
    title: i18n.t("common.chess"),

    gameType: [GameTypeEnum.QIPAILOBBY],
  },
  {
    path: "sports",
    title: i18n.t("common.sports"),

    gameType: [GameTypeEnum.SPORTS, GameTypeEnum.ESPORTS],
  },
  {
    path: "lottery",
    title: i18n.t("common.lottery"),

    gameType: [GameTypeEnum.LOTTERYLOBBY],
  },
  {
    path: `slots`,
    title: i18n.t("common.slot"),

    gameType: [GameTypeEnum.SLOT],
  },
  {
    path: `electron`,
    title: i18n.t("common.electron"),

    gameType: [GameTypeEnum.TABLEGAME],
  },
  {
    path: `fish`,
    title: i18n.t("common.fish"),

    gameType: [GameTypeEnum.FISH],
  },
];
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/",
      hovermenu: "",
      shouldShow: null,
      isHoverMenu: false,
      isHoverSubMenuContainer: false,
      open: false,
      dialog: "",
      systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
  }

  updateInterval = null;
  tickCount = 0;

  async componentDidMount() {
    this.setState({ selected: this.props.location.pathname });

    this.FireTimerToUpdateBalance();
  }
  FireTimerToUpdateBalance = () => {
    this.updateInterval = setInterval(() => {
      this.setState({
        ...this.state,
        systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
      const localStorageToken = localStorage.getItem("token0");
      if (
        this.props.account.token === localStorageToken &&
        localStorageToken !== null
      ) {
        this.tickCount++;
        if (this.tickCount >= 10) {
          this.tickCount = 0;
          this.props.getBalanceList(false);
        }
      }
    }, 1000);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(evt) {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      this.setState({ ...this.state, shouldShow: false });
    } else {
      this.setState({ ...this.state, shouldShow: true });
    }
    return;
  }

  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/" + i18n.language + "/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/" + i18n.language + "/");
  };
  onhandleTransfer = () => {
    this.props.history.push("/" + i18n.language + "/account/transfer");
  };
  onhandleDeposit = () => {
    this.props.history.push("/" + i18n.language + "/account/deposit");
  };
  handleInboxClick = () => {
    this.props.history.push("/" + i18n.language + "/account/inbox");
  };
  handleRefreshBalanceClick = () => {
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .map((a) => {
        this.props.getGameBalance(a.abbreviation);
      });
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/" + i18n.language + "/download");
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/" + i18n.language + "/aboutus/contactus");
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    this.setState({ ...this.state, selected: path });
    this.props.history.push("/" + i18n.language + `/${path}`);
  };

  RightMenuItem = (to, label, subMenuImg) => {
    const { classes } = this.props;

    return (
      <RightMenuLI
        active={this.state.selected === `${to}`}
        onClick={() => this.handleClickMenu(to)}
        onMouseOver={() => this.handleMenuMouseOver(to)}
        onMouseLeave={this.handleMenuMouseLeave}
      >
        <RightMenuTextSpan
          className={`${
            this.state.shouldShow === null
              ? classes.maxLabel
              : this.state.shouldShow
              ? classes.maxLabel
              : classes.minLabel
          }`}
        >
          {label}
        </RightMenuTextSpan>
      </RightMenuLI>
    );
  };
  MouseOverItem = (to, image) => {
    return (
      <CustomLink to={to} onClick={() => this.setState({ selected: to })}>
        <img src={image} alt=""></img>
      </CustomLink>
    );
  };

  handleJoinLotteryGame = (name) => {
    if (this.props.account.token != null) {
      GameService.GetGameList(name, GameTypeEnum.LOTTERYLOBBY).then((e) => {
        if (e.IsSuccess) {
          GameService.JoinGame(e.data[0].id, name).then((response) => {
            if (response.IsSuccess) {
              this.setState({ ...this.state, maintenance: false });
              window.open(
                response.data.url,
                "_blank",
                "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
              );
            } else {
              this.setState({ ...this.state, maintenance: true });
            }
          });
        }
      });
    } else {
      this.props.showLogin(true);
    }
  };

  handleJoinGameClick = (gameType, path, gameCode, url) => {
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
    ];
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (gameType == GameTypeEnum.SPORTS || gameType == GameTypeEnum.ESPORTS) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameCode === "WGFM" || gameCode === "WGVIA") {
            window.open(
              `/${i18n.language}/joinlobbygame/${gameType}/${gameCode}`,
              "_blank"
            );
          } else {
            this.props.history.push(
              "/" + i18n.language + "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      Common.PopupCenter(url, gameCode, 1280, 720);
    }
  };
  handleBookmarkClick = () => {
    let pageTitle = document.title;
    let pageURL = document.location;
    try {
      // Internet Explorer solution
      eval(
        "window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g, "")
      );
    } catch (e) {
      try {
        // Mozilla Firefox solution
        window.sidebar.addPanel(pageTitle, pageURL, "");
      } catch (e) {
        // Opera solution
        if (typeof window.opera == "object") {
          e.rel = "sidebar";
          e.title = pageTitle;
          e.url = pageURL;
          return true;
        } else {
          // The rest browsers (i.e Chrome, Safari)

          alert(
            i18n.t("web.header.plsClick") +
              (navigator.userAgent.toLowerCase().indexOf("mac") != -1
                ? "Cmd"
                : "Ctrl") +
              "+D" +
              i18n.t("web.header.bookmark")
          );
        }
      }
    }
    return false;
  };
  render() {
    const { classes } = this.props;
    return (
      <CustomAppBar hide={this.props.hide}>
        <InnerWrap>
          <TopContainer>
            {/* <TimerContainer>
              <TimerLogo></TimerLogo>
              <TimerSpan>GMT+8 {this.state.systemDateTime}</TimerSpan>
            </TimerContainer>
            <LinkContainer>
              <LinkList>
                <LinkListItem>
                  {config.languages.map((lang, index) => {
                    return (
                      <>
                        <CustomExternalLink
                          selected={i18n.language === lang.name}
                          onClick={() => {
                            window.location.href = `/${lang.name}`;
                          }}
                        >
                          {lang.label}
                        </CustomExternalLink>
                        {index < config.languages.length - 1 ? " | " : ""}
                      </>
                    );
                  })}
                </LinkListItem>
              </LinkList>
            </LinkContainer> */}
            <RightContainer>
              <LanguageContainer>
                <LanguangeChanger language={this.props.general.brandLanguage} />
              </LanguageContainer>
              {(() => {
                if (
                  this.props.account.token !== this.props.account.info.token
                ) {
                  return (
                    <GuestContainer
                      onhandleShowCSClick={this.props.onhandleShowCSClick}
                      onhandleContactUsClick={this.handleContactUsClick}
                    ></GuestContainer>
                  );
                } else {
                  return (
                    <MemberContainer
                      onhandleLogout={this.onhandleLogout}
                      onhandleTransfer={this.onhandleTransfer}
                      onhandleDeposit={this.onhandleDeposit}
                      onhandleInboxClick={this.handleInboxClick}
                      onhandleRefreshBalanceClick={
                        this.handleRefreshBalanceClick
                      }
                    ></MemberContainer>
                  );
                }
              })()}
              <BtnAppsAndCS onClick={this.props.onhandleShowCSClick}>
                {i18n.t("common.cs")}
              </BtnAppsAndCS>
            </RightContainer>
          </TopContainer>
          <BottomContainer>
            <LogoContainer
              img={
                this.props.general.brand &&
                this.props.general.brand.desktopLogoUrl
              }
              onClick={this.onhandleLogoClick}
              className={`${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            ></LogoContainer>
            <RightMenuContainer>
              <RightMenuUL
                className="top-menu"
                className={`${
                  this.state.shouldShow === null
                    ? classes.maxMenu
                    : this.state.shouldShow
                    ? classes.maxMenu
                    : classes.minMenu
                }`}
              >
                {MenuItemList.map((item, index) => {
                  return (
                    <RightMenuLI
                      key={index}
                      active={this.state.selected === `${item.path}`}
                      onClick={() => this.handleClickMenu(item.path)}
                      onMouseOver={() => this.handleMenuMouseOver(item.path)}
                      onMouseLeave={this.handleMenuMouseLeave}
                      hoverimg={item.hoverImg}
                    >
                      <RightMenuTextSpan
                        className={`${
                          this.state.shouldShow === null
                            ? classes.maxLabel
                            : this.state.shouldShow
                            ? classes.maxLabel
                            : classes.minLabel
                        }`}
                      >
                        {item.title}
                      </RightMenuTextSpan>
                      <MouseOverContainer
                        onClick={(e) => e.stopPropagation()}
                        style={
                          this.state.shouldShow === null
                            ? { top: "145px" }
                            : this.state.shouldShow
                            ? { top: "145px" }
                            : { top: "114px" }
                        }
                      >
                        <MouseOverBackground>
                          <MouseOverInner>
                            {/* <ImagePromo src={`${process.env.PUBLIC_URL}/assets/images/pcHeaderMenu/${item.path}/rebate.png`} alt=""></ImagePromo> */}
                            {(() => {
                              var list =
                                this.props.game.homePageGameList.filter(
                                  (game) =>
                                    item.gameType.indexOf(game.type) >= 0
                                );
                              return list.map((game, index) => {
                                return (
                                  <GameFrame
                                    key={index}
                                    style={{
                                      width: `calc(1264px/${list.length})`,
                                    }}
                                    maintenance={game.status != 0}
                                  >
                                    <GameFrameWrapper>
                                      <Maintenance>
                                        {i18n.t("transfer.maintenance")}
                                      </Maintenance>
                                      <GameImg
                                        index={index}
                                        img={`${
                                          process.env.PUBLIC_URL
                                        }/assets/images/pcHeaderMenu/${
                                          item.path
                                        }/${game.abbreviation.toLowerCase()}.png`}
                                        text={i18n.t(
                                          `${game.abbreviation}.${item.path}`
                                        )}
                                        alt=""
                                        onClick={() => {
                                          if (
                                            game.type ===
                                              GameTypeEnum.LOTTERYLOBBY ||
                                            game.type === GameTypeEnum.LOBBY
                                          ) {
                                            this.handleJoinLotteryGame(
                                              game.abbreviation
                                            );
                                          } else {
                                            this.handleJoinGameClick(
                                              game.type,
                                              item.path,
                                              game.abbreviation,
                                              "/" +
                                                i18n.language +
                                                "/joingame/" +
                                                game.type +
                                                "/" +
                                                game.abbreviation
                                            );
                                          }
                                        }}
                                      ></GameImg>
                                    </GameFrameWrapper>
                                  </GameFrame>
                                );
                              });
                            })()}
                          </MouseOverInner>
                        </MouseOverBackground>
                      </MouseOverContainer>
                    </RightMenuLI>
                  );
                })}

                {this.RightMenuItem(
                  "promotion",
                  i18n.t("common.promotion"),
                  null
                )}
              </RightMenuUL>
            </RightMenuContainer>
          </BottomContainer>
        </InnerWrap>
      </CustomAppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    ui: state.ui,
    account: state.account,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateScreenSize: (width, height) => {
    //   dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    // },
    // checkTokenIsValid: token =>
    //   dispatch(accountAction.checkTokenIsValid(token)),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getBalanceList: (loading) => dispatch(walletAction.getBalanceList(loading)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withStyles(styles)(Header)))
);
