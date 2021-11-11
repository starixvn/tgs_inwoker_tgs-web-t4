import React from "react";
import styled from "styled-components";
import { Component } from "react";
import {
  Grid,
  TextField,
  Select,
  FormControl,
  withStyles,
} from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import Common from "../../../../utils/Common";
import QRCode from "qrcode.react";
const CustomText = withStyles({
  root: {
    marginTop: "10px",
    float: "left",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input[readonly]": {
      color: "#b6b6b6",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "340px",
    height: "47.63px",

    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
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
const TabButton = styled.div`
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
  min-width: 133px;
  height: 41px;

  margin-top: 3px;
  padding: 10px 20px 0 20px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
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
const ExchangeRateContainer = styled.div``;

const Remark = styled.div`
  color: ${({ theme }) => theme.primary};
  opacity: 0.75;
`;

const TransferContainer = styled.div`
  color: #747474;
  padding: 5px 0;
`;
const TransferLabel = styled.span`
  float: left;
  min-width: 100px;
  color: #151a34;
`;
const TransferLabelValue = styled.span`
  float: left;
`;
const QRImage = styled.img`
  min-width: 120px;
  min-height: 120px;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  text-align: right;
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

class NewStepOne extends Component {
  render() {
    const {
      amount,
      onAmountChange,
      name,
      onNameChange,
      selectedMethodIndex,
      onMethodChange,
      selectedChannelIndex,
      onChannelChange,
      selectedPaymentIndex,
      paymentType,
      onNextClick,
      exchangeRate,
      onFileChange,
      files,
    } = this.props;
    if (paymentType === null) return <></>;

    const methodList = paymentType.method;
    return (
      <>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>

          <SubTitle>{i18n.t("deposit.msgPlsSelectPayment")}</SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          {methodList.map((item, index) => {
            return (
              <TunnelButton
                key={index}
                onClick={() => onMethodChange(index)}
                active={selectedMethodIndex === index}
              >
                {i18n.t(item.methodcode)}
              </TunnelButton>
            );
          })}
        </SelectionContainer>

        <SplitLine></SplitLine>
        {(() => {
          if (methodList.length > 0 && selectedMethodIndex !== -1) {
            return (
              <>
                <SubHeaderContainer>
                  <NumberContainer>2</NumberContainer>

                  <SubTitle>{i18n.t("deposit.msgPlsSelectMethod")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  {methodList[selectedMethodIndex].channel.map(
                    (item, index) => {
                      return (
                        <TunnelButton
                          key={index}
                          onClick={() => onChannelChange(index)}
                          active={selectedChannelIndex === index}
                        >
                          {item.channelname}
                        </TunnelButton>
                      );
                    }
                  )}
                </SelectionContainer>{" "}
                <SplitLine></SplitLine>
                {(() => {
                  if (paymentType.paymentcode.toUpperCase() === "MANUAL") {
                    var channelExtend =
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].extended;
                    if (
                      methodList[
                        selectedMethodIndex
                      ].methodcode.toUpperCase() === "THIRDPARTY"
                    ) {
                      return (
                        <>
                          <SubHeaderContainer>
                            <NumberContainer>3</NumberContainer>

                            <SubTitle>
                              {i18n.t("deposit.transferAccount")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            <QRCode
                              value={channelExtend.qrCode}
                              bgColor={"#f6f8f7"}
                            />
                          </SelectionContainer>
                          <SplitLine></SplitLine>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <SubHeaderContainer>
                            <NumberContainer>3</NumberContainer>

                            <SubTitle>
                              {i18n.t("deposit.transferAccount")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.accName")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.name}
                              </TransferLabelValue>
                            </TransferContainer>
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.cardNum")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.bankAccount}
                              </TransferLabelValue>
                            </TransferContainer>
                          </SelectionContainer>
                          <SplitLine></SplitLine>
                        </>
                      );
                    }
                  }
                })()}
                <SplitLine></SplitLine>
                {(() => {
                  if (
                    paymentType.paymentcode.toUpperCase() === "MANUAL" ||
                    paymentType.paymentcode.toUpperCase() === "APPLEPAY"
                  ) {
                    return (
                      <>
                        <SubHeaderContainer>
                          <NumberContainer>4</NumberContainer>

                          <SubTitle>
                            {i18n.t("deposit.msgPlsEnterAccount")}
                          </SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          <TextField
                            style={{
                              height: "38px",
                              width: "258px",
                              float: "left",
                              marginRight: "5px",
                              padding: 0,
                            }}
                            placeholder={i18n.t("deposit.msgPlsEnterAccount")}
                            onChange={onNameChange}
                            outputFormat="string"
                            variant="outlined"
                            autoComplete="off"
                            value={name}
                          ></TextField>
                        </SelectionContainer>
                        <SplitLine></SplitLine>
                      </>
                    );
                  }
                })()}
                <SubHeaderContainer>
                  <NumberContainer>
                    {paymentType.paymentcode.toUpperCase() === "MANUAL"
                      ? "5"
                      : paymentType.paymentcode.toUpperCase() === "APPLEPAY"
                      ? "4"
                      : "3"}
                  </NumberContainer>

                  <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  <TextField
                    style={{
                      height: "38px",
                      width: "220px",
                      float: "left",
                      marginRight: "5px",
                      padding: 0,
                    }}
                    placeholder={i18n.t("deposit.plsEnterDepositAmount")}
                    onChange={onAmountChange}
                    outputFormat="string"
                    variant="outlined"
                    autoComplete="off"
                    value={amount}
                    pattern="[0-9]*"
                    type={"number"}
                  ></TextField>

                  <LimitPopupContainer>
                    <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                    <LimitAmount>
                      {Common.formatNumberWithThousand(
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].transferlimit.from
                      )}{" "}
                      -{" "}
                      {Common.formatNumberWithThousand(
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].transferlimit.to
                      )}
                    </LimitAmount>
                  </LimitPopupContainer>
                  {(() => {
                    if (
                      methodList[selectedMethodIndex].methodcode === "Crypto"
                    ) {
                      if (paymentType.paymentcode.toUpperCase() === "LEEPAY") {
                        return (
                          <ExchangeRateContainer style={{ marginTop: "10px" }}>
                            <LimitLabel>
                              {i18n.t("deposit.exchangeRate")}:{" "}
                            </LimitLabel>
                            <LimitAmount>{` ${exchangeRate.buyprice}`}</LimitAmount>
                            <LimitLabel style={{ marginLeft: "26px" }}>
                              {i18n.t("deposit.expectedPayment")}
                            </LimitLabel>{" "}
                            <LimitAmount>{` ${
                              isNaN(amount) === false
                                ? (amount / exchangeRate.buyprice).toFixed(2)
                                : 0
                            }`}</LimitAmount>
                          </ExchangeRateContainer>
                        );
                      } else {
                        return Object.keys(exchangeRate).map((key) => {
                          return Object.keys(exchangeRate[key]).map((key2) => {
                            if (key2 === "HKD") {
                              return (
                                <ExchangeRateContainer
                                  style={{ marginTop: "10px" }}
                                >
                                  <LimitLabel>
                                    {i18n.t("deposit.exchangeRate")}:{" "}
                                  </LimitLabel>
                                  <LimitAmount>{` ${exchangeRate[key][key2].rate}`}</LimitAmount>
                                  <LimitLabel style={{ marginLeft: "26px" }}>
                                    {i18n.t("deposit.expectedPayment")}
                                  </LimitLabel>{" "}
                                  <LimitAmount>{` ${
                                    isNaN(amount) === false
                                      ? (
                                          amount / exchangeRate[key][key2].rate
                                        ).toFixed(2)
                                      : 0
                                  }`}</LimitAmount>
                                </ExchangeRateContainer>
                              );
                            }
                          });
                        });
                      }
                    }
                  })()}
                  {paymentType.paymentcode.toUpperCase() === "UMPAY" && (
                    <Remark>{i18n.t("deposit.ppRemark")}</Remark>
                  )}
                </SelectionContainer>
                <SplitLine></SplitLine>
                <SubHeaderContainer>
                  <NumberContainer>
                    {paymentType.paymentcode.toUpperCase() === "MANUAL"
                      ? "6"
                      : paymentType.paymentcode.toUpperCase() === "APPLEPAY"
                      ? "5"
                      : "4"}
                  </NumberContainer>

                  <SubTitle>{i18n.t("deposit.promotion")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  <CustomFormControl>
                    <CustomSelect
                      variant="outlined"
                      value={this.props.depositPromotion}
                      displayEmpty
                      onChange={this.props.handleDepositPromotionChange}
                      native
                    >
                      <option value="">
                        {i18n.t("deposit.msgPlsSelectPromotion")}
                      </option>
                      {this.props.promotionList.map((data, key) => {
                        return (
                          <option value={data.id} key={key}>
                            {data.name}
                          </option>
                        );
                      })}
                    </CustomSelect>
                  </CustomFormControl>
                </SelectionContainer>
                {(() => {
                  if (paymentType.paymentcode.toUpperCase() === "MANUAL") {
                    return (
                      <React.Fragment>
                        <SplitLine></SplitLine>
                        <SubHeaderContainer>
                          <NumberContainer>7</NumberContainer>

                          <SubTitle>{i18n.t("deposit.uploadReceipt")}</SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          <CustomInput
                            type="file"
                            accept="image/jpg, image/jpeg, image/png, image/tiff"
                            onChange={this.props.onFileChange}
                          ></CustomInput>
                        </SelectionContainer>
                      </React.Fragment>
                    );
                  }
                })()}
                <SplitLine></SplitLine>
                <CustomButton
                  name={i18n.t("common.submit")}
                  width={257}
                  marginTop={0}
                  float={"none"}
                  marginLeft={290}
                  handleClick={() => {
                    onNextClick();
                  }}
                  disabled={
                    selectedMethodIndex < 0 ||
                    selectedChannelIndex < 0 ||
                    amount <
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.from ||
                    amount >
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.to ||
                    ((paymentType.paymentcode.toUpperCase() === "MANUAL" ||
                      paymentType.paymentcode.toUpperCase() === "APPLEPAY") &&
                      name.length <= 0) ||
                    (paymentType.paymentcode.toUpperCase() === "MANUAL" &&
                      files.length <= 0)
                  }
                ></CustomButton>
              </>
            );
          }
        })()}
      </>
    );
  }
}

export default NewStepOne;
