import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/background.jpg";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import { generalAction, SHOW_LOGIN } from "@Inwoker/tgs-api";
import { Grid, Container as MContainer } from "@material-ui/core";

import PromoEmpty from "../../../assets/images/promo-empty.png";
import Common from "../../../utils/Common";
import PromoImage1 from "../../../assets/images/promotion/promo-1.jpg";
import PromoImage2 from "../../../assets/images/promotion/promo-2.jpg";
import PromoImage3 from "../../../assets/images/promotion/promo-3.jpg";
const promoImgMap = [PromoImage1, PromoImage2, PromoImage3];

const moment = require("moment");

const Container = styled.div`
  width: 100%;
  background: url(${BGPromotionJPG}) no-repeat center top
    ${(props) => props.primary};
  min-height: 800px;
  position: relative;
  padding-top: 100px;
`;
const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const PromoEmptyContainer = styled.div``;
const PromoEmptyBg = styled.div`
  background: url(${PromoEmpty}) no-repeat;
  position: absolute;

  left: 50%;
  bottom: -155px;
  margin-left: -240px;
  width: 1165px;
  height: 877px;
`;
const PromoEmptyText = styled.div`
  width: 673px;
  position: absolute;
  right: 50%;
  top: 30%;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 80px;
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(
    ${(props) => props.theme.primaryText},
    ${(props) => props.theme.primaryText}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const MainContent = styled.div`
  margin: 40px auto;
  padding: 23px 0;

  width: 1000px;
  min-height: 600px;
  border-radius: 20px;

  background-color: #fff;
`;
const Inner = styled.div``;
const Content = styled.div`
  width: 927px;
  height: 184px;

  background-color: #fde73f;
  margin: 13px 0 13px 32px;
  float: left;
  position: relative;
`;
const LeftContent = styled.div`
  float: left;
  clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);
  width: 444px;
`;
const RightContent = styled.div`
  float: left;
  height: 184px;
  width: 602px;

  clip-path: polygon(20% 0, 100% 0%, 100% 100%, 0% 110%);

  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 130px;
`;
const PromoTitle = styled.div`
  height: 40px;
  font-size: 30px;

  color: #ffffff;
  margin-top: 23px;
`;
const PromoDate = styled.div`
  font-size: 15px;

  color: #fde73f;
`;
const PromoDesc = styled.div`
  font-size: 14px;

  color: #fff;
`;
const PromoImg = styled.img`
  width: 444px;
  height: 184px;
`;
const Viewall = styled.div`
  font-size: 15px;

  color: #ffffff;

  float: right;

  margin-right: 12px;

  text-align: right;
  &:hover {
    cursor: pointer;
  }
`;
const ViewallArrow = styled.img`
  ${(props) =>
    props.checked ? `transform: rotateX(0deg);` : `transform: rotateX(180deg);`}

  float: right;
  margin-left: 7px;
  margin-top: 7px;
`;

const ThePromotion = styled(Grid)``;

const ThePromotionContainer = styled(Grid)`
  background: #fff;
  width: 100%;
  border-radius: 20px;
  padding: 25px 18px;
  flex-direction: column;
  box-shadow: 5px 5px 8px rgba(32, 0, 0, 0.7);
  height: 539px;
  position: relative;
`;

const PromoImages = styled.div`
  width: 550px;
  height: 222px;
  position: relative;
  margin-bottom: 12px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
`;
const PromoImgTitle = styled.div`
  color: #fff;
  position: absolute;
  font-size: 36px;
  width: 250px;
  height: 230px;
  margin: 33px 0 0 40px;
  line-height: 1em;
`;
const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 19px;
  font-family: AdobeHeitiR;
  margin-left: -8px;
`;

const EventText = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: AdobeHeitiR;
  line-height: 16px;
  margin-bottom: 12px;
`;

const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const PromoButtonImg = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const PromoButtonText = styled.div`
  position: absolute;
  left: calc(50% - 32px);
  bottom: 20px;
  color: white;
  font-size: 20px;
