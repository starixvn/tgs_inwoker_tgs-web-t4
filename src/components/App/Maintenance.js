// import React, { Component } from "react";
// import styled from "styled-components";
// import MaintenanceBGPNG from "../../assets/images/maintenance-bg.png";

// // import Popup from "./components/Account/Popup/index";
// // import CS from "./components/App/CS";
// import Common from "../../utils/Common";
// import i18n from "../../utils/i18n";
// const Container = styled.div`
//   width: 100%;
//   height: 800px;
//   position: relative;
//   background-image: radial-gradient(circle at 0 0, #eff7fd, #b0b5bb);
// `;
// const ContentContainer = styled.div`
//   margin: 44px auto;
//   width: 1280px;
// `;
// const BG = styled.div`
//   background: url(${MaintenanceBGPNG}) no-repeat left center;
//   width: 476px;
//   height: 452px;
//   float: left;
//   margin-left: 150px;
// `;
// const ContentText = styled.div`
//   float: left;
//   margin-left: 80px;
//   margin-top: 100px;
//   width: 520px;
// `;
// const TitleText = styled.div`
//   font-size: 48.5px;
//   font-weight: bold;

//   color: #232323;
// `;
// const DateLabel = styled.div`
//   font-size: 25px;
//   font-weight: bold;
//   float: left;
//   color: #4d4d4d;
//   margin-top: 10px;
// `;
// const DateValue = styled.div`
//   font-size: 25px;
//   font-weight: bold;
//   float: left;
//   color: #c0252d;
//   margin-top: 10px;
// `;
// const Desc = styled.div`
//   font-size: 20px;
//   margin-top: 20px;
//   color: #4d4d4d;
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
// class Maintenance extends Component {
//   //   state = {
//   //     showCS: false,
//   //     ip: ""
//   //   };
//   //   componentDidMount() {
//   //     if (this.props.location.state) {
//   //       this.setState({ ...this.state, ip: this.props.location.state.ip });
//   //       localStorage.setItem("ip", this.props.location.state.ip);
//   //     } else {
//   //       this.setState({ ...this.state, ip: localStorage.getItem("ip") });
//   //     }
//   //   }

//   render() {
//     return (
//       <Container>
//         <ContentContainer>
//           <BG></BG>
//           <ContentText>
//             <TitleText>抱歉，系统维护中</TitleText>
//             <DateLabel>维护时间：</DateLabel>
//             <DateValue>2018/06/09 20:30-21:30</DateValue>
//             <div className="clear"></div>
//             <Desc>
//               为了您更好的体验游戏，我们一直努力!如有疑问， 请及时联系在线客服。
//             </Desc>
//             <StyleButton
//               onClick={() =>
//                 Common.PopupCenter("/" + i18n.language + "/cs", "", 420, 470)
//               }
//             >
//               <ButtonLabel>联系客服</ButtonLabel>
//             </StyleButton>
//           </ContentText>
//         </ContentContainer>
//       </Container>
//     );
//   }
// }

// export default Maintenance;
