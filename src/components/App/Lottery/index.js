import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";

import { SHOW_LOGIN, GameEnum, GameTypeEnum } from "@Inwoker/tgs-api";

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

const Model = styled(ScrollAnimation)`
  background: url(${(props) => props.img}) no-repeat center;
  height: 785px;
  width: 740px;
  position: absolute;
  left: 50%;

  bottom: -20px;
  margin-left: -120px;
`;
const CenterText = styled.div`
  text-align: center;
  font-family: AdobeHeitiR;
  line-height: 1.25rem;
  margin-bottom: 50px;
  color: #fff;
`;

const LogoHolder = styled.div`
  height: 150px;
  width: 150px;

  ${({ selected, src }) => {
    return selected === true
      ? `background: url(${src})
      no-repeat center / contain;`
      : `background: #474747; -webkit-mask: url(${src})
    no-repeat center / contain;`;
  }}
  cursor: pointer;

  background-size: 100%;
  margin: 10px 20px;
`;
const MiddleDesc = styled(ScrollAnimation)`
  position: absolute;

  right: 50%;
  margin-right: 100px !important;
  width: 470px;
  top: 150px;
`;
const JoinGameButton = styled.div`
  width: 261px;
  height: 76px;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/pcGamePage/lottery/button.png)
    no-repeat;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding-top: 25px;

  &:hover {
    cursor: pointer;
    color: #000;
  }
`;

const LogoHolderContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
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
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.LOTTERYLOBBY +
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
        <Grid container justify="center" style={{ height: "100%" }}>
          <MiddleDesc item animateIn="fadeIn" duration={1} animateOnce={true}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ height: "100%" }}
            >
              <LogoHolderContainer>
                {this.state.list
                  .filter((a) => {
                    if (a.abbreviation.includes("TCG")) {
                      switch (config.currency) {
                        case "CNY":
                          return (
                            a.abbreviation === "TCG_LOTTO" ||
                            a.abbreviation === "TCG_SEA"
                          );
                        case "VND":
                          return (
                            a.abbreviation === "TCG_LOTTO_VN" ||
                            a.abbreviation === "TCG_SEA"
                          );
                        default:
                          return "";
                      }
                    } else {
                      return a;
                    }
                  })
                  .map((data, index) => {
                    return (
                      <LogoHolder
                        id={data.abbreviation}
                        selected={this.state.selected === data.abbreviation}
                        src={`${process.env.PUBLIC_URL}/assets/images/pcGamePage/lottery/${data.abbreviation}.png`}
                        onClick={() => {
                          this.handleGameChange(data.abbreviation);
                        }}
                      />
                    );
                  })}
              </LogoHolderContainer>

              <CenterText>{i18n.t("VR.desc")}</CenterText>

              <JoinGameButton
                onClick={() => {
                  this.handleJoinGameClick(this.state.selected);
                }}
              >
                {i18n.t("common.joinGame")}
              </JoinGameButton>
            </Grid>
          </MiddleDesc>

          <Model
            animateIn="fadeInRight"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
            img={
              process.env.PUBLIC_URL +
              "/assets/images/pcGamePage/lottery/ball.png"
            }
          ></Model>
        </Grid>
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
