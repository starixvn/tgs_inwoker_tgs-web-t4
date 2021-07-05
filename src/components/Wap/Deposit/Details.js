import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { WalletService } from "@Inwoker/tgs-api";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-lazy-load-image-component/src/effects/blur.css";

import { withSnackbar } from "notistack";

import Button from "../../Wap/Share/Button";
import { AppHistory } from "../../../history/History";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
const Container = styled.div``;
const ContentBg = styled.div`
  background: #fff;
  width: 100%;

  padding: 60px 60px 30px 60px;
`;
const BalanceLabel = styled.div`
  font-size: 30px;

  color: #979797;
`;
const DepositAmount = styled.div`
  font-size: 80px;
  font-weight: bold;

  color: ${({ theme }) => theme.secondary};
`;
const SplitLine = styled.div`
  height: 2px;
  background-color: #f1f1f1;
  margin: 50px 0;
`;
const LeftLabel = styled.div`
  font-size: 24px;
  color: #979797;
  float: left;
`;
const RightLabel = styled.div`
  font-size: 24px;
  color: #333333;
  float: right;
  font-weight: bold;
`;
const SplitBoth = styled.div`
  clear: both;
  margin: 30px 0;
`;

const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;
const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;
class Details extends Component {
  state = {
    expired_time: 0,
    loading: false,
    openPopup: true,
    files: [],
    exchangeRate: { buyprice: 0, sellprice: 0 },
  };
  componentDidMount() {
    if (this.props.isCrypto === true) {
      WalletService.GetLeePayExchangeRate(this.props.channel.id).then(
        (response) => {
          if (response.IsSuccess) {
            this.setState({ ...this.state, exchangeRate: response.data });
          } else {
            this.setState({
              ...this.state,
            });
          }
        }
      );
    }
    this.setState({
      ...this.state,
      openPopup: this.props.isManual ? false : true,
    });
  }
  // setCountdownTimer = () => {
  //   setTimeout(() => {
  //     if (this.state.expired_time > 0) {
  //       this.fireTimeout();
  //     }
  //   }, 1000);
  // };
  // fireTimeout = () => {
  //   this.setState({ ...this.state, expired_time: this.state.expired_time - 1 });
  //   this.setCountdownTimer();
  // };
  handleDepositConfirmClick = (e) => {
    AppHistory.replace("/" + i18n.language + "/transfer");
    // this.setState({ ...this.state, loading: true });
    // WalletService.CheckDeposit(this.props.token, this.props.order.id).then(
    //   response => {
    //     if (response.code === 0) {
    //       this.props.alert("", response.msg);
    //       this.setState({
    //         ...this.state,
    //         loading: false
    //       });
    //     } else if (response.code === 1) {
    //       this.setState({
    //         ...this.state,
    //         step: 1,
    //         order: {},
    //         loading: false
    //       });
    //       this.props.alert("", response.msg);
    //     } else {
    //       this.props.alert("", response.msg);
    //     }
    //     // if (response.IsSuccess) {
    //     //   this.setState({
    //     //     ...this.state,
    //     //     step: 1,
    //     //     order: {},
    //     //     loading: false
    //     //   });
    //     //   this.props.enqueueSnackbar(response.msg, {
    //     //     variant: "success"
    //     //   });
    //     // } else {
    //     // }
    //   }
    // );
  };
  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileType"));
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 2048) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileSize"));
        e.target.value = null;
      } else {
        this.setState({ ...this.state, files: files });
      }
    }
  };
  handleUploadClick = () => {
    this.props.performUploadImage(this.state.files[0]);
  };
  handleDepositCancelClick = (e) => {
    AppHistory.replace("/" + i18n.language + "/deposit");
  };
  handleOpenPopupUrl = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
    window.open(this.props.depositResult.data.paymenturl, "_blank");
  };
  handleClosePopup = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
  };
  handleBackClick = () => {
    AppHistory.goBack();
  };
  render() {
    return (
      <Container>
        <ContentBg>
          <BalanceLabel>{i18n.t("deposit.depositAmount")}：</BalanceLabel>
          <DepositAmount>¥ {this.props.amount}</DepositAmount>
          <SplitLine></SplitLine>
          <LeftLabel>{i18n.t("deposit.orderNumber")}</LeftLabel>
          <RightLabel>
            {this.props.isManual === true
              ? this.props.depositResult.data
              : this.props.depositResult.data.formid}
          </RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositMethod")}</LeftLabel>
          <RightLabel>{i18n.t(this.props.methodcode)}</RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositTunnel")}</LeftLabel>
          <RightLabel>{this.props.channel.channelname}</RightLabel>
          <SplitBoth></SplitBoth>

          {this.props.isCrypto === true ? (
            <>
              <LeftLabel>{i18n.t("deposit.exchangeRate")}</LeftLabel>
              <RightLabel>{this.state.exchangeRate.buyprice}</RightLabel>
              <SplitBoth></SplitBoth>
              <LeftLabel>{i18n.t("deposit.expectedPayment")}</LeftLabel>
              <RightLabel>
                {(this.props.amount / this.state.exchangeRate.buyprice).toFixed(
                  2
                )}
              </RightLabel>
              <SplitBoth></SplitBoth>
            </>
          ) : (
            <></>
          )}

          {(() => {
            if (this.props.isManual === true) {
              return (
                <>
                  <LeftLabel>{i18n.t("deposit.uploadReceipt")}</LeftLabel>
                  <RightLabel>
                    <input
                      type="file"
                      onChange={this.handleFileChange}
                      accept="image/jpg, image/jpeg, image/png, image/tiff"
                    ></input>
                  </RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("deposit.receiverBank")}</LeftLabel>
                  <RightLabel>{this.props.extended.name}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("deposit.receiverAccount")}</LeftLabel>
                  <RightLabel>{this.props.extended.bankAccount}</RightLabel>
                  <SplitBoth></SplitBoth>
                </>
              );
            }
          })()}
        </ContentBg>
        {(() => {
          if (this.props.isManual === true) {
            return (
              <Button
                style={{ margin: "20px auto" }}
                labelStyle={{ color: "#fff" }}
                label={i18n.t("deposit.uploadReceipt")}
                onClick={this.handleUploadClick}
                disabled={this.state.files.length <= 0}
              ></Button>
            );
          }
        })()}
        <Button
          style={{ margin: "20px auto" }}
          labelStyle={{ color: "#fff" }}
          label={
            this.props.isManual === true
              ? i18n.t("common.back")
              : i18n.t("common.complete")
          }
          onClick={this.props.handleRestartClick}
        ></Button>
        ;
        <StyledModalPopup
          onClose={this.handleClosePopup}
          open={this.state.openPopup}
        >
          <DialoMessage>{i18n.t("deposit.msgDialog")}</DialoMessage>
          <ButtonConfirm
            onClick={this.handleOpenPopupUrl}
            style={{ float: "left" }}
          >
            {i18n.t("common.confirm")}
          </ButtonConfirm>
          <ButtonConfirm
            onClick={this.handleClosePopup}
            style={{ float: "right" }}
          >
            {i18n.t("common.cancel")}
          </ButtonConfirm>
        </StyledModalPopup>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    balance: state.account.info.balance,
    token: state.account.token,
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(withSnackbar(Details)));
