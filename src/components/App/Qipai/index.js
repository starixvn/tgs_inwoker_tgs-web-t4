import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import Common from "../../../utils/Common";

import ScrollAnimation from "react-animate-on-scroll";
import { SHOW_LOGIN, GameTypeEnum } from "@Inwoker/tgs-api";

import _633SelectedPNG from "../../../assets/images/qipai/633-selectedv2.png";

import i18n from "../../../utils/i18n";
import { Grid } from "@material-ui/core";

const Container = styled.div`
  margin-top: 100px;

  width: 100%;
  height: auto;
  min-height: 770px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/qipai/background.jpg)
    no-repeat center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 244px;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  position: absolute;
  right: 50%;
  margin-right: -586px;
  top: 400px;
  width: 1053px;
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
class Qipai extends Component {
  constructor(props) {
    super(props);

    var qipaiList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.QIPAI;
    });

    this.state = {
      selected: qipaiList[0],
      subMenu: null,
      isSelected: false,
      loaded: false,
      hide: true,
      list: qipaiList,
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
      var qipaiList = this.props.game.homePageGameList.filter((item) => {
        return item.type == GameTypeEnum.QIPAI;
      });

      this.setState({
        ...this.state,
        selected: qipaiList[0],

        list: qipaiList,
      });
    }
  }
  triggerSetSelected = (bool) => {
    this.setState({
      isSelected: bool,
    });
  };

  handleJoinGameClick = (kind) => {
    if (this.props.token) {
      Common.PopupCenter(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.QIPAILOBBY +
          "/" +
          kind.toUpperCase(),
        1280,
        720
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
            if (index < 3) {
              return (
                <GameWrapper maintenance={item.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GirlImage
                    style={{ float: "right" }}
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/qipai/" +
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
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);
