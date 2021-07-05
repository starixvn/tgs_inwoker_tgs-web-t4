// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";

// import { withStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import TrianglePNG from "../../../assets/images/wap/triangle.png";
// import Button from "../../Wap/Share/Button";
// import Loading from "../../Wap/Share/Loading";
// // import VIPDesc from "../../../utils/VIPDesc";
// import Header from "../../Wap/Share/Header";

// // import { AccountService } from "../../../services/AccountService";
// import { AppHistory } from "../../../history/History";
// import { AccountService } from "../../../services/AccountService";
// // import { stat } from "fs";
// import VIPUtil from "../../../utils/VIPUtil";
// import Config from "../../../config/config";
// import i18n from "../../../utils/i18n";
// import VipCardBgPNG from "../../../assets/images/wap/vip-card-bg.png";
// const Container = styled.div`
//   width: 100%;
//   background-color: #2b2b2b;
// `;
// const HeaderContainer = styled.div`
//   height: 485px;
//   width: 100%;
// `;
// const HeaderContainerFixed = styled(HeaderContainer)`
//   position: fixed;
//   top: 0;
// `;
// const CardContainer = styled.div`
//   width: 723px;
//   height: 360px;
//   background: url(${VipCardBgPNG}) no-repeat center;
//   background-size: cover;
//   margin: 20px auto;
//   color: #c7c4a3;

//   padding: 40px 20px 0 20px;
// `;
// const CardUsername = styled.div`
//   font-size: 32px;
//   margin: 0 0 0 30px;
//   color: #2b2b2b;
//   float: left;
// `;
// const CardVIPContainer = styled.div`
//   width: 110px;
//   height: 40px;
//   background-color: #000;
//   border-radius: 20px;
//   background-image: url(${(props) => props.icon});
//   background-repeat: no-repeat;
//   background-position: 12px center;
//   float: left;
//   background-size: 35px 32px;
//   padding-left: 54px;
//   padding-top: 6px;
//   color: #fff;
//   margin-left: 20px;
//   font-size: 20px;
// `;
// const RulseArrow = styled.div`
//   color: #f3f3f3;
//   font-size: 20px;
//   float: right;
//   height: 40px;
//   border-radius: 20px 0 0 20px;
//   width: 90px;
//   background-color: #000;
//   background-repeat: no-repeat;
//   background-image: url(${TrianglePNG});
//   background-position: 68px center;
//   background-size: 16px 20px;
//   padding-left: 24px;
//   padding-top: 7px;
// `;
// const BarContainer = styled.div`
//   width: 90%;
//   margin: 50px auto 0 auto;
// `;
// const BarLevelText = styled.div`
//   color: #000;
//   font-size: 22px;
// `;
// const BarLevelTextLeft = styled(BarLevelText)`
//   float: left;
// `;
// const BarLevelTextRight = styled(BarLevelText)`
//   float: right;
// `;

// const Emptybar = styled.div`
//   background-color: #979797;
//   width: calc(100% - 80px);
//   height: 4px;
//   float: left;
//   margin: 12px;
// `;
// const Levelbar = styled.div`
//   background-color: #284f92;
//   width: ${(props) => props.percentage};
//   height: 4px;
// `;
// const LevelbarDesc = styled.div`
//   margin: 5px 0 0 40px;
//   font-size: 20px;

//   color: #676767;
// `;
// const PointContainer = styled.div`
//   float: left;
//   margin: 50px 60px 0 110px;
// `;
// const PointTitle = styled.div`
//   font-size: 18px;
//   text-align: center;
//   color: #000;
// `;
// const PointValue = styled.div`
//   font-size: 32px;

//   color: #000;
// `;
// const BenefitContainer = styled.div`
//   background-color: #fff;
//   width: 92%;
//   margin: 0 auto;
//   border-radius: 20px;
// `;
// const BenefitTitle = styled.div`
//   font-weight: 600;
//   float: left;
//   margin: 30px 0 30px 260px;

//   font-size: 32px;

//   color: #2c2c2c;
// `;
// const QuestionIcon = styled.div`
//   width: 26px;
//   height: 26px;
//   border-radius: 13px;
//   background-image: linear-gradient(to bottom, #ebce91, #d2a058);
//   float: left;
//   margin: 42px 0 0 5px;

//   font-size: 20px;
//   font-weight: 700;
//   padding-top: 1px;
//   text-align: center;
//   color: #ffffff;
// `;
// const SpliterFull = styled.div`
//   height: 2px;
//   background-color: #f3f3f3;
//   width: 100%;
// `;
// const SpliterHalf = styled.div`
//   height: 2px;
//   background-color: #f3f3f3;
//   width: 90%;
//   margin: 0 auto;
// `;
// const RowContainer = styled.div`
//   height: 90px;
//   padding: 0 30px;
// `;
// const BenefitIcon = styled.div`
//   width: 40px;
//   height: 90px;
//   background: url(${(props) => props.icon}) no-repeat left center;
//   float: left;
//   margin: 0px 0 0 20px;
// `;
// const BenefitDesc = styled.div`
//   font-size: 28px;
//   color: #504b4c;
//   float: left;
//   margin: 25px 0 0 5px;
// `;
// const BenefitValue = styled.div`
//   font-weight: 600;
//   font-size: 28px;
//   color: #ff3330;
//   float: right;
//   text-align: right;
//   margin: 25px 10px 0 0px;
// `;
// const TipsContainer = styled.div`
//   background-color: #fff;
//   width: 100%;
//   margin: 0 auto;
// `;
// const TipsTitle = styled.div`
//   color: #2c2c2c;
//   font-size: 32px;
//   font-weight: 500;
//   width: 100%;
//   height: 95px;
//   padding-top: 35px;
//   padding-left: 30px;
// `;
// const TipsCloseButton = styled.div`
//   height: 160px;
//   color: #e73c40;
//   font-weight: 600;
//   font-size: 32px;
//   text-align: center;

