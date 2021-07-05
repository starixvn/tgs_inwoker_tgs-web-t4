import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";
import Button from "../../Wap/Share/Button";
import { AppHistory } from "../../../history/History";

import { generalAction } from "@Inwoker/tgs-api";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
const moment = require("moment");
const Content = styled.div`
  width: 100%;

  padding: 0 30px 30px 30px;
`;
const PromoDetailImage = styled.div`
  width: 750px;
  height: 304px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 20px;
`;
const PromoImgTitle = styled.div`
  color: #fff;
  position: absolute;
  font-size: 50px;
  width: 350px;
  height: 230px;
  margin: 33px 0 0 40px;
  line-height: 0.95em;
`;
const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 28px;
  font-family: AdobeHeitiR;
  margin-left: -16px;
`;

const EventText = styled.div`
  font-size: 22px;
  color: #4f4f4f;
  font-family: AdobeHeitiR;
  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoDesc = styled.div`
  font-size: 22px;
`;
class Details extends Component {
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
      AppHistory.replace({
        pathname: "/" + i18n.language + "/promotion-list",
      });
    }

    this.state = {
      details: details,
      index: index,
      loading: false,
    };

    document.getElementsByTagName("body")[0].style.background = "#fff";
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.alert("", i18n.t("promotion.joinSuccess"));
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.alert("", i18n.t("promotion.promoJoint"));
        }
      }
    }
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.background = "";
  }
  handleBonusChange = (e) => {
    this.setState({ ...this.state, bonusSubId: parseInt(e.target.value) });
  };
  handleJoinClick = (id, promotionType) => {
    if (this.props.token === null || this.props.token === "") {
      AppHistory.replace({
        pathname: "/" + i18n.language + "/",
      });
    } else {
      this.props.joinPromotion(id);
      if (
        ["FirstDeposit", "DailySecondDeposit", "DailyFirstDeposit"].indexOf(
          promotionType
        ) >= 0
      ) {
        AppHistory.push({
          pathname: "/" + i18n.language + "/deposit/" + id,
        });
      }
    }
  };
  async componentDidMount() {
    // if (this.props.promo == null) {
    //   AppHistory.replace("/" + i18n.language + "/promotion-list");
    // } else {
    //   BonusService.GetActivityDetails(this.props.promo.id).then((response) => {
    //     if (response.IsSuccess) {
    //       this.setState({
    //         ...this.state,
    //         details: response.data,
    //       });
    //     } else {
    //       this.props.alert("", response.info);
    //     }
    //   });
    // }
  }

  handleBackClick = () => {
    AppHistory.replace("/" + i18n.language + "/promotion-list");
  };

  render() {
    if (this.state.details === null) return <></>;
    return (
      <>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("promotion.promoDetail")}
        ></Header>
        {(() => {
          if (this.state.details.localization !== null) {
            return (
              <PromoDetailImage
                img={
                  this.state.details.localization.mobileBanner &&
                  this.state.details.localization.mobileBanner !== null
                    ? this.state.details.localization.mobileBanner
                    : this.state.details.mobileBanner
                }
                onClick={() => this.handlePromoClick(this.state.details.id)}
              ></PromoDetailImage>
            );
          } else {
            return (
              <PromoDetailImage
                img={this.state.details.mobileBanner}
                onClick={() => this.handlePromoClick(this.state.details.id)}
              ></PromoDetailImage>
            );
          }
        })()}

        <Content>
          <EventTitle>【{i18n.t("promotion.promoDetail")}】</EventTitle>
          <EventText>
            {i18n.t("promotion.promoTarget")}：
            <br />
            {this.state.details.vipLevels.map((a, index) => {
              return (
                <span key={index}>
                  VIP{a}
                  {index < this.state.details.vipLevels.length - 1 && ", "}
                </span>
              );
            })}
          </EventText>
          <EventText>
            {i18n.t("promotion.promoDate")}：
            <br />
            {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
            {" - "}
            {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
          </EventText>
          <PromoDesc
            dangerouslySetInnerHTML={{
              __html:
                "<div>" +
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
        </Content>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("promotion.joinPromo")}
          onClick={() =>
            this.handleJoinClick(
              this.state.details.id,
              this.state.details.promotionType
            )
          }
        ></Button>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    token: state.account.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
