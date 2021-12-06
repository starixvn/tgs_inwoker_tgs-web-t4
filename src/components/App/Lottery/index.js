import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";

import { SHOW_LOGIN, GameService, GameTypeEnum } from "@Inwoker/tgs-api";

import _633Lottery from "../../../assets/images/lottery/633-lotteryball.png";
import _633Description from "../../../assets/images/lottery/633-lotterydescription.png";

import { Grid, Container as MContainer } from "@material-ui/core";

import i18n from "../../../utils/i18n";
import ScrollAnimation from "react-animate-on-scroll";
import config from "../../../config/config";
const Container = styled.div`
  margin-top: 100px;

  width: 100%;
  height: auto;
  min-height: 770px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/background.jpg)
    no-repeat center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat center;
  width: 275px;
  height: 244px;
  background-size: 100%;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  position: absolute;
  right: 50%;
  margin-right: -586px;
  top: 450px;
  width: 1100px;
  display: flex;
  justify-content: center;
`;
const RightSlide = styled(ScrollAnimation)`
  position: absolute;
  left: 50%;
  top: 500px;
  margin-left: -594px;
  width: 1053px;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;

  text-transform: capitalize;
  font-weight: bold;
  font-size: 35px;
`;

const GameWrapper = styled.div`
  width: 308px;
  height: 244px;
  float: right;
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `

  ${Maintenance}{
   
    display: flex;
  }
  ${GirlImage}{
    filter: brightness(20%) grayscale(200%);
  }
  
  
  `
      : ``;
  }}
`;
class Lottery extends Component {
  constructor(props) {
    super(props);

    var lotteryList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.LOTTERY;
    });

    this.state = {
      selected: lotteryList[0],
      subMenu: null,
      loaded: false,
      hide: true,
      list: lotteryList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var lotteryList = this.props.game.homePageGameList.filter((item) => {
        return item.type == GameTypeEnum.LOTTERY;
      });

      this.setState({
        ...this.state,
        selected: lotteryList[0].abbreviation,

        list: lotteryList,
      });
    }
  }
  handleJoinGameClick = (name) => {
    if (this.props.account.token != null) {
      window.open(
        "/" + i18n.language + "/joinlottery/" + name,
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <LeftSlide
          animateIn="fadeInLeft"
          duration={1}
          animateOnce={true}
          style={{ overflow: "visible" }}
        >
          {this.state.list.map((item, index) => {
            if (index < 4) {
              return (
                <GameWrapper maintenance={item.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GirlImage
                    style={{ float: "right" }}
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/lottery/" +
                      item.abbreviation.toLowerCase() +
                      ".png"
                    }
                    onClick={() => {
                      this.handleJoinGameClick(item.abbreviation);
                    }}
                  />
                </GameWrapper>
              );
            }
          })}
        </LeftSlide>
        {
          //      <RightSlide
          //      animateIn="fadeInRight"
          //      duration={1}
          //      animateOnce={true}
          //      style={{ overflow: "visible" }}
          //    >
          //      {this.state.list.map((item, index) => {
          //        if (index >= 3) {
          //          return (
          //            <GameWrapper maintenance={item.status != 0}>
          //              <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
          //              <GirlImage
          //                style={{ float: "right" }}
          //                img={
          //                  process.env.PUBLIC_URL +
          //                  "/assets/images/pcGamePage/live/" +
          //                  item.abbreviation.toLowerCase() +
          //                  ".png"
          //                }
          //                onClick={() => {
          //                  this.handleJoinGameClick(item.abbreviation);
          //                }}
          //              />
          //            </GameWrapper>
          //          );
          //        }
          //      })}
          //    </RightSlide>
        }
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
    account: state.account,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
