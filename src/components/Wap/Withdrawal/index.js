import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import { AppHistory } from "../../../history/History";

import Button from "../../Wap/Share/Button";

import IconCardManagePNG from "../../../assets/images/wap/icon-card-manage.png";
import Textbox from "../../Wap/Share/Textbox";

import { walletAction, RESET_WALLETRESULT } from "@Inwoker/tgs-api";
import { withSnackbar } from "notistack";
import Loading from "../../Wap/Share/Loading";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import i18n from "../../../utils/i18n";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;
`;
const BalanceLabel = styled.div`
  float: right;
  margin: 26px 20px 0 0;

  font-size: 30px;
  font-weight: 600;

  text-align: right;
  color: #fde73f;
`;
const InnerContainer = styled.div`
  margin: 40px auto 40px auto;

  width: 688px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  padding 20px 0 20px 10px;
`;
const RowContainer = styled.div`
  min-height: 80px;
  margin: 10px 0 10px 30px;
`;

const LeftLabel = styled.div`
  float: left;
  border-left: 3px solid #000;

  font-size: 32px;
  padding-left: 30px;
  color: #4a4a4a;
  width: 450px;
  margin: 10px 0 0 0;
`;
const LeftLabelValue = styled.div`
  float: left;
  font-size: 28px;
  width: 450px;
  color: ${({ theme }) => theme.secondary};
  padding-left: 30px;
`;

const BottomDesc = styled.div`
  margin: 0 auto;
  width: 86%;
  font-size: 26px;

  color: ${({ theme }) => theme.secondary};
`;
const ButtonCardManage = styled.div`
  background: url(${IconCardManagePNG}) no-repeat left center;
  padding-left: 50px;
  float: right;
  margin: 0px 50px 20px 0;
  font-size: 26px;

  color: ${({ theme }) => theme.secondary};
`;

const StyledModalBank = withStyles((theme) => ({
  paper: {
    color: "#666666",
    padding: "0 30px",
    width: "750px",
    maxWidth: "750px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}))(Modal);
const StyledListItemIcon = withStyles((theme) => ({
  root: {
    marginLeft: "150px",
  },
}))(ListItemIcon);
const StyledListItemImage = styled.img`
  width: 64px;
  height: 64px;
`;
const StyledListItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "10px",
  },
}))(ListItem);
const StyledListItemText = withStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: "50px",
    "& .MuiTypography-root": {
      fontSize: "28px",
    },
  },
}))(ListItemText);
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
const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;

const OTPContainer = styled.div`
  position: relative;
  text-align: center;
  margin: 50px 0;
  &:after {
    content: "___   ___   ___   ___   ___   ___";
    display: block;
    position: absolute;
    top: 28px;
    left: 64px;
    white-space: pre;
  }
`;
const OTPTextBox = styled.input`
  position: relative;
  font-size: 50px;
  z-index: 2;
  border: none;
  background: transparent;
  width: 500px;
  text-indent: 9px;
  padding-left: 64px;
  color: ${({ theme }) => theme.secondary};
  -webkit-letter-spacing: 25.6px;
  -moz-letter-spacing: 25.6px;
  -ms-letter-spacing: 25.6px;
  letter-spacing: 42.6px;
  font-family: Courier;
