// import React, { Component } from "react";
// import { connect } from "react-redux";

// import { withRouter } from "react-router-dom";
// import { withSnackbar } from "notistack";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import TreeView from "@material-ui/lab/TreeView";
// import TreeItem from "@material-ui/lab/TreeItem";
// import Typography from "@material-ui/core/Typography";
// import CustomButton from "../Share/Button";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// import AboutUsBgPNG from "../../assets/images/aboutus-bg.png";
// import Footer from "../App/Footer";
// import HeaderMini from "../App/HeaderMini";
// import SelfControl from "./SelfControl/index";
// import Dialog from "@material-ui/core/Dialog";
// import { withStyles } from "@material-ui/core/styles";

// import IconAbout1PNG from "../../assets/images/icon-about1.png";
// import IconAbout2PNG from "../../assets/images/icon-about2.png";
// import IconAbout3PNG from "../../assets/images/icon-about3.png";
// import IconAbout4PNG from "../../assets/images/icon-about4.png";
// import IconAbout5PNG from "../../assets/images/icon-about5.png";
// import IconAbout6PNG from "../../assets/images/icon-about6.png";
// import IconAbout7PNG from "../../assets/images/icon-about7.png";
// import IconAbout8PNG from "../../assets/images/icon-about8.png";
// import IconAbout9PNG from "../../assets/images/icon-about9.png";

// import IconAbout1HoverPNG from "../../assets/images/icon-about1-hover.png";
// import IconAbout2HoverPNG from "../../assets/images/icon-about2-hover.png";
// import IconAbout3HoverPNG from "../../assets/images/icon-about3-hover.png";
// import IconAbout4HoverPNG from "../../assets/images/icon-about4-hover.png";
// import IconAbout5HoverPNG from "../../assets/images/icon-about5-hover.png";
// import IconAbout6HoverPNG from "../../assets/images/icon-about6-hover.png";
// import IconAbout7HoverPNG from "../../assets/images/icon-about7-hover.png";
// import IconAbout8HoverPNG from "../../assets/images/icon-about8-hover.png";
// import IconAbout9HoverPNG from "../../assets/images/icon-about9-hover.png";
// import BGJPG from "../../assets/images/bg.jpg";
// import Config from "../../config/config";
// import i18n from "../../utils/i18n";
// const Container = styled.div`
//   width: 100%;

//   position: relative;
//   background: url(${BGJPG});
// `;
// const InnerWrap = styled.div`
//   margin: 26px auto;
//   width: 1000px;
//   background-color: #152326;
// `;
// const LeftContainer = styled.div`
//   width: 207px;
//   height: 767px;
//   float: left;
//   background-color: #29356c;
//   margin: 5px;
// `;
// const LeftContainerHeader = styled.div`
//   background: url(${AboutUsBgPNG}) no-repeat;
//   width: 207px;
//   height: 113px;
//   padding: 10px;
// `;
// const HeaderTitle = styled.div`
//   font-size: 29px;
//   color: #f5e3e0;
// `;
// const HeaderTitle2 = styled.div`
//   font-family: Arial;
//   font-size: 21px;

//   color: #f5e3e0;
// `;
// const RightContainer = styled.div`
//   width: 777px;

//   float: left;
//   background-color: #ffffff;
//   margin: 5px 5px 5px 0;
//   position: relative;
// `;
// const StyledDialog = withStyles({
//   root: {
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     "& .MuiDialog-paperWidthSm": {},
//   },
// })(Dialog);
// const useTreeItemStyles = makeStyles((theme) => ({
//   root: {
//     color: "#bfd2bf",
//     fontSize: "14px",
//     "&:focus > $content": {
//       backgroundColor: `var(--tree-view-bg-color, 'transparent')`,
//       color: "#fbeba4",
//     },
//   },
//   content: {
//     color: "#bfd2bf",

//     padding: "11px 0",

//     "$expanded > &": {
//       backgroundColor: `var(--tree-view-bg-color, 'transparent')`,
//       color: "#fbeba4",
//     },
//     "&:hover ": {
//       color: "#fbeba4",
//     },
//   },
//   group: {
//     backgroundColor: "#33404d",
//     marginLeft: 0,
//     "& $content": {
//       paddingLeft: theme.spacing(2),
//     },
//   },
//   expanded: {},
//   label: {
//     fontWeight: "inherit",
//     color: "inherit",
//   },
//   labelRoot: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0.5, 0),
//   },
//   labelIcon: {
//     width: "22px",
//     height: "18px",
//     marginRight: "10px",
//   },
//   labelIconEmpty: {
//     marginRight: "10px",
//   },
//   labelText: {
//     fontWeight: "inherit",
//     flexGrow: 1,
//   },
// }));
// const CustomButtonContainer = styled.div`
//   position: absolute;
//   top: 380px;
//   left: 270px;
// `;
// const ItemIcon = styled.div`
//   ${(props) =>
//     props.expanded
//       ? ` background: url(${props.iconHover}) no-repeat;`
//       : ` background: url(${props.icon}) no-repeat;`};
// `;
// const ItemDiv = styled.div``;
// function StyledTreeItem(props) {
//   const classes = useTreeItemStyles();
//   const {
//     isexpanded,
//     labelText,
//     labelIcon: LabelIcon,
//     labelIconHover: LabelIconHover,
//     labelInfo,
//     color,
//     bgColor,
//     ...other
//   } = props;

