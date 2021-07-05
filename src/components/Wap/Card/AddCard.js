import React, { Component } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { AppHistory } from "../../../history/History";
import { withStyles } from "@material-ui/core/styles";
import {
  accountAction,
  walletAction,
  RESET_WALLETRESULT,
} from "@Inwoker/tgs-api";

import Header from "../../Wap/Share/Header";

import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";
import MessageDialog from "../../Wap/Share/MessageDialog";
import Loading from "../../Wap/Share/Loading";
import IconRedInfoPNG from "../../../assets/images/wap/icon-red-info.png";

import Modal from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import BgProfilePNG from "../../../assets/images/wap/bg-profile2.jpg";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  width: 100%;
  padding-top: 170px;
`;
const StyledAppBar = withStyles((theme) => ({
  root: {
    height: "170px",
    background: theme.palette.primary.main,

    background:
      `linear-gradient(rgba(` +
      theme.palette.primary.mainRgb +
      `, 0.8), rgba(` +
      theme.palette.primary.mainGradientRgb +
      `, 0.8)), url(${BgProfilePNG})`,
    display: "block",
    backgroundSize: "cover",
  },
}))(AppBar);
const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: #ffffff;
  margin: 0 auto 20px auto;
`;

const SubTitle = styled.div`
  font-size: 34px;
  font-weight: 550;
  margin: 40px 0 0 50px;
  color: ${({ theme }) => theme.secondary};
`;

