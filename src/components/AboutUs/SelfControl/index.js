// import React, { Component } from "react";
// import styled from "styled-components";
// //
// import LoginBGPNG from "../../../assets/images/login-bg.png";
// import IconCloseWhite from "../../../assets/images/icon-close-white.png";
// import { withSnackbar } from "notistack";
// import { AccountService } from "../../../services/AccountService";
// import TextField from "@material-ui/core/TextField";
// import IconInputVerifyCodePNG from "../../../assets/images/icon-input-verifycode.png";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import { withStyles } from "@material-ui/core/styles";
// import Select from "@material-ui/core/Select";

// import FormControl from "@material-ui/core/FormControl";

// import CustomButton from "../../Share/Button";
// import addDays from "date-fns/addDays";
// const moment = require("moment");

// const CustomText = withStyles({
//   root: {
//     marginTop: "10px",
//     overflow: "initial",
//     float: "left",
//     "& .MuiOutlinedInput-input": {
//       fontSize: "14px"
//     },
//     "& .MuiOutlinedInput-input[readonly]": {
//       backgroundColor: "transparent",
//       color: "#b6b6b6"
//     },
//     "& label.Mui-focused": {
//       color: "#b6b6b6"
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "#b6b6b6"
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "#b6b6b6"
//       },
//       "&:hover fieldset": {
//         borderColor: "#b6b6b6"
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#b6b6b6"
//       }
//     }
//   }
// })(TextField);
// const StyleButton = styled.div`
//   width: 140px;
//   height: 44px;
//   border: solid 1px #b6b6b6;
//   margin: 0;
//   margin-top: 10px;
//   margin-left: 5px;
//   float: left;

//   ${props =>
//     props.disable === true
//       ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
//       : `  background-image: linear-gradient(
//     90deg,
//     rgb(15, 123, 154) 0%,
//     rgb(59, 171, 204) 100%
//   );
// `}

//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;

//   &:hover {
//     cursor: pointer;
//     ${props =>
//     props.disable === true
//       ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
//       : `      background-blend-mode: screen, normal;
//         background-image: linear-gradient(
//             to bottom,
//             rgba(59, 171, 204, 0.08),
//             rgba(59, 171, 204, 0.08)
//           ),
//           linear-gradient(to top, #3babcc, #3babcc);
//         }
//   `}
// `;
// const ButtonLabel = styled.span`
//   text-align: center;
//   display: block;
//   margin-top: 10px;
// `;
// const Container = styled.div`
//   padding: 27px 32px;
//   background: url(${LoginBGPNG});
//   display: table;
//   width: 420px;
// `;
// const CloseIconContainer = styled.div`
//   background: url(${IconCloseWhite}) no-repeat center;
//   width: 50px;
//   height: 100%;
//   float: right;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const Header = styled.div`
//   height: 50px;
//   background-color: #355460;
// `;
// const Headertitle = styled.div`
//   text-align: center;
//   margin-left: 48px;
//   padding-top: 12px;
//   float: left;
//   font-size: 18px;
//   font-weight: bold;
//   color: #404040;
//   width: 320px;
// `;
// const DescText = styled.div`
//   text-align: center;
//   color: #7d7d7d;

//   font-size: 13px;

//   width: 100%;
// `;
// const FooterDescText = styled(DescText)`
//   margin-top: 20px;
// `;
// const FreezeDateDescText = styled(DescText)`
//   margin-top: 10px;
//   text-align: left;
// `;
// const Step3DescText = styled(DescText)`
//   margin-top: 10px;
//   margin-bottom: 30px;
// `;
// const MiddleContainer = styled.div`
//   min-height: 160px;

//   width: 100%;
// `;
// const StyledStepper = withStyles({
//   root: {
//     width: "100%",
//     backgroundColor: "transparent"
//   }
// })(Stepper);
// const StyledStep = withStyles({
//   root: {
//     overflow: "initial",
//     "& .MuiStepIcon-root": {
//       color: "#bfbfbf"
//     },
//     "& .MuiStepIcon-root.MuiStepIcon-active": {
//       color: "#c0252d"
//     },

//     "& .MuiStepIcon-root.MuiStepIcon-completed": {
//       color: "#c0252d"
//     }
//   }
// })(Step);
// // dateFrom: moment(addDays(new Date(), -7)).format("YYYY-MM-DD"),
// // dateTo: moment(new Date()).format("YYYY-MM-DD")

