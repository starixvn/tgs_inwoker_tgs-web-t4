// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";

// import vip01PNG from "../../../assets/images/wap/vip_01.png";
// import vip02PNG from "../../../assets/images/wap/vip_02.png";
// import vip03PNG from "../../../assets/images/wap/vip_03.png";
// import vip04PNG from "../../../assets/images/wap/vip_04.png";
// import vip05PNG from "../../../assets/images/wap/vip_05.png";
// import VipLogoPNG from "../../../assets/images/wap/vip-logo.png";
// import IconTopPNG from "../../../assets/images/wap/icon-top.png";
// import { withStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import Header from "../../Wap/Share/Header";
// import Button from "../../Wap/Share/Button";
// import { AppHistory } from "../../../history/History";
// import VIPUtil from "../../../utils/VIPUtil";
// import Common from "../../../utils/Common";
// import Config from "../../../config/config";
// import VipCardBgPNG from "../../../assets/images/wap/vip-card-bg.png";
// const Container = styled.div`
//   width: 100%;
//   background-color: #2b2b2b;
// `;
// const HeaderContainer = styled.div`
//   height: 675px;
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
//   color: #2b2b2b;

//   padding: 40px 20px 0 20px;
// `;
// const CardHeaderContainer = styled.div`
//   float: left;
// `;
// const CardCrown = styled.div`
//   width: 30px;
//   height: 35px;
//   float: left;
// `;
// const CardVIP = styled.div`
//   width: 80px;
//   height: 35px;
//   float: left;
// `;
// const CardVIPLevel = styled.div`
//   width: 62px;
//   height: 35px;
//   float: left;
// `;

// const CardVIPContainer = styled.div`
//   width: 176px;
//   height: 112px;

//   background: url(${VipLogoPNG}) no-repeat center;

//   background-size: contain;
//   margin: 0 auto;
// `;
// const RequirementContainer = styled.div`
//   margin: 40px 0 0 0;
// `;
// const RequirementLabel = styled.div`
//   font-size: 26px;
//   float: left;
//   margin-top: 10px;
//   margin-left: 70px;
//   width: 120px;
// `;
// const MonthContainer = styled.div`
//   width: 220px;
//   height: 125px;

//   float: left;
//   margin: 0 0 0 20px;
// `;
// const MonthContainerLabel = styled.div`
//   font-size: 22px;
//   font-weight: normal;

//   margin-top: 10px;
// `;
// const MonthContainerValue = styled.div`
//   font-size: 32px;

//   margin-top: 10px;
// `;
// const LevelSelectionContainer = styled.div`
//   width: 92%;
//   height: 160px;
//   background-color: #fff;
//   border-radius: 20px;
//   margin: 0 auto;
//   padding: 15px 20px;
// `;
// const SelectionColumn = styled.div`
//   width: 110px;
//   height: 110px;

//   background-image: url(${(props) => props.icon});
//   background-repeat: no-repeat;
//   background-position: center 10px;
//   padding-top: 80px;
//   color: ${(props) => (props.selected ? `#d09f58` : `#284f92`)};
//   font-size: 24px;
//   font-weight: 600;
//   border-radius: 50%;
//   margin: 10px;
//   float: left;
//   text-align: center;
// `;
// const BenefitContainer = styled.div`
//   background-color: #fff;
//   width: 92%;
//   margin: 20px auto 0 auto;
//   border-radius: 20px;
// `;
// const BenefitTitle = styled.div`
//   font-weight: 600;
//   float: left;
//   margin: 30px 0 30px 260px;

//   font-size: 32px;

//   color: #2c2c2c;
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
// const VIPTnCContainer = styled.div`
//   background-color: #fff;
//   width: 92%;
//   margin: 20px auto;
//   border-radius: 20px;
//   padding-bottom: 50px;
// `;
// const ContentWrap = styled.div`
//   padding: 0 30px;
//   margin: 20px 5px 0 5px;
// `;
// const ContentCount = styled.div`
//   background-color: #d09f58;
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
// const TnCFooter = styled.div`
//   font-size: 26px;
//   color: #9c9c9c;
//   text-align: center;
//   margin: 30px 0;
// `;
// const IconBacktoTop = styled.div`
//   background: url(${IconTopPNG}) no-repeat;
//   width: 136px;
//   height: 132px;
//   margin: 0 auto 40px auto;
// `;
// const StyledDialog = withStyles((theme) => ({
//   paper: { borderRadius: "35px" },
// }))(Dialog);
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
// class VIPDetails extends Component {
//   state = { selectedIndex: 0 };
//   componentDidMount() {}

//   handleBackClick = () => {
//     AppHistory.goBack();
//   };

//   render() {
//     return (
//       <Container>
//         <Header
//           background={false}
//           onBackClick={this.handleBackClick}
//           title={"VIP详情"}
//         ></Header>
//         <CardContainer>
//           <CardVIPContainer
//             icon={VIPUtil.getVIPIcon(this.props.account.vip.curr_vip.id)}
//           ></CardVIPContainer>

