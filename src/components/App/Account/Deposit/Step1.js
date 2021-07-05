import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";

import CustomButton from "../../../Share/Button";

import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";
const TabButton = styled.div`
  width: 88px;
  height: 86px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;

  ${(props) =>
    props.active
      ? ` border: solid 1px ` +
        props.theme.primary +
        `;
      color: ` +
        props.theme.primary +
        `;`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
`;
const SubHeaderContainer = styled.div``;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #151a34;
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
const TunnelButton = styled(TabButton)`
  width: 133px;
  height: 41px;
  padding-top: 10px;
  margin-top: 0px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "220px",
    height: "38px",

    marginRight: "5px",
    float: "left",

    padding: 0,
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);
const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const InputSender = styled.input`
  height: 38px;
  width: 220px;
  float: left;
  margin-right: 5px;
  color: #818181;
  font-size: 14px;
  padding-left: 14px;
  border: 1px solid #b6b6b6;
  border-radius: 4px;
  background-color: transparent;
`;
class Step1 extends Component {
  render() {
    if (!this.props.selectedType) {
      return <></>;
    } else
      return (
        <>
          {(() => {
            if (this.props.selectedType.channel.length !== 0) {
              return (
                <>
                  <SubHeaderContainer>
                    <NumberContainer>1</NumberContainer>

                    <SubTitle>{i18n.t("deposit.paymentTunnel")}</SubTitle>
                  </SubHeaderContainer>
                  <SelectionContainer>
                    {this.props.selectedType.channel.map((item, key) => {
                      return (
                        <TunnelButton
                          key={item.id}
                          onClick={() => this.props.handleTunnelClick(item)}
                          active={this.props.selectedChannel.id === item.id}
                        >
                          {item.title}
                        </TunnelButton>
                      );
                    })}
                  </SelectionContainer>
                  <SplitLine></SplitLine>
                </>
              );
            }
          })()}

          <SubHeaderContainer>
            <NumberContainer>
              {this.props.selectedType &&
              this.props.selectedType.channel.length > 0
                ? "2"
                : "1"}
            </NumberContainer>

            <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
          </SubHeaderContainer>
          <SelectionContainer>
            {this.props.selectedChannel &&
            this.props.selectedChannel.amount_options ? (
              <>
                <CustomFormControl>
                  <CustomSelect
                    variant="outlined"
                    value={this.props.depositAmount}
                    displayEmpty
                    onBlur={this.props.handleDepositAmountBlur}
                    onChange={this.props.handleDepositAmountChange}
                    native
                  >
                    <option value="">{i18n.t("deposit.chooseAmount")}</option>
                    {this.props.selectedChannel.amount_options.map(
                      (item, key) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      }
                    )}
                  </CustomSelect>
                </CustomFormControl>
              </>
            ) : (
              <>
                <CurrencyTextField
                  style={{
                    height: "38px",
                    width: "220px",
                    float: "left",
                    marginRight: "5px",
                    padding: 0,
                  }}
                  placeholder={i18n.t("deposit.plsEnterDepositAmount")}
                  onChange={this.props.handleDepositAmountChange}
                  outputFormat="string"
                  variant="outlined"
                  autoComplete="off"
                  value={this.props.depositAmount}
                  maximumValue={this.props.selectedType.max.toString()}
                  inputProps={{
                    maxLength: 15,
                  }}
                  currencySymbol=""
                  decimalPlaces={0}
                ></CurrencyTextField>
                <LimitPopupContainer>
                  <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                  <LimitAmount>
                    {Common.formatNumberWithThousand(
                      this.props.selectedType.min
                    )}{" "}
                    -{" "}
                    {Common.formatNumberWithThousand(
                      this.props.selectedType.max
                    )}
                  </LimitAmount>
                </LimitPopupContainer>
              </>
            )}
          </SelectionContainer>
          <SplitLine></SplitLine>
          {(() => {
            if (
              this.props.selectedType === null ||
              this.props.selectedType.id !== 0
            )
              return null;
            return (
              <>
                <SubHeaderContainer>
                  <NumberContainer>3</NumberContainer>

                  <SubTitle>{i18n.t("deposit.senderName")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  <InputSender
                    type="text"
                    placeholder={i18n.t("deposit.senderName")}
                    value={this.props.username}
                    onChange={this.props.handleUsernameChange}
                  ></InputSender>
                </SelectionContainer>
                <SplitLine></SplitLine>
              </>
            );
          })()}
          <CustomButton
            name={i18n.t("common.nextStep")}
            width={257}
            marginTop={0}
            float={"none"}
            marginLeft={290}
            handleClick={this.props.handleDepositClick}
          ></CustomButton>

          <form target="_blank" id="form1"></form>
        </>
      );
  }
}
export default Step1;