// class SelfControl extends Component {
//   state = {
//     activeStep: 0,
//     countdown: 0,
//     prefix: "+86",
//     phone: "",
//     code: "",
//     freezeDay: 0,
//     freezeUntil: moment(new Date()).format("YYYY/MM/DD")
//   };
//   steps = ["验证码确认", "设定冻结时间", "冻结账户完成"];

//   timer = null;
//   componentWillUnmount() {
//     if (this.timer != null) {
//       clearTimeout(this.timer);
//     }
//   }
//   onhandlePhoneChange = e => {
//     this.setState({ ...this.state, phone: e.target.value });
//   };
//   handlePrefixChange = e => {
//     this.setState({ ...this.state, prefix: e.target.value });
//   };

//   handleNumberChange = e => {
//     this.setState({ ...this.state, number: e.target.value });
//   };
//   onhandleCodeChange = e => {
//     this.setState({ ...this.state, code: e.target.value });
//   };
//   onhandleFreezeDayChange = e => {
//     let day = 0;
//     if (e.target.value === "") {
//       day = 0;
//     } else {
//       day = parseInt(e.target.value);
//     }
//     this.setState({
//       ...this.state,
//       freezeDay: day,
//       freezeUntil: moment(addDays(new Date(), day)).format("YYYY/MM/DD")
//     });
//   };
//   onhandleGetCodeClick = () => {
//     if (this.state.countdown <= 0) {
//       AccountService.GetPhoneVerificationCode(
//         this.props.account.token,
//         this.state.phone,
//         "check"
//       ).then(response => {
//         // this.setState({ ...this.state, message: response.msg });
//         if (response.IsSuccess) {
//           // this.props.enqueueSnackbar(response.msg, {
//           //   variant: "info"
//           // });
//         } else {
//           this.props.enqueueSnackbar(response.msg, {
//             variant: "error"
//           });
//         }
//         this.setState({ ...this.state, countdown: response.data });
//         this.checkCountdown();
//       });
//     }
//   };
//   onhandleVerifyClick = () => {
//     if (this.state.code.length >= 6) {
//       AccountService.SelfControlVerify(
//         this.props.account.token,
//         this.state.code
//       ).then(response => {
//         // this.setState({ ...this.state, message: response.msg });
//         if (response.IsSuccess) {
//           this.setState({ ...this.state, activeStep: 1 });
//         } else {
//           this.props.enqueueSnackbar(response.msg, {
//             variant: "error"
//           });
//         }
//       });
//     }
//   };
//   onhandleFreezeClick = () => {
//     if (this.state.freezeDay > 0) {
//       this.setState({ ...this.state, activeStep: 2 });
//     }
//   };
//   onhandleFreezeConfirmClick = () => {
//     if (this.state.freezeDay > 0) {
//       AccountService.SelfControlSetTime(
//         this.props.account.token,
//         this.state.freezeDay
//       ).then(response => {
//         // this.setState({ ...this.state, message: response.msg });
//         if (response.IsSuccess) {
//           this.props.onCloseDialog();
//         } else {
//           this.props.enqueueSnackbar(response.msg, {
//             variant: "error"
//           });
//         }
//       });
//     }
//   };
//   onhandleFreezeCancelClick = () => {
//     this.setState({
//       ...this.state,
//       activeStep: 0,
//       countdown: 0,
//       prefix: "+86",
//       phone: "",
//       code: "",
//       freezeDay: 0,
//       freezeUntil: moment(new Date()).format("YYYY/MM/DD")
//     });
//     this.props.onCloseDialog();
//   };
//   checkCountdown = () => {
//     if (this.state.countdown > 0) {
//       this.timer = setTimeout(() => {
//         this.setState({ ...this.state, countdown: this.state.countdown - 1 });
//         this.checkCountdown();
//       }, 1000);
//     }
//   };
//   render() {
//     return (
//       <>
//         <Header>
//           <Headertitle>自我控制</Headertitle>
//           <CloseIconContainer
//             onClick={this.props.onCloseDialog}
//           ></CloseIconContainer>
//         </Header>
//         <Container>
//           <StyledStepper activeStep={this.state.activeStep} alternativeLabel>
//             {this.steps.map(label => (
//               <StyledStep key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </StyledStep>
//             ))}
//           </StyledStepper>
//           <MiddleContainer>
//             {(() => {
//               switch (this.state.activeStep) {
//                 case 0:
//                   return (
//                     <>
//                       <DescText>
//                         尊贵的会员，冻结账户需要验证您的手机号码。
//                       </DescText>
//                       <FormControl
//                         style={{
//                           float: "left",
//                           height: "46px",
//                           marginTop: "10px",
//                           width: "110px",

