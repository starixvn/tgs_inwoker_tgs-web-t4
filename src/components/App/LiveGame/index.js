import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import i18n from "../../../utils/i18n";

import { SHOW_LOGIN, GameTypeEnum } from "@Inwoker/tgs-api";
import ScrollAnimation from "react-animate-on-scroll";

const Container = styled.div`
  margin-top: 100px;

  width: 100%;
  height: auto;
  min-height: 770px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/live/background.jpg)
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
  top: 290px;
  width: 1053px;
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
  padding-top: 75px;
  padding-right: 55px;
  text-transform: capitalize;
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
    filter: brightness(40%) grayscale(200%);
  }
  
  
  `
      : ``;
  }}
`;

class LiveGame extends Component {
  constructor(props) {
    super(props);

    var liveList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.LIVELOBBY;
    });

    this.state = {
      selected: liveList[0],
      subMenu: null,
      isSelected: false,
      hide: true,
      list: liveList,
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
      var liveList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.LIVE;
      });

      this.setState({
        ...this.state,
        selected: liveList[0],
        list: liveList,
      });
    }
  }
  triggerSetSelected = (bool) => {
    this.setState({
      isSelected: bool,
    });
    setTimeout(() => {
      this.triggerSetSelected(false);
    }, 800);
  };
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.LIVELOBBY +
          "/" +
          params.toUpperCase(),
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
            if (index < 3) {
              return (
                <GameWrapper maintenance={item.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GirlImage
                    style={{ float: "right" }}
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/live/" +
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
        <RightSlide
          animateIn="fadeInRight"
          duration={1}
          animateOnce={true}
          style={{ overflow: "visible" }}
        >
          {this.state.list.map((item, index) => {
            if (index >= 3) {
              return (
                <GameWrapper maintenance={item.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GirlImage
                    style={{ float: "right" }}
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/live/" +
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
        </RightSlide>
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
export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
