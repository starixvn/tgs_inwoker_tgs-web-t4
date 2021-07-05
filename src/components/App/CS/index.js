// import React, { Component } from "react";
// import styled from "styled-components";
// import CSGuest from "./CSGuest";
// import CSMember from "./CSMember";
// import LoginBGPNG from "../../../assets/images/login-bg.png";

// import { SupportService } from "../../../services/SupportService";
// import { AccountService } from "../../../services/AccountService";
// import Common from "../../../utils/Common";
// const Container = styled.div`
//   padding: 27px 32px;
//   background: url(${LoginBGPNG});
//   display: table;
//   width: 420px;
//   height: 430px;
// `;

// const Header = styled.div`
//   height: 50px;
//   background-color: #355460;
// `;
// const Headertitle = styled.div`
//   text-align: center;
//   margin-left: 50px;
//   padding-top: 12px;
//   float: left;
//   font-size: 18px;
//   font-weight: bold;
//   color: #ffffff;
//   width: 320px;
// `;
// const TabButton = styled.div`
//   width: 179px;
//   height: 40px;
//   font-size: 16px;
//   border: solid 1px #c0252d;
//   float: left;
//   text-align: center;
//   padding-top: 7px;
//   ${(props) =>
//     props.active
//       ? `color:#ffffff;background-color: #c0252d;`
//       : `color:#c0252d;background-color: transparent;`}
//   &:hover {
//     cursor: pointer;
//   }
// `;
// class CS extends Component {
//   state = {
//     tab: 1,
//   };
//   componentDidMount() {
//     // Common.loadScript("/js/config.js", () => {
//     //   Common.loadScript("/js/iovation.js", () => {
//     //     // do mail api stuff here
//     //   });
//     // });
//   }
//   GetSupportUrl = (userid, name, question) => {
//     SupportService.GetLiveSupport(
//       userid,
//       name,
//       question,
//       document.URL,
//       document.referrer
//     ).then((response) => {
//       if (response.IsSuccess) {
//         window.location.href = response.data.online;
//         window.resizeTo(785, 750);
//         //Common.PopupCenter(response.data, "", 500, 610);
//         // window.close();
//       } else {
//         this.props.enqueueSnackbar(response.msg, {
//           variant: "error",
//         });
//       }
//     });
//   };
//   handleGuestSubmit = (name, question) => {
//     this.GetSupportUrl("", name + "(访客)", question);
//   };
//   handleMemberSubmit = async (name, password, question) => {
//     const responseLogin = await AccountService.LoginWithoutSetToken(
//       name,
//       password,

//     );
//     if (responseLogin.IsSuccess) {
//       const responseInfo = await AccountService.GetMemberInfo(
//         responseLogin.data
//       );
//       if (responseInfo.IsSuccess) {
//         this.GetSupportUrl(
//           responseInfo.data.member_id,
//           name + "(会员)",
//           question
//         );
//       } else {
//         this.props.enqueueSnackbar(responseInfo.msg, {
//           variant: "error",
//         });
//       }

//       //this.GetSupportUrl("", name, question);
//     } else {
//       this.props.enqueueSnackbar(responseLogin.msg, {
//         variant: "error",
//       });
//     }
//   };
//   render() {
//     return (
//       <>
//         <Header>
//           <Headertitle>客服中心</Headertitle>
//         </Header>
//         <Container>
//           <TabButton
//             active={this.state.tab === 1}
//             onClick={() => this.setState({ ...this.state, tab: 1 })}
//           >
//             访客
//           </TabButton>
//           <TabButton
//             active={this.state.tab === 2}
//             onClick={() => this.setState({ ...this.state, tab: 2 })}
//           >
//             会员
//           </TabButton>
//           {(() => {
//             switch (this.state.tab) {
//               case 1:
//                 return (
//                   <CSGuest onhandleSubmit={this.handleGuestSubmit}></CSGuest>
//                 );
//               case 2:
//                 return (
//                   <CSMember onhandleSubmit={this.handleMemberSubmit}></CSMember>
//                 );

//               default:
//                 return <div></div>;
//             }
//           })()}
//         </Container>
//       </>
//     );
//   }
// }

// export default CS;