const BottomInfo = styled.div`
  font-size: 22px;
  font-weight: 600;
  height: 30px;
  color: ${({ theme }) => theme.primary};
  background: url(${IconRedInfoPNG}) no-repeat left center;
  padding-left: 40px;
  display: table;
  margin: 0 auto;
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

class AddCard extends Component {
  state = {
    number: "",

    channelOpen: false,
    bankTypeOpen: false,
    selectedChannelIndex: 0,
    selectedBankTypeIndex: 0,

    loading: false,
    showDialog: false,
    dialogMessage: "",
  };
  componentDidMount() {
    if (this.props.wallet.withdrawalList.length === 0)
      this.props.getWithdrawalChannel();
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.addBankCardResult !==
        this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList();
        AppHistory.goBack();
      } else {
        this.setState({
          ...this.state,
          showDialog: true,
          dialogMessage: this.props.wallet.addBankCardResult.info,
        });
      }
    }
  }

  handleCloseDialog() {
    this.setState({
      ...this.state,
      showDialog: false,
      dialogMessage: "",
    });
  }
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleNextClick = () => {
    var selected =
      this.props.wallet.withdrawalList[this.state.selectedBankTypeIndex];
    var detail = {};
    if (selected.banktype === "Bank") {
      detail = {
        bankAccount: this.state.number,
        bankName: this.state.bankName,
        name: this.state.bankAccountName,
        bankBranch: this.state.bankBranch,
      };
    } else {
      detail = {
        address: this.state.number,
      };
    }
    this.props.addBankCard(
      selected.channel[this.state.selectedChannelIndex].channelid,
      selected.banktype,
      detail
    );
  };

  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };

  handleBankTypeClick = (index) => {
    this.setState({
      ...this.state,
      selectedBankTypeIndex: index,
      bankTypeOpen: false,
    });
  };
  handleChannelClick = (index) => {
    this.setState({
      ...this.state,
      selectedChannelIndex: index,
      channelOpen: false,
    });
  };
  render() {
    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={i18n.t("card.addCard.title")}
            position={"sticky"}
            backgroundColor={"transparent"}
          ></Header>
          <BalanceLabel>￥{this.props.wallet.mainBalance}</BalanceLabel>
        </StyledAppBar>
        <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={
            this.props.wallet.withdrawalList.length > 0
              ? this.props.wallet.withdrawalList[
                  this.state.selectedBankTypeIndex
                ].banktype
              : ""
          }
          onClick={() => this.setState({ ...this.state, bankTypeOpen: true })}
          type={"text"}
          label={i18n.t("common.withdrawalBankType")}
          disabled={true}
        ></Textbox>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={
            this.props.wallet.withdrawalList.length > 0
              ? i18n.t(
                  this.props.wallet.withdrawalList[
                    this.state.selectedBankTypeIndex
                  ].channel[this.state.selectedChannelIndex].channelcode
                )
              : ""
          }
          onClick={() => this.setState({ ...this.state, channelOpen: true })}
          type={"text"}
          label={i18n.t("common.withdrawalChannel")}
          disabled={true}
        ></Textbox>
        {(() => {
          if (
            this.props.wallet.withdrawalList.length > 0 &&
            this.props.wallet.withdrawalList[this.state.selectedBankTypeIndex]
              .banktype === "Bank"
          ) {
            return (
              <>
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.bankName}
                  onChange={this.handleBankNameChange}
                  type={"text"}
                  placeholder={i18n.t("card.addCard.msgEnterBankName")}
                  label={i18n.t("card.addCard.BankName")}
                ></Textbox>

                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.bankBranch}
                  onChange={this.handleBankBranchChange}
                  type={"text"}
                  placeholder={i18n.t("card.addCard.branchPlaceHolder")}
                  label={i18n.t("card.addCard.branch")}
                ></Textbox>

                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.bankAccountName}
                  onChange={this.handleBankAccountNameChange}
                  type={"text"}
                  placeholder={i18n.t("card.addCard.msgEnterBankAccountName")}
                  label={i18n.t("card.addCard.BankAccountName")}
                ></Textbox>
              </>
            );
          }
        })()}

        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.number}
          onChange={this.handleNumberChange}
          type={"text"}
          placeholder={i18n.t("common.msgEnterWithdrawalNumber")}
          label={i18n.t("common.withdrawalNumber")}
        ></Textbox>

        <BottomInfo>{i18n.t("card.addCard.desc")}</BottomInfo>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.confirm")}
          onClick={this.handleNextClick}
          disabled={
            this.state.branch === "" ||
            this.state.accountHolder === "" ||
            this.state.number === "" ||
            this.state.selectedBank === null
          }
        ></Button>
        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankTypeOpen: false })}
          open={this.state.bankTypeOpen}
        >
          {this.props.wallet.withdrawalList.length > 0 &&
            this.props.wallet.withdrawalList.map((item, index) => {
              return (
                <StyledListItem
                  button
                  key={index}
                  onClick={() => this.handleBankTypeClick(index)}
                >
                  {/* <StyledListItemIcon>
                  <StyledListItemImage src={item.file}></StyledListItemImage>
                </StyledListItemIcon> */}
                  <StyledListItemText
                    primary={item.banktype}
                  ></StyledListItemText>
                </StyledListItem>
              );
            })}
        </StyledModalBank>
        <StyledModalBank
          onClose={() => this.setState({ ...this.state, channelOpen: false })}
          open={this.state.channelOpen}
        >
          {this.props.wallet.withdrawalList.length > 0 &&
            this.props.wallet.withdrawalList[
              this.state.selectedBankTypeIndex
            ].channel.map((item, index) => {
              return (
                <StyledListItem
                  button
                  key={index}
                  onClick={() => this.handleChannelClick(index)}
                >
                  {/* <StyledListItemIcon>
                  <StyledListItemImage src={item.file}></StyledListItemImage>
                </StyledListItemIcon> */}
                  <StyledListItemText
                    primary={i18n.t(item.channelcode)}
                  ></StyledListItemText>
                </StyledListItem>
              );
            })}
        </StyledModalBank>

        <MessageDialog
          onClose={() => this.handleCloseDialog()}
          open={this.state.showDialog}
          message={this.state.dialogMessage}
          onClick={() => this.handleCloseDialog()}
        ></MessageDialog>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    balance: state.account.info.balance,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    addBankCard: (channelid, bankType, address) =>
      dispatch(walletAction.addBankCard(channelid, bankType, address)),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AddCard));
