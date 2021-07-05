// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";

// import { AccountService } from "../../../../services/AccountService";

// const Container = styled.div``;

// class Guide extends Component {
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
//     var result = AccountService.GetPromoteBill(page, this.state.limit);
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
//     return <Container></Container>;
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
// export default connect(mapStateToProps, mapDispatchToProps)(Guide);
