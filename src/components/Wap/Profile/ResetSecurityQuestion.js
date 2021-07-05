// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import styled from "styled-components";
// import { AppHistory } from "../../../history/History";
// // import { AppHistory } from "../../../History";

// import Textbox from "../Share/Textbox";
// // import TextboxWithButton from "../../Share/TextboxWithButton";
// import Step from "../Share/Step";
// import BaseProfile from "./BaseProfile";
// import { AccountService } from "../../../services/AccountService";
// import Select from "../Share/Select";
// import { withSnackbar } from "notistack";
// const Content = styled.div`
//   width: 675px;
//   height: 108px;
//   background-color: #ffffff;
//   border-radius: 20px;

//   font-size: 27px;
// `;
// class SecurityQuestion extends BaseProfile {
//   state = {
//     isEdit: false,
//     securityQuestionID: 0,
//     answer: "",
//     currentStep: 1,
//     loading: false,
//     questionList: []
//   };
//   componentDidMount() {
//     //fetch security list
//     this.showLoading(true);
//     AccountService.GetSecurityQuestion(this.props.account.token).then(
//       response => {
//         if (response.IsSuccess) {
//           this.setState({
//             ...this.state,
//             questionList: response.url,
//             isEdit: false,

//             answer: "",
//             currentStep: 1,
//             loading: false
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

//   handleAnswer = e => {
//     this.setState({ ...this.state, answer: e.target.value });
//     this.onTextChanged();
//   };
//   handleSecurityQuestionChanged = e => {
//     this.setState({ ...this.state, securityQuestionID: e.target.value });
//     this.onTextChanged();
//   };

//   isDisableButton = () => {
//     if (this.state.securityQuestionID == 0 || this.state.answer === "") {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   handleSubmitClicked = () => {
//     AccountService.ResetSecurityQuestion(
//       this.props.account.token,
//       this.state.securityQuestionID,
//       this.state.answer
//     )
//       .then(() => {
//         this.props
//           .getAccountProfile(this.props.account.token)
//           .then(responseUpdate => {
//             if (responseUpdate.IsSuccess) {
//               this.setState({
//                 ...this.state,
//                 securityQuestionID: responseUpdate.data.member_question
//               });
//               AppHistory.goBack();
//             }
//           });
//       })
//       .catch(err => {
//         this.props.alert("", err);
//         // this.props.enqueueSnackbar(err, {
//         //   key: "error"
//         // });
//         this.showErrorMessage(err);
//       });
//   };

//   render() {
//     var defaultOption = null;
//     if (!this.state.securityQuestionID) {
//       defaultOption = (
//         <option value="0" disabled>
//           请选择安全问题
//         </option>
//       );
//     }

//     const securityQuestionOptionList =
//       this.state.questionList != null
//         ? this.state.questionList.map(question => {
//             return (
//               <option key={question.id} value={question.id}>
//                 {question.title}
//               </option>
//             );
//           })
//         : [];

//     const answerTextbox = (
//       <Textbox
//         style={{ margin: "20px auto" }}
//         value={this.state.answer}
//         onChange={this.handleAnswer}
//         placeholder={"请输入答案"}
//         type={"text"}
//         label={"问题回答"}
//       ></Textbox>
//     );

//     const updateAnswerContent = (
//       <>
//         <Select
//           label={"安全问题"}
//           style={{
//             margin: "50px auto 0 auto"
//           }}
//           onChange={this.handleSecurityQuestionChanged}
//           value={this.state.securityQuestionID}
//           default={defaultOption}
//           options={securityQuestionOptionList}
//         ></Select>

//         {answerTextbox}
//       </>
//     );

//     const step1Content = <>{answerTextbox}</>;

//     if (this.state.isEdit === false) {
//       return this.setupContent("设定新安全问题", updateAnswerContent);
//     }
//     return this.setupContent(
//       "安全问题",
//       <>{this.state.currentStep === 1 ? step1Content : updateAnswerContent}</>,
//       this.state.currentStep === 1 ? "下一步" : "完成"
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     account: state.account
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     getAccountProfile: token =>
//       dispatch(accountAction.getAccountProfile(token, true))
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(withSnackbar(SecurityQuestion)));
