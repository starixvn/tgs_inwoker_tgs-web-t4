// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import { withSnackbar } from "notistack";
// import { withRouter } from "react-router-dom";

// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import { AppHistory } from "../../../history/History";

// import Header from "../Share/Header";

// import { withStyles } from "@material-ui/core/styles";
// import Common from "../../../utils/Common";
// import IconRedInfoPNG from "../../../assets/images/wap/icon-red-info.png";
// import { AccountService } from "../../../services/AccountService";
// import { SupportService } from "../../../services/SupportService";
// import Textbox from "../../Wap/Share/Textbox";
// import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
// import Button from "../../Wap/Share/Button";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import ResetSecurityQuestion from "./ResetSecurityQuestion";
// import i18n from "../../../utils/i18n";
// const Container = styled.div`
//   width: 100%;
//   overflow: hidden;

//   height: 100%;

//   background-size: contain;
//   padding-top: 73px;
// `;

// const StyledAppBar = withStyles({
//   root: {
//     top: "89px",

//     backgroundColor: "#f1f1f1",
//     boxShadow: "none"
//   }
// })(AppBar);
// const StyledTabs = withStyles(theme => ({
//   root: {
//     backgroundImage:
//       "linear-gradient(180deg, #393b3a 0%, #272a2a 50%, #1a1e1f 100%);",

//     overflow: "visible",
//     "& .MuiTabs-indicator": {
//       backgroundColor: "#d2a058",
//       height: "5px"
//     },
//     "& .MuiTabs-indicator:before": {
//       content: "'\\A'",
//       borderStyle: "solid",
//       borderWidth: "0 10px 10px 10px",
//       borderColor: "transparent transparent #d2a058 transparent",
//       position: "absolute",
//       left: "50%",
//       top: "-6px",
//       transform: "translateX(-50%)"
//     },
//     "& .MuiTabs-flexContainer": {
//       overflow: "visible"
//     },
//     "& .MuiTabs-scrollButtons": {
//       display: "none"
//     }
//   }
// }))(Tabs);
// const StyledTab = withStyles(theme => ({
//   root: {
//     fontSize: "24px",
//     height: "74px",
//     color: "#9c9c9c",
//     minWidth: "250px",

//     "&.Mui-selected": {
//       color: "#b88f51"
//     }
//   }
// }))(Tab);
// const CustomSelect = withStyles(theme => ({
//   root: {
//     "&:focus": {
//       border: "none",
//       backgroundColor: "#fff"
//     },
//     "&:active": {
//       border: "none",
//       backgroundColor: "#fff"
//     }
//   },
//   select: {
//     padding: "18.5px 0px",
//     "&:focus": {
//       border: "none",
//       backgroundColor: "#fff"
//     },
//     "&:active": {
//       border: "none",
//       backgroundColor: "#fff"
//     }
//   }
// }))(Select);
// const CustomText = styled.div`
//   width: 700px;
//   height: 170px;

//   box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
//   border: solid 1px #f3f3f3;
//   background-color: #ffffff;
//   border-radius: 20px;
//   padding: 40px 20px 0 20px;
//   margin: 20px auto;
// `;
// const CustomLabel = styled.div`
//   font-size: 20px;
//   font-weight: 600;
//   margin-left: 3px;
//   color: #212e31;
// `;
// const CustomFormControl = withStyles(theme => ({
//   root: {
//     margin: "10px 0 0 0",
//     width: "640px",
//     height: "78px",

//     border: "none",
//     fontSize: "28px",
//     "& fieldset": {
//       border: "none"
//     }
//   }
// }))(FormControl);
// const BottomInfo = styled.div`
//   font-size: 26px;

//   text-align: center;
//   color: #d09f58;
//   margin: 30px auto;
// `;
// class ResetSecurityQuestionOption extends Component {
//   state = {
//     selectedTab: 0,
//     answer: "",
//     phone: "",
//     username: "",
//     sessionId: "",
//     email: "",
//     code: "",
//     countdownToken: 0
//   };
//   componentDidMount() {
//     AccountService.GetSecurityQuestion(this.props.account.token).then(
//       response => {
//         if (response.IsSuccess) {
//           this.setState({
//             ...this.state,
//             questionList: response.url,
//             isEdit: this.props.account.info.member_question != 0,
//             securityQuestionID: this.props.account.info.member_question,
//             answer: "",
//             currentStep: 1,
//             loading: false,

