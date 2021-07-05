import React, { useEffect } from "react";
import styled from "styled-components";
import JoinButton from "../../assets/images/btn-join.png";
import JoinButtonHover from "../../assets/images/btn-join-hover.png";
import i18n from "../../utils/i18n";


const JoinGameBtn = styled.div`
  background: url(${JoinButton}) no-repeat center;
  background-size: 100%;
  height: 60px;
  width: 200px;

  display: flex;
  align-items: center;
  padding-left: 65px;
  color: white;
  text-shadow: 3px 1px 2px rgb(0 0 0 / 75%);
  font-family: ADZYJT;
  font-size: 30px;
  user-select: none;
  cursor: pointer;

  :hover {
    background: url(${JoinButtonHover}) no-repeat center;

    background-size: 100%;
  }
`;

const JoinGameButton = ({ text, click }) => {

  return (
    <JoinGameBtn onClick={click}>{i18n.t("common.startGame")}</JoinGameBtn>
  );
};

export default JoinGameButton;
