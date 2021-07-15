import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Router, Switch, Route } from "react-router";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { AppHistory } from "../../../history/History";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import IconHomePNG from "../../../assets/images/wap/icon-home.png";
import IconPromotionPNG from "../../../assets/images/wap/icon-promotion.png";
import IconPlusPNG from "../../../assets/images/wap/icon-plus.png";
import IconCSPNG from "../../../assets/images/wap/icon-cs.png";
import IconProfilePNG from "../../../assets/images/wap/icon-profile.png";

import IconMenuClosePNG from "../../../assets/images/wap/icon-menu-close.png";
import IconMenuDepositPNG from "../../../assets/images/wap/icon-menu-deposit.png";
import IconMenuTransferPNG from "../../../assets/images/wap/icon-menu-transfer.png";
import IconMenuWithdrawalPNG from "../../../assets/images/wap/icon-menu-withdrawal.png";
import IconMenuReportPNG from "../../../assets/images/wap/icon-menu-report.png";
import IconMenuReport2PNG from "../../../assets/images/wap/icon-menu-report2.png";
import IconMenuReport3PNG from "../../../assets/images/wap/icon-menu-report3.png";
import IconMenuCardPNG from "../../../assets/images/wap/icon-menu-card.png";
import IconMenuInboxPNG from "../../../assets/images/wap/icon-menu-inbox.png";

import My from "./My/index";
import Home from "./Home/index";
import i18n from "../../../utils/i18n";
const StyledBottomAppBar = withStyles({
  root: {
    height: "90px",
    top: "auto",
    bottom: 0,
  },
})(AppBar);
const CustomBottomNavigation = withStyles((theme) => ({
  root: {
    backgroundImage:
      "linear-gradient(to top, " +
      theme.palette.primary.mainGradient +
      ", " +
      theme.palette.primary.main +
      ")",
  },
}))(BottomNavigation);
const CustomBottomNavigationAction = withStyles({
  root: {
    width: "570px",
    height: "90px",
    "&.Mui-selected": {
      "& .MuiBottomNavigationAction-wrapper>div": {
        backgroundColor: "#fde73f",
      },
    },
  },
  label: {
    fontSize: "21px",
    marginTop: "5px",
    color: (props) => (props.selected ? "#d09f58" : "#ffffff"),

    "&.Mui-selected": {
      fontSize: "21px !important",
      marginTop: "5px",
      color: "#fde73f",
    },
  },
})(BottomNavigationAction);

const BottomNavigatorFrame = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;

  mask-image: url(${(props) => props.src});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: auto 40px;
  mask-mode: alpha;
  background-blend-mode: multiply;
  background-color: #fff;
  width: 60px;
  height: 50px;
`;
const BottomNavigatorPlus = styled.div`
  background-image: url(${IconPlusPNG});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70px 70px;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 50%;
  width: 70px;
  height: 70px;
`;
const StyledDialog = withStyles({
  root: {
    "& .MuiDialog-paperWidthSm": {
      width: "100%",
      height: "100%",
      maxWidth: "750px",
      maxHeight: "100%",
      margin: 0,
    },
  },
  paper: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
})(Dialog);
const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const ButtonCloseMenu = styled.div`
  background: url(${IconMenuClosePNG}) no-repeat;
  background-size: 68px;
  width: 68px;
  height: 68px;
  margin: 50px auto;
`;
const MenuItemWrap = styled.div`
  margin-top: 50%;
`;
const MenuImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #383737;
  border-radius: 50%;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 68px;
  margin: 0 auto;

  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: solid 2px #5ceeff;
`;
const Menuitem = styled.div`
  width: calc(100% / 3);
  float: left;
  margin-top: 50px;
`;
const MenuLabel = styled.div`
  font-size: 22px;
  text-align: center;
  color: #5ceeff;
  margin-top: 10px;
`;
class Main extends Component {
  state = {
    currentPage: this.props.history.location.pathname,
    showMenu: false,
  };
  // GetSupportUrl = (userid, name, question) => {
  //   var response = SupportService.GetLiveSupport(
  //     userid,
  //     name,
  //     question,
  //     document.URL,
  //     document.referrer
  //   )
  //   if (response.IsSuccess) {
  //     window.open(response.data.online, "_blank")

  //   } else {
  //     this.props.alert("", response.info);

