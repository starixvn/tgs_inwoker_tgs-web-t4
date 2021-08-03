import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import CustomButton from "../../../Share/Button";
import TextField from "@material-ui/core/TextField";
import IconInputVerifyCodePNG from "../../../../assets/images/icon-input-verifycode.png";
import { withStyles } from "@material-ui/core/styles";
import { AccountService, UPDATE_INFO, accountAction } from "@Inwoker/tgs-api";

import i18n from "../../../../utils/i18n";

import { withSnackbar } from "notistack";
const Container = styled.div``;
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

const Message = styled.div`
  color: red;
  float: left;
  font-size: 13px;
  margin: 10px 0 0 0;
  width: 100%;
  text-align: left;
`;

class PhoneVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: this.props.phone,
      code: "",
      step: 1,
      isNew:
        this.props.phone === "" || this.props.phone === null ? true : false,
      message: this.props.phone === "" ? i18n.t("profile.phone.phoneDesc") : "",
      prefix: "86",
      countdown: 0,
      securityKey: "",
    };
  }

  timer = null;
  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
  onhandlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  handlePrefixChange = (e) => {
    this.setState({ ...this.state, prefix: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  onhandleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  onhandleGetCodeClick = () => {
    if (this.state.countdown <= 0) {
      AccountService.VerifyPhone(this.state.phone).then((response) => {
        if (response.IsSuccess) {
          this.setState({
            securityKey: response.data,
          });
          this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
            variant: "info",
          });
        } else {
          this.props.enqueueSnackbar(response.info, {
            variant: "error",
          });
        }
        this.setState({ ...this.state, countdown: 60 });
        this.checkCountdown();
      });
      //   var result = null;
      //   if (this.state.isNew) {
      //     result = AccountService.GetPhoneVerificationCode(
      //       this.props.token,
      //       this.state.phone,
      //       ""
      //     );
      //   } else {
      //     if (this.props.isForWithdrawalPassword) {
      //       result = AccountService.GetChangeWithdrawalPasswordVerificationCode();

      //     } else {
      //       if (this.state.step === 1) {
      //         result = AccountService.GetChangePhoneVerificationCode();

      //       } else {
      //         result = AccountService.GetChangeNewPhoneVerificationCode(this.state.phone);
      //       }

      //     }

      //   }
      //   result.then((response) => {
      //     // this.setState({ ...this.state, message: response.msg });
      //     if (response.IsSuccess) {
      //       this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
      //         variant: "info",
      //       });
      //     } else {
      //       this.props.enqueueSnackbar(response.info, {
      //         variant: "error",
      //       });
      //     }
      //     // this.setState({ ...this.state, countdown: response.data });
      //     // this.checkCountdown();
      //   });
    }
  };
  checkCountdown = () => {
    if (this.state.countdown > 0) {
      this.timer = setTimeout(() => {
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
        this.checkCountdown();
      }, 1000);
    }
  };
  onhandleClick = () => {
    AccountService.UpdatePhone(this.state.securityKey, this.state.code).then(
      (response) => {
        if (response.IsSuccess) {
          this.props.enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
            variant: "info",
          });
          if (this.state.isNew || this.state.step === 2) {
            this.props.getAccountInfo();
            if (this.props.isForWithdrawalPassword) {
              this.props.dispatch({
                type: UPDATE_INFO,
                payload: {
                  member_phone: this.state.phone,
                },
              });
              this.props.onhandleVerifySuccess(
                this.props.isForSecurityQuestion,
                this.props.isForWithdrawalPassword
              );
            } else {
              this.props.handleCloseDialog();
            }
          } else {
            this.setState({
              ...this.state,
              code: "",
              phone: "",
              securityKey: "",
              step: 2,
              countdown: 0,
            });
          }
        } else {
          this.props.enqueueSnackbar(response.info, {
            variant: "error",
          });
          // if (response.code === 405) {
          //   this.props.enqueueSnackbar(i18n.t("common.msgInvalidPhoneCode"), {
          //     variant: "error",
          //   });
          // } else {
          //   this.props.enqueueSnackbar(response.info, {
          //     variant: "error",
          //   });
          // }
        }
      }
    );
    // if (this.state.isNew) {
    //   AccountService.UpdatePhone(this.state.phone, this.state.code).then((response) => {
    //     if (response.IsSuccess) {
    //       this.props.getAccountInfo();
    //       this.props.handleCloseDialog();
    //       this.props.enqueueSnackbar(response.info, {
    //         variant: "info",
    //       });
    //     } else {
    //       this.props.enqueueSnackbar(response.info, {
    //         variant: "error",
    //       });
    //     }
    //   });
    // } else {
    //   if (this.props.isForSecurityQuestion) {
    //     AccountService.VerifySecurityQuestionByPhone(
    //       this.props.token,
    //       this.state.code
    //     ).then((response) => {
    //       if (response.IsSuccess) {
    //         this.props.onhandleVerifySuccess(
    //           this.props.isForSecurityQuestion,
    //           this.props.isForWithdrawalPassword
    //         );
    //       } else {
    //         this.props.enqueueSnackbar(response.msg, {
    //           variant: "error",
    //         });
    //         // this.setState({ ...this.state, message: response.msg });
    //       }
    //     });
    //   } else {
    //     if (this.props.isForWithdrawalPassword) {
    //       this.props.onhandleVerifySuccess(
    //         this.props.isForSecurityQuestion,
    //         this.props.isForWithdrawalPassword,
    //         this.state.code
    //       );
    //       // AccountService.VerifyWithdrawalPasswordByPhone(

    //       // ).then((response) => {
    //       //   if (response.IsSuccess) {
    //       //     this.props.onhandleVerifySuccess(
    //       //       this.props.isForSecurityQuestion,
    //       //       this.props.isForWithdrawalPassword
    //       //     );
    //       //   } else {
    //       //     this.props.enqueueSnackbar(response.msg, {
    //       //       variant: "error",
    //       //     });
    //       //     // this.setState({ ...this.state, message: response.msg });
    //       //   }
    //       // });
    //     } else {

    //       if (this.state.step === 1) {

    //         AccountService.SubmitChangePhoneCode(
    //           this.state.code
    //         ).then((response) => {
    //           if (response.IsSuccess) {
    //             this.props.enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
    //               variant: "info",
    //             });
    //             this.setState({
    //               ...this.state,
    //               code: "",
    //               phone: "",
    //               step: 2,
    //               countdown: 0,
    //             });
    //           } else {
    //             this.props.enqueueSnackbar(response.info, {
    //               variant: "error",
    //             });
    //             // this.setState({ ...this.state, message: response.msg });
    //           }
    //         });
    //       } else if (this.state.step === 2) {

    //         AccountService.SubmitChangeNewPhone(

    //           this.state.phone,
    //           this.state.code
    //         ).then((response) => {
    //           if (response.IsSuccess) {
    //             this.props.getAccountInfo();
    //             this.props.handleCloseDialog();
    //             this.props.enqueueSnackbar(response.info, {
    //               variant: "info",
    //             });
    //           } else {
    //             this.props.enqueueSnackbar(response.info, {
    //               variant: "error",
    //             });
    //           }
    //         });
    //       }
    //     }
    //   }
    // }
  };

  render() {
    return (
      <Container>
        <CustomText
          placeholder={i18n.t("common.msgEnterPhone")}
          onChange={this.onhandlePhoneChange}
          value={this.state.phone}
          inputProps={{
            maxLength: 20,
          }}
          style={{
            width: "100%",
            height: "46px",
          }}
          variant="outlined"
          autoComplete="off"
          disabled={this.state.isNew === false && this.state.step === 1}
        ></CustomText>
        <CustomText
          placeholder={i18n.t("common.msgEnterCode")}
          adornment={IconInputVerifyCodePNG}
          onChange={this.onhandleCodeChange}
          variant="outlined"
          autoComplete="off"
          value={this.state.code}
          type={"text"}
          style={{
            width: "208px",
            height: "46px",
          }}
        ></CustomText>
        <CustomButton
          handleClick={this.onhandleGetCodeClick}
          name={i18n.t("common.msgSendToken")}
          width={140}
          marginTop={10}
          float={"right"}
        ></CustomButton>

        <Message>{this.state.message}</Message>
        <CustomButton
          name={
            this.props.isForWithdrawalPassword
              ? i18n.t("common.nextStep")
              : i18n.t("common.submit")
          }
          handleClick={this.onhandleClick}
          marginTop={10}
        ></CustomButton>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    dispatchFunction: (json) => dispatch(json),
    dispatch: dispatch,
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withSnackbar(PhoneVerification));
