// import React, { Component } from "react";

// import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
// import LoginBGPNG from "../../assets/images/login-bg.png";

// import CloseIcon from "@material-ui/icons/Close";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";

// import FormControlLabel from "@material-ui/core/FormControlLabel";

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
//   margin: 10px 35px;
// `;

// const Button = styled.div`
//   width: 347px;
//   height: 46px;
//   border: solid 1px #b6b6b6;
//   margin-top: 15px;
//   ${props =>
//     props.disabled
//       ? "    background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
//       : "  background-image: linear-gradient(to top, #c0252d, #d95a61);"}
//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;

//   &:hover {
//     cursor: pointer;

//     ${props =>
//       props.disabled
//         ? "  "
//         : "     background-blend-mode: screen, normal;background-image: linear-gradient(to bottom,rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)        ),        linear-gradient(to top, #c0252d, #d95a61);"}
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
// `;

// const ContactUsLink = styled(LinkStyle)`
//   font-size: 13px;
// `;
// const CustomRadio = withStyles(theme => ({
//   root: {
//     "&.Mui-checked": {
//       color: "#c0252d"
//     },
//     "&:hover": {
//       backgroundColor: "transparent"
//     },
//     "&:after": {
//       transition: "none"
//     }
//   }
// }))(Radio);

// class ForgotPasswordOption extends Component {
//   state = {
//     method: ""
//   };
//   handleRadioChange = e => {
//     this.setState({ ...this.state, method: e.target.value });
//   };
//   render() {
//     return (
//       <Container>
//         <CloseIconContainer
//           viewBox="4 4 16 16"
//           onClick={this.props.onhandleClose}
//         ></CloseIconContainer>
//         <div className="clear"></div>
//         <TitleContainer>选择验证方式</TitleContainer>

//         <FormContainer>
//           <RadioGroup
//             aria-label="gender"
//             name="gender1"
//             onChange={this.handleRadioChange}
//             value={this.state.method}
//           >
//             <FormControlLabel
//               value="question"
//               control={<CustomRadio />}
//               label="安全问题"
//               disabled={this.props.questionCheck !== 1}
//             />
//             <FormControlLabel
//               value="phone"
//               control={<CustomRadio />}
//               label="手机验证"
//               disabled={this.props.phoneCheck !== 1}
//             />
//             <FormControlLabel
//               value="email"
//               control={<CustomRadio />}
//               label="电子邮箱"
//               disabled={this.props.emailCheck !== 1}
//             />
//           </RadioGroup>

//           <Button onClick={() => this.props.onNextClick(this.state.method)}>
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

// export default ForgotPasswordOption;
