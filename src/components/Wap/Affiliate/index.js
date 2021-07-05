import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Wap/Share/Header";
import copy from "copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
import QRCode from "react-qr-code";

import IconProfileProfilePNG from "../../../assets/images/wap/icon-profile-profile.png";
import IconProfileReportPNG from "../../../assets/images/wap/icon-profile-report.png";
import IconProfileAboutPNG from "../../../assets/images/wap/icon-profile-about.png";
const QRCodeLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 30px;
  color: ${({ theme }) => theme.secondary};
`;
const QRCodeContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: table;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 700px;
  font-size: 28px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 0px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-weight: 600;
  margin: 24px 0 0 3px;
  float: left;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  margin: 25px 0 25px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #d09f58;
    opacity: 1;
  }
`;
const Button = styled.div`
  height: 60px;
  border-radius: 10%;
  border: solid 1px #000;

  font-size: 24px;
  font-weight: 600;

  text-align: center;
  color: #000;
  float: right;
  padding: 12px 20px 0 20px;
  margin-top: 12px;
`;
const ListView = styled.div`
  padding: 0px 30px;
`;
const ListItem = styled.div`
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #ffffff;
  background-image: linear-gradient(to top, #e0e0e0, #ffffff);

  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: center 40px;

  float: left;
  margin: 15px 30px;

  font-size: 30px;

  text-align: center;
  color: ${(props) =>
    props.disabled ? `rgba(61, 61, 61, 0.3)` : props.theme.secondary};
  padding-top: 100px;
  position: relative;

  width: 166px;
  height: 154px;
  border-radius: 6px;
  box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.8);
  border: solid 1px #ffffff;
`;
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 30,
  },
}))(Tooltip);
class Affiliate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      copyTooltips: false,
    };
  }

  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleCopyLink = () => {
    this.setState({ ...this.state, copyTooltips: true });
    copy(
      `${window.location.hostname}/${i18n.language}/a/${this.props.account.info.promote_code}`
    );
    setTimeout(() => {
      this.setState({ ...this.state, copyTooltips: false });
    }, 3000);
  };
  handleClickAway = () => {};

  render() {
    return (
      <>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("affiliate.title")}
        ></Header>
        <QRCodeLabel>{i18n.t("affiliate.qrCode")}</QRCodeLabel>
        <QRCodeContainer>
          <QRCode
            value={`http://${window.location.hostname}/${i18n.language}/a/${this.props.account.info.promote_code}`}
          ></QRCode>
        </QRCodeContainer>

        <CustomText>
          <CustomLabel>{i18n.t("affiliate.promoId")}</CustomLabel>
          <CustomInput
            type={"text"}
            value={this.props.account.info.promote_code}
            readOnly={true}
          ></CustomInput>
        </CustomText>
        <CustomText>
          <CustomLabel>{i18n.t("affiliate.promoLink")}</CustomLabel>
          <CustomInput
            type={"text"}
            value={`${window.location.hostname}/${i18n.language}/a/${this.props.account.info.promote_code}`}
            readOnly={true}
          ></CustomInput>
          <LightTooltip
            open={this.state.copyTooltips}
            title={i18n.t("affiliate.copied")}
            placement="top"
          >
            <Button onClick={this.handleCopyLink}>
              {i18n.t("common.copy")}
            </Button>
          </LightTooltip>
        </CustomText>
        <ListView>
          <ListItem
            icon={IconProfileProfilePNG}
            onClick={() => this.props.navigate("/affiliate/member")}
          >
            {i18n.t("affiliate.downline")}
          </ListItem>
          <ListItem
            icon={IconProfileReportPNG}
            onClick={() => this.props.navigate("/affiliate/report")}
          >
            {i18n.t("affiliate.report")}
          </ListItem>
          <ListItem
            icon={IconProfileAboutPNG}
            onClick={() => this.props.navigate("/affiliate/guide")}
          >
            {i18n.t("affiliate.info")}
          </ListItem>
        </ListView>

        <Loading show={this.state.loading}></Loading>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
