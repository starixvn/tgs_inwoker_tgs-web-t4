// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import CustomTextField from "../../../Share/TextField";
// import CustomButton from "../../../Share/Button";
// import IconInputReceivePNG from "../../../../assets/images/icon-input-receive.png";
// import IconInputAddressPNG from "../../../../assets/images/icon-input-address.png";
// import IconInputPhonePNG from "../../../../assets/images/icon-input-phone.png";
// import { AccountService } from "../../../../services/AccountService";
// import { UPDATE_INFO } from "../../../../constants/actionType";
// import { withSnackbar } from "notistack";
// const Container = styled.div``;

// class Address extends Component {
//   local_props = {
//     member_address: this.props.account.info.member_address,
//     member_address_surename: this.props.account.info.member_address_surename,
//     member_address_phone: this.props.account.info.member_address_phone,
//   };
//   onhandleAddressChange = (e) => {
//     this.local_props.member_address = e.target.value;
//   };
//   onhandleReceiverChange = (e) => {
//     this.local_props.member_address_surename = e.target.value;
//   };
//   onhandlePhoneChange = (e) => {
//     this.local_props.member_address_phone = e.target.value;
//   };

//   onhandleClick = () => {
//     AccountService.UpdateAddress(
//       this.props.account.token,
//       this.local_props.member_address,
//       this.local_props.member_address_surename,
//       this.local_props.member_address_phone
//     ).then((response) => {
//       if (response.IsSuccess) {
//         this.props.dispatch({
//           type: UPDATE_INFO,
//           payload: {
//             member_address: this.local_props.member_address,
//             member_address_surename: this.local_props.member_address_surename,
//             member_address_phone: this.local_props.member_address_phone,
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
//         <CustomTextField
//           placeholder="收货地址"
//           adornment={IconInputAddressPNG}
//           handleTextFieldChange={this.onhandleAddressChange}
//           defaultValue={this.local_props.member_address}
//         ></CustomTextField>
//         <CustomTextField
//           placeholder="收件人"
//           adornment={IconInputReceivePNG}
//           handleTextFieldChange={this.onhandleReceiverChange}
//           defaultValue={this.local_props.member_address_surename}
//         ></CustomTextField>
//         <CustomTextField
//           placeholder="联系电话"
//           adornment={IconInputPhonePNG}
//           handleTextFieldChange={this.onhandlePhoneChange}
//           defaultValue={this.local_props.member_address_phone}
//           type={"number"}
//           maxLength={11}
//         ></CustomTextField>
//         <CustomButton
//           name="提交"
//           handleClick={this.onhandleClick}
//         ></CustomButton>
//       </Container>
//     );
//   }
// }
// export default connect(null, null)(withSnackbar(Address));
