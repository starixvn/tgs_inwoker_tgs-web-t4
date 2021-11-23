import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Common from "../../../utils/Common";

import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import Marquee from "./Marquee";
import FloatPanel from "./FloatPanel";
import { SHOW_MODAL, SHOW_LOGIN, GameTypeEnum } from "@Inwoker/tgs-api";

import i18n from "../../../utils/i18n";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

import ButtonImage1 from "../../../assets/images/home/section/live.png";
import ButtonImage2 from "../../../assets/images/home/section/slot.png";
import ButtonImage3 from "../../../assets/images/home/section/lottery.png";
import ButtonImage4 from "../../../assets/images/home/section/fish.png";

import Section1BG from "../../../assets/images/home/section/section1.jpg";
import Section2BG from "../../../assets/images/home/section/section2.jpg";
import Section3BG from "../../../assets/images/home/section/section3.jpg";

import CoinPNG from "../../../assets/images/home/section/coins.png";

import S1M11 from "../../../assets/images/home/section/section1menu/1-1-new.png";
import S1M12 from "../../../assets/images/home/section/section1menu/1-2-new.png";
import S1M13 from "../../../assets/images/home/section/section1menu/1-3-new.png";
import S1M14 from "../../../assets/images/home/section/section1menu/1-4-new.png";
import S1M21 from "../../../assets/images/home/section/section1menu/2-1-new.png";
import S1M22 from "../../../assets/images/home/section/section1menu/2-2-new.png";
import S1M23 from "../../../assets/images/home/section/section1menu/2-3-new.png";
import S1M24 from "../../../assets/images/home/section/section1menu/2-4-new.png";

import Section2T from "../../../assets/images/home/section/section2title.png";
import Section3T from "../../../assets/images/home/section/section3title.png";

import ScrollAnimation from "react-animate-on-scroll";
import { Grid, Container } from "@material-ui/core";
import config from "../../../config/config";
const breatheAnimation = keyframes`
 0% { transform:translateY(0); }
 50% { transform:translateY(-10px); }
 100% { transform:translateY(0px); }
`;
const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const SectionContainer = styled.div`
  background-color: ${(props) => props.theme.primary};

  width: 100%;
`;

const Section1 = styled.div`
  background: url(${Section1BG}) center no-repeat;
  height: 900px;
  position: relative;
  background-size: 100%;
`;

const Section2 = styled.div`
  background: url(${Section2BG}) center no-repeat;
  height: 780px;

  background-size: content;
`;

const Section3 = styled.div`
  background: url(${Section3BG}) center no-repeat;
  height: 580px;

  background-size: content;
`;

const FourButtonImageContainer = styled(Grid)`
  height: 250px;
`;

const FourButtonImage = styled.div`
  background: url(${({ src }) => src}) center no-repeat;
  height: auto;
  width: 170px;
  background-size: 100%;
  animation: 3s linear 0s infinite normal none running ${breatheAnimation};
`;

const FourButtonWrapper = styled.div`
  padding: 10px 37.5px;
  display: table-cell;
`;

const TheActualButton = styled(Grid)`
  padding: 10px 0px 18px 0px;
  :hover {
    background: #7b0906;
  }
`;

const TheFourButton = styled(Grid)`
  width: 258px;
  height: 338px;
  background: rgba(83, 83, 83, 0.2);
  border-radius: 8px;
  cursor: pointer;

  :hover {
    ${TheActualButton} {
      background: #7b0906;
    }
  }
`;

const TheButtonTitle = styled.div`
  color: #fff08c;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 3.5px;
`;

const TheButtonSubtitle = styled.div`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  font-family: "Arial";
  text-transform: uppercase;
  padding: 3.5px;
  opacity: 0.8;
`;

const StashOfCoins = styled.div`
  height: 500px;
  background: url(${CoinPNG}) no-repeat;
  background-position: 0px 43px;
`;

const IconsMenu = styled.img`
  height: 135px;
  width: auto;
`;

const GradientText = styled.div`
  background: -webkit-linear-gradient(
    90deg,
    rgba(254, 221, 109, 1) 0%,
    rgba(190, 136, 44, 1) 7%,
    rgba(254, 221, 109, 1) 78%,
    rgba(190, 136, 44, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const TheCoinStash = styled.div`
  background: url(props => props.img) no-repeat;
  position: absolute;
  left: 0%;
  bottom: -100px;
`;

const EightButton = styled.div`
  width: 700px;
  position: absolute;
  left: 45%;
  bottom: 125px;
`;

const TheIconMenuButton = styled(Grid)`
  width: 175px;
  height: 175px;
  display: inline-flex;

  :hover {
  }