//   return (
//     <TreeItem
//       label={
//         <ItemDiv className={classes.labelRoot}>
//           {(() => {
//             if (LabelIcon) {
//               return (
//                 <ItemIcon
//                   expanded={props.isexpanded}
//                   icon={LabelIcon}
//                   iconHover={LabelIconHover}
//                   className={classes.labelIcon}
//                 />
//               );
//             } else {
//               return <div className={classes.labelIconEmpty} />;
//             }
//           })()}

//           <Typography variant="body2" className={classes.labelText}>
//             {labelText}
//           </Typography>
//           <Typography variant="caption" color="inherit">
//             {labelInfo}
//           </Typography>
//         </ItemDiv>
//       }
//       classes={{
//         root: classes.root,
//         content: classes.content,
//         expanded: classes.expanded,
//         group: classes.group,
//         label: classes.label,
//       }}
//       {...other}
//     />
//   );
// }

// StyledTreeItem.propTypes = {
//   bgColor: PropTypes.string,
//   color: PropTypes.string,

//   labelInfo: PropTypes.string,
//   labelText: PropTypes.string.isRequired,
// };

// const Tabs = [
//   {
//     name: "关于WG永高",
//     path: "",
//     icon: IconAbout1PNG,
//     iconHover: IconAbout1HoverPNG,
//     child: [
//       { name: "关于我们", path: "about" },
//       { name: "联络我们", path: "contactus" },
//     ],
//   },
//   {
//     name: "开户与存提款",
//     path: "",
//     icon: IconAbout2PNG,
//     iconHover: IconAbout2HoverPNG,
//     child: [
//       { name: "如何开户", path: "register" },
//       { name: "如何存款", path: "deposit" },
//       { name: "如何提款", path: "withdrawal" },
//     ],
//   },
//   {
//     name: "合作与经营",
//     path: "",
//     icon: IconAbout3PNG,
//     iconHover: IconAbout3HoverPNG,
//     child: [
//       { name: "简易说明", path: "explanation" },
//       { name: "双方权利与义务", path: "rights_duties" },
//       { name: "关于佣金", path: "commission" },
//       { name: "代理FAQ", path: "agent" },
//     ],
//   },
//   {
//     name: "条款与规则",
//     path: "",
//     icon: IconAbout4PNG,
//     iconHover: IconAbout4HoverPNG,
//     child: [
//       { name: "规则声明", path: "rules" },
//       { name: "免责声明", path: "disclaimer" },
//       { name: "身份核定与规定", path: "authenticate" },
//       { name: "投注规则与规定", path: "betting" },
//     ],
//   },
//   {
//     name: "优惠活动规则",
//     path: "activity_rules",
//     icon: IconAbout5PNG,
//     iconHover: IconAbout5HoverPNG,
//     child: [],
//   },
//   {
//     name: "技术帮助",
//     path: "",
//     icon: IconAbout6PNG,
//     iconHover: IconAbout6HoverPNG,
//     child: [
//       { name: "技术帮助", path: "tech_support" },
//       { name: "清除DNS缓存", path: "dns" },
//       { name: "设定DNS服务器", path: "dns_setting" },
//     ],
//   },
//   {
//     name: "博彩责任",
//     path: "responsible",
//     icon: IconAbout7PNG,
//     iconHover: IconAbout7HoverPNG,
//     child: [],
//   },
//   {
//     name: "常见问题",
//     path: "question",
//     icon: IconAbout8PNG,
//     iconHover: IconAbout8HoverPNG,
//     child: [],
//   },
//   {
//     name: "自我控制",
//     path: "selfcontrol",
//     icon: IconAbout9PNG,
//     iconHover: IconAbout9HoverPNG,
//     child: [],
//   },
// ];
// class AboutUs extends Component {
//   handleTreeChange = (node, path) => {
//     if (this.state.expanded.indexOf(node.toString()) >= 0) {
//       this.setState({ expanded: [] });
//     } else {
//       this.setState({ expanded: [node.toString()] });
//     }

