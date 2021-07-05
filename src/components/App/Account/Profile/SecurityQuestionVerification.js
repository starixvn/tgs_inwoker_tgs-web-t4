// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import CustomTextField from "../Popup/TextField";
// import CustomButton from "../Popup/Button";
// import Select from "@material-ui/core/Select";

// import FormControl from "@material-ui/core/FormControl";

// import { AccountService } from "../../../services/AccountService";

// import { withSnackbar } from "notistack";
// import { withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// const Container = styled.div``;
// const Message = styled.div`
//   color: red;
//   float: left;
//   font-size: 13px;
//   margin: 10px 0 0 0;
//   width: 100%;
//   text-align: left;
// `;
// const CustomText = withStyles({
//   root: {
//     marginTop: "10px",
//     float: "left",
//     "& .MuiOutlinedInput-input": {
//       fontSize: "14px"
//     },
//     "& .MuiOutlinedInput-input[readonly]": {
//       backgroundColor: "transparent",
//       color: "#6e6e6e"
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
// class SecurityQuestionVerification extends Component {
//   state = {
//     answer: "",
//     message: "请放心，我们不会泄露任何用户信息，以及发送骚扰信息。",
//     questionList: [],
//     question: 0
//   };
//   componentDidMount() {
//     AccountService.GetSecurityQuestion(this.props.token).then(response => {
//       if (response.IsSuccess) {
//         this.setState({ ...this.state, questionList: response.url });
//       } else {
//         this.props.enqueueSnackbar(response.msg, {
//           variant: "error"
//         });
//       }
//     });
//   }

//   handleAnswerChange = e => {
//     this.setState({ ...this.state, answer: e.target.value });
//   };
//   handleQuestionChange = e => {
//     this.setState({ ...this.state, question: e.target.value });
//   };
//   onhandleClick = () => {
//     AccountService.UpdateSecurityQuestion(
//       this.props.token,
//       this.state.question,
//       this.state.answer
//     ).then(response => {
//       if (response.IsSuccess) {
//         this.props.dispatch({
//           type: UPDATE_INFO,
//           payload: {
//             member_question: this.state.question
//           }
//         });
//         this.props.handleCloseDialog();
//       } else {
//         this.props.enqueueSnackbar(response.msg, {
//           variant: "error"
//         });
//       }
//     });
//   };
//   render() {
//     return (
//       <Container>
//         <FormControl
//           style={{
//             float: "left",
//             height: "46px",
//             marginTop: "10px",
//             width: "350px",

//             marginRight: "5px"
//           }}
//         >
//           <Select
//             onChange={this.handleQuestionChange}
//             variant="outlined"
//             value={this.state.question}
//             native
//           >
//             <option value={0} disabled>
//               请选择问题
//             </option>
//             {this.state.questionList.map(row => {
//               return (
//                 <option key={row.id} value={row.id}>
//                   {row.title}
//                 </option>
//               );
//             })}
//           </Select>
//         </FormControl>

//         <CustomText
//           style={{
//             width: "350px",
//             height: "46px"
//           }}
//           onChange={this.handleAnswerChange}
//           value={this.state.answer}
//           placeholder={"请输入答案"}
//           variant="outlined"
//           autoComplete="off"
//           type={"text"}
//           inputProps={{
//             maxLength: 50
//           }}
//         />
//         <Message>{this.state.message}</Message>
//         <CustomButton
//           name="提交"
//           handleClick={this.onhandleClick}
//           marginTop={"10"}
//         ></CustomButton>
//       </Container>
//     );
//   }
// }
// export default connect(null, null)(withSnackbar(SecurityQuestion));
