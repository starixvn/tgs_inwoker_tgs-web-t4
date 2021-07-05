import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";

import SectionTwoJPG from "../../../assets/images/home/section/section2-bg.jpg";
import ModalAGPNG from "../../../assets/images/home/section/modal-ag.png";
import ModalBGPNG from "../../../assets/images/home/section/modal-bg.png";
import ModalSGPNG from "../../../assets/images/home/section/modal-sg.png";

import SampleAGJPG from "../../../assets/images/home/section/sample-ag.jpg";
import SampleBGJPG from "../../../assets/images/home/section/sample-bg.jpg";
import SampleSGJPG from "../../../assets/images/home/section/sample-sg.jpg";

import SectionTwoTabPNG from "../../../assets/images/home/section/section2-tab.png";
import ScrollAnimation from "react-animate-on-scroll";
const GameSelectorWithSlider = styled.div`
  height: 900px;
  width: 100%;
  margin: 0 auto;
  background: url(${SectionTwoJPG}) no-repeat;
  background-position: center center;
  background-size: 1920px 900px;

  position: relative;
  overflow: visible;
`;
const TitleContainer = styled(ScrollAnimation)`
  height: 155px;
  width: 346px;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/" +
    Common.getLanguagePrefixFolder() +
    "/section2-title.png"})
    center no-repeat;
  margin: 0 auto;
`;

const GameSlider = styled.div`
  height: 11px;
  width: 52px;
  transition: background 300ms linear;

  cursor: pointer;
  margin: 0px 10px;
`;

const GameSliderButtonContainer = styled.div`
  padding: 10px 0px;
  position: absolute;
  bottom: 124px;
  left: 50%;
  display: flex;
  margin-left: 460px;
`;
const GameModeContainer = styled.div`
  width: 514px;
  margin: 18px auto 0 auto;
  overflow: visible;
  padding-left: 13px;
`;
const GameModeItemContainer = styled.div`
  width: 182px;
  height: 48px;
  margin-left: -15px;
  float: left;
  position: relative;
  text-align: center;
  color: #c0c0c0;
  font-weight: bold;
  padding-top: 12px;
`;
const GameModeItem = styled.div`
  background: url(${SectionTwoTabPNG}) no-repeat;
  width: 182px;
  height: 48px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: ${(props) => (props.selected === true ? 1 : 0)};
  text-align: center;
  color: #003564;
  font-weight: bold;
  padding-top: 12px;
`;
const TheGameSampleContainer = styled(ScrollAnimation)`
  z-index: 0;
  width: 809px;
  height: 458px;
  position: absolute;

  top: 298px;
  right: 50%;
  margin-right: -390px;
`;
const TheGameSample = styled.div`
  width: 809px;
  height: 458px;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 300ms linear;
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  opacity: ${(props) => (props.selected === true ? 1 : 0)};
`;
const TheGameGirlContainer = styled(ScrollAnimation)`
  z-index: 1;
  width: 743px;
  height: 725px;
  position: relative;
  bottom: 0px;
  left: 50%;
  margin-left: 155px;
`;
const TheGameGirl = styled.div`
  width: 743px;
  height: 725px;
  position: absolute;
  background: url(${(props) => props.img}) no-repeat;
  background-position: left bottom;
  transition: opacity 300ms linear;
  opacity: ${(props) => (props.selected === true ? 1 : 0)};
  left: 0;
  bottom: 0;
`;

const SecondSection = () => {
  const [selected, setSelected] = useState(0);

  var timerAnimation = null;
  useEffect(() => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    timerAnimation = setAnimation();
  }, [selected]);
  const handleSliderClick = (index) => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    setSelected(index);
  };
  const setAnimation = () => {
    return setTimeout(() => {
      if (selected >= 2) {
        setSelected(0);
      } else {
        setSelected(selected + 1);
      }
    }, 3000);
  };

  return (
    <GameSelectorWithSlider>
      <TitleContainer
        animateIn="flipInY"
        animateOut="flipOutY"
        style={{ overflow: "visible" }}
      ></TitleContainer>
      <GameModeContainer>
        <GameModeItemContainer>
          {i18n.t("AG.name")}
          <GameModeItem selected={selected === 0}>
            {i18n.t("AG.name")}
          </GameModeItem>
        </GameModeItemContainer>
        <GameModeItemContainer>
          {i18n.t("BG.name")}
          <GameModeItem selected={selected === 1}>
            {i18n.t("BG.name")}
          </GameModeItem>
        </GameModeItemContainer>
        <GameModeItemContainer>
          {i18n.t("SG.name")}
          <GameModeItem selected={selected === 2}>
            {i18n.t("SG.name")}
          </GameModeItem>
        </GameModeItemContainer>
      </GameModeContainer>
      <TheGameSampleContainer
        animateIn="fadeIn"
        duration={1}
        animateOnce={true}
      >
        <TheGameSample
          img={SampleAGJPG}
          selected={selected === 0}
        ></TheGameSample>
        <TheGameSample
          img={SampleBGJPG}
          selected={selected === 1}
        ></TheGameSample>
        <TheGameSample
          img={SampleSGJPG}
          selected={selected === 2}
        ></TheGameSample>
      </TheGameSampleContainer>
      <TheGameGirlContainer
        animateIn="fadeInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <TheGameGirl img={ModalAGPNG} selected={selected === 0}></TheGameGirl>
        <TheGameGirl
          img={ModalBGPNG}
          selected={selected === 1}
          style={{ left: "150px" }}
        ></TheGameGirl>
        <TheGameGirl
          img={ModalSGPNG}
          selected={selected === 2}
          style={{ left: "150px" }}
        ></TheGameGirl>
      </TheGameGirlContainer>
    </GameSelectorWithSlider>
  );
};

export default SecondSection;
