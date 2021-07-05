// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";

// import CustomButton from "../../../Share/Button";

// import { AccountService } from "../../../../services/AccountService";
// import { UPDATE_INFO } from "../../../../constants/actionType";
// import { withSnackbar } from "notistack";

// const Container = styled.div``;
// const MessageTitle = styled.div`
//   color: #16242a;

//   font-size: 18px;

//   width: 100%;
//   text-align: center;
// `;
// const MessageFooter = styled.div`
//   color: #16242a;

//   font-size: 12px;
//   margin: 10px 0;
//   width: 100%;
//   text-align: center;
// `;

// const LinkStyle = styled.a`
//   color: #c0252d;
//   font-size: 14px;
//   margin-top: 5px;
//   text-decoration: underline;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// class SecurityQuestion extends Component {
//   state = {
//     answer: "",
//     message: "请放心，我们不会泄露任何用户信息，以及发送骚扰信息。",
//     questionList: [],
//     question: 0,
//   };
//   componentDidMount() {
//     AccountService.GetSecurityQuestion(this.props.token).then((response) => {
//       if (response.IsSuccess) {
//         this.setState({ ...this.state, questionList: response.url });
//       } else {
//         this.props.enqueueSnackbar(response.msg, {
//           variant: "error",
//         });
//       }
//     });
//   }

//   handleAnswerChange = (e) => {
//     this.setState({ ...this.state, answer: e.target.value });
//   };
//   handleQuestionChange = (e) => {
//     this.setState({ ...this.state, question: e.target.value });
//   };
//   onhandleClick = () => {
//     AccountService.UpdateSecurityQuestion(
//       this.props.token,
//       this.state.question,
//       this.state.answer
//     ).then((response) => {
//       if (response.IsSuccess) {
//         this.props.dispatch({
//           type: UPDATE_INFO,
//           payload: {
//             member_question: this.state.question,
//           },
//         });
//         this.props.handleCloseDialog();
//       } else {
//         this.props.enqueueSnackbar(response.msg, {
//           variant: "error",
//         });
//       }
//     });
//   };
//   render() {
//     return (
//       <Container>
//         <MessageTitle>选择验证方式</MessageTitle>
//         <CustomButton
//           name="手机验证"
//           handleClick={
//             this.props.passPhone
//               ? this.props.onhandlePhoneVerificationClick
//               : ""
//           }
//           marginTop={"10"}
//           grayMode={this.props.passPhone ? false : true}
//           disabled={this.props.passPhone ? false : true}
//         ></CustomButton>
//         <CustomButton
//           name="邮箱验证"
//           handleClick={
//             this.props.passEmail
//               ? this.props.onhandleEmailVerificationClick
//               : null
//           }
//           marginTop={"10"}
//           grayMode={this.props.passEmail ? false : true}
//           disabled={this.props.passEmail ? false : true}
//         ></CustomButton>
//         <CustomButton
//           name="安全问题"
//           handleClick={this.props.onhandleVerifyByQuestion}
//           marginTop={"10"}
//         ></CustomButton>
//         <div className="clear"></div>
//         <MessageFooter>
//           如您的安全工具都已无法使用，请联系
//           <LinkStyle onClick={this.props.onhandleCSClick}>线上客服</LinkStyle>
//         </MessageFooter>
//       </Container>
//     );
//   }
// }
// export default connect(null, null)(withSnackbar(SecurityQuestion));