//   margin-top: 40px;
//   padding-top: 16px;
// `;
// const ContentWrap = styled.div`
//   padding: 0 24px;
//   margin: 20px 5px 0 5px;
// `;
// const ContentCount = styled.div`
//   background-color: #284f92;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   float: left;
//   color: #fff;
//   font-size: 24px;
//   text-align: center;
//   padding-top: 3px;
//   margin-top: 5px;
// `;
// const Content = styled.div`
//   float: left;
//   font-size: 28px;
//   color: #666666;
//   width: calc(100% - 50px);
//   margin-left: 10px;
// `;
// const StyledDialog = withStyles((theme) => ({
//   paper: { borderRadius: "35px" },
// }))(Dialog);
// class VIP extends Component {
//   state = { open: false };
//   componentDidMount() {
//     if (this.props.token != null) {
//       this.props.getVIPInfo(this.props.token);
//     }
//   }
//   componentDidUpdate(preProps) {}
//   handleBackClick = () => {
//     AppHistory.goBack();
//   };
//   handleClose = () => {
//     this.setState({ ...this.state, open: false });
//   };
//   render() {
//     // const info = this.props.vipInfo.status;
//     // const vipSetting = this.props.vipInfo.settings.find(element => {
//     //   return element.levelID === info.levelID;
//     // });
//     // if (!vipSetting) {
//     //   return <BenefitTitle>Error</BenefitTitle>;
//     // }
//     const icon = VIPUtil.getVIPIcon(this.props.account.vip.curr_vip.id);
//     return (
//       <Container>
//         <Header
//           position={"fixed"}
//           background={false}
//           onBackClick={this.handleBackClick}
//           title={"VIP"}
//         ></Header>
//         <CardContainer>
//           <CardUsername>{this.props.account.info.member_username}</CardUsername>
//           <CardVIPContainer icon={icon}>
//             {this.props.account.vip.curr_vip.title}
//           </CardVIPContainer>
//           <RulseArrow
//             onClick={() =>
//               AppHistory.push("/" + i18n.language + "/vip/details")
//             }
//           >
//             规则
//           </RulseArrow>
//           <div className="clear"></div>
//           <BarContainer>
//             <BarLevelTextLeft>
//               V{this.props.account.vip.curr_vip.id - 1}
//             </BarLevelTextLeft>
//             <Emptybar>
//               <Levelbar
//                 percentage={this.props.account.vip.vip_progress_bar + "%"}
//               ></Levelbar>
//             </Emptybar>
//             <BarLevelTextRight>
//               V{this.props.account.vip.next_vip.id - 1}
//             </BarLevelTextRight>
//             <div className="clear"></div>
//             <LevelbarDesc>
//               晋级下级VIP所需积分：
//               {this.props.account.vip.owned_point} /
//               {this.props.account.vip.next_point}
//             </LevelbarDesc>
//           </BarContainer>

//           <PointContainer>
//             <PointTitle>月度积分</PointTitle>
//             <PointValue>
//               {this.props.account.info.month_vip.curr_owned_point}
//             </PointValue>
//           </PointContainer>

//           <PointContainer>
//             <PointTitle>年度积分</PointTitle>
//             <PointValue>
//               {this.props.account.info.year_vip.curr_owned_point}
//             </PointValue>
//           </PointContainer>
//         </CardContainer>

//         <BenefitContainer>
//           <BenefitTitle>会员权益</BenefitTitle>
//           <QuestionIcon
//             onClick={() => this.setState({ ...this.state, open: true })}
//           >
//             ?
//           </QuestionIcon>
//           <SpliterFull></SpliterFull>
//           {VIPUtil.getVIPBenefitList(this.props.account.vip.curr_vip.id).map(
//             (row, index) => {
//               return (
//                 <div key={index}>
//                   <RowContainer>
//                     <BenefitIcon icon={row.icon}></BenefitIcon>
//                     <BenefitDesc>{row.name}</BenefitDesc>
//                     <BenefitValue>{row.value}</BenefitValue>
//                   </RowContainer>
//                 </div>
//               );
//             }
//           )}
//         </BenefitContainer>
//         <StyledDialog onClose={this.handleClose} open={this.state.open}>
//           <TipsContainer>
//             <TipsTitle>备注</TipsTitle>

//             {VIPUtil.getVIPTipsList().map((row, index) => {
//               return (
//                 <ContentWrap key={index}>
//                   <ContentCount>{index + 1}</ContentCount>
//                   <Content>{row}</Content>
//                 </ContentWrap>
//               );
//             })}
//           </TipsContainer>
//           <TipsCloseButton>
//             <Button
//               onClick={() => this.setState({ ...this.state, open: false })}
//               label={"知道了"}
//               style={{
//                 width: "250px",
//                 height: "92px",
//                 margin: "0 auto ",
//               }}
//             ></Button>
//           </TipsCloseButton>
//         </StyledDialog>

//         <Button
//           label={"查看规则与特权"}
//           style={{ margin: "20px auto" }}
//           onClick={() => AppHistory.push("/" + i18n.language + "/vip/details")}
//         ></Button>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     mainContainerHeight: state.ui.mainContainerHeight,
//     token: state.account.token,

//     account: state.account,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getVIPInfo: (token) => dispatch(accountAction.getVIPInfo(token)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(VIP);