`;

const ContainerForPromoList = styled(Grid)`
  padding: 14px;
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };

  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.getPromotionList(i18n.language);
    } else {
      this.props.getPlayerPromotionList(i18n.language);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      if (this.props.account.token === null) {
        this.props.getPromotionList(i18n.language);
      } else {
        this.props.getPlayerPromotionList(i18n.language);
      }
    }

    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "error",
          });
        }
      }
    }
  }
  // handleJoinClick = (bosp_id) => {
  //   BonusService.JoinActivity(
  //     this.props.token,
  //     this.state.selectedPromoId,
  //     this.state.selectedBospId
  //   ).then((response) => {
  //     if (response.IsSuccess) {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "success",
  //       });
  //       this.ResetPopup();
  //     } else {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "error",
  //       });
  //     }
  //   });
  // };

  //TODO: Temporary hardcode the navigation
  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
      this.props.joinPromotion(id);
      if (
        ["FirstDeposit", "DailySecondDeposit", "DailyFirstDeposit"].indexOf(
          promotionType
        ) >= 0
      ) {
        AppHistory.push({
          pathname: "/" + i18n.language + "/account/deposit/" + id,
        });
      }
    }
  };
  handlePromotionClick = (id, promotionType) => {
    AppHistory.push({
      pathname: "/" + i18n.language + "/promotion/" + id,
    });
  };
  render() {
    return (
      <Container>
        {this.props.general.promotionList.items &&
        this.props.general.promotionList.items.length <= 0 ? (
          <PromoEmptyContainer>
            <PromoEmptyText>
              <PromoEmptyTextLine
                style={i18n.language === "en-US" ? { fontSize: "58px" } : {}}
              >
                {i18n.t("promotion.emptyLine1")}
              </PromoEmptyTextLine>
              <PromoEmptyTextLine>
                {i18n.t("promotion.emptyLine2")}
              </PromoEmptyTextLine>
            </PromoEmptyText>
            <PromoEmptyBg></PromoEmptyBg>
          </PromoEmptyContainer>
        ) : (
          <></>
        )}
        <Wrap>
          <MContainer>
            <ThePromotion container>
              {this.props.general.promotionList.items.map((data, index) => {
                return (
                  <ContainerForPromoList lg={6} key={index}>
                    <ThePromotionContainer
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                    >
                      <Grid item>
                        <Grid container direction="column">
                          {(() => {
                            if (data.localization !== null) {
                              return (
                                <PromoImages
                                  key={index}
                                  img={
                                    data.localization.desktopBanner &&
                                    data.localization.desktopBanner !== null
                                      ? data.localization.desktopBanner
                                      : data.desktopBanner
                                  }
                                  onClick={() => this.handlePromoClick(data.id)}
                                ></PromoImages>
                              );
                            } else {
                              return (
                                <PromoImages
                                  key={index}
                                  img={data.desktopBanner}
                                  onClick={() => this.handlePromoClick(data.id)}
                                ></PromoImages>
                              );
                            }
                          })()}

                          <EventTitle>
                            【{i18n.t("promotion.promoDetail")}】
                          </EventTitle>
                          <EventText>
                            {i18n.t("promotion.promoTarget")}:
                            <br />
                            {data.vipLevels.map((a, index) => {
                              return (
                                <span key={index}>
                                  VIP{a}
                                  {index < data.vipLevels.length - 1 && ", "}
                                </span>
                              );
                            })}
                          </EventText>
                          <EventText>
                            {i18n.t("promotion.promoDate")}：
                            <br />
                            {moment(data.from).format("YYYY/MM/DD HH:mm:ss")}
                            {" - "}
                            {moment(data.to).format("YYYY/MM/DD HH:mm:ss")}
                          </EventText>
                        </Grid>
                      </Grid>
                      <PromoButtonContainer
                        item
                        onClick={() =>
                          this.handlePromotionClick(data.id, data.promotionType)
                        }
                      >
                        <PromoButtonImg />
                        <PromoButtonText>
                          {i18n.t("promotion.details")}
                        </PromoButtonText>
                      </PromoButtonContainer>
                    </ThePromotionContainer>
                  </ContainerForPromoList>
                );
              })}
            </ThePromotion>
          </MContainer>
        </Wrap>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
    getPromotionList: (language) =>
      dispatch(generalAction.getPromotionList(language, 1, 99, true, "", true)),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
