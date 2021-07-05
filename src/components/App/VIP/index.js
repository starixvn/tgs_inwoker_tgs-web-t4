// import React, { Component } from "react";
// import styled from "styled-components";

// import VIPMainBg1JPG from "../../../assets/images/vip-main-bg1.jpg";
// import VIPMainBg2JPG from "../../../assets/images/vip-main-bg2.jpg";
// import VIPDesc from "../../../config/vip-desc";
// import Level1PNG from "../../../assets/images/vip/level1.png";
// import Level2PNG from "../../../assets/images/vip/level2.png";
// import Level3PNG from "../../../assets/images/vip/level3.png";
// import Level4PNG from "../../../assets/images/vip/level4.png";
// import Level5PNG from "../../../assets/images/vip/level5.png";
// import Slider from "react-slick";
// import ArrowGoldPNG from "../../../assets/images/arrow-gold.png";
// import Vip1DescFramePNG from "../../../assets/images/vip1-desc-frame.png";
// import Vip2DescFramePNG from "../../../assets/images/vip2-desc-frame.png";
// import Vip3DescFramePNG from "../../../assets/images/vip3-desc-frame.png";
// import Vip4DescFramePNG from "../../../assets/images/vip4-desc-frame.png";
// import Vip5DescFramePNG from "../../../assets/images/vip5-desc-frame.png";
// import VipBenefitPNG from "../../../assets/images/vip-benefit.png";

// import Config from "../../../config/config";
// const Container = styled.div`
//   background: url(${Config.sourceUrl + "/static/image/vip-main-bg1.jpg"})
//       no-repeat center 0,
//     url(${Config.sourceUrl + "/static/image/vip-main-bg2.jpg"}) no-repeat center
//       468px;
//   width: 100%;
//   min-height: 1908px;
//   position: relative;
// `;
// const InnerContainer = styled.div`
//   margin: 540px auto 0 auto;
//   width: 1280px;
// `;

// const Row = styled.div``;
// const ColHeader = styled.div`
//   width: 140px;
//   height: 221px;
//   background-color: #1c2d38;
//   margin-right: 30px;
//   float: left;

//   font-size: 14px;
//   padding: 80px 0 0 30px;
//   color: #fff;
// `;
// const ColHeader2 = styled(ColHeader)`
//   width: 140px;
//   height: 121px;
//   padding: 0;
// `;
// const Line1 = styled.div`
//   text-align: center;
//   margin-top: 20px;
// `;
// const Line2 = styled.div`
//   text-align: center;
//   margin-top: 40px;
// `;

// const VipImageContainer = styled.div`
//   width: 220px;

//   float: left;
// `;
// const VipImageFrame = styled.div`
//   width: 100%;
//   height: 170px;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const VipText = styled.div`
//   font-family: Arial;
//   font-size: 24px;
//   font-weight: bold;
//   margin-top: 15px;
//   text-align: center;
//   color: #feffb0;
// `;
// const VIP1Container = styled(VipImageFrame)`
//   background: url(${Config.sourceUrl + "/static/image/level1.png"}) no-repeat
//     center;
// `;
// const VIP2Container = styled(VipImageFrame)`
//   background: url(${Config.sourceUrl + "/static/image/level2.png"}) no-repeat
//     center;
// `;
// const VIP3Container = styled(VipImageFrame)`
//   background: url(${Config.sourceUrl + "/static/image/level3.png"}) no-repeat
//     center;
// `;
// const VIP4Container = styled(VipImageFrame)`
//   background: url(${Config.sourceUrl + "/static/image/level4.png"}) no-repeat
//     center;
// `;
// const VIP5Container = styled(VipImageFrame)`
//   background: url(${Config.sourceUrl + "/static/image/level5.png"}) no-repeat
//     center;
// `;
// const SplitLine = styled.div`
//   width: 1280px;
//   height: 1px;
//   margin:18px 0
//   background-image: linear-gradient(
//     to top,
//     #f39c11,
//     #feff9a,
//     #feff9a,
//     #ffcb2c,
//     #f2a016,
//     #ffc43c,
//     #ffff72,
//     #feffaf,
//     #feff6e
//   );
// `;
// const Content = styled(VipImageContainer)`
//   color: #ffffff;
//   font-size: 20px;
//   line-height: 20px;
// `;
// const VipDetailsContainer = styled.div`
//   margin-top: 80px;
// `;

