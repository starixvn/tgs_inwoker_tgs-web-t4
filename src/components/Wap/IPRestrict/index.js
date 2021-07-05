// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";

// import IPRestrictTitlePNG from "../../../assets/images/wap/ip-restrict-title.png";
// import Config from "../../../config/config";
// import LogoPNG from "../../../assets/images/logo.png";
// import BgIpRestrictPNG from "../../../assets/images/wap/bg-iprestrict.png";
// import BgIpRestrict3PNG from "../../../assets/images/wap/bg-iprestrict3.png";
// const Container = styled.div`
//   width: 100%;
//   height: 1332px;
//   background: url(${BgIpRestrictPNG}) no-repeat;
//   background-size: cover;
// `;
// const LogoContainer = styled.div`
//   background: url(${BgIpRestrict3PNG}) no-repeat center bottom;
//   width: 100%;
//   height: 480px;
//   display: block;
//   margin: 0 auto 50px auto;
// `;
// const Logo = styled.img`
//   margin: 190px auto 0 auto;
//   display: block;
//   width: 355px;
// `;
// const RestrictImg = styled.img`
//   margin: 0 auto;
//   display: block;
// `;
// const IPAddress = styled.div`
//   font-size: 27px;
//   color: #fff;
//   text-align: center;
//   margin-top: 20px;
// `;
// const Content = styled.div`
//   font-size: 26px;
//   line-height: 1.5em;
//   color: #ffffff;
//   padding: 0 40px;
// `;
// const ContentLink = styled.a`
//   color: #f2bc03;
// `;
// class IPRestrict extends Component {
//   state = {
//     ip: "",
//   };
//   componentDidMount() {
//     if (this.props) {
//       this.setState({ ...this.state, ip: this.props.ip });
//       localStorage.setItem("ip", this.props.ip);
//     } else {
//       this.setState({ ...this.state, ip: localStorage.getItem("ip") });
//     }
//   }

//   render() {
//     return (
//       <Container>
//         <LogoContainer>
//           <Logo src={LogoPNG}></Logo>
//         </LogoContainer>

//         <RestrictImg src={IPRestrictTitlePNG}></RestrictImg>
//         <IPAddress>IP：{this.state.ip}</IPAddress>
//         <Content>
//           <br />
//           亲爱的用户您好：
//           <br />
//           您所在的国家或地区被禁止访问我们的网站。如果您有任何疑问，请直接联系我们的
//           <ContentLink href={"/customer-service"}>在线客服</ContentLink>
//           或者电邮我们
//           <ContentLink>cs@wg188.com</ContentLink>
//           。对您造成的不便，我们深表歉意。
//         </Content>
//         <br />
//         <Content>
//           Dear User
//           <br />
//           The location you are trying to access the website from, is currently
//           restricted. If you have any concerns, please don't hesitate to contact
//           our <ContentLink>Customer Services</ContentLink> via email at{" "}
//           <ContentLink>cs@wg188.com</ContentLink>. We apologize for any
//           inconvenience this may have caused.
//         </Content>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     account: state.account,
//     screenWidth: state.ui.screenWidth,
//     screenHeight: state.ui.screenHeight,
//   };
// };
// export default connect(mapStateToProps, null)(IPRestrict);
