// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import { withSnackbar } from "notistack";
// import { AppHistory } from "../../../history/History";
// import AppBar from "@material-ui/core/AppBar";
// import { withStyles } from "@material-ui/core/styles";

// import Common from "../../../utils/Common";

// import { BonusService } from "../../../services/BonusService";
// import Loading from "../../Wap/Share/Loading";
// import Header from "../../Wap/Share/Header";

// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// import IconIDActivePNG from "../../../assets/images/wap/icon-id-active.png";
// import IconIDInActivePNG from "../../../assets/images/wap/icon-id-inactive.png";

// import IconDepositActivePNG from "../../../assets/images/wap/icon-deposit-active.png";
// import IconDepositInActivePNG from "../../../assets/images/wap/icon-deposit-inactive.png";

// import IconPhoneActivePNG from "../../../assets/images/wap/icon-phone-active.png";
// import IconPhoneInActivePNG from "../../../assets/images/wap/icon-phone-inactive.png";

// import IconEmailActivePNG from "../../../assets/images/wap/icon-email-active.png";
// import IconEmailInActivePNG from "../../../assets/images/wap/icon-email-inactive.png";
// import Config from "../../../config/config";
// import BgProfilePNG from "../../../assets/images/wap/bg-profile.png";
// const moment = require("moment");
// const Container = styled.div`
//   width: 100%;
//   padding-top: 230px;
// `;
// const StyledAppBar = withStyles({
//   root: {
//     height: "170px",
//     background: `url(${BgProfilePNG}) no-repeat left top`,
//     display: "block",
//     backgroundSize: "cover",
//   },
// })(AppBar);
// const BalanceLabel = styled.div`
//   font-size: 36px;

//   text-align: center;
//   color: #ffffff;
//   margin: 0 auto 20px auto;
// `;

// const StyledTabs = withStyles((theme) => ({
//   root: {
//     backgroundImage:
//       "linear-gradient(180deg, #393b3a 0%, #272a2a 50%, #1a1e1f 100%);",

//     overflow: "visible",
//     "& .MuiTabs-indicator": {
//       backgroundColor: "#d2a058",
//       height: "5px",
//     },
//     "& .MuiTabs-indicator:before": {
//       content: "'\\A'",
//       borderStyle: "solid",
//       borderWidth: "0 10px 10px 10px",
//       borderColor: "transparent transparent #d2a058 transparent",
//       position: "absolute",
//       left: "50%",
//       top: "-6px",
//       transform: "translateX(-50%)",
//     },
//     "& .MuiTabs-flexContainer": {
//       overflow: "visible",
//     },
//   },
// }))(Tabs);
// const StyledTab = withStyles((theme) => ({
//   root: {
//     fontSize: "24px",
//     height: "74px",
//     color: "#9c9c9c",
//     minWidth: "375px",

//     "&.Mui-selected": {
//       color: "#b88f51",
//     },
//   },
// }))(Tab);
// const StyledExpansionPanel = withStyles((theme) => ({
//   root: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//     "&.Mui-expanded": {
//       margin: 0,
//     },
//     "& .MuiExpansionPanelSummary-content": {
//       margin: 0,
//     },
//     "& .MuiExpansionPanelSummary-content.Mui-expanded": {
//       margin: 0,
//     },
//   },
// }))(ExpansionPanel);
// const BonusSummary = styled.div`
//   width: 690px;
//   height: 120px;
//   border-radius: 12px;
//   box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);

//   background-color: #ffffff;
//   margin: 20px auto 8px auto;
// `;
// const BonusTitle = styled.div`
//   font-size: 30px;
//   font-weight: 600;

//   color: #2c2c2c;
//   float: left;
//   margin-top: 38px;
// `;
// const ReceivedBonusTitle = styled(BonusTitle)`
//   margin-left: 76px;
// `;
// const RedDot = styled.div`
//   width: 16px;
//   height: 16px;
//   border-radius: 8px;
//   background-color: #e23a3f;
//   float: left;
//   margin: 53px 30px;
// `;
// const BonusDetails = styled(BonusSummary)`
//   height: 400px;
//   margin: 0px auto;
//   position: relative;
// `;
// const ReceivedBonusDetails = styled(BonusSummary)`
//   height: 400px;
//   margin: 0px auto;
//   position: relative;
//   height: 280px;
// `;
// const BonusCategory = styled.div`
//   width: 180px;
//   height: 60px;
//   border-radius: 30px;
//   background-color: #d09f58;
//   padding-top: 14px;
//   font-size: 24px;
//   font-weight: 600;

//   text-align: center;
//   color: #ffffff;
//   margin: 30px 0 0 50px;
//   float: left;
// `;
// const BonusDate = styled.div`
//   font-size: 30px;

//   color: #9b9b9b;
//   float: right;
//   margin: 40px 120px 0 0;
// `;
// const ReceivedBonusDate = styled.div`
//   font-size: 30px;

//   color: #9b9b9b;
//   float: right;
//   margin: 40px 30px 0 0;
// `;
// const BonusLabel = styled.div`
//   display: inline-block;
//   font-size: 32px;
//   font-weight: 600;

