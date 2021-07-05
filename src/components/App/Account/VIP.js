// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import IconVIPRedPNG from "../../../assets/images/icon-vip-red.png";
// import VIPBg2JPG from "../../../assets/images/vip-bg2.jpg";
// import VipProgressBar from "../../../assets/images/vip-progress-bar.png";
// import VipBg3JPG from "../../../assets/images/vip-bg3.jpg";
// import CustomButton from "../../Share/Button";
// import VIPDesc from "../../../config/vip-desc";
// import Level0PNG from "../../../assets/images/vip/level0.png";
// import Level1PNG from "../../../assets/images/vip/level1.png";
// import Level2PNG from "../../../assets/images/vip/level2.png";
// import Level3PNG from "../../../assets/images/vip/level3.png";
// import Level4PNG from "../../../assets/images/vip/level4.png";
// import Level5PNG from "../../../assets/images/vip/level5.png";
// import Config from "../../../config/config";
// const Container = styled.div`
//   padding: 20px 28px;
//   box-sizing: border-box
//   background-color: #e9e9e9;
//   width: 100%;
//   min-height: 611px;
// `;
// const Title = styled.div`
//   color: #c0252d;
// `;
// const TitleIcon = styled.div`
//   margin-top: 4px;
//   box-sizing: border-box;
//   width: 24px;
//   height: 16px;
//   background: url(${IconVIPRedPNG}) no-repeat;

//   float: left;
// `;
// const InnerWrap = styled.div`
//   width: 935px;

//   margin-top: 18px;
//   box-sizing: border-box;
//   background-color: #f7f7f7;
//   padding: 25px;
// `;
// const TopBG = styled.div`
//   width: 870px;
//   height: 200px;
//   background: url(${Config.sourceUrl + "/static/image/vip-bg2.jpg"}) no-repeat;
// `;
// const LeftVIPBadgeContainer = styled.div`
//   float: left;
//   margin: 31px 0 0 160px;
//   width: 118px;
// `;
// const LeftVIPBadge = styled.img`
//   width: 118px;
// `;
// const RightVIPBadgeContainer = styled.div`
//   float: right;
//   margin: 31px 160px 0 0;
//   width: 118px;
// `;
// const VIPTitleLabel = styled.div`
//   font-size: 16px;
//   font-family: "Arial";
//   color: rgb(254, 255, 176);
//   font-weight: bold;
//   text-align: center;
//   margin-top: 10px;
// `;
// const RightVIPBadge = styled.img`
//   width: 118px;
// `;
// const BarContainer = styled.div`
//   float: left;
//   margin: 60px 0 0 20px;
// `;
// const BarProgress = styled.div`
//   width: 100%;
//   height: 27px;
//   background-image: linear-gradient(to top, #edcc7f, #faf0b2, #edcc7f, #faf0b2);
//   float: left;
//   margin: 3px 10px 0 3px;
//   border-radius: 14px 14px 14px 14px;
//   box-shadow: inset 0 0 6px;
//   float: left;
// `;
// const BarProgressText = styled.div`
//   margin-top: 9px;
//   text-shadow: 0 0 3px #faf0b2;
//   position: absolute;
//   z-index: 1;
//   width: 100%;
//   text-align: center;
// `;
// const BarFrame = styled.div`
//   background: url(${VipProgressBar}) no-repeat;
//   width: 272px;
//   height: 33px;
//   color: #000000;
//   font-family: Arial;
//   font-size: 16px;
//   font-weight: bold;
//   position: relative;
//   padding-right: 6px;
//   box-sizing: border-box;
// `;
// const BarText = styled.div`
//   color: #feffb0;
//   font-size: 14px;
//   text-align: center;
//   margin-top: 4px;
// `;
// const VIPImageTitleMapping = {
//   VIP0: Config.sourceUrl + "/static/image/level0.png",
//   VIP1: Config.sourceUrl + "/static/image/level1.png",
//   VIP2: Config.sourceUrl + "/static/image/level2.png",
//   VIP3: Config.sourceUrl + "/static/image/level3.png",
//   VIP4: Config.sourceUrl + "/static/image/level4.png",
//   VIP5: Config.sourceUrl + "/static/image/level5.png"
// };
// const VipDescContainer = styled.div`
//   margin: 29px 17px;
//   float: left;
//   border: solid 1px #cbcbcb;
//   border-radius: 5px;
// `;
// const VipDescHeaderContainer = styled.div`
//   width: 400px;
//   height: 100px;
//   background: url(${Config.sourceUrl + "/static/image/vip-bg3.jpg"}) no-repeat;
// `;
// const HeaderTextLine1 = styled.div`
//   font-size: 14px;

