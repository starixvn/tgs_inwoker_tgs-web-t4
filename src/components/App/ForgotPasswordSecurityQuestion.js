// import React, { Component } from "react";

// import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
// import LoginBGPNG from "../../assets/images/login-bg.png";

// import CloseIcon from "@material-ui/icons/Close";
// import TextField from "@material-ui/core/TextField";

// const Container = styled.div`
//   width: 420px;

//   background: url(${LoginBGPNG});
//   display: table;
// `;
// const CloseIconContainer = styled(CloseIcon)`
//   float: right;
//   margin: 10px 10px 0 0;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const TitleContainer = styled.div`
//   font-size: 26.5px;
//   text-align: center;
//   color: #16242a;
// `;

// const FormContainer = styled.div`
//   margin: 0 35px;
// `;
// const CustomText = withStyles({
//   root: {
//     width: "350px",
//     height: "46px",
//     margin: 0,
//     marginTop: "13px",
//     background: "white",

//     "& .MuiOutlinedInput-input": {
//       fontSize: "14px"
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

// const Button = styled.div`
//   width: 175px;
//   height: 46px;
//   float: left;
//   border: solid 1px #b6b6b6;
//   margin-top: 15px;
//   background-image: linear-gradient(to top, #c0252d, #d95a61);
//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;

//   &:hover {
//     cursor: pointer;
//     background-blend-mode: screen, normal;
//     background-image: linear-gradient(
//         to bottom,
//         rgba(255, 255, 255, 0.08),
//         rgba(255, 255, 255, 0.08)
//       ),
//       linear-gradient(to top, #c0252d, #d95a61);
//   }
// `;
// const ButtonLabel = styled.span`
//   text-align: center;
//   display: block;
//   margin-top: 10px;
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

// const Description = styled.p`
//   font-size: 13px;
//   color: #686868;
//   text-align: center;
//   display: inline-block;
//   width: 100%;
// `;

// const ContactUsLink = styled(LinkStyle)`
//   font-size: 13px;
// `;

// class ForgotPasswordSecurityQuestion extends Component {
//   state = {
//     answer: ""
//   };
//   componentDidMount() {}
//   handleAnswerChange = e => {
//     this.setState({ ...this.state, answer: e.target.value });
//   };

//   render() {
//     return (
//       <Container>
//         <CloseIconContainer
//           viewBox="4 4 16 16"
//           onClick={this.props.onhandleClose}
//         ></CloseIconContainer>
//         <div className="clear"></div>
//         <TitleContainer>输入验证</TitleContainer>

//         <FormContainer>
//           <CustomText
//             placeholder="安全问题"
//             variant="outlined"
//             defaultValue={this.props.question}
//             inputProps={{
//               readOnly: true
//             }}
//           />
//           <CustomText
//             onChange={this.handleAnswerChange}
//             placeholder="答案"
//             variant="outlined"
//             value={this.state.answer}
//           />
//           <Button onClick={this.props.onhandleBackClick}>
//             <ButtonLabel>返回</ButtonLabel>
//           </Button>
//           <Button
//             onClick={() => this.props.onhandleNextClick(this.state.answer)}
//           >
//             <ButtonLabel>下一步</ButtonLabel>
//           </Button>

//           <Description>
//             如有问题，请及时
//             <ContactUsLink onClick={this.props.onhandleOnlineSupport}>
//               联系我们
//             </ContactUsLink>
//           </Description>
//         </FormContainer>
//       </Container>
//     );
//   }
// }

// export default ForgotPasswordSecurityQuestion;