//                           marginRight: "5px"
//                         }}
//                       >
//                         <Select
//                           value={this.state.prefix}
//                           onChange={this.handlePrefixChange}
//                           variant="outlined"
//                           native
//                         >
//                           <option value={"+86"}>+86</option>
//                         </Select>
//                       </FormControl>
//                       <CustomText
//                         placeholder="请输入您的手机号码"
//                         onChange={this.onhandlePhoneChange}
//                         value={this.state.phone}
//                         type={"number"}
//                         onInput={e => {
//                           e.target.value = Math.max(0, parseInt(e.target.value))
//                             .toString()
//                             .slice(0, 20);
//                         }}
//                         style={{
//                           width: "240px",
//                           height: "46px"
//                         }}
//                         variant="outlined"
//                         autoComplete="off"
//                         disabled={
//                           this.state.isNew === false && this.state.step === 1
//                         }
//                       ></CustomText>

//                       <CustomText
//                         placeholder="请输入验证码"
//                         adornment={IconInputVerifyCodePNG}
//                         onChange={this.onhandleCodeChange}
//                         onInput={e => {
//                           e.target.value = Math.max(0, parseInt(e.target.value))
//                             .toString()
//                             .slice(0, 6);
//                         }}
//                         variant="outlined"
//                         autoComplete="off"
//                         value={this.state.code}
//                         type={"number"}
//                         style={{
//                           width: "208px",
//                           height: "46px"
//                         }}
//                       ></CustomText>

//                       <StyleButton
//                         onClick={this.onhandleGetCodeClick}
//                         disable={this.state.countdown > 0}
//                       >
//                         <ButtonLabel>
//                           {this.state.countdown <= 0
//                             ? "发送验证码"
//                             : "重新发送(" + this.state.countdown + "s)"}
//                         </ButtonLabel>
//                       </StyleButton>
//                       <CustomButton
//                         name="下一步"
//                         handleClick={this.onhandleVerifyClick}
//                         marginTop={10}
//                       ></CustomButton>
//                     </>
//                   );
//                 case 1:
//                   return (
//                     <>
//                       <CustomText
//                         placeholder="冻结时间(天)"
//                         onChange={this.onhandleFreezeDayChange}
//                         value={this.state.freezeDay}
//                         type={"number"}
//                         onInput={e => {
//                           e.target.value = Math.max(0, parseInt(e.target.value))
//                             .toString()
//                             .slice(0, 5);
//                         }}
//                         style={{
//                           width: "356px",
//                           height: "46px"
//                         }}
//                         variant="outlined"
//                         autoComplete="off"
//                         id="outlined-number"
//                         label="冻结时间(天)"
//                         type="number"
//                         InputLabelProps={{
//                           shrink: true
//                         }}
//                       ></CustomText>
//                       <div className="clear"></div>
//                       <FreezeDateDescText>
//                         预计冻结时间:{this.state.freezeUntil}
//                       </FreezeDateDescText>
//                       <CustomButton
//                         name="确认"
//                         handleClick={this.onhandleFreezeClick}
//                         marginTop={10}
//                       ></CustomButton>
//                     </>
//                   );
//                 case 2:
//                   return (
//                     <>
//                       <Step3DescText>
//                         您的设定即将生效,您是否确定要冻结您的账户
//                       </Step3DescText>
//                       <div className="clear"></div>

//                       <CustomButton
//                         name="立即生效"
//                         handleClick={this.onhandleFreezeConfirmClick}
//                         marginTop={10}
//                       ></CustomButton>
//                       <CustomButton
//                         grayMode={true}
//                         name="取消冻结"
//                         handleClick={this.onhandleFreezeCancelClick}
//                         marginTop={10}
//                       ></CustomButton>
//                     </>
//                   );
//                 default:
//                   return <div></div>;
//               }
//             })()}
//           </MiddleContainer>
//           <FooterDescText>
//             如您有任何问题，请与在线客服联系。
//             <br />
//             申诉为7*24人工处理，90%的用户都会在24小时内收到反馈。
//           </FooterDescText>
//         </Container>
//       </>
//     );
//   }
// }

// export default withSnackbar(SelfControl);
