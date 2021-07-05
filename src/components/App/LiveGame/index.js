import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import LiveBgNewJPG from "../../../assets/images/live/live-bg-new.jpg";

import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";

import BtnJoinPNG from "../../../assets/images/btn-join.png";
import BtnJoinHoverPNG from "../../../assets/images/btn-join-hover.png";

import i18n from "../../../utils/i18n";

import { SHOW_LOGIN, GameEnum, GameTypeEnum } from "@Inwoker/tgs-api";
import { Grid, Container as MContainer } from "@material-ui/core";
import JoinGameButton from "../../Share/JoinGameButton";

// import LiveGirl1 from "../../../assets/images/live/new/live-girl-1.png";
// import LiveGirl2 from "../../../assets/images/live/new/live-girl-2.png";
// import LiveGirl3 from "../../../assets/images/live/new/live-girl-3.png";

const Container = styled.div`
  margin-top: 100px;

  width: 100%;
  height: auto;
  min-height: 824px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/live/background.jpg)
    no-repeat center;
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
    display:none;
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
    display:none;
  }
    `;

const LiveGameGirl = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
  background: url(${(props) =>
      `${
        process.env.PUBLIC_URL
      }/assets/images/pcGamePage/live/left/${props.abbreviation.toLowerCase()}.png`})
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

const LiveGameDescription = styled.div`
  height: 100%;
  width: 390px;
  position: absolute;
  top: 340px;
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

  animation-fill-mode: forwards;
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
      }/assets/images/pcGamePage/live/right/${props.abbreviation.toLowerCase()}.png`})
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

const GirlImage = styled.img`
  width: 100%;
`;

const moveUp = keyframes`
  0%,
  100% {
    transform: translateY(0);
    
  }
  50% {
    transform: translateY(-20px);

  }
`;

const GirlsContainer = styled(Grid)``;

const TheGirlImageContainer1 = styled(Grid)`
  animation: ${moveUp} 0.75s;
  &:hover {
    cursor: pointer;
  }
`;
const TheGirlImageContainer2 = styled(Grid)`
  animation: ${moveUp} 1s;
`;
const TheGirlImageContainer3 = styled(Grid)`
  animation: ${moveUp} 1.25s;
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
        <MContainer style={{ height: "100%" }}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ height: "100%", marginTop: "350px" }}
          >
            {this.state.list.map((item) => {
              return (
                <Grid item lg={12 / this.state.list.length}>
                  <GirlsContainer
                    container
                    direction="column"
                    alignItems="center"
                  >
                    <TheGirlImageContainer1 item>
                      <GirlImage
                        onClick={() => {
                          this.handleJoinGameClick(item.abbreviation);
                        }}
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/pcGamePage/live/" +
                          item.abbreviation.toLowerCase() +
                          ".png"
                        }
                      />
                    </TheGirlImageContainer1>
                  </GirlsContainer>
                </Grid>
              );
            })}

            {/* <GirlsContainer item lg={4}>
              <Grid container direction="column" alignItems="center">
                <TheGirlImageContainer2 item>
                  <GirlImage src={LiveGirl2} />
                </TheGirlImageContainer2>
                <JoinGameButton
                  click={() => {
                    this.handleJoinGameClick(GameEnum.SG);
                  }}
                />
              </Grid>
            </GirlsContainer>
            <GirlsContainer item lg={4}>
              <Grid container direction="column" alignItems="center">
                <TheGirlImageContainer3 item>
                  <GirlImage src={LiveGirl3} />
                </TheGirlImageContainer3>
                <JoinGameButton
                  click={() => {
                    this.handleJoinGameClick(GameEnum.AG);
                  }}
                />
              </Grid>
            </GirlsContainer> */}
          </Grid>
        </MContainer>
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