`;
class Withdrawal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      withdrawalInfo: {
        bonus_limit_list: [],
      },
      bankCardList: [],
      selectedBankCardIndex: 0,
      defaultCard: "",
      amount: "",
      card: "",
      bankOpen: false,
      loading: false,
      open: false,
      password: "",
      otp: false,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    if (this.props.account.info.check_pass_email === false) {
      AppHistory.replace(`/${i18n.language}/profile/email`);
    } else if (this.props.account.info.member_safe_password !== "set") {
      AppHistory.replace(`/${i18n.language}/profile/withdrawalpassword/`);
    } else {
      if (this.props.token != null) {
        if (this.props.wallet.bankCardList.length === 0)
          this.props.getBankCardList();

        // this.GetWithdrawalDetails();
      }
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.addBillingResult !== this.props.wallet.addBillingResult &&
      this.props.wallet.addBillingResult !== null
    ) {
      this.props.getBalanceList();
    }
    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.alert("", i18n.t("withdrawal.msgSuccess"));
        this.setState({
          ...this.initialState,
        });
      } else {
        if (this.props.wallet.withdrawalResult.code === 207) {
          this.props.alert("", i18n.t("common.msgRequiredTurnover"));
        } else if (this.props.wallet.withdrawalResult.code === 901) {
          this.props.alert("", i18n.t("common.msgInvalidWithdrawalPassword"));
        } else {
          this.props.alert("", this.props.wallet.withdrawalResult.info);
        }
      }
    }
  }
  handleBackClick = () => {
    AppHistory.goBack();
  };

  handleSubmitClick = (e) => {
    const amount = this.state.amount;
    const formatedamount = amount.toString().replace(/,/g, "");
    this.props.doWithdraw(
      formatedamount,
      this.state.password,
      this.props.wallet.bankCardList[this.state.selectedBankCardIndex].id
    );
    // const amount = this.state.amount;
    // const formatedamount = amount.toString().replace(/,/g, "");
    // if (parseFloat(formatedamount) <= 0) {
    //   this.props.alert("", i18n.t("withdrawal.msgInvalidAmt"));
    //   return;
    // }
    // if (
    //   parseFloat(formatedamount) > parseFloat(this.props.wallet.mainBalance)
    // ) {
    //   this.props.alert(
    //     "",
    //     i18n
    //       .t("withdrawal.msgCanWithdrawal")
    //       .replace(/{{amount}}/g, this.props.wallet.mainBalance)
    //   );
    //   // this.props.enqueueSnackbar(
    //   //   "您可的可提款余额为：" + this.props.account.info.can_withdrawal,
    //   //   {
    //   //     variant: "warning"
    //   //   }
    //   // );
    //   return;
    // }
    // this.setState({ ...this.state, otp: true });
    // AppHistory.replace({
    //   pathname: "/" + i18n.language + "/withdrawal/details",
    //   state: {
    //     order: {
    //       id: this.state.selectedBankCard.id,
    //       amount: formatedamount,
    //     },
    //   },
    // });
  };

  handleChangeAmount = (e) => {
    this.setState({ ...this.state, amount: e.target.value });
  };

  handleClose = () => {
    this.props.resetResult();
  };

  handleBankClick = (index) => {
    this.setState({
      ...this.state,
      selectedBankCardIndex: index,
      bankOpen: false,
    });
  };
  handleConfirmOTP = () => {
    const amount = this.state.amount;

    const formatedamount = amount.toString().replace(/,/g, "");
    // if (parseFloat(formatedamount) <= 0) {
    //   this.props.alert("", i18n.t("withdrawal.msgInvalidAmt"));

    //   return;
    // }
    // this.setState({ ...this.state, otp: false });
    this.props.doWithdrawal(
      formatedamount,
      this.state.password,
      this.props.wallet.bankCardList[this.state.selectedBankCardIndex].id
    );
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          rightContent={
            <BalanceLabel>
              {this.props.wallet.mainSymbol}
              {this.props.wallet.mainBalance}
            </BalanceLabel>
          }
          onBackClick={this.handleBackClick}
          title={i18n.t("withdrawal.title")}
        ></Header>
        <InnerContainer>
          <RowContainer>
            <LeftLabel>{i18n.t("withdrawal.msgCanWithdrawal")}</LeftLabel>
            <LeftLabelValue>
              {this.props.wallet.mainSymbol}
              {this.props.wallet.mainBalance}
            </LeftLabelValue>
          </RowContainer>
        </InnerContainer>
        <ButtonCardManage
          onClick={() => AppHistory.push("/" + i18n.language + "/card")}
        >
          {i18n.t("withdrawal.manageBank")}
        </ButtonCardManage>

        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={
            this.props.wallet.bankCardList.length > 0
              ? this.props.wallet.bankCardList[this.state.selectedBankCardIndex]
                  .detail.address ||
                this.props.wallet.bankCardList[this.state.selectedBankCardIndex]
                  .detail.bankAccount
              : ""
          }
          onClick={() => this.setState({ ...this.state, bankOpen: true })}
          type={"text"}
          placeholder={i18n.t("withdrawal.msgEnterBank")}
          label={i18n.t("withdrawal.bankCard")}
          disabled={true}
        ></Textbox>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.amount}
          onChange={this.handleChangeAmount}
          placeholder={i18n.t("withdrawal.enterAmount")}
          label={i18n.t("common.amount")}
          type={"number"}
        ></Textbox>

        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          onChange={this.handlePasswordChange}
          value={this.state.password}
          placeholder={i18n.t("withdrawal.msgEnterWithdrawalPass")}
          label={i18n.t("common.withdrawalPassword")}
          type={"password"}
        ></Textbox>
        <BottomDesc>{i18n.t("withdrawal.notice")}</BottomDesc>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.submit")}
          onClick={this.handleSubmitClick}
          disabled={(() => {
            return (
              parseFloat(this.state.amount.toString().replace(/,/g, "")) < 1 ||
              this.state.password <= 0
            );
          })()}
        ></Button>

        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankOpen: false })}
          open={this.state.bankOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {this.props.wallet.bankCardList.map((item, index) => {
            return (
              <StyledListItem
                button
                key={index}
                onClick={() => this.handleBankClick(index)}
              >
                <StyledListItemText
                  primary={item.banktype}
                ></StyledListItemText>
                <StyledListItemText
                  primary={item.detail.address || item.detail.bankAccount}
                ></StyledListItemText>
              </StyledListItem>
            );
          })}
        </StyledModalBank>
        <StyledModalPopup
          onClose={() => this.setState({ ...this.state, otp: false })}
          open={this.state.otp}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialoTitle>{i18n.t("common.withdrawalPassword")}</DialoTitle>
          <Textbox
            style={{ margin: "50px auto 20px auto" }}
            onChange={this.handlePasswordChange}
            value={this.state.password}
            label={i18n.t("common.withdrawalPassword")}
            type={"password"}
          ></Textbox> */}
          {/* <OTPContainer>
            <OTPTextBox
              type={"password"}
              inputmode="numeric"
              minLength={6}
              maxLength={6}
              size={6}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            ></OTPTextBox>
          </OTPContainer> */}
          <Button
            style={{
              width: "250px",
              float: "left",

              backgroundImage: "none",
              backgroundColor: "#b7b7b7",
            }}
            labelStyle={{ color: "#fff" }}
            label={i18n.t("common.cancel")}
            onClick={() => this.setState({ ...this.state, otp: false })}
          ></Button>
          <Button
            style={{
              width: "250px",
              float: "right",
            }}
            disabled={this.state.password.length < 6}
            label={i18n.t("common.confirm")}
            onClick={this.handleConfirmOTP}
          ></Button>
        </StyledModalPopup>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
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
    addBilling: (card_id, amount) =>
      dispatch(walletAction.addBilling(card_id, amount)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doWithdraw: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdraw(amount, user_account_id, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withRouter(Withdrawal)));