// const ArrowImg = styled.div`
//   background: url(${ArrowGoldPNG}) no-repeat;
//   width: 44px;
//   height: 57px;
// `;
// const ArrowImgLeft = styled(ArrowImg)`
//   transform: rotateY(180deg);
//   position: absolute;
//   top: 270px
// z-index:1;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const ArrowImgRight = styled(ArrowImg)`
//   position: absolute;
//   top: 270px
//   right: 0px;
//   z-index:1;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const CenterContainer = styled.div`
//   margin: 0 auto;
//   width: 1100px;
// `;
// const DescFrame = styled.div`
//   width: 550px;
//   height: 625px;
//   &:focus {
//     outline: none;
//   }
//   ${(props) => {
//     if (props.level === 1) {
//       return `  background: url(${
//         Config.sourceUrl + "/static/image/vip1-desc-frame.png"
//       }) no-repeat center;`;
//     } else if (props.level === 2) {
//       return `  background: url(${
//         Config.sourceUrl + "/static/image/vip2-desc-frame.png"
//       }) no-repeat center;`;
//     } else if (props.level === 3) {
//       return `  background: url(${
//         Config.sourceUrl + "/static/image/vip3-desc-frame.png"
//       }) no-repeat center;`;
//     } else if (props.level === 4) {
//       return `  background: url(${
//         Config.sourceUrl + "/static/image/vip4-desc-frame.png"
//       }) no-repeat center;`;
//     } else if (props.level === 5) {
//       return `  background: url(${
//         Config.sourceUrl + "/static/image/vip5-desc-frame.png"
//       }) no-repeat center;`;
//     }
//   }}
// `;
// const DescText = styled.div`
//   width: 357px;

//   text-shadow: 2.5px 4.3px 4px rgba(7, 0, 2, 0.75);

//   font-size: 16px;

//   color: #fefdd9;
//   margin: 130px auto 0 auto;
//   line-height: 29px;
// `;
// const FooterDesc = styled.div`
//   width: 969px;
//   height: 178px;
//   opacity: 0.79;
//   border: solid 1px #6a6a6a;
//   background-color: rgba(0, 0, 0, 0.8);
//   margin-top: 51px;
//   text-align: center;
//   color: #d2d2d2;
//   font-size: 16px;
//   padding: 20px 0 0 0px;
//   margin: 51px auto 0 auto;
// `;
// const CurrentLevel = styled.div`
//   width: 100px;
//   height: 30px;
//   background: url(${VipBenefitPNG}) no-repeat;
//   margin: 110px 0 0 320px;
// `;
// function PrevArrow({ onClick }) {
//   return <ArrowImgLeft onClick={onClick} />;
// }
// function NextArrow({ onClick }) {
//   return <ArrowImgRight onClick={onClick} />;
// }
// class VIP extends Component {
//   state = {
//     leftLevel: 1,
//     rightLevel: 2,
//   };

