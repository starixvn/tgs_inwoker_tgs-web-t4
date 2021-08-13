import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import IconDepositRedPNG from "../../../../assets/images/icon-deposit.png";

import {
  walletAction,
  RESET_WALLETRESULT,
  generalAction,
  WalletService,
} from "@Inwoker/tgs-api";
import { withRouter } from "react-router-dom";

import NameVerification from "../../Share/NameVerification";
import Loading from "../../../../components/App/Loading";

import UnderConstructionPNG from "../../../../assets/images/underconstruction.png";

import { withSnackbar } from "notistack";

import Step2Form from "./Step2Form";

import Success from "./Success";
import i18n from "../../../../utils/i18n";

import NewStepOne from "./NewStep1";
import NewStepTwo from "./NewStep2";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box

  width: 100%;
  min-height: 611px;

`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconDepositRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const TabButtonContainer = styled.div`
  padding: 6px;
  margin-bottom: 20px;
`;
const TabButton = styled.div`
  font-size: 14px;

  color: #151a34;

  text-align: center;

  float: left;
  margin-right: 8px;

  width: 104px;

  border-radius: 5px;
  box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #f2f2f2;
  background-position: center 14px;
  background-repeat: no-repeat;

  ${(props) =>
    props.active
      ? `    border: solid 1px #ffffff;color: #fff;

      background-color: ` +
        props.theme.primary +
        `;`
      : `   `};
  &:hover {
    cursor: pointer;
  }
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const TabLabel = styled.div`
  margin: 10px 5px;
`;
const Wrap = styled.div`
  width: 935px;

  position: relative;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 14px;
  position: relative;
  background-color: #f7f7f7;
  min-height: 630px;
  border-radius: 10px;
`;
const UnderConstructionWrap = styled.div`
  width: 935px;
  height: 100%;

  background: url(${UnderConstructionPNG}) no-repeat center 50px #fff;
  position: absolute;
  top: 0;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
`;

const NameVerificationWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 4px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
`;

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedPaymentIndex: 0,
      selectedChannelIndex: 0,
      selectedMethodIndex: 0,
      loading: false,
      depositPromotion: this.props.match.params.promotionid,
      amount: "",
      name: "",
      step: 1,
      exchangeRate: { buyprice: 0, sellprice: 0 },
      //to handle access via URL
      paymentId: this.props.match.params.paymentId,
      depositDetail: "",
      channelname: "",
      methodcode: "",
      bankaccount: "",
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.props.getDepositMethod();
    this.props.getPlayerPromotionList();
    if (this.state.paymentId) {
      WalletService.PerformGetManualDepositDetail(this.state.paymentId).then(
        (e) => {
          if (e.IsSuccess) {
            this.setState({
              step: 5,
              depositDetail: e.data,
              amount: e.data.amount,
              channelname: e.data.bankname,
              methodcode: e.data.methodname,
              bankaccount: e.data.bankaccount,
            });
          }
        }
      );
    }
  }

  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      if (this.props.wallet.depositResult.IsSuccess) {
        const response = this.props.wallet.depositResult;
        var payment =
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];

        if (payment.paymentcode.toUpperCase() !== "MANUAL")
          window.open(response.data.paymenturl, "_blank");

        this.setState({
          ...this.state,
          step: payment.paymentcode.toUpperCase() === "MANUAL" ? 2 : 3,
          loading: false,
        });
      } else {
        this.props.enqueueSnackbar(this.props.wallet.depositResult.info, {
          variant: "error",
        });
        // if (this.props.wallet.depositResult.code === 407) {
        //   this.props.enqueueSnackbar(i18n.t("deposit.msgFailedJoinPromotion"), {
        //     variant: "error",
        //   });
        // } else if (this.props.wallet.depositResult.code === 900) {
        //   this.props.enqueueSnackbar(i18n.t("common.msgRequestFailed"), {
        //     variant: "error",
        //   });
        // } else {
        //   this.props.enqueueSnackbar(this.props.wallet.depositResult.info, {
        //     variant: "error",
        //   });
        // }

        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preProps.wallet.depositUploadResult !=
        this.props.wallet.depositUploadResult &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.setState({
          ...this.state,
          step: 4,
          loading: false,
        });
      } else {
        this.props.enqueueSnackbar(this.props.wallet.depositUploadResult.info, {
          variant: "error",
        });
        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preState.selectedPaymentIndex !== this.state.selectedPaymentIndex ||
      preState.selectedMethodIndex !== this.state.selectedMethodIndex ||
      preState.selectedChannelIndex !== this.state.selectedChannelIndex
    ) {
      if (
        this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
          .paymentcode === "LeePay"
      ) {
        WalletService.GetLeePayExchangeRate(
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
            .method[this.state.selectedMethodIndex].channel[
            this.state.selectedChannelIndex
          ].id
        ).then((response) => {
          if (response.IsSuccess) {
            this.setState({ ...this.state, exchangeRate: response.data });
          } else {
            this.setState({
              ...this.state,
              exchangeRate: this.initialState.exchangeRate,
            });
          }
        });
      } else {
        this.setState({
          ...this.state,
          exchangeRate: this.initialState.exchangeRate,
        });
      }
    }
  }

  handleTabClick = (item, index) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedPaymentIndex: index,
        amount: "",
        name: "",
        depositPromotion: "",
        selectedChannelIndex: 0,
        selectedMethodIndex: 0,
      });
    }
  };
  handleChannelChange = (index) => {
    this.setState({
      ...this.state,
      amount: "",
      selectedChannelIndex: index,
    });
  };
  handleMethodChange = (index) => {
    this.setState({
      ...this.state,
      amount: "",
      selectedMethodIndex: index,
    });
  };
  handleNextClick = (e) => {
    this.setState({ ...this.state, loading: true });

    var payment =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
    var method = payment.method[this.state.selectedMethodIndex];

    var channel = method.channel[this.state.selectedChannelIndex];

    if (payment.paymentcode.toUpperCase() === "MANUAL") {
      // handle manual deposit

      this.props.doManualDeposit(
        this.state.name,
        this.state.amount.replace(/,/g, ""),
        channel.id,
        this.state.depositPromotion
      );
    } else {
      if (payment.paymentcode.toUpperCase() === "LEEPAY") {
        this.props.doLeePayDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (payment.paymentcode.toUpperCase() === "PRIMEPAY") {
        this.props.doPrimePayDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (payment.paymentcode.toUpperCase() === "APPLEPAY") {
        this.props.doApplePayDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion,
          this.state.name
        );
      }
    }
  };

  // handleUploadClick = (file) => {
  //   if (!file) {
  //     this.props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   // this.props.resetDeposit();
  //   this.props.doDepositUpload(
  //     file,
  //     "image",
  //     this.props.wallet.depositResult.data.order_id
  //   );
  // };

  //newly declared function - START

  handleChangeManualDepositMethod = (value) => {
    this.setState({
      ...this.state,
      methodCode: value,
    });
  };

  handleChangePaymentOption = (value) => {
    this.setState({
      ...this.state,
      paymentId: value,
    });
  };
  handleDepositPromotionChange = (e) => {
    this.setState({
      ...this.state,
      depositPromotion: e.target.value,
    });
  };
  performSendData = () => {
    // TGSWalletService.PerformManualDeposit(
    //   this.state.amount,
    //   this.state.account,
    //   this.state.paymentId
    // ).then((result) => {
    //   if (result.IsSuccess) {
    //     this.setState({
    //       manualDepositId: result.data,
    //     });
    //     TGSWalletService.PerformGetManualDepositDetail(
    //       this.state.manualDepositId
    //     ).then((result) => {
    //       this.setState({
    //         ...this.state,
    //         manualDepositDetail: result.data,
    //         newStep: 2,
    //       });
    //     });
    //   }
    // });
    //this.props.performManualDeposit(
    //  this.state.amount,
    //  this.state.account,
    //  this.state.paymentId
    //);
  };

  performUploadImage = (file) => {
    this.props.doUploadDepositProof(
      this.props.wallet.depositResult
        ? this.props.wallet.depositResult.data
        : this.state.paymentId,
      file
    );
  };
  handleAmountChange = (e) => {
    var max =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex].method[
        this.state.selectedMethodIndex
      ].channel[this.state.selectedChannelIndex].transferlimit.to;

    this.setState({
      ...this.state,
      amount:
        parseInt(e.target.value.replace(/,/g, "")) > max ? max : e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };
  handleRestartClick = (e) => {
    this.setState(this.initialState);
    this.props.resetDeposit();
  };
  switchStep = (steps) => {
    switch (steps) {
      case 1:
        return (
          <NewStepOne
            amount={this.state.amount}
            onAmountChange={this.handleAmountChange}
            name={this.state.name}
            exchangeRate={this.state.exchangeRate}
            onNameChange={this.handleNameChange}
            selectedChannelIndex={this.state.selectedChannelIndex}
            onChannelChange={this.handleChannelChange}
            selectedMethodIndex={this.state.selectedMethodIndex}
            onMethodChange={this.handleMethodChange}
            selectedPaymentIndex={this.state.selectedPaymentIndex}
            promotionList={this.props.general.promotionList.items.filter(
              (item) =>
                [
                  "FirstDeposit",
                  "DailySecondDeposit",
                  "DailyFirstDeposit",
                ].indexOf(item.promotionType) >= 0
            )}
            depositPromotion={this.state.depositPromotion}
            handleDepositPromotionChange={this.handleDepositPromotionChange}
            paymentType={
              this.props.wallet.depositTypeList.length > 0
                ? this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ]
                : null
            }
            onNextClick={this.handleNextClick}
          />
        );
      case 2:
        return (
          <NewStepTwo
            extended={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].extended
            }
            methodcode={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode
            }
            channelname={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].channelname
            }
            depositResult={this.props.wallet.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
          />
        );
      case 3:
        return (
          <Step2Form
            isCrypto={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .paymentcode === "LeePay"
            }
            methodcode={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode
            }
            channel={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ]
            }
            depositResult={this.props.wallet.depositResult}
            amount={this.state.amount}
            handleRestartClick={this.handleRestartClick}
          ></Step2Form>
        );
      case 4:
        return <Success handleRestartClick={this.handleRestartClick}></Success>;
      case 5:
        return (
          <NewStepTwo
            methodcode={this.state.methodcode}
            channelname={this.state.channelname}
            depositDetail={this.state.depositDetail}
            bankaccount={this.state.bankaccount}
            paymentId={this.state.paymentId}
            depositResult={this.props.wallet.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
          />
        );
    }
  };

  //newly declared function - END

  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("deposit.title")}
        </Title>
        <Wrap>
          {(() => {
            if (this.props.account.info.member_name === "") {
              return (
                <NameVerificationWrap>
                  <NameVerification token={this.props.token}></NameVerification>
                </NameVerificationWrap>
              );
            } else {
              return (
                <>
                  <InnerWrap>
                    <TabButtonContainer>
                      {this.props.wallet.depositTypeList.map((item, index) => {
                        return (
                          <TabButton
                            key={index}
                            onClick={() => this.handleTabClick(item, index)}
                            active={this.state.selectedPaymentIndex === index}
                          >
                            <TabLabel> {i18n.t(item.paymentcode)}</TabLabel>
                          </TabButton>
                        );
                      })}
                    </TabButtonContainer>
                    <SplitLine></SplitLine>
                    {(() => {
                      if (this.props.account.info.member_name === "") {
                        return (
                          <NameVerification
                            token={this.props.token}
                          ></NameVerification>
                        );
                      } else {
                        return this.switchStep(this.state.step);
                        //   if (this.state.step === 1) {
                        //     return (
                        //       <Step1
                        //         username={this.state.username}
                        //         selectedType={this.state.selectedType}
                        //         selectedChannel={this.state.selectedChannel}
                        //         depositAmount={this.state.depositAmount}
                        //         handleDepositClick={this.handleDepositClick}
                        //         handleDepositAmountChange={
                        //           this.handleDepositAmountChange
                        //         }
                        //         handleUsernameChange={this.handleUsernameChange}
                        //         handleTunnelClick={this.handleTunnelClick}
                        //       ></Step1>
                        //     );
                        //   } else if (this.state.step === 2) {
                        //     return (
                        //       <Step2Form
                        //         depositResult={this.props.wallet.depositResult}
                        //         handleDepositConfirmClick={
                        //           this.handleDepositConfirmClick
                        //         }
                        //         handleDepositCancelClick={
                        //           this.handleDepositCancelClick
                        //         }
                        //       ></Step2Form>
                        //     );
                        //   } else if (this.state.step === 3) {
                        //     return (
                        //       <Step2QR
                        //         bankInfo={this.bankInfo}
                        //         amount={this.state.depositAmount}
                        //         selectedType={this.state.selectedType}
                        //         selectedChannel={this.state.selectedChannel}
                        //         depositResult={this.props.wallet.depositResult}
                        //         handleUploadClick={this.handleUploadClick}
                        //         handleDepositCancelClick={
                        //           this.handleDepositCancelClick
                        //         }
                        //       ></Step2QR>
                        //     );
                        //   } else if (this.state.step === 4) {
                        //     return (
                        //       <Success
                        //         handleConfirmClick={() => {
                        //           this.setState({
                        //             ...this.initialState,
                        //             selectedType: this.props.wallet
                        //               .depositTypeList[0],
                        //             selectedChannel: this.props.wallet
                        //               .depositTypeList[0].channel[0],
                        //           });
                        //         }}
                        //       ></Success>
                        //     );
                        //   }
                      }
                    })()}
                  </InnerWrap>
                </>
              );
            }
          })()}

          <Loading
            show={this.state.loading || this.props.wallet.depositLoading}
          ></Loading>
          <UnderConstructionWrap
            style={
              this.state.isMaintenance
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <DescLabel>{i18n.t("deposit.msgMaintenance")}</DescLabel>
          </UnderConstructionWrap>
        </Wrap>
        <form id="form" target="_blank" method="post">
          <input type="hidden" name="cid" id="cid"></input>
          <input type="hidden" name="oid" id="oid"></input>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doManualDeposit: (amount, account, paymentid, promotionid) =>
      dispatch(
        walletAction.doManualDeposit(amount, account, paymentid, promotionid)
      ),
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    doLeePayDeposit: (amount, payment_id, promotionid) =>
      dispatch(walletAction.doLeePayDeposit(amount, payment_id, promotionid)),
    doPrimePayDeposit: (amount, payment_id, promotionid) =>
      dispatch(walletAction.doPrimePayDeposit(amount, payment_id, promotionid)),
    doApplePayDeposit: (amount, payment_id, promotionid, transname) =>
      dispatch(
        walletAction.doApplePayDeposit(
          amount,
          payment_id,
          promotionid,
          transname
        )
      ),
    cancelDeposit: (id, notice_id) =>
      dispatch(walletAction.cancelDeposit(id, notice_id)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    getPlayerPromotionList: () =>
      dispatch(generalAction.getPlayerPromotionList(1, 99, true, "", true)),
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    resetDeposit: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Deposit)));