//   color: #2b2b2b;
// `;
// const BonusAmount = styled(BonusLabel)`
//   margin: 30px 0 0 70px;
//   width: 320px;
//   float: left;
// `;
// const BonusLimit = styled(BonusLabel)`
//   margin: 30px 0 0 0;

//   float: left;
// `;

// const BonusAmountValue = styled(BonusAmount)`
//   font-size: 28px;
//   margin: 10px 0 0 70px;
//   color: #d09f58;
// `;
// const ReceivedBonusAmount = styled(BonusLabel)`
//   margin: 30px 0 0 70px;
//   width: 160px;
//   float: left;
// `;
// const ReceivedBonusAmountValue = styled(BonusAmount)`
//   font-size: 28px;
//   margin: 35px 0 0 20px;
//   color: #d09f58;
//   float: left;
// `;
// const BonusLimitValue = styled(BonusLimit)`
//   font-size: 28px;
//   margin: 10px 0 0 0;
//   color: #d09f58;
// `;
// const QualifyContainer = styled.div`
//   margin: 10px 0 0 70px;
//   float: left;
//   width: 320px;
// `;
// const QualifyIcon = styled.div`
//   width: 52px;
//   height: 52px;
//   background: url(${(props) =>
//       props.active ? props.activeimg : props.inactiveimg})
//     no-repeat center center;
//   float: left;
//   margin-right: 5px;
// `;
// const Limitation = styled(BonusLimitValue)`
//   margin: 17px 0 0 0;
// `;
// const RedemButton = styled.div`
//   width: calc(158px * 1.5);
//   height: calc(164px * 1.5);
//   border-radius: 100%;

//   background-color: ${(props) =>
//     props.type === 0 ? `rgba(208, 159, 88, 0.5)` : `#4a4a4a`};
//   position: absolute;
//   bottom: -94px;
//   right: -88px;

//   font-size: 30px;
//   font-weight: 600;

//   color: ${(props) => (props.type === 0 ? `#2b2b2b` : `#d7d7d7`)};
//   padding: 65px 0 0 54px;
// `;
// const ReceivedRedemButton = styled(RedemButton)`
//   padding: 65px 0 0 44px;
// `;
// class Bonus extends Component {
//   state = {
//     selectedType: 0,
//     loading: false,
//     newBonusList: [],
//     completedBonusList: [],
//   };
//   componentDidMount() {
//     if (this.props.account.token != null) {
//       this.getBonusNewList();
//     }
//   }

//   getBonusNewList = () => {
//     BonusService.AvailableList(this.props.account.token).then(
//       async (response) => {
//         if (response.IsSuccess) {
//           const result = await BonusService.CompletedList(
//             this.props.account.token
//           );

//           if (result.IsSuccess) {
//             this.setState({
//               ...this.state,
//               newBonusList: response.data,
//               completedBonusList: result.data,
//             });
//           } else {
//             this.setState({
//               ...this.state,
//               newBonusList: response.data,
//             });
//             this.props.alert("", result.msg);
//             // this.props.enqueueSnackbar(result.msg, {
//             //   variant: "error"
//             // });
//           }
//         } else if (!response.IsSuccess) {
//           this.props.alert("", response.msg);
//           // this.props.enqueueSnackbar(response.msg, {
//           //   variant: "error"
//           // });
//         }
//       }
//     );
//   };
//   handleReceiveBonus = (bore_id, type_id) => {
//     BonusService.ReceiveBonus(this.props.account.token, bore_id, type_id).then(
//       async (response) => {
//         if (response.IsSuccess) {
//           // this.props.dispatch({
//           //   type: UPDATE_INFO,
//           //   payload: {
//           //     bonus_num: this.props.account.info.bonus_num - 1
//           //   }
//           // });
//           this.props.getAccountInfo(this.props.account.token);
//           this.getBonusNewList();
//         } else {
//           this.props.alert("", response.msg);
//         }
//       }
//     );
//     //this.getBonusNewList();
//   };
//   handleBackClick = () => {
//     AppHistory.goBack();
//   };
//   handleChangeTab = (e, newValue) => {
//     this.setState({ ...this.state, selectedType: newValue });
//   };
//   render() {
//     return (
//       <Container>
//         <StyledAppBar>
//           <Header
//             onBackClick={this.handleBackClick}
//             title={"红利中心"}
//             position={"sticky"}
//             backgroundColor={"transparent"}
//           ></Header>
//           <BalanceLabel>￥{this.props.account.info.balance}</BalanceLabel>
//           <StyledTabs
//             value={this.state.selectedType}
//             onChange={this.handleChangeTab}
//           >
//             <StyledTab index={0} label={"未领红利"} value={0} />
//             <StyledTab index={1} label={"已领红利"} value={1} />
//           </StyledTabs>
//         </StyledAppBar>
//         {(() => {
//           let list =
//             this.state.selectedType === 0
//               ? this.state.newBonusList
//               : this.state.completedBonusList;

