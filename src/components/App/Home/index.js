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

import Section1FishPNG from "../../../assets/images/home/section/section1-fish.png";
import Section1LotteryPNG from "../../../assets/images/home/section/section1-lottery.png";
import Section1SlotPNG from "../../../assets/images/home/section/section1-slot.png";

import Section1FishBGPNG from "../../../assets/images/home/section/section1-fish-bg.png";
import Section1LotteryBGPNG from "../../../assets/images/home/section/section1-lottery-bg.png";
import Section1SlotBGPNG from "../../../assets/images/home/section/section1-slot-bg.png";

import ScrollAnimation from "react-animate-on-scroll";
import { Grid } from "@material-ui/core";
const breatheAnimation = keyframes`
 0% { transform:translateY(0); }
 50% { transform:translateY(-20px); }
 100% { transform:translateY(0px); }
`;
const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const SectionContainer = styled.div`
  background-color: ${(props) => props.theme.primary};

  width: 100%;
`;
const FirstSection = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 280px;
  padding-top: 60px;
`;
const FirstSectionItemImg = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  background-position: right center;
  position: absolute;
  bottom: 2px;
  right: 12px;
  height: 255px;
  width: 220px;
  animation: 3s linear 0s infinite normal none running ${breatheAnimation};
`;
const FirstSectionItemBg = styled(Grid)`
  position: absolute;
  top: 20px;
  left: 40px;
  height: 102px;
  width: 153px;

  padding-left: 14px;
`;
const FirstSectionItemLabel = styled(Grid)``;
const FirstSectionItem = styled(Grid)`
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  float: left;
  width: 410px;
  height: 210px;
  color: #fff;
  font-size: 1.8em;
  padding-top: 215px;
  padding-left: 38px;
  position: relative;
  overflow: visible;
  &:hover {
    cursor: pointer;
  }
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

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
          <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer>
        </SliderContainer>
        <SectionContainer>
          <FirstSection>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <FirstSectionItem
                item
                spacing={0}
                img={Section1SlotBGPNG}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  this.props.history.push(`/${i18n.language}/slots`);
                }}
              >
                <FirstSectionItemImg
                  img={Section1SlotPNG}
                ></FirstSectionItemImg>
                <FirstSectionItemBg
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <FirstSectionItemLabel item>
                    {i18n.t("web.home.Section1Slot")}
                  </FirstSectionItemLabel>
                </FirstSectionItemBg>
              </FirstSectionItem>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <FirstSectionItem
                item
                spacing={0}
                img={Section1LotteryBGPNG}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  this.props.history.push(`/${i18n.language}/lottery`);
                }}
              >
                <FirstSectionItemImg
                  img={Section1LotteryPNG}
                ></FirstSectionItemImg>
                <FirstSectionItemBg
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <FirstSectionItemLabel item>
                    {i18n.t("web.home.Section1Lottery")}
                  </FirstSectionItemLabel>
                </FirstSectionItemBg>
              </FirstSectionItem>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <FirstSectionItem
                item
                spacing={0}
                img={Section1FishBGPNG}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  this.props.history.push(`/${i18n.language}/fish`);
                }}
              >
                <FirstSectionItemImg
                  img={Section1FishPNG}
                ></FirstSectionItemImg>
                <FirstSectionItemBg
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <FirstSectionItemLabel item>
                    {i18n.t("web.home.Section1FISHing")}
                  </FirstSectionItemLabel>
                </FirstSectionItemBg>
              </FirstSectionItem>
            </ScrollAnimation>
          </FirstSection>
          <SecondSection />
        </SectionContainer>
        <ThirdSection handleJoinGameClick={this.handleJoinGameClick} />
        <FloatPanel
          onhandleDepositClick={this.props.onhandleDepositClick}
          onhandleShowCSClick={this.props.onhandleShowCSClick}
          onDownloadClick={() =>
            this.handleNavigateClick("/" + i18n.language + "/download")
          }
        ></FloatPanel>
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
