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
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import NewStepOne from "./NewStep1";
import NewStepOneHKJP from "./NewStep1HKJP";
import NewStepTwoHKJP from "./NewStep2HKJP";
import config from "../../../../config/config";
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
      files: [],
      //to handle access via URL
      paymentId: this.props.match.params.paymentId,
      depositDetail: "",
      channelname: "",
      methodcode: "",
      bankaccount: "",
      paymenturl: "",
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    localStorage.removeItem("depositResult");
    this.props.getDepositMethod();
    this.props.getPlayerPromotionList(i18n.language);
    window.addEventListener("storage", (ev) => {
      if (ev.key === "depositResult" && ev.newValue) {
        var depositResult = JSON.parse(ev.newValue);

        if (depositResult !== null && depositResult.IsSuccess) {
          var payment =
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
          // var paymenturl = "";
          // if (payment.paymentcode.toUpperCase() !== "MANUAL") {
          //   paymenturl = response.data.paymenturl;
          //   window.open(paymenturl, "_blank");
          // }

          this.setState({
            ...this.state,
            step: payment.paymentcode.toUpperCase() === "MANUAL" ? 2 : 3,
            depositResult: depositResult,
            loading: false,
          });
        } else {
          this.props.enqueueSnackbar(
            ErrorSwitcher.getTranslation(depositResult.info),
            {
              variant: "error",
            }
          );

          this.setState({
            ...this.state,
            loading: false,
          });
        }
      }
    });
    if (this.state.paymentId) {
      WalletService.PerformGetManualDepositDetail(this.state.paymentId).then(
        (e) => {
          if (e.IsSuccess) {
            this.setState({
              ...this.state,
              amount: e.data.amount,
              step: 2,
              depositResult: e.data,
              loading: false,
            });
            this.props.setActivePage("deposit");
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
        if (config.brand === "HKJP") {
          this.setState({
            ...this.state,
            step: 2,
            depositResult: response,
            loading: false,
          });
        } else {
          this.props.doUploadDepositProof(response.data, this.state.files[0]);
        }
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(this.props.wallet.depositResult.info),
          {
            variant: "error",
          }
        );

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
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.depositUploadResult.info
          ),
          {
            variant: "error",
          }
        );

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
          .method[this.state.selectedMethodIndex].methodcode === "Crypto"
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
          WalletService.GetUmPayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({
                ...this.state,
                exchangeRate: response.data.rate,
              });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          exchangeRate: this.initialState.exchangeRate,
        });
      }
    }
  }

  componentWillUnmount() {
    window.onstorage = null;
    localStorage.removeItem("depositResult");
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
      selectedChannelIndex: 0,
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
      if (method.methodcode === "BankTransfer") {
        this.props.doBankDeposit(
          this.state.name,
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (method.methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      }
    } else {
      window.open(
        `/${i18n.language}/deposit/${payment.paymentcode}/${
          method.methodcode
        }/${channel.id}/${this.state.amount}/${
          this.state.depositPromotion ? this.state.depositPromotion : " "
        }/${this.state.name}`,
        "_blank"
      );
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
      this.state.paymentId
        ? this.state.paymentId
        : this.state.depositResult
        ? this.state.depositResult.data
        : "",
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
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 2048) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
        e.target.value = null;
      } else {
        this.setState({ ...this.state, files: files });
      }
    }
  };
  handleRestartClick = (e) => {
    this.setState(this.initialState);
    this.props.resetDeposit();
  };
  switchStep = (steps) => {
    switch (steps) {
      case 1:
        if (config.brand === "HKJP") {
          return (
            <NewStepOneHKJP
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
        } else {
          return (
            <NewStepOne
              amount={this.state.amount}
              onAmountChange={this.handleAmountChange}
              name={this.state.name}
              files={this.state.files}
              exchangeRate={this.state.exchangeRate}
              onNameChange={this.handleNameChange}
              selectedChannelIndex={this.state.selectedChannelIndex}
              onChannelChange={this.handleChannelChange}
              selectedMethodIndex={this.state.selectedMethodIndex}
              onMethodChange={this.handleMethodChange}
              selectedPaymentIndex={this.state.selectedPaymentIndex}
              onFileChange={this.handleFileChange}
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
        }
      case 2:
        return (
          <NewStepTwoHKJP
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
            depositResult={this.state.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
            paymentId={this.state.paymentId}
          />
        );
      case 3:
        return (
          <Step2Form
            isCrypto={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode === "Crypto"
            }
            depositType={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .paymentcode
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
            depositResult={this.state.depositResult}
            paymenturl={this.state.paymenturl}
            amount={this.state.amount}
            handleRestartClick={this.handleRestartClick}
          ></Step2Form>
        );
      case 4:
        return <Success handleRestartClick={this.handleRestartClick}></Success>;
      case 5:
        return (
          <NewStepTwoHKJP
            methodcode={this.state.methodcode}
            channelname={this.state.channelname}
            depositDetail={this.state.depositDetail}
            bankaccount={this.state.bankaccount}
            paymentId={this.state.paymentId}
            depositResult={this.state.depositResult}
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
                        if (this.props.wallet.depositTypeList.length <= 0)
                          return null;
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
    doBankDeposit: (account, amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doBankDeposit(
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doThirdPartyDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doThirdPartyDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    doLeePayDeposit: (amount, payment_id, promotionid) =>
      dispatch(walletAction.doLeePayDeposit(amount, payment_id, promotionid)),
    doPrimePayDeposit: (amount, payment_id, promotionid) =>
      dispatch(walletAction.doPrimePayDeposit(amount, payment_id, promotionid)),
    doMaticPayDeposit: (amount, payment_id, promotionid) =>
      dispatch(walletAction.doMaticPayDeposit(amount, payment_id, promotionid)),
    doApplePayDeposit: (amount, payment_id, promotionid, transname) =>
      dispatch(
        walletAction.doApplePayDeposit(
          amount,
          payment_id,
          promotionid,
          transname
        )
      ),
    doUmPayCryptoDeposit: (amount, payment_id, promotionid) =>
      dispatch(
        walletAction.doUmPayCryptoDeposit(amount, payment_id, promotionid)
      ),
    doUmPayBankDeposit: (amount, payment_id, promotionid) =>
      dispatch(
        walletAction.doUmPayBankDeposit(amount, payment_id, promotionid)
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
