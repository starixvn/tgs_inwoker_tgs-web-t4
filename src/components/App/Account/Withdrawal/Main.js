import React, { Component } from "react";
import styled from "styled-components";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import LimitPopupBigPNG from "../../../../assets/images/limit-popup-big.png";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import IconEditPNG from "../../../../assets/images/icon-edit.png";
import IconBankDisablePNG from "../../../../assets/images/icon-bank-disable.png";

import CustomButton from "../../../Share/Button";
import Messagebox from "../../Messagebox";
import CustomTextField from "../../../Share/TextField";
import i18n from "../../../../utils/i18n";
import Common from "../../../../utils/Common";
const TabButton = styled.div`
  height: 41px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const SubHeaderContainer = styled.div``;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #141933;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #818181;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;
const BankCardButton = styled(TabButton)`
  width: 204px;
  text-align: left;
  padding: 10px 0 0 38px;
  background: url(${IconBankDisablePNG}) no-repeat 15px center;
`;
const BankCardButtonLabel = styled.div`
  width: 86px;
  display: inline-block;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
  margin-right: 2px;
`;
const BankCardButtonCardNoHL = styled(BankCardButtonCardNo)`
  font-weight: bold;
  margin-right: 10px;
`;
const ManageCardButton = styled(TabButton)`
  width: 133px;
  background: url(${IconEditPNG}) no-repeat 15px center;
  padding: 10px 0 0 18px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #000;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
  margin-top: 10px;
`;

const WithdrawalLimitListItem = styled.div`
  width: 355px;
  height: 55px;
  color: #747474;
  font-size: 18px;
  border: solid 1px #dbdbdb;
  background-color: #fff;
`;
const WithdrawalLimitItemLeft = styled.div`
  width: 115px;
  height: 55px;
  background-color: #f7f7f7;
  border-right: solid 1px #dbdbdb;
  float: left;
  padding-top: 12px;
`;
const WithdrawalLimitItemRight = styled.div`
  height: 55px;
  padding: 13px 0 0 20px;
  float: left;
`;

const Turnover = styled.div`
  a {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    font-weight: bold;
  }
`;
class Main extends Component {
  state = {
    selectedCardIndex: 0,
    showDetails: false,
    amount: "",
    password: "",
  };
  componentDidMount() {
    // this.setState({ ...this.state, selectedCard: this.props.defaultCard });
  }

  handleSelectCardChange = (index) => {
    this.setState({ ...this.state, selectedCardIndex: index });
  };
  handleAmountChange = (e) => {
    this.setState({ ...this.state, amount: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleWithdrawalClick = (e) => {
    this.props.onhandleWithdrawalClick(
      this.props.cardList[this.state.selectedCardIndex].id,
      this.state.amount,
      this.state.password
    );
  };
  render() {
    return (
      <>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>

          <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          {this.props.cardList.map((item, index) => {
            return (
              <BankCardButton
                key={index}
                active={index === this.state.selectedCardIndex}
                onClick={() => this.handleSelectCardChange(index)}
              >
                <BankCardButtonLabel>
                  {i18n.t("withdrawal.bankCard")}
                </BankCardButtonLabel>

                <BankCardButtonCardNoHL>
                  {item.detail.address
                    ? item.detail.address.substring(
                        item.detail.address.length - 4,
                        item.detail.address.length
                      )
                    : item.detail.bankAccount.substring(
                        item.detail.bankAccount.length - 4,
                        item.detail.bankAccount.length
                      )}
                </BankCardButtonCardNoHL>
                {i18n.language !== "vi-VN" && (
                  <BankCardButtonCardNo>
                    {i18n.t("withdrawal.tail")}
                  </BankCardButtonCardNo>
                )}
              </BankCardButton>
            );
          })}
          <ManageCardButton onClick={this.props.onhandleManageCardClick}>
            {i18n.t("withdrawal.manageBank")}
          </ManageCardButton>
        </SelectionContainer>
        <SplitLine></SplitLine>

        <SubHeaderContainer>
          <NumberContainer>2</NumberContainer>

          <SubTitle>{i18n.t("withdrawal.enterAmount")}</SubTitle>
        </SubHeaderContainer>

        <SelectionContainer>
          <CustomTextField
            width={220}
            height={38}
            placeholder={i18n.t("withdrawal.enterAmount")}
            handleTextFieldChange={this.handleAmountChange}
            variant="outlined"
            autoComplete="off"
            value={this.state.amount}
            pattern="[0-9]*"
            type={"number"}
            maxLength={12}
          ></CustomTextField>
          <LimitPopupContainer>
            {Common.formatNumberWithThousand(this.props.withdrawalMinLimit)} -{" "}
            {Common.formatNumberWithThousand(this.props.withdrawalMaxLimit)}
          </LimitPopupContainer>
          <Turnover>
            {i18n.t("withdrawal.turnover")}
            <a>
              {Common.formatNumberWithThousand(this.props.minWithdrawLimit)}
            </a>
          </Turnover>
        </SelectionContainer>

        <SplitLine></SplitLine>
        <SubHeaderContainer>
          <NumberContainer>3</NumberContainer>

          <SubTitle>{i18n.t("withdrawal.msgEnterWithdrawalPass")}</SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          <CustomTextField
            marginTop={10}
            type={"password"}
            placeholder={i18n.t("withdrawal.msgEnterWithdrawalPass")}
            width={220}
            height={38}
            float={"none"}
            value={this.state.password}
            handleTextFieldChange={this.handlePasswordChange}
          ></CustomTextField>
        </SelectionContainer>

        <CustomButton
          name={i18n.t("common.nextStep")}
          width={255}
          marginTop={0}
          float={"none"}
          marginLeft={290}
          handleClick={this.handleWithdrawalClick}
          disabled={
            parseFloat(this.state.amount) < this.props.withdrawalMinLimit ||
            parseFloat(this.state.amount) > this.props.withdrawalMaxLimit ||
            this.state.password === ""
          }
        ></CustomButton>
      </>
    );
  }
}
export default Main;
