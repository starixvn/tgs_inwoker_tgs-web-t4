// import React, { Component } from "react";
// import styled from "styled-components";
// import RestrictBGJPG from "../../assets/images/restrict-bg.jpg";
// import Logo365x99PNG from "../../assets/images/logo.png";
// // import Popup from "./components/Account/Popup/index";
// // import CS from "./components/App/CS";
// import Common from "../../utils/Common";
// import i18n from "../../utils/i18n";
// const Container = styled.div`
//   background: url(${RestrictBGJPG}) no-repeat center top;
//   width: 100%;
//   height: 1080px;
//   position: relative;
//   color: #ffffff;
// `;
// const ContentContainer = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 250px;
//   margin-left: 35px;
// `;
// const Logo = styled.img``;

// const LabelTitle = styled.div`
//   font-size: 48.5px;
//   font-weight: bold;
//   margin-top: 20px;
// `;
// const IPContainer = styled.div`
//   margin-top: 10px;
// `;
// const LabelIP = styled.div`
//   font-size: 25px;
//   font-weight: bold;
//   float: left;
// `;
// const IPAddress = styled.div`
//   font-family: Arial;
//   font-size: 25px;
//   font-weight: bold;
//   float: left;
//   color: #faf0b2;
//   margin: 5px 0 0 10px;
// `;
// const Description = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   width: 540px;
//   line-height: 1.5;
//   margin-top: 10px;
// `;
// const StyleButton = styled.div`
//   width: 347px;
//   height: 46px;
//   border: solid 1px #b6b6b6;
//   margin-top: 30px;

//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;
//   background-image: linear-gradient(to top, #c0252d, #d95a61);
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
// class IPRestrict extends Component {
//   state = {
//     showCS: false,
//     ip: "",
//   };
//   componentDidMount() {
//     if (this.props.location.state) {
//       this.setState({ ...this.state, ip: this.props.location.state.ip });
//       localStorage.setItem("ip", this.props.location.state.ip);
//     } else {
//       this.setState({ ...this.state, ip: localStorage.getItem("ip") });
//     }
//   }
//   // GetSupportUrl = (userid, name, question) => {
//   //   SupportService.GetLiveSupport(
//   //     userid,
//   //     name,
//   //     question,
//   //     document.URL,
//   //     document.referrer
//   //   ).then(response => {
//   //     if (response.IsSuccess) {
//   //       window.open(
//   //         response.data,
//   //         "_blank",
//   //         "location=yes,height=610,width=500,scrollbars=yes,status=yes"
//   //       );
//   //       this.setState({ ...this.state, showCS: false });
//   //     } else {
//   //       this.props.enqueueSnackbar(response.msg, {
//   //         variant: "error"
//   //       });
//   //     }
//   //   });
//   // };
//   // handleGuestSubmit = (name, question) => {
//   //   this.GetSupportUrl("", name, question);
//   // };
//   // handleMemberSubmit = async (name, password, question) => {
//   //   const responseLogin = await AccountService.LoginWithoutSetToken(
//   //     name,
//   //     password
//   //   );
//   //   if (responseLogin.IsSuccess) {
//   //     const responseInfo = await AccountService.GetMemberInfo(
//   //       responseLogin.data
//   //     );
//   //     if (responseInfo.IsSuccess) {
//   //       this.GetSupportUrl(
//   //         responseInfo.data.member_id,
//   //         responseInfo.data.member_name,
//   //         question
//   //       );
//   //     } else {
//   //       this.props.enqueueSnackbar(responseInfo.msg, {
//   //         variant: "error"
//   //       });
//   //     }

//   //     //this.GetSupportUrl("", name, question);
//   //   } else {
//   //     this.props.enqueueSnackbar(responseLogin.msg, {
//   //       variant: "error"
//   //     });
//   //   }
//   // };
//   render() {
//     return (
//       <Container>
//         <ContentContainer>
//           <Logo src={Logo365x99PNG}></Logo>
//           <LabelTitle>登录限制</LabelTitle>
//           <IPContainer>
//             <LabelIP>你的IP来自于</LabelIP>
//             <IPAddress>{this.state.ip}</IPAddress>
//           </IPContainer>
//           <Description>
//             由于您所在国家或地区的法律限制， <br />
//             故您无法正常浏览您所尝试打开的网页。 <br />
//             我们对您造成的不便表示万分歉意。 <br />
//             如对此有任何疑问，可联系我们的客服中心。
//           </Description>
//           <StyleButton
//             onClick={() =>
//               Common.PopupCenter("/" + i18n.language + "/cs", "", 420, 470)
//             }
//           >
//             <ButtonLabel>联系客服</ButtonLabel>
//           </StyleButton>
//         </ContentContainer>
//         {/* <Popup
//           openDialog={this.state.showCS}
//           handleCloseDialog={() =>
//             this.setState({ ...this.state, showCS: false })
//           }
//           dialogTitle={"欢迎您使用在线咨询"}
//           childComponent={
//             <CS
//               onhandleGuestSubmit={this.handleGuestSubmit}
//               onhandleMemberSubmit={this.handleMemberSubmit}
//             ></CS>
//           }
//         ></Popup> */}
//       </Container>
//     );
//   }
// }

// export default IPRestrict;