//   handlePreClick = () => {
//     let left = this.state.leftLevel;
//     let right = this.state.rightLevel;
//     if (left >= 2) {
//       left -= 1;
//       right -= 1;
//     }
//     this.setState({ leftLevel: left, rightLevel: right });
//   };
//   handleNextClick = () => {
//     let left = this.state.leftLevel;
//     let right = this.state.rightLevel;
//     if (right <= 4) {
//       left += 1;
//       right += 1;
//     }
//     this.setState({ leftLevel: left, rightLevel: right });
//   };
//   handleVipClick = (vip) => {
//     let goTo = 0;
//     if (vip < 5) {
//       goTo = vip - 1;
//     } else {
//       goTo = 3;
//     }
//     this.slider.slickGoTo(goTo);
//   };
//   render() {
//     var settings = {
//       dots: false,
//       infinite: false,
//       speed: 500,
//       slidesToShow: 2,
//       slidesToScroll: 1,
//       arrows: true,
//       centerPadding: "0px",
//       centerMode: false,
//       prevArrow: <PrevArrow />,
//       nextArrow: <NextArrow />,
//     };
//     return (
//       <Container>
//         <InnerContainer>
//           <Row>
//             <ColHeader>
//               点击VIP图标
//               <br />
//               查看详情
//             </ColHeader>
//             <VipImageContainer>
//               <VIP1Container
//                 onClick={() => this.handleVipClick(1)}
//               ></VIP1Container>
//               <VipText>VIP 1</VipText>
//             </VipImageContainer>
//             <VipImageContainer>
//               <VIP2Container
//                 onClick={() => this.handleVipClick(2)}
//               ></VIP2Container>
//               <VipText>VIP 2</VipText>
//             </VipImageContainer>
//             <VipImageContainer>
//               <VIP3Container
//                 onClick={() => this.handleVipClick(3)}
//               ></VIP3Container>
//               <VipText>VIP 3</VipText>
//             </VipImageContainer>
//             <VipImageContainer>
//               <VIP4Container
//                 onClick={() => this.handleVipClick(4)}
//               ></VIP4Container>
//               <VipText>VIP 4</VipText>
//             </VipImageContainer>
//             <VipImageContainer>
//               <VIP5Container
//                 onClick={() => this.handleVipClick(5)}
//               ></VIP5Container>
//               <VipText>VIP 5</VipText>
//             </VipImageContainer>
//           </Row>
//           <SplitLine></SplitLine>
//           <Row>
//             <ColHeader2>
//               <Line1>月度资格积分</Line1>
//               <Line2>年度资格积分</Line2>
//             </ColHeader2>
//             <Content>
//               <Line1>3000</Line1>
//               <Line2>30000</Line2>
//             </Content>
//             <Content>
//               <Line1>8000</Line1>
//               <Line2>80000</Line2>
//             </Content>
//             <Content>
//               <Line1>25000</Line1>
//               <Line2>250000</Line2>
//             </Content>
//             <Content>
//               <Line1>75000</Line1>
//               <Line2>750000</Line2>
//             </Content>
//             <Content>
//               <Line1>350000</Line1>
//               <Line2>2500000</Line2>
//             </Content>
//           </Row>
//           <VipDetailsContainer>
//             <CenterContainer>
//               <Slider {...settings} ref={(slider) => (this.slider = slider)}>
//                 <DescFrame level={1}>
//                   <CurrentLevel
//                     style={
//                       this.props.vip === "VIP1"
//                         ? { opacity: 1 }
//                         : { opacity: 0 }
//                     }
//                   ></CurrentLevel>
//                   <DescText>
//                     <ol>
//                       {VIPDesc["VIP1"].map((row, index) => (
//                         <li key={index}>{row}</li>
//                       ))}
//                     </ol>
//                   </DescText>
//                 </DescFrame>
//                 <DescFrame level={2}>
//                   <CurrentLevel
//                     style={
//                       this.props.vip === "VIP2"
//                         ? { opacity: 1 }
//                         : { opacity: 0 }
//                     }
//                   ></CurrentLevel>
//                   <DescText>
//                     <ol>
//                       {VIPDesc["VIP2"].map((row, index) => (
//                         <li key={index}>{row}</li>
//                       ))}
//                     </ol>
//                   </DescText>
//                 </DescFrame>
//                 <DescFrame level={3}>
//                   <CurrentLevel
//                     style={
//                       this.props.vip === "VIP3"
//                         ? { opacity: 1 }
//                         : { opacity: 0 }
//                     }
//                   ></CurrentLevel>
//                   <DescText>
//                     <ol>
//                       {VIPDesc["VIP3"].map((row, index) => (
//                         <li key={index}>{row}</li>
//                       ))}
//                     </ol>
//                   </DescText>
//                 </DescFrame>
//                 <DescFrame level={4}>
//                   <CurrentLevel
//                     style={
//                       this.props.vip === "VIP4"
//                         ? { opacity: 1 }
//                         : { opacity: 0 }
//                     }
//                   ></CurrentLevel>
//                   <DescText>
//                     <ol>
//                       {VIPDesc["VIP4"].map((row, index) => (
//                         <li key={index}>{row}</li>
//                       ))}
//                     </ol>
//                   </DescText>
//                 </DescFrame>
//                 <DescFrame level={5}>
//                   <CurrentLevel
//                     style={
//                       this.props.vip === "VIP5"
//                         ? { opacity: 1 }
//                         : { opacity: 0 }
//                     }
//                   ></CurrentLevel>
//                   <DescText>
//                     <ol>
//                       {VIPDesc["VIP5"].map((row, index) => (
//                         <li key={index}>{row}</li>
//                       ))}
//                     </ol>
//                   </DescText>
//                 </DescFrame>
//               </Slider>
//             </CenterContainer>
//             <FooterDesc>
//               备注
//               <br />
//               <br />
//               1). VIP存款优惠所需流水额的计算公式为： （存款+红利） X 1倍流水。
//               <br />
//               2).
//               会员需在每个月３号早上0点前完成实名、手机与邮箱认证，方可领取本活动优惠。
//               <br />
//               3). VIP存款优惠红利
//               ，每月3号中午12点依据上个月VIP等级及最高单笔额度存款进行派发。
//               <br />
//               4).
//               VIP复活金于每月3号中午12点发放，依据会员在上一月的VIP等级计算发放上限。
//               <br />
//               5).
//               VIP每级晋升奖金只可领取一次。例：已经领取过VIP1的888奖金的，如果再次晋升VIP1时，将不会再次发放。{" "}
//               <br />
//             </FooterDesc>
//           </VipDetailsContainer>
//         </InnerContainer>
//       </Container>
//     );
//   }
// }

// export default VIP;
