import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Select, FormControl, withStyles } from "@material-ui/core";
import CustomTextField from "../../../Share/TextField";
import Button from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 0px;
`;
const SubTitleDesc = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #818181;
`;
const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;

  color: #818181;
  margin: 10px 0 0 0;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: table;
`;
const TabButton = styled.div`
  font-size: 14px;

  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;

  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      color: #151a34;`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
  ${(props) => {
    return `background:url(${props.img}) no-repeat 10px center,#f7f7f7;`;
  }}
  background-size: auto 30px;
  padding-left: 40px;
  margin-bottom: 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;
const TunnelButton = styled(TabButton)`
  width: 150px;
  height: 41px;
  padding-top: 10px;
  margin-top: 0px;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "395px",
    height: "38px",
    marginTop: "12px",
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
class AddCard extends Component {
  state = {
    password: "",
    number: "",
    bankName: "",
    bankAccountName: "",
    bankBranch: "",
    selectedChannelIndex: 0,

    selectedBankTypeIndex: 0,

    name: "",
    phone: "",
  };
  componentDidMount() {}
  handleBankTypeChange = (e) => {
    this.setState({ ...this.state, selectedBankTypeIndex: e.target.value });
  };
  handleChannelChange = (e) => {
    this.setState({ ...this.state, selectedChannelIndex: e.target.value });
  };
  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  handleBankNameChange = (e) => {
    this.setState({ ...this.state, bankName: e.target.value });
  };
  handleBankAccountNameChange = (e) => {
    this.setState({ ...this.state, bankAccountName: e.target.value });
  };
  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ ...this.state, name: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleNextClick = (e) => {
    var selected = this.props.withdrawalList[this.state.selectedBankTypeIndex];
    var detail = {};

    if (selected.banktype === "Bank") {
      var bankName =
        selected.channel[this.state.selectedChannelIndex].channelcode ===
        "CustomBank"
          ? this.state.bankName.trim()
          : selected.channel[this.state.selectedChannelIndex].channelcode;
      var bankAccountName = this.state.bankAccountName.trim();
      var bankBranch = this.state.bankBranch.trim();
      var number = this.state.number.trim();

      if (bankName === "") {
        this.props.enqueueSnackbar(i18n.t("card.addCard.msgEnterBankName"), {
          variant: "error",
        });
        return;
      }

      if (bankAccountName === "") {
        this.props.enqueueSnackbar(
          i18n.t("card.addCard.msgEnterBankAccountName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (number === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }
      detail = {
        bankAccount: number,
        bankName: bankName,
        name: bankAccountName,
        bankBranch: bankBranch,
      };
    } else if (
      selected.banktype === "ThirdParty" ||
      selected.banktype === "FPS"
    ) {
      if (this.state.name === "") {
        this.props.enqueueSnackbar(
          i18n.t("profile.nameVerify.msgPlsEnterName"),
          {
            variant: "error",
          }
        );
        return;
      }
      if (this.state.phone === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterPhone"), {
          variant: "error",
        });
        return;
      }
      detail = {
        username: this.state.name,
        phone: this.state.phone,
      };
    } else {
      var number = this.state.number.trim();
      if (number === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }
      detail = {
        address: number,
      };
    }

    this.props.onhandleNextClick(
      selected.channel[this.state.selectedChannelIndex].channelid,
      selected.banktype,
      detail
    );
  };
  render() {
    const { withdrawalList } = this.props;

    return (
      <Container>
        <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>

        <TextFieldLabel>{i18n.t("common.withdrawalBankType")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              displayEmpty
              value={this.state.selectedBankTypeIndex}
              onChange={this.handleBankTypeChange}
            >
              {withdrawalList.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item.banktype}
                  </option>
                );
              })}
            </CustomSelect>
          </CustomFormControl>
        </TextFieldContainer>

        <TextFieldLabel>{i18n.t("common.withdrawalChannel")}</TextFieldLabel>
        <TextFieldContainer>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              displayEmpty
              value={this.state.selectedChannelIndex}
              onChange={this.handleChannelChange}
            >
              {withdrawalList.length > 0 &&
                withdrawalList[this.state.selectedBankTypeIndex].channel.map(
                  (item, index) => {
                    return (
                      <option value={index} key={index}>
                        {i18n.t(item.channelcode)}
                      </option>
                    );
                  }
                )}
            </CustomSelect>
          </CustomFormControl>
        </TextFieldContainer>
        {(() => {
          if (
            withdrawalList.length > 0 &&
            withdrawalList[this.state.selectedBankTypeIndex].banktype === "Bank"
          ) {
            return (
              <>
                {(() => {
                  if (
                    this.props.withdrawalList[this.state.selectedBankTypeIndex]
                      .channel[this.state.selectedChannelIndex].channelcode !==
                    "CustomBank"
                  ) {
                    return null;
                  } else {
                    return (
                      <>
                        <TextFieldLabel>
                          {i18n.t("card.addCard.BankName")}
                        </TextFieldLabel>
                        <TextFieldContainer>
                          <CustomTextField
                            marginTop={10}
                            placeholder={i18n.t(
                              "card.addCard.msgEnterBankName"
                            )}
                            width={395}
                            height={38}
                            float={"none"}
                            handleTextFieldChange={this.handleBankNameChange}
                          ></CustomTextField>
                        </TextFieldContainer>
                      </>
                    );
                  }
                })()}
                {(() => {
                  if (config.brand !== "HKJP") {
                    return (
                      <React.Fragment>
                        <TextFieldLabel>
                          {i18n.t("card.addCard.branch")}
                        </TextFieldLabel>
                        <TextFieldContainer>
                          <CustomTextField
                            marginTop={10}
                            placeholder={i18n.t(
                              "card.addCard.branchPlaceHolder"
                            )}
                            width={395}
                            height={38}
                            float={"none"}
                            handleTextFieldChange={this.handleBankBranchChange}
                          ></CustomTextField>
                        </TextFieldContainer>
                      </React.Fragment>
                    );
                  }
                })()}

                <TextFieldLabel>
                  {i18n.t("card.addCard.BankAccountName")}
                </TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    marginTop={10}
                    placeholder={i18n.t("card.addCard.msgEnterBankAccountName")}
                    width={395}
                    height={38}
                    float={"none"}
                    handleTextFieldChange={this.handleBankAccountNameChange}
                  ></CustomTextField>
                </TextFieldContainer>
              </>
            );
          } else {
            return null;
          }
        })()}
        {withdrawalList.length > 0 &&
        (withdrawalList[this.state.selectedBankTypeIndex].banktype ===
          "ThirdParty" ||
          withdrawalList[this.state.selectedBankTypeIndex].banktype ===
            "FPS") ? (
          <div>
            <TextFieldLabel>
              {i18n.t("profile.nameVerify.title")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={i18n.t("profile.nameVerify.msgPlsEnterName")}
                width={395}
                height={38}
                maxLength={50}
                float={"none"}
                handleTextFieldChange={this.handleNameChange}
              ></CustomTextField>
            </TextFieldContainer>
            <TextFieldLabel>{i18n.t("common.phoneNumber")}</TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={i18n.t("common.msgEnterPhone")}
                width={395}
                height={38}
                maxLength={50}
                float={"none"}
                handleTextFieldChange={this.handlePhoneChange}
              ></CustomTextField>
            </TextFieldContainer>
          </div>
        ) : (
          <div>
            <TextFieldLabel>{i18n.t("common.withdrawalNumber")}</TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={i18n.t("common.msgEnterWithdrawalNumber")}
                width={395}
                height={38}
                maxLength={50}
                float={"none"}
                handleTextFieldChange={this.handleNumberChange}
              ></CustomTextField>
            </TextFieldContainer>
          </div>
        )}

        <TextFieldContainer>
          {(() => {
            if (this.props.showBack === true) {
              return (
                <Button
                  grayMode={true}
                  name={i18n.t("common.back")}
                  width={257}
                  marginRight={20}
                  handleClick={this.props.onhandleBackClick}
                ></Button>
              );
            } else {
              return null;
            }
          })()}

          <Button
            name={i18n.t("common.nextStep")}
            width={255}
            handleClick={this.handleNextClick}
          ></Button>
        </TextFieldContainer>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(AddCard));
