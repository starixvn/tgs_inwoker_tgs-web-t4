import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import Common from "../../../utils/Common";
import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";

import {
  SHOW_LOGIN,
  GameService,
  GameTypeEnum,
  GameEnum,
} from "@Inwoker/tgs-api";

import BtnJoinPNG from "../../../assets/images/btn-join.png";
import BtnJoinHoverPNG from "../../../assets/images/btn-join-hover.png";
import _633Lottery from "../../../assets/images/lottery/633-lotteryball.png";
import _633Description from "../../../assets/images/lottery/633-lotterydescription.png";

import i18n from "../../../utils/i18n";

import JDBLogo from "../../../assets/images/fish/jdb_logo.png";

const Container = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  background: url(${(props) =>
      `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/bg.jpg`})
    no-repeat;
  background-position: center -50px;
`;

const leftRightLeft = keyframes`
from  {
  -webkit-transform:translate3d(-30px,0,0);
  opacity:0;
  transform:translate3d(-30px,0,0);
 
}
to{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);
}
  `;
const leftRightLeftHide = keyframes`
  from{
    -webkit-transform:translateZ(0);
    opacity:1;
    transform:translateZ(0);
  }
  to{
    -webkit-transform:translate3d(-30px,0,0);
    opacity:0;
    transform:translate3d(-30px,0,0);
  }
    `;

const rightLeftRight = keyframes`
from{
  -webkit-transform:translate3d(30px,0,0);
  opacity:0;
  transform:translate3d(30px,0,0);

}
to{
  -webkit-transform:translateZ(0);
  opacity:1;
  transform:translateZ(0);

}
  `;
const rightLeftRightHide = keyframes`
  from{
    -webkit-transform:translateZ(0);
    opacity:1;
    transform:translateZ(0)
;
  }
  to{
    -webkit-transform:translate3d(30px,0,0);
    opacity:0;
    transform:translate3d(30px,0,0);
  }
    `;

const TabContainer = styled.div`
  width: 950px;
  z-index: 3;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 70%;

  margin: 10px auto;
  position: relative;
  text-align: center;
`;

const ButtonTab = styled.button`
  width: 200px;
  border: none;
  height: 60px;
  outline: none;
  float: left;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  ${(props) => {
    if (props.selected === true) {
      return `background: url(${BtnRedHoverPNG}) no-repeat center 3px;

      `;
    } else {
      return ` &:hover {
        cursor: pointer;
        background: url(${BtnRedHoverPNG}) no-repeat center 3px;
      }
      background: url(${BtnRedPNG}) no-repeat center 3px;`;
    }
  }}
`;

const LotteryGames = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  transition: animation 1s;
  pointer-events: none;

  background: url(${(props) =>
      `${
        process.env.PUBLIC_URL
      }/assets/images/pcGamePage/lottery/left/${props.abbreviation.toLowerCase()}.png`})
    no-repeat center bottom;

  ${(props) =>
    props.index === 0
      ? ""
      : props.loaded
      ? `
          visibility:hidden;
          `
      : `
        visibility:visible;
          `}
  animation: ${(props) =>
    props.transition
      ? css`
          ${leftRightLeft} 800ms   forwards;
        `
      : css`
          ${leftRightLeftHide} 400ms   forwards;
        `};
`;

const ButtonJoin = styled.div`
  background: url(${BtnJoinPNG}) no-repeat center;
  width: 236px;
  height: 71px;
  position: absolute;
  top: 400px;
  right: 50%;
  margin-right: -430px;
  &:hover {
    cursor: pointer;
    background: url(${BtnJoinHoverPNG}) no-repeat center;
  }
  color: #fff;
  font-size: 30px;
  text-shadow: #000;
  font-weight: bold;
  text-align: center;
  padding: 0px 0px 0px 50px;
  line-height: 71px;
`;
const LiveGameDescription = styled.div`
  height: 100%;
  width: 390px;
  position: absolute;
  top: 300px;
  right: 50%;
  margin-right: -506px;
  color: #000;
  font-size: 16px;
  text-align: center;
`;

const RightContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  ${(props) =>
    props.transition
      ? `
       pointer-events:all;
      `
      : `
    pointer-events:none;
      `};
  animation: ${(props) =>
    props.transition
      ? css`
          ${rightLeftRight} 800ms   forwards;
        `
      : css`
          ${rightLeftRightHide} 400ms   forwards;
        `};
  background: url(${(props) =>
      `${
        process.env.PUBLIC_URL
      }/assets/images/pcGamePage/lottery/right/${props.abbreviation.toLowerCase()}.png`})
    no-repeat center bottom;
  ${(props) =>
    props.index === 0
      ? ""
      : props.loaded
      ? `
            visibility:hidden;
            `
      : `
          visibility:visible;
            `}
`;

const CenterText = styled.div`
  text-align: center;
  font-family: AdobeHeitiR;
  line-height: 1.25rem;
  margin-bottom: 50px;
`;

const LogoHolder = styled.div`
  width: 300px;
  height: 200px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  position: absolute;
  right: 50%;
  top: 60px;
  margin-right: 238px;
`;

const ImageHolder = styled.img`
  width: 100%;
  margin-left: 1px;
  margin-top: -11px;
`;
const GameContainer = styled.div`
  position: absolute;
  top: 460px;
  left: 50%;
  width: 910px;
  transform: translateX(-50%);
`;
const GameItem = styled.div`
  width: 300px;
  height: 150px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;
class Fishing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,

      page: 1,
      limit: 25,
      total: 0,
      type: GameTypeEnum.FISH,

      platform: GameEnum.JDB,
    };
  }
  componentDidMount() {
    this.getGameList();
  }
  componentDidUpdate(preProps, preStates) {}
  handleJoinGameClick = (gid) => {
    if (this.props.token) {
      Common.PopupCenter(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.FISH +
          "/" +
          GameEnum.JDB +
          "/" +
          gid,
        1280,
        720
      );
    } else {
      this.props.showLogin(true);
    }
  };
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: response.data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(response.data),
            loading: false,
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
          platform: platform,
          type: type,
          loading: false,
        });
      }
    });
  }
  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <GameContainer>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Dragon_Fishing.png`
            }
            onClick={() => this.handleJoinGameClick(700001)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Dragon_Fishing_II.png`
            }
            onClick={() => this.handleJoinGameClick(700002)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Cai_Shen_Fishing.png`
            }
            onClick={() => this.handleJoinGameClick(700003)}
          ></GameItem>
        </GameContainer>
        <GameContainer style={{ top: "610px", width: "1210px" }}>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Five_Dragons_Fishing.png`
            }
            onClick={() => this.handleJoinGameClick(700004)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Fishing_YiLuFa.png`
            }
            onClick={() => this.handleJoinGameClick(700005)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Dragon_Master.png`
            }
            onClick={() => this.handleJoinGameClick(700006)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/FishingDisco.png`
            }
            onClick={() => this.handleJoinGameClick(700007)}
          ></GameItem>
        </GameContainer>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fishing);