  //   }
  // };
  handleChangeSelection = (value) => {
    if (
      value === "/" + i18n.language + "/main/profile" &&
      this.props.account.token == null
    ) {
      this.props.navigate("/");
    } else {
      if (value === "/customer-service") {
        if (this.props.account.token == null) {
          // AppHistory.push("/" + i18n.language + value);
          this.props.GetSupportUrl("", "", "");
        } else {
          this.props.GetSupportUrl(
            "",
            this.props.account.info.member_username,
            ""
          );
        }
      } else {
        this.setState({
          ...this.state,
          currentPage: value,
        });
        AppHistory.push("/" + i18n.language + value);
      }
    }
  };
  toggleMenu = () => {
    if (this.props.account.token == null) {
      this.props.navigate("/" + i18n.language + "/");
    } else {
      this.setState({ ...this.state, showMenu: true });
    }
  };
  handleCloseMenu = () => {
    this.setState({ ...this.state, showMenu: false });
  };
  render() {
    return (
      <>
        <Switch>
          <Route
            path={"/" + i18n.language + "/main/profile"}
            render={(props) => <My navigate={this.props.navigate} />}
          ></Route>
          <Route
            path={"/" + i18n.language + "/main/home"}
            render={(props) => <Home navigate={this.props.navigate} />}
          ></Route>
          <Route
            path={"/" + i18n.language + "/main/promotion-list"}
            render={(props) => <Home navigate={this.props.navigate} />}
          ></Route>
        </Switch>

        <StyledDialog open={this.state.showMenu} onClose={this.handleCloseMenu}>
          <MenuContainer>
            <MenuItemWrap>
              <Menuitem onClick={() => this.handleChangeSelection("/deposit")}>
                <MenuImage img={IconMenuDepositPNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.deposit")}</MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/transfer")}>
                <MenuImage img={IconMenuTransferPNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.transfer")}</MenuLabel>
              </Menuitem>
              <Menuitem
                onClick={() => this.handleChangeSelection("/withdrawal")}
              >
                <MenuImage img={IconMenuWithdrawalPNG}></MenuImage>
                <MenuLabel>
                  {i18n.t("wap.main.menuDrawer.withdrawal")}
                </MenuLabel>
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/report/2")}>
                <MenuImage img={IconMenuReportPNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.account.betReport")}</MenuLabel>
              </Menuitem>

              {/* <Menuitem onClick={() => this.handleChangeSelection("/report/2")}>
                <MenuImage img={IconMenuReport2PNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.betReport")}</MenuLabel>
              </Menuitem>
            */}
              <Menuitem onClick={() => this.handleChangeSelection("/report/3")}>
                <MenuImage img={IconMenuReport3PNG}></MenuImage>
                <MenuLabel>
                  {i18n.t("wap.main.menuDrawer.withdrawalReport")}
                </MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/report/4")}>
                <MenuImage img={IconMenuReport3PNG}></MenuImage>
                <MenuLabel>
                  {i18n.t("wap.main.menuDrawer.depositReport")}
                </MenuLabel>
              </Menuitem>
              <Menuitem onClick={() => this.handleChangeSelection("/card")}>
                <MenuImage img={IconMenuCardPNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.bankCard")}</MenuLabel>
              </Menuitem>

              <Menuitem onClick={() => this.handleChangeSelection("/inbox")}>
                <MenuImage img={IconMenuInboxPNG}></MenuImage>
                <MenuLabel>{i18n.t("wap.main.menuDrawer.inbox")}</MenuLabel>
              </Menuitem>
            </MenuItemWrap>
            <ButtonCloseMenu onClick={this.handleCloseMenu}></ButtonCloseMenu>
          </MenuContainer>
        </StyledDialog>
        <StyledBottomAppBar position="fixed" color="default">
          <CustomBottomNavigation
            value={this.state.currentPage}
            showLabels
            style={{ width: "750px", height: "90px" }}
          >
            <CustomBottomNavigationAction
              label={i18n.t("wap.main.homePage")}
              value="/main/home"
              onClick={() => this.handleChangeSelection("/main/home")}
              icon={<BottomNavigatorFrame src={IconHomePNG} />}
            />
            <CustomBottomNavigationAction
              label={i18n.t("wap.main.promo")}
              value="/promotion-list"
              onClick={() => this.handleChangeSelection("/promotion-list")}
              icon={<BottomNavigatorFrame src={IconPromotionPNG} />}
            />
            <CustomBottomNavigationAction
              onClick={this.toggleMenu}
              label=""
              icon={
                <BottomNavigatorPlus
                  selected={this.props.currentPage === "/"}
                />
              }
            />

            <CustomBottomNavigationAction
              onClick={() => this.handleChangeSelection("/customer-service")}
              value="/customer-service"
              label={i18n.t("wap.main.cs")}
              icon={<BottomNavigatorFrame src={IconCSPNG} />}
            />
            <CustomBottomNavigationAction
              label={i18n.t("wap.main.my")}
              value="/main/profile"
              onClick={() => this.handleChangeSelection("/main/profile")}
              icon={<BottomNavigatorFrame src={IconProfilePNG} />}
            />
          </CustomBottomNavigation>
        </StyledBottomAppBar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps, null)(withRouter(Main));
