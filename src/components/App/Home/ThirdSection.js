import { Grid, Container as MContainer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import BackgroundJPG from "../../../assets/images/home/section/section3-bg.jpg";
import ModalPNG from "../../../assets/images/home/section/section3-modal.png";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import ScrollAnimation from "react-animate-on-scroll";
const Background = styled.div`
  height: 710px;
  width: 100%;
  background: url(${BackgroundJPG}) center -350px no-repeat;
  position: relative;
`;

const LeftModal = styled.img`
  position: absolute;
  right: 50%;
`;

const RightDesc = styled.img`
  position: absolute;
  left: 50%;
  top: 200px;
  margin-left: -347px;
`;

const ThirdSection = (props) => {
  return (
    <Background>
      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <LeftModal src={ModalPNG}></LeftModal>
      </ScrollAnimation>
      <ScrollAnimation
        animateIn="fadeInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <RightDesc
          src={
            process.env.PUBLIC_URL +
            "/assets/images/" +
            Common.getLanguagePrefixFolder() +
            "/section3-desc.png"
          }
        ></RightDesc>
      </ScrollAnimation>
    </Background>
  );
};

export default ThirdSection;
