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
// import Modal from "@material-ui/core/Dialog";
// import { withStyles } from "@material-ui/core/styles";
// import Common from "../../../utils/Common";
// import IconRedInfoPNG from "../../../assets/images/wap/icon-red-info.png";
// import { AccountService } from "../../../services/AccountService";
// import { SupportService } from "../../../services/SupportService";
// import Textbox from "../../Wap/Share/Textbox";
// import Button from "../../Wap/Share/Button";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import i18n from "../../../utils/i18n";
// const Container = styled.div`
//   width: 100%;
//   overflow: hidden;

//   height: 100%;

//   background-size: contain;
// `;
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
// const CodeImage = styled.img`
//   width: 40%;
//   margin-top: 10px;
//   float: left;
// `;
// const BottomInfo = styled.div`
//   font-size: 26px;

//   text-align: center;
//   color: #d09f58;
//   margin: 30px auto;
// `;
// const CustomInput = styled.input`
// color:#404040;
//   font-size: 28px;
//   margin-left: 20px;
//   font-weight: 500;
//   border: 0;
//   width: 50%;
//   float: left;
//   margin-top: 35px;
//   ::placeholder,
//   ::-webkit-input-placeholder {
//     color: #c3c3c3;
//     font-size: 28px;
//   }
//   &:disabled {
//     background: #fff;
//   }
// `;
// const StyledModal = withStyles(theme => ({
//   root: {},
//   paper: {
//     borderRadius: "15px",
//     fontSize: "28px",
//     color: "#666666",
//     padding: "30px",
//     maxWidth: "690px",
//     width: "690px"
//   }
// }))(Modal);
// const DialogMessage = styled.div`
//   text-align: center;
//   margin: 20px auto;
//   font-size: 30px;

//   color: #4a4a4a;
// `;
// class Reset extends Component {
//   state = {
//     forget_token: "",
//     password: "",
//     password2: "",
//     open: false
//   };
//   componentDidMount() {
//     if (this.props.forget_token == null) {
//       AppHistory.replace("/" + i18n.language + "/forgot-password");
//     } else {
//       this.setState({
//         ...this.state,
//         forget_token: this.props.forget_token
//       });
//     }
//   }

//   handleBackClick = () => {
//     AppHistory.goBack();
//   };

//   handlePasswordChange = e => {
//     this.setState({ ...this.state, password: e.target.value });
//   };
//   handlePassword2Change = e => {
//     this.setState({ ...this.state, password2: e.target.value });
//   };
//   handleConfirmClicked = () => {
//     AppHistory.replace("/" + i18n.language + "/");
//   };
//   handleNextClick = () => {
//     if (this.state.password !== this.state.password2) {
//       this.props.alert("", "两次密码要一致");
//       // this.props.enqueueSnackbar("两次密码要一致", {
//       //   variant: "error"
//       // });
//     } else {
//       AccountService.ResetPassword(
//         this.state.forget_token,
//         this.state.password,
//         this.state.password2
//       ).then(response => {
//         if (response.IsSuccess) {
//           this.setState({
//             ...this.state,
//             open: true
//           });
//         } else {
//           this.props.alert("", response.msg);
//           // this.props.enqueueSnackbar(response.msg, {
//           //   variant: "error"
//           // });
//         }
//       });
//     }
//   };
//   handleCSClick = () => {
//     AppHistory.push("/" + i18n.language + "/customer-service");
//   };
//   render() {
//     return (
//       <Container>
//         <Header onBackClick={this.handleBackClick} title={"重置密码"}></Header>

//         <Textbox
//           style={{ margin: "20px auto 20px auto" }}
//           value={this.state.password}
//           onChange={this.handlePasswordChange}
//           placeholder={"请输入新密码"}
//           type={"password"}
//           label={"新密码"}
//         ></Textbox>

//         <Textbox
//           style={{ margin: "20px auto 20px auto" }}
//           value={this.state.password2}
//           onChange={this.handlePassword2Change}
//           placeholder={"请再次输入新密码"}
//           type={"password"}
//           label={"确认新密码"}
//         ></Textbox>

//         <Button
//           style={{ margin: "40px auto 0 auto" }}
//           label={"确认"}
//           onClick={this.handleNextClick}
//         ></Button>
//         <BottomInfo onClick={this.handleCSClick}>联系客服</BottomInfo>

//         <StyledModal open={this.state.open}>
//           <DialogMessage>修改密码成功</DialogMessage>
//           <Button
//             style={{ margin: "40px auto 0 auto", width: "60%" }}
//             label={"确定"}
//             onClick={this.handleConfirmClicked}
//           ></Button>
//         </StyledModal>
//       </Container>
//     );
//   }
// }

// export default withRouter(withSnackbar(Reset));
