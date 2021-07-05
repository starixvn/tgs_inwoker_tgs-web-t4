// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import AppBar from "@material-ui/core/AppBar";

// import { withSnackbar } from "notistack";
// import { AccountService } from "../../../services/AccountService";

// import { AppHistory } from "../../../history/History";
// import { withStyles } from "@material-ui/core/styles";

// import Header from "../../Wap/Share/Header";

// import Textbox from "../../Wap/Share/Textbox";
// import Button from "../../Wap/Share/Button";
// import IconRedInfoPNG from "../../../assets/images/wap/icon-red-info.png";
// import Modal from "@material-ui/core/Dialog";

// import Loading from "../../Wap/Share/Loading";
// import i18n from "../../../utils/i18n";
// import BgProfilePNG from "../../../assets/images/wap/bg-profile.png";
// const Container = styled.div`
//   width: 100%;
//   padding-top: 170px;
// `;
// const StyledAppBar = withStyles({
//   root: {
//     height: "170px",
//     background: `url(${BgProfilePNG}) no-repeat left top`,
//     display: "block",
//     backgroundSize: "cover",
//   },
// })(AppBar);
// const BalanceLabel = styled.div`
//   font-size: 36px;

//   text-align: center;
//   color: #ffffff;
//   margin: 0 auto 20px auto;
// `;

// const BottomInfo = styled.div`
//   font-size: 22px;
//   font-weight: 600;
//   height: 30px;
//   color: #e23a3f;
//   background: url(${IconRedInfoPNG}) no-repeat left center;
//   padding-left: 40px;
//   display: table;
//   margin: 0 auto;
// `;
// const ImportantNote = styled.div`
//   font-size: 26px;
//   padding: 0 50px;
//   margin: 20px 0;
//   color: #afafaf;
// `;
// const StyledModal = withStyles((theme) => ({
//   paper: {
//     borderRadius: "50px",
//     fontSize: "28px",
//     color: "#666666",
//     padding: "30px",
//     width: "690px",
//     maxWidth: "690px",
//     height: "370px",
//     display: "block",
//   },
// }))(Modal);
// const DialoMessage = styled.div`
//   font-size: 26px;
//   margin: 30px 45px;
//   color: #4a4a4a;
//   line-height: 1.8em;
// `;
// const DialogButtonFrame = styled.div`
//   width: 250px;
//   height: 90px;
//   border-radius: 45px;

//   font-size: 30px;
//   font-weight: 500;

//   text-align: center;

//   padding-top: 22px;
// `;
// const ButtonConfirm = styled(DialogButtonFrame)`
//   background-image: linear-gradient(to bottom, #ebce91, #dcb370 60%, #d2a058);
//   color: #2b2b2b;
//   float: left;
//   margin-left: 20px;
// `;
// const ButtonCancel = styled(DialogButtonFrame)`
//   border: #dc5357 1px solid;
//   color: #dc5357;
//   float: right;
//   margin-right: 20px;
// `;
// class NameVerification extends Component {
//   state = {
//     name: "",
//     open: false,
//     loading: false,
//   };
//   componentDidMount() { }
//   handleLogoutClick = () => {
//     this.props.accountLogout(this.props.account.token).then((response) => {
//       if (response.IsSuccess) {
//         this.props.navigate("/");
//       }
//     });
//   };
//   handleBackClick = () => {
//     AppHistory.goBack();
//   };
//   handleNameChange = (e) => {
//     this.setState({ ...this.state, name: e.target.value });
//   };
//   handleNextClick = () => {
//     this.setState({ ...this.state, open: true });
//   };
//   handleConfirmClick = () => {
//     this.setState({ ...this.state, loading: true });
//     AccountService.UpdateMemberName(this.props.token, this.state.name).then(
//       (response) => {
//         if (response.IsSuccess) {
//           this.props
//             .getAccountProfile(this.props.token)
//             .then((responseUpdate) => {
//               if (responseUpdate.IsSuccess) {
//                 if (this.props.from === "deposit") {
//                   AppHistory.replace("/" + i18n.language + "/deposit");
//                 } else {
//                   if (this.props.account.info.member_safe_password === "set") {
//                     AppHistory.replace("/" + i18n.language + "/card");
//                   } else {
//                     AppHistory.replace("/" + i18n.language + "/card/pass");
//                   }
//                 }
//               }
//               this.setState({ ...this.state, loading: false });
//             });
//         } else {
//           this.props.alert("", response.msg);

//         }
//       }
//     );
//   };
//   render() {
//     return (
//       <Container>
//         <StyledAppBar>
//           <Header
//             onBackClick={this.handleBackClick}
//             title={this.props.from === "deposit" ? i18n.t("card.nameVerification.realName") : i18n.t("card.nameVerification.title")}
//             position={"sticky"}
//             backgroundColor={"transparent"}
//           ></Header>
//           <BalanceLabel>￥{this.props.account.info.balance}</BalanceLabel>
//         </StyledAppBar>

//         <Textbox
//           style={{ margin: "50px auto 20px auto" }}
//           value={this.state.name}
//           onChange={this.handleNameChange}
//           placeholder={i18n.t("card.nameVerification.msgEnterName")}
//           maxLength={20}
//           label={i18n.t("card.nameVerification.realName")}
//         ></Textbox>

//         <BottomInfo>{i18n.t("card.nameVerification.msgTNC")}</BottomInfo>
//         <Button
//           style={{ margin: "40px auto 0 auto" }}
//           label={
//             this.props.account.info.member_safe_password === "set" ||
//               this.props.from === "deposit"
//               ? i18n.t("common.confirm")
//               : i18n.t("common.nextStep")
//           }
//           disabled={(() => {
//             return this.state.name === "";
//           })()}
//           onClick={this.handleNextClick}
//         ></Button>
//         <ImportantNote>
//           <b>{i18n.t("card.nameVerification.reminder")}</b>
//           <br />
//           <ol>
//             <li>
//               {i18n.t("card.nameVerification.msgImportantLine1")}
//             </li>
//             <li>
//               {i18n.t("card.nameVerification.msgImportantLine2")}
//             </li>
//             <li>
//               {i18n.t("card.nameVerification.msgImportantLine3")}
//             </li>
//           </ol>
//         </ImportantNote>
//         <StyledModal onClose={this.handleClose} open={this.state.open}>
//           <DialoMessage>
//             {i18n.t("card.nameVerification.msgDialogLine1")}
//             <br />
//             {i18n.t("card.nameVerification.msgDialogLine2")}
//           </DialoMessage>
//           <ButtonConfirm onClick={this.handleConfirmClick}>{i18n.t("common.confirm")}</ButtonConfirm>
//           <ButtonCancel
//             onClick={() => this.setState({ ...this.state, open: false })}
//           >
//             {i18n.t("common.cancel")}
//           </ButtonCancel>
//         </StyledModal>
//         <Loading show={this.state.loading}></Loading>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     account: state.account,
//     token: state.account.token,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch: dispatch,
//     accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
//     getAccountProfile: (token) =>
//       dispatch(accountAction.getAccountProfile(token, true)),
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withSnackbar(NameVerification));
