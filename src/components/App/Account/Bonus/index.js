// import React, { Component } from "react";
// import styled from "styled-components";

// import IconBonusRedPNG from "../../../../assets/images/icon-bonus-red.png";
// import BonusNew from "./BonusNew";
// import BonusComplete from "./BonusComplete";
// import { BonusService } from "../../../../services/BonusService";
// import { withSnackbar } from "notistack";
// const Container = styled.div`
//   padding: 20px 28px;
//   box-sizing: border-box

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
//   background: url(${IconBonusRedPNG}) no-repeat;

//   float: left;
// `;

// const TabButton = styled.div`
//   width: 102px;
//   height: 42px;
//   font-size: 14px;
//   background-color: #f7f7f7;
//   text-align: center;
//   padding-top: 10px;
//   box-sizing: border-box;
//   float: left;
//   margin-right: 8px;
//   margin-top: 18px;
//   ${props =>
//     props.active
//       ? ` border: solid 1px #c0252d;
//       color: #c0252d;`
//       : ` border: solid 1px #e1dfdf;
//       color: #747474;`};
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const InnerWrap = styled.div`
//   width: 935px;
//   float: left;
//   margin-top: 8px;
//   box-sizing: border-box;
//   background-color: #f7f7f7;
// `;

// class Bonus extends Component {
//   state = {
//     tab: 1,
//     newBonusList: [],
//     completedBonusList: []
//   };

//   componentDidMount() {
//     if (this.props.token != null) {
//       this.getBonusNewList();
//     }
//   }

//   componentDidUpdate(preProps) {
//     if (preProps.token == null && this.props.token != null) {
//       this.getBonusNewList();
//     }
//   }
//   getBonusNewList = () => {
//     BonusService.AvailableList(this.props.token).then(async response => {
//       const result = await BonusService.CompletedList(this.props.token);

//       if (result.IsSuccess) {
//         this.setState({
//           ...this.state,
//           newBonusList: response.data,
//           completedBonusList: result.data
//         });
//       } else {
//         this.setState({
//           ...this.state,
//           newBonusList: response.data
//         });
//         this.props.enqueueSnackbar(result.msg, {
//           variant: "error"
//         });
//       }
//       if (!response.IsSuccess) {
//         this.props.enqueueSnackbar(response.msg, {
//           variant: "error"
//         });
//       }
//     });
//   };

//   handleTabClick = tab => {
//     this.setState({ ...this.state, tab: tab });
//   };
//   handleReceiveBonus = (bore_id, type_id) => {
//     BonusService.ReceiveBonus(this.props.token, bore_id, type_id).then(
//       async response => {
//         if (response.IsSuccess) {
//           this.getBonusNewList();
//         } else {
//           this.props.enqueueSnackbar(response.msg, {
//             variant: "error"
//           });
//         }
//       }
//     );
//     //this.getBonusNewList();
//   };

//   render() {
//     return (
//       <Container>
//         <Title>
//           <TitleIcon></TitleIcon>
//           我的红利
//         </Title>
//         <TabButton
//           active={this.state.tab === 1}
//           onClick={() => this.handleTabClick(1)}
//         >
//           可领红利
//         </TabButton>
//         <TabButton
//           active={this.state.tab === 2}
//           onClick={() => this.handleTabClick(2)}
//         >
//           已领红利
//         </TabButton>
//         <InnerWrap>
//           {(() => {
//             switch (this.state.tab) {
//               case 1:
//                 return (
//                   <BonusNew
//                     token={this.props.token}
//                     list={this.state.newBonusList}
//                     onhandleReceiveBonus={this.handleReceiveBonus}
//                   />
//                 );
//               case 2:
//                 return (
//                   <BonusComplete
//                     token={this.props.token}
//                     rows={this.state.completedBonusList}
//                   />
//                 );
//               default:
//                 return <div />;
//             }
//           })()}
//         </InnerWrap>
//       </Container>
//     );
//   }
// }
// // const mapStateToProps = state => {
// //   return {
// //     token: state.account.token
// //     // bonus: state.bonus
// //   };
// // };
// // const mapDispatchToProps = dispatch => {
// //   return {
// //     getNewBonusList: token => dispatch(bonusAction.getNewBonusList(token))
// //   };
// // };
// export default withSnackbar(Bonus);
