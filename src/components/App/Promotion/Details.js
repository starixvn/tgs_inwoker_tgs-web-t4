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
import PromoImage1 from "../../../assets/images/promotion/promo-1.jpg";
import PromoImage2 from "../../../assets/images/promotion/promo-2.jpg";
import PromoImage3 from "../../../assets/images/promotion/promo-3.jpg";
const promoImgMap = [PromoImage1, PromoImage2, PromoImage3];

const moment = require("moment");
const Container = styled.div`
  width: 100%;
  padding-top: 100px;

  position: relative;
  background: url(${BGPromotionJPG}) no-repeat top center
    ${(props) => props.primary};
  min-height: 800px;
`;
const MainContent = styled.div`
  margin: 40px auto;
  padding: 23px 0;

  width: 1000px;
  min-height: 600px;
  border-radius: 20px;
  border: solid 2px #9eafff;
  background-image: linear-gradient(to top, #1b213f, #29356c);
`;
const Inner = styled.div``;
const Content = styled.div`
  width: 927px;

  margin: 0 0 13px 32px;
  float: left;
  position: relative;
`;
const PromoTitle = styled.div`
  width: 400px;
  font-size: 60px;
  color: #fff;
  margin-top: 23px;
  margin-bottom: 23px;
  margin-left: 34px;
`;
const PromoDate = styled.div`
  font-size: 15px;

  color: #01f1fe;
`;
const PromoDesc = styled.div`
  font-size: 14px;
  color: #747474;
`;

const PromoDetailContainer = styled(Grid)`
  box-shadow: 0px 1px 8px rgba(32, 0, 0, 0.7);
  margin: 10px 0px;
  width: 100%;

  background: white;
  padding: 18px 15px;
  border-radius: 20px;
`;

const PromoDetailImage = styled.div`
  width: 100%;
  height: 486px;
  margin-bottom: 20px;
  background: url(${(props) => props.img}) no-repeat;
`;

const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: AdobeHeitiR;
`;

const EventText = styled.div`
  font-size: 14px;
  color: #4f4f4f;
  font-family: AdobeHeitiR;
  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const PromoButtonText = styled(Grid)`
  color: #fff;
  font-size: 20px;
`;

class PromotionDetails extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var details = null;
    for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
      if (
        this.props.general.promotionList.items[i].id ===
        this.props.match.params.id
      ) {
        index = i;
        details = this.props.general.promotionList.items[i];
        break;
      }
    }
    if (index === -1) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    this.state = {
      index: index,
      details: details,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    if (this.props.general.promotionList.items.length <= 0) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
  }

  handleBospIdChange = (bospId) => {
    this.setState({ ...this.state, selectedBospId: bospId });
  };
  ResetPopup = () => {
    this.setState({
      ...this.state,
      openJoin: false,
      selectedPromoSpecifications: [],
      selectedPromoTitle: "",
      selectedBospId: 0,
    });
    this.props.history.push("/" + i18n.language + "/promotion");
  };
  handleCloseDialog = () => {
    this.ResetPopup();
  };
  ViewAllClick = (activity_id) => {
    let list = this.state.list;
    var foundIndex = list.findIndex((x) => x.id === activity_id);
    list[foundIndex].checked = !list[foundIndex].checked;

    this.setState({ ...this.state, list: list });
  };
  contentClickHandler = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    e.preventDefault();
    if (targetLink.href.indexOf("/promotion/") >= 0) {
      this.props.history.push(
        "/" +
          i18n.language +
          "/promotion/" +
          targetLink.href.substring(
            targetLink.href.indexOf("/promotion/") + 11,
            targetLink.href.length
          )
      );
    }
  };
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
  render() {
    if (this.state.details === null) return <></>;
    return (
      <Container>
        <MContainer>
          <PromoDetailContainer container direction="column">
            <PromoDetailImage
              img={(() => {
                if (this.state.details.localization !== null) {
                  if (
                    this.state.details.localization.desktopBanner &&
                    this.state.details.localization.desktopBanner !== null
                  ) {
                    return this.state.details.localization.desktopBanner;
                  } else {
                    return this.state.details.desktopBanner;
                  }
                } else {
                  return this.state.details.desktopBanner;
                }
              })()}
            ></PromoDetailImage>
            <EventTitle>{i18n.t("promotion.promoTarget")}：</EventTitle>
            <EventText>
              {this.state.details.vipLevels.map((a, index) => {
                return (
                  <span key={index}>
                    VIP{a}
                    {index < this.state.details.vipLevels.length - 1 && ", "}
                  </span>
                );
              })}
            </EventText>
            <EventTitle>{i18n.t("promotion.promoDate")}：</EventTitle>
            <EventText>
              {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
              {" - "}
              {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
            </EventText>
            <EventText>
              <PromoDesc
                dangerouslySetInnerHTML={{
                  __html:
                    "<div >" +
                    (() => {
                      if (
                        this.state.details.localization !== null &&
                        this.state.details.localization.content &&
                        this.state.details.localization.content !== null
                      ) {
                        return this.state.details.localization.content;
                      } else {
                        return this.state.details.content;
                      }
                    })() +
                    "</div>",
                }}
              ></PromoDesc>
            </EventText>
            <Grid container justify="center">
              <PromoButtonContainer
                container
                alignItems="center"
                justify="center"
                md={3}
                onClick={() =>
                  this.handlejoinPromotionClick(
                    this.state.details.id,
                    this.state.details.promotionType
                  )
                }
              >
                <PromoButtonText item>
                  {i18n.t("promotion.joinPromo")}
                </PromoButtonText>
              </PromoButtonContainer>
            </Grid>
          </PromoDetailContainer>
        </MContainer>
      </Container>
    );
    // if (this.state.details === null) {
    //   //TODO: temporary put this here.
    //   return (
    //     <Container>
    //       <MContainer>
    //         <PromoDetailContainer container direction="column">
    //           <PromoDetailImage src={PromoImage1} />
    //           <EventTitle>【活動條件】</EventTitle>
    //           <EventText>
    //             活動對象：
    //             <br />
    //             全站會員
    //           </EventText>
    //           <EventText>
    //             活動時間：
    //             <br />
    //             2021年4月20日00:00:00-2021年4月29日23:59:59
    //           </EventText>
    //         </PromoDetailContainer>
    //       </MContainer>
    //     </Container>
    //   );
    // } else {
    //   return (
    //     <Container>
    //       <MainContent>
    //         <Inner>
    //           <Content>
    //             <PromoTitle>{this.state.details.title}</PromoTitle>

    //             <PromoDate>
    //               {i18n.t("promotion.startDate")}
    //               {this.state.details.start_time_text}
    //             </PromoDate>
    //             <PromoDate>
    //               {i18n.t("promotion.endDate")}
    //               {this.state.details.end_time_text}
    //             </PromoDate>
    //             <PromoDesc
    //               dangerouslySetInnerHTML={{
    //                 __html:
    //                   "<div class='custom-promotion'>" +
    //                   this.state.details.desc +
    //                   this.state.details.pc_promotion_describe +
    //                   "</div>",
    //               }}
    //             ></PromoDesc>
    //           </Content>
    //         </Inner>
    //       </MainContent>
    //     </Container>
    //   );
    // }
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
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(PromotionDetails))
);
