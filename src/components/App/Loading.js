import React from "react";
import styled, { keyframes } from "styled-components";

import LoadingGIF from "../../assets/images/loading.gif";

import Config from "../../config/config";

const spinner = keyframes`
 0% { transform: rotateY(0deg);  }

 100% {  transform: rotateY(-360deg);}
`;
const Container = styled.div`
  width: 100%;

  top: 0;
  left: 0;
  position: absolute;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  z-index: 9;
  background-color: rgba(
    0,
    0,
    0,
    ${(props) => (props.opacity ? props.opacity : 0.8)}
  );
  ${(props) =>
    props.open ? "opacity:1;height: 100%;" : "opacity:0;height:0px;"};
`;
const Inner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 180px;
  animation-name: ${spinner};
  animation-timing-function: ease;
  animation-iteration-count: 1;
  animation-duration: 0.6s;
`;
const LogoImg2 = styled.img`
  margin: 0 auto;
  display: block;
`;
function Loading(props) {
  return (
    <Container open={props.show} opacity={props.opacity}>
      <Inner>
        <LogoImg
          src={
            process.env.PUBLIC_URL + `/assets/images/logo/${Config.brand}.png`
          }
        />
        <div className="clear"></div>
        <LogoImg2 src={LoadingGIF} />
      </Inner>
    </Container>
  );
}

export default Loading;