//           <div className="clear"></div>

//           <RequirementContainer>
//             <RequirementLabel>
//               LV{this.state.selectedIndex + 1}要求
//             </RequirementLabel>
//             <MonthContainer>
//               <MonthContainerLabel>月度积分</MonthContainerLabel>
//               <MonthContainerValue>
//                 {Common.formatNumberWithThousand(
//                   VIPUtil.getVIPRequiredPoint(this.state.selectedIndex + 2)
//                     .month
//                 )}
//               </MonthContainerValue>
//             </MonthContainer>
//             <MonthContainer>
//               <MonthContainerLabel>年度积分</MonthContainerLabel>
//               <MonthContainerValue>
//                 {Common.formatNumberWithThousand(
//                   VIPUtil.getVIPRequiredPoint(this.state.selectedIndex + 2).year
//                 )}
//               </MonthContainerValue>
//             </MonthContainer>
//           </RequirementContainer>
//         </CardContainer>
//         <LevelSelectionContainer>
//           <SelectionColumn
//             icon={vip01PNG}
//             selected={this.state.selectedIndex === 0}
//             onClick={() => this.setState({ ...this.state, selectedIndex: 0 })}
//           >
//             VIP1
//           </SelectionColumn>
//           <SelectionColumn
//             icon={vip02PNG}
//             selected={this.state.selectedIndex === 1}
//             onClick={() => this.setState({ ...this.state, selectedIndex: 1 })}
//           >
//             VIP2
//           </SelectionColumn>
//           <SelectionColumn
//             icon={vip03PNG}
//             selected={this.state.selectedIndex === 2}
//             onClick={() => this.setState({ ...this.state, selectedIndex: 2 })}
//           >
//             VIP3
//           </SelectionColumn>
//           <SelectionColumn
//             icon={vip04PNG}
//             selected={this.state.selectedIndex === 3}
//             onClick={() => this.setState({ ...this.state, selectedIndex: 3 })}
//           >
//             VIP4
//           </SelectionColumn>
//           <SelectionColumn
//             icon={vip05PNG}
//             selected={this.state.selectedIndex === 4}
//             onClick={() => this.setState({ ...this.state, selectedIndex: 4 })}
//           >
//             VIP5
//           </SelectionColumn>
//         </LevelSelectionContainer>

//         <BenefitContainer>
//           <BenefitTitle>会员权益</BenefitTitle>
//           <QuestionIcon
//             onClick={() => this.setState({ ...this.state, open: true })}
//           >
//             ?
//           </QuestionIcon>
//           <SpliterFull></SpliterFull>
//           {VIPUtil.getVIPBenefitList(this.state.selectedIndex + 2).map(
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
//         <VIPTnCContainer>
//           <BenefitTitle>VIP条款与规则</BenefitTitle>
//           <SpliterFull></SpliterFull>
//           <ContentWrap>
//             <ContentCount>1</ContentCount>
//             <Content>
//               VIP积分，本公司以有效流水来计算，100有效流水等于1点积分，如想获得对应VIP等级，用户必须在每个月份或者12个月中累积所需积分，所有用户的VIP等级将在下个月的第三天更新（个人中心-VIP可查看当前积分）
//             </Content>
//           </ContentWrap>

//           <ContentWrap>
//             <ContentCount>2</ContentCount>
//             <Content>
//               晋升月度VIP后，若下一个自然月的有效流水没有达到月度VIP资格，会员将依照流水额度，回归至对应VIP等级或者普通会员
//             </Content>
//           </ContentWrap>

//           <ContentWrap>
//             <ContentCount>3</ContentCount>
//             <Content>
//               晋升年度VIP后，下个自然月往前推算12个月的累积流水，若无法达到年度VIP资格，会员将依照流水额度，回归至对应VIP等级或者普通会员
//             </Content>
//           </ContentWrap>

//           <ContentWrap>
//             <ContentCount>4</ContentCount>
//             <Content>
//               我们在任何时候保留修改、修订所有PG Gaming条款、协议与规则。恕不另行通知，若发现会员以不诚实手段套取特权优惠或不遵守用户协议条款与规则，本公司可直接取消VIP会员资格
//             </Content>
//           </ContentWrap>

//           <ContentWrap>
//             <ContentCount>5</ContentCount>
//             <Content>
//               我们保留权利判断会员是否具备加入VIP会员的资格，保留任何时候都可以更改、停止、取消优惠或索取已支付全部优惠的权利
//             </Content>
//           </ContentWrap>
//         </VIPTnCContainer>

//         <TnCFooter>最终解释权归PG Gaming所有</TnCFooter>
//         <IconBacktoTop
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         ></IconBacktoTop>
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
//     accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(VIPDetails);
