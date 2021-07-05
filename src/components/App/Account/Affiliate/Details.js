import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withSnackbar } from "notistack";
import copy from "copy-to-clipboard";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
import QRCode from "react-qr-code";

const QRCodeLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 18px;
`;
const QRCodeContainer = styled.div`
  padding: 10px;
  margin: 0 auto;
  display: table;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 400px;
  font-size: 14px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-weight: 600;
  margin: 12px 0 0 3px;
  float: left;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  margin: 12px 0 12px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #000;
    opacity: 1;
  }
`;
const Button = styled.div`
  height: 30px;

  border: solid 1px #000;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: #000;
  float: right;
  padding: 5px 20px 0 20px;
  margin-top: 6px;

  width: 80px;
  color: #fff;
  border-radius: 6px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;

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
    this.props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    copy(
      `${window.location.hostname}/${i18n.language}/a/${this.props.account.info.promote_code}`
    );
  };
  handleClickAway = () => {
    this.setState({ ...this.state, copyTooltips: false });
  };
  render() {
    return (
      <>
        <QRCodeLabel>{i18n.t("affiliate.qrCode")}</QRCodeLabel>
        <QRCodeContainer>
          <QRCode
            size={128}
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

          <Button onClick={this.handleCopyLink}>{i18n.t("common.copy")}</Button>
        </CustomText>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Affiliate));
