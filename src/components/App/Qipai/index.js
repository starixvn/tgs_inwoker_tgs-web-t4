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
  min-height: 824px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL}/assets/images/pcGamePage/qipai/background.jpg)
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

const LeftGirl = styled.img`
  animation: ${leftRightLeft} 800ms forwards;
`;

const RightGirl = styled.img`
  animation: ${rightLeftRight} 800ms forwards;
`;

const CenterText = styled.div`
  text-align: center;
  color: #fff;
  line-height: 1.25rem;
  margin-bottom: 50px;
`;

const LogoHolder = styled.img`
  margin-bottom: 30px;
`;
const Model = styled(ScrollAnimation)`
  background: url(${(props) => props.img}) no-repeat center;
  height: 785px;
  width: 740px;
  position: absolute;
  left: 50%;
  margin-left: -225px;
  bottom: -100px;
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
      .PUBLIC_URL}/assets/images/pcGamePage/qipai/button.png)
    no-repeat;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;

  &:hover {
    cursor: pointer;
    color: #000;
  }
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
        <Grid container justify="center" style={{ height: "100%" }}>
          <MiddleDesc item animateIn="fadeIn" duration={1} animateOnce={true}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ height: "100%" }}
            >
              <LogoHolder
                src={`${process.env.PUBLIC_URL}/assets/images/pcGamePage/qipai/ky.png`}
              />
              <CenterText>{i18n.t("KY.desc")}</CenterText>
              <JoinGameButton
                onClick={() => {
                  this.handleJoinGameClick("ky");
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
              "/assets/images/pcGamePage/qipai/model.png"
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
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);