//     if (path !== "") {
//       this.handleTreeItemChange(path);
//     }
//   };
//   handleTreeItemChange = (path) => {
//     this.props.history.push("/" + i18n.language + "/aboutus/" + path);
//     fetch("/assets/help/" + i18n.language + "/" + path + ".html")
//       .then((res) => {
//         return res.text();
//       })
//       .then((html) => {
//         this.setState({ html: html });
//       });
//   };
//   handleSelfControlClick = () => {
//     this.setState({ ...this.state, showSelfControl: true });
//   };
//   componentDidMount() {
//     let selectedPage = this.props.match.params.page;
//     this.handleTreeItemChange(selectedPage);
//     const localStorageToken = localStorage.getItem("token");
//     if (localStorageToken != null && this.props.account.token == null) {
//       const response = this.props.checkTokenIsValid(localStorageToken);
//       if (response.IsSuccess) {
//         this.props.getAccountProfile(response.data.token, true);
//       }
//     }
//   }
//   componentWillReceiveProps(nextProps) {
//     const oldpage = this.props.match.params.page;
//     const newpage = nextProps.match.params.page;
//     if (oldpage !== newpage) {
//       this.handleTreeItemChange(newpage);
//       this.setState({
//         expanded: this.getSelectedParent(newpage),
//       });
//     }
//   }
//   componentDidUpdate(preProps, preStates) {
//     if (preProps.match.params.action !== this.props.match.params.action) {
//       if (this.props.match.params.action === "chat") {
//         window.open("/" + i18n.language + "/cs", "", "width=420,height=470");
//       }
//     } else {
//       if (preProps.match.params.value !== this.props.match.params.value) {
//         if (this.props.match.params.action === "chat") {
//           window.open("/" + i18n.language + "/cs", "", "width=420,height=470");
//         }
//       }
//     }
//   }
//   getSelectedParent = (selectedPage) => {
//     let parent = "";
//     for (let item of Tabs) {
//       if (item.path === selectedPage) {
//         parent = item.name;
//         break;
//       } else {
//         for (let child of item.child) {
//           if (child.path === selectedPage) {
//             parent = item.name;
//             break;
//           }
//         }
//         if (parent !== "") {
//           break;
//         }
//       }
//     }

//     return [parent];
//   };
//   handleCloseSelfControl = () => {
//     this.setState({ ...this.state, showSelfControl: false });
//   };
//   state = {
//     expanded: this.getSelectedParent(this.props.match.params.page),
//     showSelfControl: false,
//   };
//   render() {
//     return (
//       <Container>
//         <HeaderMini></HeaderMini>
//         <InnerWrap>
//           <LeftContainer>
//             <LeftContainerHeader>
//               <HeaderTitle>帮助中心</HeaderTitle>
//               <HeaderTitle2>Help Center</HeaderTitle2>
//             </LeftContainerHeader>
//             <TreeView
//               expanded={this.state.expanded}
//               defaultCollapseIcon={<ArrowDropDownIcon />}
//               defaultExpandIcon={<ArrowRightIcon />}
//               defaultEndIcon={<div style={{ width: 24 }} />}
//               children={<ArrowDropDownIcon />}
//             >
//               {Tabs.map((row, index) => {
//                 return (
//                   <StyledTreeItem
//                     key={row.name}
//                     nodeId={row.name}
//                     labelText={row.name}
//                     labelIcon={row.icon}
//                     labelIconHover={row.iconHover}
//                     isexpanded={
//                       this.state.expanded.indexOf(row.name) >= 0 ? true : false
//                     }
//                     onClick={() => this.handleTreeChange(row.name, row.path)}
//                   >
//                     {row.child.map((child, index) => {
//                       return (
//                         <StyledTreeItem
//                           key={index}
//                           nodeId={child.path}
//                           labelText={child.name}
//                           onClick={() => this.handleTreeItemChange(child.path)}
//                         />
//                       );
//                     })}
//                   </StyledTreeItem>
//                 );
//               })}
//             </TreeView>
//           </LeftContainer>
//           <RightContainer>
//             <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
//             {(() => {
//               if (
//                 this.props.match.params.page === "selfcontrol" &&
//                 this.props.account.token != null
//               ) {
//                 return (
//                   <CustomButtonContainer>
//                     <CustomButton
//                       name={"提交申请"}
//                       width={180}
//                       handleClick={this.handleSelfControlClick}
//                     ></CustomButton>
//                   </CustomButtonContainer>
//                 );
//               } else {
//                 return null;
//               }
//             })()}
//           </RightContainer>
//         </InnerWrap>
//         <Footer target={"_self"}></Footer>
//         <StyledDialog
//           open={this.state.showSelfControl}
//           onClose={this.handleCloseSelfControl}
//         >
//           <SelfControl
//             account={this.props.account}
//             onCloseDialog={this.handleCloseSelfControl}
//           ></SelfControl>
//         </StyledDialog>
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
//     getAccountProfile: (token, showVip) =>
//       dispatch(accountAction.getAccountProfile(token, showVip)),
//     checkTokenIsValid: (token) =>
//       dispatch(accountAction.checkTokenIsValid(token)),
//   };
// };
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AboutUs))
// );
