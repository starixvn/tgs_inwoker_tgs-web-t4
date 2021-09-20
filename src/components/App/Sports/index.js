import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { withRouter } from "react-router-dom";

import { SHOW_LOGIN, GameTypeEnum, GameEnum } from "@Inwoker/tgs-api";
import i18n from "../../../utils/i18n";
import { Grid, Container as MContainer } from "@material-ui/core";

import ScrollAnimation from "react-animate-on-scroll";
const Container = styled.div`
  margin-top: 100px;

  width: 100%;
  height: auto;
  min-height: 770px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/sports/background.jpg)
    no-repeat center;
`;

const transitionIn = keyframes`
0%{
  -webkit-transform:scale(.95);
  transform:scale(.95);
  opacity:0
}
to{
  -webkit-transform:scale(1);
  transform:scale(1);
  opacity:1
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

const leftSoccerShow = keyframes`
    
0%{
  -webkit-transform:translate(10px,-5px);
  opacity:0;
  transform:translate(10px,-5px);
}
to{
  -webkit-transform:translate(0);
  opacity:1;
  transform:translate(0);
}

    `;

const middleSoccerShow = keyframes`
    
0%{
  -webkit-transform:translateY(35px);
  opacity:0;
  transform:translateY(35px);
}
to{
  -webkit-transform:translate(0);
  opacity:1;
  transform:translate(0);
}

    `;

const rightSoccerShow = keyframes`
    
0%{
  -webkit-transform:translate(-10px,-5px);
  opacity:0;
  transform:translate(-10px,-5px);
}
to{
  -webkit-transform:translate(0);
  transform:translate(0);
  opacity:1;
}

    `;

const middleTextShow = keyframes`
    0%{
      -webkit-transform:translate(0);
      opacity:0;
      transform:translate(0);
  }
  to{
      -webkit-transform:translate(0);
      opacity:1;
      transform:translate(0);
  }`;

const SoccerPlayer = styled.div`
  height: 630px;
  width: 730px;
  position: absolute;
  top: 0;
  transition: animation 1s;
  overflow: visible;
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
const TheCustomizedGameButton = styled(Grid)`
  position: absolute;

  color: white;
  text-shadow: 3px 1px 2px rgb(0 0 0 / 75%);
  font-family: ADZYJT;
  font-size: 30px;
  position: absolute;
  user-select: none;

  cursor: ${(props) => {
    return !props.disable ? "pointer" : "no-drop";
  }};
`;

const LeftButton = styled(TheCustomizedGameButton)`
  padding-right: 100px;
  position: absolute;
  bottom: -72px;
  left: 55px;
`;

const RightButton = styled(TheCustomizedGameButton)`
  padding-right: 100px;
  position: absolute;
  bottom: -72px;
  left: -2px;
`;

const ContainerInsideButton = styled.div`
  position: relative;
`;

const TextInsideContainer = styled.div`
  position: absolute;
  left: 200px;
  top: 10px;
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
`;

const GameWrapper = styled.div`
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

class Sports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.game.homePageGameList.filter((item) => {
        return (
          item.type === GameTypeEnum.SPORTS ||
          item.type === GameTypeEnum.ESPORTS
        );
      }),
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var sportsList = this.props.game.homePageGameList.filter((item) => {
        return (
          item.type === GameTypeEnum.SPORTS ||
          item.type === GameTypeEnum.ESPORTS
        );
      });
      console.log(this.props.game.homePageGameList);
      this.setState({
        ...this.state,
        selected: sportsList[0],

        list: sportsList,
      });
    }
  }
  handleJoinGameClick = (params, type) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      this.props.history.push(
        "/" +
          i18n.language +
          "/sports/play/" +
          params +
          "/" +
          (params === GameEnum.IMES
            ? GameTypeEnum.ESPORTS
            : GameTypeEnum.SPORTS)
      );
    }
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
                  <GameWrapper maintenance={item.status != 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
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
                            "/assets/images/pcGamePage/sports/" +
                            item.abbreviation.toLowerCase() +
                            ".png"
                          }
                        />
                      </TheGirlImageContainer1>
                    </GirlsContainer>
                  </GameWrapper>
                </Grid>
              );
            })}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sports));
