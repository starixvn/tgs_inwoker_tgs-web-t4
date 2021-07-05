// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import { AccountService } from "../../../../services/AccountService";
// import TablePagination from "@material-ui/core/TablePagination";
// import i18n from "../../../../utils/i18n"
// const Container = styled.div``;
// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: "#f7f7f7",
//     color: "#747474",
//     padding: "12px",
//   },
//   body: {
//     fontSize: 14,
//     padding: "10px",

//     color: "#7b7b7b",
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     backgroundColor: "#FFFFFF",
//     "&:hover": {
//       backgroundColor: "#fdeced",
//     },
//   },
// }))(TableRow);
// const AvatarImg = styled.img`
//   width: 90px;
// `;
// class Member extends Component {
//   state = {
//     limit: 10,
//     page: 0,
//     promote_user: { list: [], count: 0 },
//     loading: false,
//   };
//   componentDidMount() {
//     this.getPromoteUserList(0);
//   }
//   componentDidUpdate(preProps) {
//     if (preProps.token == null && this.props.token != null) {
//       this.getPromoteUserList(0);
//     }
//   }
//   getPromoteUserList = (page) => {
//     var result = AccountService.GetPromoteUser(page, this.state.limit);
//     result.then((response) => {
//       if (response.IsSuccess) {
//         this.setState({
//           ...this.state,
//           promote_user: response.data,
//         });
//       }
//     });
//   };
//   handleChangePage = (e, newPage) => {
//     this.setState({ ...this.state, page: newPage });
//     this.getPromoteUserList(newPage);
//   };
//   render() {
//     return (
//       <Container>
//         <Table aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell
//                 style={{ paddingLeft: "20px", width: "100px" }}
//               ></StyledTableCell>
//               <StyledTableCell>{i18n.t("affiliate.memberName")}</StyledTableCell>
//               <StyledTableCell>{i18n.t("affiliate.UUID")}</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {this.state.promote_user.list.map((row) => (
//               <StyledTableRow>
//                 <StyledTableCell style={{ paddingLeft: "20px" }}>
//                   <AvatarImg src={row.avatar_url_text}></AvatarImg>
//                 </StyledTableCell>
//                 <StyledTableCell>{row.name}</StyledTableCell>
//                 <StyledTableCell>{row.uuid}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[this.state.limit]}
//           component="div"
//           count={this.state.promote_user.count}
//           rowsPerPage={this.state.limit}
//           page={this.state.page}
//           labelRowsPerPage={("asd", "213123", "asdasdasda", "每頁行数")}
//           backIconButtonProps={{
//             "aria-label": "previous page",
//           }}
//           nextIconButtonProps={{
//             "aria-label": "next page",
//           }}
//           onChangePage={this.handleChangePage}
//         />
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
//     dispatch: dispatch,
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Member);