//             email_check: this.props.account.info.check_pass_email,

//             phone_check: this.props.account.info.check_pass_phone,

//             question_check: true,
//             question_id: this.props.account.info.member_question,
//             question: response.url.filter(row => {
//               return row.id == this.props.account.info.member_question;
//             })[0].title
//           });
//         } else {
//           this.props.alert("", response.msg);
//           // this.props.enqueueSnackbar(response.msg, {
//           //   variant: "error"
//           // });
//         }
//       }
//     );
//   }

//   handleBackClick = () => {
//     AppHistory.goBack();
//   };

//   handleChangeTab = (event, newValue) => {
//     this.setState({
//       ...this.state,
//       selectedTab: newValue
//     });
//   };
//   handleAnswerChange = e => {
//     this.setState({ ...this.state, answer: e.target.value });
//   };
//   handlePhoneChange = e => {
//     this.setState({ ...this.state, phone: e.target.value });
//   };
//   handleEmailChange = e => {
//     this.setState({ ...this.state, email: e.target.value });
//   };
//   handleCodeChange = e => {
//     this.setState({ ...this.state, code: e.target.value });
//   };
//   handleGetCodeClick = e => {
//     if (this.state.countdownToken > 1) return;
//     let events = "resetQuestion";
//     if (this.state.selectedTab === 1) {
//       AccountService.GetPhoneVerificationCode(
//         this.props.account.token,
//         this.props.account.info.member_phone,
//         events
//       ).then(response => {
//         this.getCodeResponse(response);
//       });
//     } else if (this.state.selectedTab === 2) {
//       AccountService.GetEmailVerificationCode(
//         this.props.account.token,
//         this.props.account.info.member_email,
//         events
//       ).then(response => {
//         this.getCodeResponse(response);
//       });
//     }
//   };
//   getCodeResponse = response => {
//     if (response.IsSuccess) {
//       this.showInfoMessage("验证码发送成功");
//     } else {
//       this.showInfoMessage(response.msg);
//     }
//     this.setState({
//       ...this.state,
//       countdownToken: response.data,
//       loading: true
//     });
//     setTimeout(() => {
//       this.checkCountdown();
//     }, 1000);
//   };
//   handleNextClick = () => {
//     if (this.state.code !== "") {
//       if (this.state.selectedTab === 1) {
//         AccountService.VerifySecurityQuestionByPhone(
//           this.props.account.token,
//           this.state.code
//         ).then(response => {
//           if (response.IsSuccess) {
//             AppHistory.replace(
//               "/" + i18n.language + "/profile/security-question/reset"
//             );
//           } else {
//             this.props.alert("", response.msg);
//             // this.props.enqueueSnackbar(response.msg, {
//             //   variant: "error"
//             // });
//           }
//         });
//       } else if (this.state.selectedTab === 2) {
//         AccountService.VerifySecurityQuestionByEmail(
//           this.props.account.token,
//           this.state.code
//         ).then(response => {
//           if (response.IsSuccess) {
//             AppHistory.replace(
//               "/" + i18n.language + "/profile/security-question/reset"
//             );
//           } else {
//             this.props.alert("", response.msg);
//             // this.props.enqueueSnackbar(response.msg, {
//             //   variant: "error"
//             // });
//           }
//         });
//       }
//     } else {
//       if (this.state.selectedTab === 0) {
//         if (this.state.answer !== "") {
//           AccountService.VerifySecurityQuestion(
//             this.props.account.token,
//             this.state.answer
//           ).then(response => {
//             if (response.IsSuccess) {
//               this.props.alert("", response.msg);
//               // this.props.enqueueSnackbar(response.msg, {
//               //   variant: "success"
//               // });
//               AppHistory.replace(
//                 "/" + i18n.language + "/profile/security-question/reset"
//               );
//             } else {
//               this.props.alert("", response.msg);
//               // this.props.enqueueSnackbar(response.msg, {
//               //   variant: "error"
//               // });
//             }
//           });
//         }
//       }
//     }
//   };
//   showInfoMessage = msg => {
//     this.props.alert("", msg);
//     // this.props.enqueueSnackbar(msg, {
//     //   variant: "info"
//     // });
//   };
//   showErrorMessage = msg => {
//     this.props.alert("", msg);
//     // this.props.enqueueSnackbar(msg, {
//     //   variant: "error"
//     // });
//   };
//   checkCountdown = () => {
//     if (this.state.countdownToken > 0) {
//       this.timer = setTimeout(() => {
//         this.setState({
//           ...this.state,
//           countdownToken: this.state.countdownToken - 1
//         });
//         this.checkCountdown();
//       }, 1000);
//     }
//   };
//   handleCSClick = () => {
//     AppHistory.push("/" + i18n.language + "/chat");
//   };
//   render() {
//     return (
//       <Container>
//         <Header
//           onBackClick={this.handleBackClick}
//           title={"验证安全问题"}
//         ></Header>
//         <StyledAppBar>
//           <StyledTabs
//             value={this.state.selectedTab}
//             onChange={this.handleChangeTab}
//             variant="scrollable"
//             scrollButtons="auto"
//           >
//             <StyledTab
//               label={"安全问题"}
//               value={0}
//               disabled={!this.state.question_check}
//             />
//             <StyledTab
//               label={"手机找回"}
//               value={1}
//               disabled={!this.state.phone_check}
//             />
//             <StyledTab
//               label={"邮箱找回"}
//               value={2}
//               disabled={!this.state.email_check}
//             />
//           </StyledTabs>
//         </StyledAppBar>
//         {(() => {
//           if (this.state.selectedTab === 1) {
//             return (
//               <>
//                 <Textbox
//                   style={{ margin: "20px auto 20px auto" }}
//                   value={this.props.account.info.member_phone}
//                   placeholder={"请输入绑定的手机号码"}
//                   type={"text"}
//                   disabled={true}
//                   label={"手机号码"}
//                 ></Textbox>
//                 <TextboxWithButton
//                   buttonlabel={
//                     this.state.countdownToken <= 0
//                       ? "发送验证码"
//                       : "重新发送(" + this.state.countdownToken + "s)"
//                   }
//                   style={{ margin: "20px auto 20px auto" }}
//                   value={this.state.code}
//                   onChange={this.handleCodeChange}
//                   placeholder={"请输入手机验证码"}
//                   label={"验证码"}
//                   onClick={this.handleGetCodeClick}
//                 ></TextboxWithButton>
//               </>
//             );
//           } else if (this.state.selectedTab === 2) {
//             return (
//               <>
//                 <Textbox
//                   style={{ margin: "20px auto 20px auto" }}
//                   value={this.props.account.info.member_email}
//                   placeholder={"请输入邮箱地址"}
//                   type={"text"}
//                   label={"邮箱地址"}
//                 ></Textbox>
//                 <TextboxWithButton
//                   buttonlabel={
//                     this.state.countdownToken <= 0
//                       ? "发送验证码"
//                       : "重新发送(" + this.state.countdownToken + "s)"
//                   }
//                   style={{ margin: "20px auto 20px auto" }}
//                   value={this.state.code}
//                   onChange={this.handleCodeChange}
//                   placeholder={"请输入邮箱验证码"}
//                   label={"验证码"}
//                   onClick={this.handleGetCodeClick}
//                 ></TextboxWithButton>
//               </>
//             );
//           } else if (this.state.selectedTab === 0) {
//             return (
//               <>
//                 <Textbox
//                   style={{ margin: "20px auto 20px auto" }}
//                   color={"#676767"}
//                   value={this.state.question}
//                   type={"text"}
//                   disabled={true}
//                   label={"问题"}
//                 ></Textbox>

//                 <Textbox
//                   style={{ margin: "20px auto 20px auto" }}
//                   value={this.state.answer}
//                   onChange={this.handleAnswerChange}
//                   placeholder={"请输入答案"}
//                   type={"text"}
//                   label={"答案"}
//                 ></Textbox>
//               </>
//             );
//           }
//         })()}

//         <Button
//           style={{ margin: "40px auto 0 auto" }}
//           label={"下一步"}
//           onClick={this.handleNextClick}
//         ></Button>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     screenWidth: state.ui.screenWidth,
//     screenHeight: state.ui.screenHeight,

//     account: state.account
//   };
// };
// export default connect(
//   mapStateToProps,
//   null
// )(withSnackbar(withRouter(ResetSecurityQuestionOption)));
