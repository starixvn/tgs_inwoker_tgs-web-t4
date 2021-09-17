import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router";
import IconWithdrawRedPNG from "../../../../assets/images/icon-withdraw.png";
import { withRouter } from "react-router-dom";
import Loading from "../../Loading";
import NameVerification from "../../Share/NameVerification";
// import PassSetting from "./PassSetting";

import AddCard from "./AddCard";
import AddCardSuccess from "./AddCardSuccess";
import CardManage from "./CardManage";
import Main from "./Main";
import Success from "./Success";

import {
  walletAction,
  UPDATE_INFO,
  RESET_WALLETRESULT,
  AccountService,
} from "@Inwoker/tgs-api";
import { withSnackbar } from "notistack";
import i18n from "../../../../utils/i18n";
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

  background: url(${IconWithdrawRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

class Withdrawal extends Component {
  state = {
    loading: false,
    bankCardList: [],
    defaultCard: 0,
    addCard: {
      number: "",
      password: "",
    },
    isAddCardSuccess: false,
    displayView: 1,
    showMessagebox: false,
    messageboxText: "",
    withdrawalInfo: {
      bonus_limit_list: [],
    },
  };
  async componentDidMount() {
    if (this.props.wallet.bankCardList.length === 0)
      this.props.getBankCardList();
    if (this.props.wallet.withdrawalList.length === 0)
      this.props.getWithdrawalChannel();
  }

  componentDidUpdate(preProps) {
    if (
      preProps.wallet.deleteBankCardResult !==
        this.props.wallet.deleteBankCardResult &&
      this.props.wallet.deleteBankCardResult !== null
    ) {
      if (this.props.wallet.deleteBankCardResult.IsSuccess) {
        this.props.getBankCardList();
      } else {
        this.props.enqueueSnackbar(
          this.props.wallet.deleteBankCardResult.info,
          {
            variant: "error",
          }
        );
      }
      this.props.resetResult();
    }
    if (
      preProps.wallet.addBankCardResult !==
        this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList();
        this.setState({
          ...this.state,
          loading: false,
          isAddCardSuccess: true,
        });
      } else {
        this.props.enqueueSnackbar(this.props.wallet.addBankCardResult.info, {
          variant: "error",
        });
      }
    }

    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({ ...this.state, displayView: 4 });
      } else {
        this.props.enqueueSnackbar(this.props.wallet.withdrawalResult.info, {
          variant: "error",
        });
        // if (this.props.wallet.withdrawalResult.code === 207) {
        //   this.props.enqueueSnackbar(i18n.t("common.msgRequiredTurnover"), {
        //     variant: "error",
        //   });
        // } else if (this.props.wallet.withdrawalResult.code === 901) {
        //   this.props.enqueueSnackbar(
        //     i18n.t("common.msgInvalidWithdrawalPassword"),
        //     {
        //       variant: "error",
        //     }
        //   );
        // } else {
        //   this.props.enqueueSnackbar(this.props.wallet.withdrawalResult.info, {
        //     variant: "error",
        //   });
        // }
      }
    }
  }

  handleAddCardNextClick = (channelid, bankType, detail) => {
    this.props.addBankCard(channelid, bankType, detail);
    // this.setState({ ...this.state, loading: true });
    // WalletService.AddBankCard(this.props.token, number, 1, password).then(
    //   (response) => {
    //     if (response.IsSuccess) {
    //       // this.GetBankCardList();
    //       this.setState({
    //         ...this.state,
    //         loading: false,
    //         isAddCardSuccess: true,
    //       });
    //     } else {
    //       this.props.enqueueSnackbar(response.msg, {
    //         variant: "error",
    //       });
    //       this.setState({
    //         ...this.state,
    //         loading: false,
    //         // showMessagebox: true,
    //         // messageboxText: response.msg
    //       });
    //     }
    //   }
    // );
  };

  // handleBindCardClick = (number, password) => {
  //   this.setState({ ...this.state, loading: true });
  //   WalletService.AddBankCard(
  //     this.props.token,
  //     this.props.account.info.member_name,
  //     number,
  //     1,
  //     password
  //   ).then(response => {
  //     if (response.IsSuccess) {
  //       this.GetBankCardList();
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         isAddCardSuccess: true
  //       });
  //     } else {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "error"
  //       });
  //       this.setState({
  //         ...this.state,
  //         loading: false
  //         // showMessagebox: true,
  //         // messageboxText: response.msg
  //       });
  //     }
  //   });
  // };
  handleBindCardClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 2 });
  };
  handleGoWithdrawClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 1 });
  };
  handleCSClick = () => {
    this.props.onhandleCSClick(
      this.props.account.info.member_id,
      this.props.account.info.member_name,
      ""
    );
  };
  handleManageCardClick = () => {
    this.setState({ ...this.state, displayView: 3 });
  };
  handleAddCardClick = () => {
    this.setState({ ...this.state, displayView: 2 });
  };
  handleCardManageBack = () => {
    this.setState({ ...this.state, displayView: 1 });
  };
  handleAddCardBack = () => {
    this.setState({ ...this.state, displayView: 3 });
  };
  handleDeleteCardClick = (id) => {
    this.props.deleteBankCard(id);
    // this.setState({ ...this.state, loading: true });
    // WalletService.DeleteBankCard(this.props.token, id).then((response) => {
    //   if (response.IsSuccess) {
    //     this.GetBankCardList();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "error",
    //     });
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       // showMessagebox: true,
    //       // messageboxText: response.msg
    //     });
    //   }
    // });
  };
  handleReportClick = () => {
    this.props.onhandleClickTab("report");
  };
  handleSuccessConfirmClick = () => {
    this.setState({ ...this.state, displayView: 1 });
  };
  handleWithdrawalClick = (bankid, amount, password) => {
    const formatedamount = amount.toString().replace(/,/g, "");
    if (bankid == 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgEnterBank"), {
        variant: "warning",
      });
      return;
    }
    if (parseFloat(formatedamount) <= 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgInvalidAmt"), {
        variant: "warning",
      });
      return;
    }

    if (
      parseFloat(formatedamount) > parseFloat(this.props.wallet.mainBalance)
    ) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgInsufficient"), {
        variant: "warning",
      });
      return;
    }
    if (password.length <= 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgEnterWithdrawalPass"), {
        variant: "warning",
      });
      return;
    }
    this.props.doWithdraw(formatedamount, password, bankid);
    // this.setState({ ...this.state, loading: true });
    // const result = WalletService.Withdrawal(
    //   this.props.token,
    //   bankid,
    //   formatedamount
    // );

    // result.then((response) => {
    //   if (response.IsSuccess) {
    //     // this.GetBankCardList();
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "success",
    //     });
    //     this.GetWithdrawalDetails();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "error",
    //     });
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       // showMessagebox: true,
    //       // messageboxText: response.msg
    //     });
    //   }
    // });
    //  return result;
  };
  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("withdrawal.title")}
        </Title>
        <InnerWrap>
          {(() => {
            if (this.props.account.loading === false) {
              if (this.props.account.info.member_name === "") {
                return (
                  <NameVerification token={this.props.token}></NameVerification>
                );
              } else {
                if (this.props.account.info.member_safe_password !== "set") {
                  return (
                    <Redirect
                      to={`/${i18n.language}/account/profile/member_safe_password`}
                    ></Redirect>
                  );
                } else {
                  if (
                    this.props.wallet.bankCardList != null &&
                    this.props.wallet.bankCardList.length === 0
                  ) {
                    return (
                      <AddCard
                        name={this.props.account.info.member_name}
                        onhandleNextClick={this.handleAddCardNextClick}
                        withdrawalList={this.props.wallet.withdrawalList}
                        showBack={false}
                      ></AddCard>
                    );
                  } else {
                    if (this.state.isAddCardSuccess === true) {
                      return (
                        <AddCardSuccess
                          onhandleBindCardClick={this.handleBindCardClick}
                          onhandleGoWithdrawClick={this.handleGoWithdrawClick}
                          onhandleCSClick={this.handleCSClick}
                        ></AddCardSuccess>
                      );
                    } else {
                      switch (this.state.displayView) {
                        case 1:
                          return (
                            <Main
                              defaultCard={this.state.defaultCard}
                              cardList={this.props.wallet.bankCardList}
                              withdrawalInfo={this.state.withdrawalInfo}
                              onhandleManageCardClick={
                                this.handleManageCardClick
                              }
                              onhandleWithdrawalClick={
                                this.handleWithdrawalClick
                              }
                              account={this.props.account}
                              withdrawalMinLimit={
                                this.props.wallet.withdrawalMinLimit
                              }
                              withdrawalMaxLimit={
                                this.props.wallet.withdrawalMaxLimit
                              }
                            ></Main>
                          );
                        case 2:
                          return (
                            <AddCard
                              name={this.props.account.info.member_name}
                              onhandleNextClick={this.handleAddCardNextClick}
                              onhandleBackClick={this.handleAddCardBack}
                              withdrawalList={this.props.wallet.withdrawalList}
                              showBack={true}
                            ></AddCard>
                          );
                        case 3:
                          return (
                            <CardManage
                              bankCardList={this.props.wallet.bankCardList}
                              onhandleAddCardClick={this.handleAddCardClick}
                              onhandleBackClick={this.handleCardManageBack}
                              onhandleDeleteCardClick={
                                this.handleDeleteCardClick
                              }
                              onhandleReportClick={this.handleReportClick}
                            ></CardManage>
                          );
                        case 4:
                          return (
                            <Success
                              handleConfirmClick={
                                this.handleSuccessConfirmClick
                              }
                            ></Success>
                          );
                        default:
                          return null;
                      }
                    }
                  }
                }
              }
            }
          })()}

          <Loading show={this.state.loading}></Loading>
        </InnerWrap>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,

    game: state.game,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    addBankCard: (channelid, bankType, detail) =>
      dispatch(walletAction.addBankCard(channelid, bankType, detail)),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doWithdraw: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdraw(amount, user_account_id, password)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Withdrawal))
);