//           if (this.state.selectedType === 0) {
//             return list.map((row, index) => {
//               return (
//                 <StyledExpansionPanel key={index}>
//                   <ExpansionPanelSummary
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <BonusSummary>
//                       <RedDot></RedDot>
//                       <BonusTitle>{row.title}</BonusTitle>
//                     </BonusSummary>
//                   </ExpansionPanelSummary>
//                   <ExpansionPanelDetails>
//                     <BonusDetails>
//                       <BonusCategory>
//                         {Common.GetBonusCategory(row.type_id)}
//                       </BonusCategory>
//                       <BonusDate>
//                         {row.expired_time === "-"
//                           ? "无截止日期"
//                           : row.expired_time}
//                         {this.state.selectedType === 0 &&
//                         row.expired_time !== "-"
//                           ? " 过期"
//                           : ""}
//                       </BonusDate>
//                       <div className="clear"></div>
//                       <BonusAmount>红利金额</BonusAmount>
//                       <BonusLimit>红利限额</BonusLimit>
//                       <div className="clear"></div>
//                       <BonusAmountValue>￥{row.amount}</BonusAmountValue>
//                       <BonusLimitValue>￥{row.turnover_num}</BonusLimitValue>
//                       <div className="clear"></div>
//                       <BonusAmount>领取资格</BonusAmount>
//                       <BonusLimit>限制平台</BonusLimit>
//                       <div className="clear"></div>
//                       <QualifyContainer>
//                         <QualifyIcon
//                           style={
//                             row.pass_account === 1
//                               ? { display: "block" }
//                               : { display: "none" }
//                           }
//                           activeimg={IconIDActivePNG}
//                           inactiveimg={IconIDInActivePNG}
//                           active={row.check_pass_account}
//                         ></QualifyIcon>
//                         <QualifyIcon
//                           style={
//                             row.pass_phone === 1
//                               ? { display: "block" }
//                               : { display: "none" }
//                           }
//                           activeimg={IconPhoneActivePNG}
//                           inactiveimg={IconPhoneInActivePNG}
//                           active={row.check_pass_phone}
//                         ></QualifyIcon>
//                         <QualifyIcon
//                           style={
//                             row.pass_email === 1
//                               ? { display: "block" }
//                               : { display: "none" }
//                           }
//                           activeimg={IconEmailActivePNG}
//                           inactiveimg={IconEmailInActivePNG}
//                           active={row.check_pass_email}
//                         ></QualifyIcon>
//                         <QualifyIcon
//                           style={
//                             parseFloat(row.deposited) > 1
//                               ? { display: "block" }
//                               : { display: "none" }
//                           }
//                           activeimg={IconDepositActivePNG}
//                           inactiveimg={IconDepositInActivePNG}
//                           active={row.check_deposited}
//                         ></QualifyIcon>
//                       </QualifyContainer>

//                       <Limitation>{row.turnover_limit}</Limitation>
//                       <RedemButton
//                         type={this.state.selectedType}
//                         onClick={() =>
//                           this.handleReceiveBonus(row.bore_id, row.type_id)
//                         }
//                       >
//                         {this.state.selectedType === 0 ? `領取` : `已領取`}
//                       </RedemButton>
//                     </BonusDetails>
//                   </ExpansionPanelDetails>
//                 </StyledExpansionPanel>
//               );
//             });
//           } else {
//             return list.map((row, index) => {
//               return (
//                 <StyledExpansionPanel key={index}>
//                   <ExpansionPanelSummary
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <BonusSummary>
//                       <ReceivedBonusTitle>{row.title}</ReceivedBonusTitle>
//                     </BonusSummary>
//                   </ExpansionPanelSummary>
//                   <ExpansionPanelDetails>
//                     <ReceivedBonusDetails>
//                       <BonusCategory>
//                         {Common.GetBonusCategory(row.type_id)}
//                       </BonusCategory>
//                       <ReceivedBonusDate>
//                         {row.expired_time === "-"
//                           ? "无截止日期"
//                           : row.expired_time}
//                       </ReceivedBonusDate>
//                       <div className="clear"></div>
//                       <ReceivedBonusAmount>红利金额</ReceivedBonusAmount>
//                       <ReceivedBonusAmountValue>
//                         ￥{row.amount}
//                       </ReceivedBonusAmountValue>
//                       <div className="clear"></div>
//                       <ReceivedBonusAmount>红利限额</ReceivedBonusAmount>
//                       <ReceivedBonusAmountValue>
//                         ￥{row.turnover_num}
//                       </ReceivedBonusAmountValue>
//                       <ReceivedRedemButton
//                         type={this.state.selectedType}
//                         onClick={() => this.handleReceiveBonus(row.bore_id)}
//                       >
//                         {moment(row.expired_time, "YYYY-MM-DD").toDate() >
//                           new Date() && row.received_time === "-"
//                           ? `已逾期`
//                           : `已領取`}
//                       </ReceivedRedemButton>
//                     </ReceivedBonusDetails>
//                   </ExpansionPanelDetails>
//                 </StyledExpansionPanel>
//               );
//             });
//           }
//         })()}

//         <Loading show={this.state.loading}></Loading>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     account: state.account,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
//     getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
//     dispatch: dispatch,
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withSnackbar(Bonus));