//   color: #ffffff;
//   margin: 21px 0 0 19px;
// `;
// const HeaderTextLine2 = styled.div`
//   font-size: 21.5px;
//   font-weight: bold;
//   margin:5px 0 0 19px
//   color: #fde73f;
// `;
// const DescItemContainer = styled.div`
//   margin-left: 8px;
//   border-top: solid 1px #cbcbcb;
//   height: 34px;
// `;
// const DescItemContainerEmpty = styled(DescItemContainer)`
//   border-top: none;
// `;
// const DescItemCount = styled.div`
//   width: 17px;
//   height: 17px;
//   background-color: #dc4048;
//   border-radius: 50%;
//   color: #fff;
//   font-size: 12px;
//   text-align: center;
//   float: left;
//   margin-top: 8px;
//   margin-left: 8px;
// `;
// const DescText = styled.div`
//   font-size: 12px;
//   float: left;
//   color: #16242a;
//   margin: 9px 0 0 6px;
//   width: 360px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// const ButtonContainer = styled.div`
//   margin: 0 auto;
//   width: 265px;
// `;
// class VIP extends Component {
//   componentDidMount() {}
//   getVipBadge = vipTitle => {
//     let img = VIPImageTitleMapping[vipTitle];
//     if (img) {
//       return img;
//     } else {
//       return null;
//     }
//   };
//   replaceDesc = (text, jsonArray) => {
//     let result = text;
//     for (let k in jsonArray) {
//       result = result.replace("<" + k + ">", jsonArray[k]);
//     }
//     return result;
//   };
//   getDesc = (vip, others) => {
//     const desc = VIPDesc[vip.title];
//     const othersDesc = VIPDesc[others.title];

//     let result = [];
//     if (desc) {
//       const length =
//         desc.length < othersDesc.length ? othersDesc.length : desc.length;
//       for (let i = 0; i < length; i++) {
//         if (desc[i]) {
//           result.push(
//             <DescItemContainer key={i}>
//               <DescItemCount>{i + 1}</DescItemCount>
//               <DescText>{this.replaceDesc(desc[i], vip)}</DescText>
//             </DescItemContainer>
//           );
//         } else {
//           result.push(
//             <DescItemContainerEmpty key={i}></DescItemContainerEmpty>
//           );
//         }
//       }
//     }
//     return result;
//   };
//   render() {
//     return (
//       <Container>
//         <Title>
//           <TitleIcon></TitleIcon>
//           VIP专属
//         </Title>
//         <InnerWrap>
//           <TopBG>
//             <LeftVIPBadgeContainer>
//               <LeftVIPBadge
//                 src={this.getVipBadge(this.props.account.vip.curr_vip.title)}
//               ></LeftVIPBadge>
//               <VIPTitleLabel
//                 style={
//                   this.props.account.vip.curr_vip.title === "VIP0"
//                     ? { color: "rgb(254, 254, 254)" }
//                     : {}
//                 }
//               >
//                 {this.props.account.vip.curr_vip.title}
//               </VIPTitleLabel>
//             </LeftVIPBadgeContainer>

//             <BarContainer>
//               <BarFrame>
//                 <BarProgress
//                   style={{
//                     width: this.props.account.vip.vip_progress_bar + "%"
//                   }}
//                 ></BarProgress>
//                 <BarProgressText>
//                   {this.props.account.vip.owned_point}/
//                   {this.props.account.vip.next_point}
//                 </BarProgressText>
//               </BarFrame>
//               <BarText>
//                 晋级下级VIP所需经验 : {this.props.account.vip.require_point}
//               </BarText>
//             </BarContainer>
//             <RightVIPBadgeContainer>
//               <RightVIPBadge
//                 src={this.getVipBadge(this.props.account.vip.next_vip.title)}
//               ></RightVIPBadge>
//               <VIPTitleLabel>
//                 {this.props.account.vip.next_vip.title}
//               </VIPTitleLabel>
//             </RightVIPBadgeContainer>
//           </TopBG>

//           <VipDescContainer>
//             <VipDescHeaderContainer>
//               <HeaderTextLine1>
//                 您当前为{this.props.account.vip.curr_vip.title}会员，
//               </HeaderTextLine1>
//               <HeaderTextLine2>可享受以下权益</HeaderTextLine2>
//             </VipDescHeaderContainer>
//             {this.getDesc(
//               this.props.account.vip.curr_vip,
//               this.props.account.vip.next_vip
//             )}
//           </VipDescContainer>
//           <VipDescContainer>
//             <VipDescHeaderContainer>
//               <HeaderTextLine1>
//                 晋升到{this.props.account.vip.next_vip.title}会员，
//               </HeaderTextLine1>
//               <HeaderTextLine2>可享受以下权益</HeaderTextLine2>
//             </VipDescHeaderContainer>
//             {this.getDesc(
//               this.props.account.vip.next_vip,
//               this.props.account.vip.curr_vip
//             )}
//           </VipDescContainer>

//           <div className="clear"></div>
//           <ButtonContainer>
//             <CustomButton
//               name="查看更多"
//               handleClick={this.props.onhandleMoreBenefitClick}
//               width={260}
//             ></CustomButton>
//           </ButtonContainer>
//         </InnerWrap>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     // screenWidth: state.ui.screenWidth,
//     // screenHeight: state.ui.screenHeight,
//     account: state.account
//   };
// };
// export default connect(mapStateToProps, null)(VIP);
