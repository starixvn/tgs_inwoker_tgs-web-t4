// import React from "react";
// import { withRouter } from "react-router-dom";
// import styled from "styled-components";
// import Common from "../../utils/Common";

// import RegSuccIconPNG from "../../assets/images/reg-succ-icon.png";
// import RegSuccBanner1PNG from "../../assets/images/reg-succ-banner1.png";
// import RegSuccBanner2PNG from "../../assets/images/reg-succ-banner2.png";
// import RegSuccBanner3PNG from "../../assets/images/reg-succ-banner3.png";
// import RegSuccBanner4PNG from "../../assets/images/reg-succ-banner4.png";
// import RegSuccBanner5PNG from "../../assets/images/reg-succ-banner5.png";
// import Config from "../../config/config";
// import RegSuccButtonPNG from "../../assets/images/reg-succ-button.png";
// import RegSuccButtonHoverPNG from "../../assets/images/reg-succ-button-hover.png";
// import i18n from "../../utils/i18n";
// import BGJPG from "../../assets/images/bg.jpg";
// const Container = styled.div`
//   width: 100%;
//   background: url(${BGJPG});
// `;
// const Wrap = styled.div`
//   width: 1230px;
//   height: 759px;
//   margin: 50px auto;

//   background-color: rgba(21, 35, 38, 0.8);
// `;
// const Inner = styled.div`
//   width: 1203px;
//   height: 96%;
//   border-radius: 10px;
//   background-color: #ffffff;
//   margin: 20px auto;
// `;
// const HeaderContainer = styled.div`
//   width: 500px;
//   margin: 70px auto 0 425px;
// `;
// const SuccessIcon = styled.div`
//   height: 80px;
//   background: url(${RegSuccIconPNG}) no-repeat left center;
//   padding-left: 105px;
// `;
// const SuccessTitle = styled.div`
//   padding-top: 6px;
//   font-size: 24px;
//   font-weight: bold;
//   width: 400px;
//   color: #c0252d;
//   float: left;
// `;
// const SuccessDesc = styled.div`
//   font-size: 16px;

//   color: #818181;
//   margin-top: 10px;
//   float: left;
// `;
// const MainContent = styled.div`
//   width: 100%;
//   background-color: #fafafa;
//   border-top: solid 1px #dedede;
//   padding: 0 20px 0 20px;
//   margin: 70px 0 0 0;
// `;

// const BannerBig = styled.div`
//   width: 290px;
//   height: 460px;
//   float: left;
// `;
// const Banner1 = styled(BannerBig)`
//   background: url(${Config.sourceUrl + "/static/image/reg-succ-banner1.png"})
//     no-repeat;
//   margin: 40px 0 0 25px;
// `;
// const Banner2 = styled(BannerBig)`
//   background: url(${Config.sourceUrl + "/static/image/reg-succ-banner2.png"})
//     no-repeat;
//   margin: 40px 0 0 35px;
// `;

// const BannerSmall = styled.div`
//   width: 450px;
//   height: 150px;
//   float: left;

//   &:hover {
//     cursor: pointer;
//   }
// `;
// const BannerSmall1 = styled(BannerSmall)`
//   background: url(${Config.sourceUrl + "/static/image/reg-succ-banner3.png"})
//     no-repeat;
//   margin: 40px 0 0 35px;
// `;
// const BannerSmall2 = styled(BannerSmall)`
//   background: url(${Config.sourceUrl + "/static/image/reg-succ-banner4.png"})
//     no-repeat;
//   margin: 4px 0 0 35px;
// `;
// const BannerSmall3 = styled(BannerSmall)`
//   background: url(${Config.sourceUrl + "/static/image/reg-succ-banner5.png"})
//     no-repeat;
//   margin: 4px 0 0 35px;
// `;
// const ButtonContainer = styled.div`
//   width: 127px;
//   height: 62px;
//   margin: 345px auto 0 auto;
//   background: url(${RegSuccButtonPNG}) no-repeat;
//   &:hover {
//     background: url(${RegSuccButtonHoverPNG}) no-repeat;
//     cursor: pointer;
//   }
//   color: #ffffff;
//   font-size: 14px;
//   text-align: center;
//   padding-top: 12px;
// `;

// function RegisterSuccess(props) {
//   const handleVerificationClick = () => {
//     props.history.push("/" + i18n.language + "/account/profile");
//   };
//   const handleDepositClick = () => {
//     props.history.push("/" + i18n.language + "/account/deposit");
//   };
//   const handleAppDownloadClick = () => {
//     //alert("敬请期待");
//     props.history.push("/" + i18n.language + "/download");
//   };
//   const handleAbtDepositClick = () => {
//     handleOpenLink("/" + i18n.language + "/aboutus/deposit");
//   };
//   const handleRulesClick = () => {
//     handleOpenLink("/" + i18n.language + "/game-rules/1");
//   };
//   const handleOpenLink = (url) => {
//     Common.PopupCenter(url, "", 1280, 720);
//   };
//   return (
//     <Container>
//       <Wrap>
//         <Inner>
//           <HeaderContainer>
//             <SuccessIcon>
//               <SuccessTitle>恭喜您完成注册</SuccessTitle>

//               <SuccessDesc>
//                 亲爱的 {props.match.params.username}，欢迎您加入WG永高
//               </SuccessDesc>
//             </SuccessIcon>
//           </HeaderContainer>

//           <MainContent>
//             {/* <Banner1>
//               <ButtonContainer>
//                 <CustomButton
//                   width={190}
//                   height={44}
//                   name={"立即验证"}
//                   handleClick={handleVerificationClick}
//                 ></CustomButton>
//               </ButtonContainer>
//             </Banner1>

//             <Banner2>
//               <ButtonContainer>
//                 <CustomButton
//                   width={190}
//                   height={44}
//                   name={"立即存款"}
//                   handleClick={handleDepositClick}
//                 ></CustomButton>
//               </ButtonContainer>
//             </Banner2> */}
//             <Banner1>
//               <ButtonContainer onClick={handleVerificationClick}>
//                 立即验证
//               </ButtonContainer>
//             </Banner1>
//             <Banner2>
//               <ButtonContainer onClick={handleDepositClick}>
//                 立即存款
//               </ButtonContainer>
//             </Banner2>
//             <BannerSmall1 onClick={handleAppDownloadClick}></BannerSmall1>
//             <BannerSmall2 onClick={handleAbtDepositClick}></BannerSmall2>
//             <BannerSmall3 onClick={handleRulesClick}></BannerSmall3>
//           </MainContent>
//         </Inner>
//       </Wrap>
//     </Container>
//   );
// }

// export default withRouter(RegisterSuccess);
