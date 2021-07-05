// import React from "react";
// import { connect } from "react-redux";

// import { withRouter } from "react-router-dom";
// import { AppHistory } from "../../../history/History";
// import { withSnackbar } from "notistack";
// import Textbox from "../Share/Textbox";
// import { AccountService } from "../../../services/AccountService";
// import BaseProfile from "./BaseProfile";
// import i18n from "../../../utils/i18n";
// class Address extends BaseProfile {
//   state = {
//     name: "",
//     phone: "",
//     address: ""
//   };
//   componentDidMount() {
//     const info = this.props.account.info;
//     if (info) {
//       this.setState({
//         name: info.member_address_surename,
//         phone: info.member_address_phone,
//         address: info.member_address
//       });
//     }
//   }

//   handleNavigate = path => {
//     AppHistory.push("/" + i18n.language + path);
//   };
//   handleChangeName = e => {
//     this.setState({ ...this.state, name: e.target.value });
//     this.onTextChanged();
//   };
//   handleChangePhone = e => {
//     this.setState({ ...this.state, phone: e.target.value });
//     this.onTextChanged();
//   };
//   // handleChangePostcode = e => {
//   //   this.setState({ ...this.state, postcode: e.target.value });
//   //   this.onTextChanged();
//   // };
//   handleChangeAddress = e => {
//     this.setState({ ...this.state, address: e.target.value });
//     this.onTextChanged();
//   };

//   handleSubmitClicked = () => {
//     this.showLoading(true);
//     const name = this.state.name || "";
//     const phone = this.state.phone || "";
//     // const postcode = this.state.postcode || "";
//     const address = this.state.address || "";

//     AccountService.UpdateAddress(this.props.account.token, address, name, phone)
//       .then(response => {
//         if (response.IsSuccess) {
//           this.props
//             .getAccountProfile(this.props.account.token)
//             .then(responseUpdate => {
//               if (responseUpdate.IsSuccess) {
//                 this.setState({
//                   name: responseUpdate.data.member_address_surename,
//                   phone: responseUpdate.data.member_address_phone,
//                   address: responseUpdate.data.member_address
//                 });
//               }
//               this.showLoading(false);
//             });
//         } else {
//           this.props.alert("", response.msg);
//           this.showLoading(false);
//           // this.props.enqueueSnackbar(response.msg, {
//           //   key: "error"
//           // });
//         }
//       })
//       .catch(err => {
//         this.props.alert("", err);
//         // this.props.enqueueSnackbar(err, {
//         //   key: "error"
//         // });

//         this.showLoading(false);
//       });
//   };
//   isDisableButton = () => {
//     const name = this.state.name || "";
//     const phone = this.state.phone || "";
//     // const postcode = this.state.postcode || "";
//     const address = this.state.address || "";

//     const isDisableButton = !(name && phone && address);

//     return isDisableButton;
//   };

//   render() {
//     return this.setupContent(
//       "收货地址",
//       <>
//         <Textbox
//           style={{ margin: "50px auto 20px auto" }}
//           value={this.state.name}
//           onChange={this.handleChangeName}
//           placeholder={"请输入收件人"}
//           label={"收件人姓名"}
//         ></Textbox>
//         <Textbox
//           style={{ margin: "20px auto" }}
//           value={this.state.phone}
//           onChange={this.handleChangePhone}
//           placeholder={"请输入手机号码"}
//           type={"number"}
//           label={"手机号码"}
//         ></Textbox>

//         <Textbox
//           style={{ margin: "20px auto" }}
//           value={this.state.address}
//           onChange={this.handleChangeAddress}
//           placeholder={"请输入收货地址"}
//           label={"收货地址"}
//         ></Textbox>
//       </>
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
// )(withRouter(withSnackbar(Address)));
