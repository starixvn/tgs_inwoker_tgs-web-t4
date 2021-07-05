// import React, { Component } from "react";

// import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
// import LoginBGPNG from "../../assets/images/login-bg.png";

// import CloseIcon from "@material-ui/icons/Close";
// import TextField from "@material-ui/core/TextField";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import UserIconPNG from "../../assets/images/user-icon.png";
// import { AccountService } from "../../services/AccountService";
// import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
// const Container = styled.div`
// width: 506px;

//   background: url(${LoginBGPNG});
//   display: table;
// `;
// const CloseIconContainer = styled.div`
// background:url(${IconLoginClosePNG}) no-repeat;
// width:28px;
// height:28px;
//   float: right;
//   margin: 10px 10px 0 0;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const TitleContainer = styled.div`
// text-align: center;

// text-shadow: 0px 4px 2px rgba(24, 28, 31, 0.8);

// font-size: 42px;

// color: #ffffff;
// `;

// const FormContainer = styled.div`
// margin: 10px 78px 0 78px;
// `;
// const CustomText = withStyles({
//   root: {
//     width: "350px",
//     height: "51px",
//     borderRadius: "6px",
//     border: "solid 1px #676666",
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

// const ButtonLogin = styled.div`
// margin-top: 35px;

// color: #fff;
// font-size: 20px;
// width: 350px;
// height: 51px;
// border-radius: 6px;

// border: solid 1px #ffffff;
// background-image: linear-gradient(to top,  ${({ theme }) => theme.primaryGradient},
//   ${({ theme }) => theme.primary});

// &:hover {
//   cursor: pointer;

//   box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);

// }
// `;
// const ButtonLoginLabel = styled.span`
//   text-align: center;
//   display: block;
//   margin-top: 10px;
// `;
// const LinkStyle = styled.a`
// margin-top: 5px;
// text-decoration: underline;

// font-size: 15px;

// color: #ffffff;

// &:hover {
//   cursor: pointer;
// }
// `;

// const Description = styled.p`

// text-align: center;

// font-size: 14px;

// line-height: 1.43;

// color: #ffffff;
// `;

// const ContactUsLink = styled(LinkStyle)`
// font-size: 14px;
// `;
// const VerifyCodeContainer = styled.div`
//   height: 46px;
//   width: 350px;
//   margin-top: 10px;
// `;
// const VerifyCodeImage = styled.img`
//   height: 46px;
//   width: 156px;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const VerifyCodeText = withStyles({
//   root: {
//     width: "187px",
//     height: "46px",
//     margin: "0 0 0 7px",
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
// class ForgotPasswordStep1 extends Component {
//   state = {
//     username: "",
//     code: "",
//     imgStream: "",
//     sessionId: ""
//   };
//   componentDidMount() {
//     this.getCaptchaCode();
//   }
//   handleTextFieldChange = e => {
//     this.setState({ ...this.state, username: e.target.value });
//   };
//   handleCodeChange = e => {
//     this.setState({ ...this.state, code: e.target.value });
//   };
//   getCaptchaCode = () => {
//     AccountService.GetVerifyCode().then(response => {
//       if (response.IsSuccess) {
//         this.setState({
//           ...this.state,
//           imgStream: "data:image/jpg;base64," + response.data.stream,
//           sessionId: response.data.session_id,
//           code: ""
//         });
//       }
//     });
//   };
//   handleCodeImageClick = e => {
//     this.getCaptchaCode();
//   };
//   render() {
//     return (
//       <Container>
//         <CloseIconContainer
//           viewBox="4 4 16 16"
//           onClick={this.props.onhandleClose}
//         ></CloseIconContainer>
//         <div className="clear"></div>
//         <TitleContainer>找回密码</TitleContainer>

//         <FormContainer>
//           <CustomText
//             onChange={this.handleTextFieldChange}
//             id="username"
//             placeholder="请输入用户名"
//             variant="outlined"
//             value={this.state.username}
//             autoComplete="off"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment
//                   position="start"
//                   style={{ height: "24px", width: "30px" }}
//                 >
//                   <img src={UserIconPNG} alt=""></img>
//                 </InputAdornment>
//               )
//             }}
//           />
//           <VerifyCodeContainer>
//             <VerifyCodeImage
//               src={this.state.imgStream}
//               onClick={this.handleCodeImageClick}
//             ></VerifyCodeImage>
//             <VerifyCodeText
//               onChange={this.handleCodeChange}
//               placeholder="请输入验证码"
//               variant="outlined"
//               value={this.state.code}
//             />
//           </VerifyCodeContainer>

//           <ButtonLogin
//             onClick={() =>
//               this.props.onhandleNextClick(
//                 this.state.username,
//                 this.state.code,
//                 this.state.sessionId
//               )
//             }
//           >
//             <ButtonLoginLabel>下一步</ButtonLoginLabel>
//           </ButtonLogin>

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

// export default ForgotPasswordStep1;
