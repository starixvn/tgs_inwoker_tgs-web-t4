import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../App/Loading";
import { walletAction } from "@Inwoker/tgs-api";
import Maintenance from "./Maintenance";
class Deposit extends Component {
  state = {
    loading: true,
    maintenance: false,
  };
  componentDidMount() {
    localStorage.removeItem("depositResult");
    var paymentcode = this.props.match.params.paymentcode.toUpperCase();

    var methodcode = this.props.match.params.methodcode;

    var channelid = this.props.match.params.channelid;
    var depositPromotion = this.props.match.params.promotion.trim();
    var amount = this.props.match.params.amount.replace(/,/g, "");
    var name = this.props.match.params.name;
    if (paymentcode === "MANUAL") {
      // handle manual deposit
      if (methodcode === "BankTransfer") {
        this.props.doBankDeposit(name, amount, channelid, depositPromotion);
      }
      if (methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(amount, channelid, depositPromotion);
      }
    } else {
      if (paymentcode === "LEEPAY") {
        this.props.doLeePayDeposit(amount, channelid, depositPromotion);
      } else if (paymentcode === "PRIMEPAY") {
        this.props.doPrimePayDeposit(amount, channelid, depositPromotion);
      } else if (paymentcode === "MATICPAY") {
        this.props.doMaticPayDeposit(amount, channelid, depositPromotion);
      } else if (paymentcode === "APPLEPAY") {
        this.props.doApplePayDeposit(amount, channelid, depositPromotion, name);
      } else if (paymentcode === "UMPAY") {
        if (methodcode === "Crypto") {
          this.props.doUmPayCryptoDeposit(amount, channelid, depositPromotion);
        } else {
          this.props.doUmPayBankDeposit(amount, channelid, depositPromotion);
        }
      }
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      localStorage.setItem(
        "depositResult",
        JSON.stringify(this.props.wallet.depositResult)
      );
      if (this.props.wallet.depositResult.IsSuccess) {
        const response = this.props.wallet.depositResult;
        var paymentcode = this.props.match.params.paymentcode.toUpperCase();
        var paymenturl = "";
        if (paymentcode !== "MANUAL") {
          paymenturl = response.data.paymenturl;
          window.location.href = paymenturl;
        } else {
          window.close();
        }
      } else {
        window.close();
      }
    }
  }
  render() {
    if (this.state.maintenance) {
      return <Maintenance></Maintenance>;
    } else {
      return <Loading show={this.state.loading} opacity={1}></Loading>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doManualDeposit: (amount, account, paymentid, promotionid) =>
      dispatch(
        walletAction.doManualDeposit(amount, account, paymentid, promotionid)
      ),
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