`;

const MarqueeContainer = styled.div`
  background-color: transparent;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();
    this.state = {
      marqueeText: [],
      banner_list: [],
      wm: displayGame.wm,
      ky: displayGame.ky,
    };
  }

  componentDidMount() {
    let promotionId = "";
    let promotionChannelId = "";

    if (this.props.match.params) {
      promotionId = this.props.match.params.promotionid || "";
      promotionChannelId = this.props.match.params.promotionchannelid || "";
    }
    localStorage.setItem("promotionId", promotionId);
    localStorage.setItem("promotionChannelId", promotionChannelId);
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType == GameTypeEnum.SPORTS ||
          gameType == GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(
              `/${i18n.language}/sports/play/${gameCode}/${gameType}`
            );
          }
        } else {
          this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
        }
      } else {
        Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  theSubmenu = [
    {
      icon: S1M11,
      name: "108桌电子百家",
      path: "",
    },
    {
      icon: S1M12,
      name: "线上咪牌",
      path: "",
    },
    {
      icon: S1M13,
      name: "真人视讯",
      path: "",
    },
    {
      icon: S1M14,
      name: "直播百家乐",
      path: "",
    },
    {
      icon: S1M21,
      name: "多语言、多货币",
      path: "",
    },
    {
      icon: S1M22,
      name: "移动装置",
      path: "",
    },
    {
      icon: S1M23,
      name: "好路多桌",
      path: "",
    },
    {
      icon: S1M24,
      name: "支持万人同时在线",
      path: "",
    },
  ];

  theButton = [
    {
      image: ButtonImage1,
      title: "真人娛樂",
      subtitle: "live casino",
      path: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.props.history.push(`/${i18n.language}/live`);
      },
    },
    {
      image: ButtonImage2,
      title: "電子遊藝",
      subtitle: "slot games",
      path: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.props.history.push(`/${i18n.language}/slots`);
      },
    },
    {
      image: ButtonImage3,
      title: "彩票遊戲",
      subtitle: "lottery games ",
      path: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.props.history.push(`/${i18n.language}/lottery`);
      },
    },
    {
      image: ButtonImage4,
      title: "捕魚遊戲",
      subtitle: "fishing game",
      path: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.props.history.push(`/${i18n.language}/fish`);
      },
    },
  ];

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
        </SliderContainer>
        <MarqueeContainer>
          <Marquee text={this.props.ui.marqueeText}></Marquee>
        </MarqueeContainer>
        <Section1>
          <div style={{ textAlign: "-webkit-center" }}>
            {this.theButton.map((data, index) => {
              return (
                <FourButtonWrapper>
                  <TheFourButton
                    container
                    direction="column"
                    justify="space-between"
                    onClick={data.path}
                  >
                    <FourButtonImageContainer container justify="center">
                      <FourButtonImage src={data.image} />
                    </FourButtonImageContainer>
                    <TheActualButton
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <TheButtonTitle>{data.title}</TheButtonTitle>
                      <TheButtonSubtitle>{data.subtitle}</TheButtonSubtitle>
                    </TheActualButton>
                  </TheFourButton>
                </FourButtonWrapper>
              );
            })}
          </div>

          <StashOfCoins>
            <Container>
              <EightButton>
                {this.theSubmenu.map((data, index) => {
                  return (
                    <TheIconMenuButton
                      container
                      direction="column"
                      alignItems="center"
                    >
                      <IconsMenu src={data.icon} />
                      <GradientText>{data.name}</GradientText>
                    </TheIconMenuButton>
                  );
                })}
              </EightButton>
            </Container>
          </StashOfCoins>
        </Section1>
        <Section2>
          <Container>
            <div style={{ width: 300, color: "#fff" }}>
              <img src={Section2T} style={{ width: 300, marginTop: 100 }} />
              <div style={{ opacity: 0.6, lineHeight: 1.5 }}>
                还在为开版等待一个星期、半个月、一个月甚至更漫长的时间吗？时间就是金钱，我的朋友！NEW
                BET 5分钟急速开站，让您抢占市场快人一步！
              </div>
            </div>
          </Container>
        </Section2>
        <Section3>
          <Container>
            <div style={{ color: "#fff", position: "absolute", left: "50%" }}>
              <Grid container direction="column">
                <img src={Section3T} style={{ height: 165, marginTop: 100 }} />
                <div
                  style={{
                    opacity: 0.6,
                    lineHeight: 2.25,
                    marginLeft: 50,
                  }}
                >
                  1.帮好友注册或发注册链接给好友 <br />
                  2.好友存款下注 <br />
                  3.合伙人佣金=好友投注额*0.4%
                </div>
              </Grid>
            </div>
          </Container>
        </Section3>

        {
          //    <SectionContainer>
          //    <SecondSection />
          //  </SectionContainer>
          //  <ThirdSection handleJoinGameClick={this.handleJoinGameClick} />
        }
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
