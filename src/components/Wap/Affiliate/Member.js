import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { AppHistory } from "../../../history/History";

import Header from "../../Wap/Share/Header";

import { accountAction } from "@Inwoker/tgs-api";
import BottomScrollListener from "react-bottom-scroll-listener";

import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";

const ListItem = styled.div`
  width: 100%;
  margin: 20px auto;
  height: 155px;
`;

const ItemContainer = styled.div`
  float: right;
  width: ${(props) => (props.edit ? `648px` : `688px`)};
  height: 125px;
  border-radius: 12px;
  box-shadow: 0 4px 12px 0 rgba(58, 58, 58, 0.2);
  border: solid 2px #f3f3f3;
  background-color: #ffffff;
  padding: 20px 20px 0 30px;
  margin-right: 30px;
`;
const ContentContainer = styled.div`
  float: left;
  font-size: 28px;
`;
const AvatarImg = styled.img`
  float: left;
  height: 80px;
`;
const ContentWrap = styled.div`
  float: left;
  width: 250px;
  margin-left: 20px;
`;
const ContentLabel = styled.div`
  font-weight: bold;
`;
const ContentValue = styled.div``;
class Member extends Component {
  state = {
    edit: false,
    limit: 10,
    page: 0,
    isBottom: false,
    selected: [],
    selectedGuid: [],
    loading: false,
  };

  componentDidMount() {
    this.getPromoteUserList(0);
  }
  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
      this.getPromoteUserList(0);
    }
  }
  getPromoteUserList = (page) => {
    this.props.getPromoteUserList(this.state.limit, page);
  };
  handleScrollBottom = () => {
    if (
      this.props.account.promote_user.list.length <
      this.props.account.promote_user.count
    ) {
      this.props.getPromoteUserList(this.state.limit, this.state.page + 1);
      this.setState({ ...this.state, page: this.state.page + 1 });
    }
  };
  handleBackClick = () => {
    AppHistory.goBack();
  };

  render() {
    return (
      <>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("affiliate.downline")}
        ></Header>
        {this.props.account.promote_user.list.map((row, index) => {
          return (
            <ListItem key={index}>
              <ItemContainer>
                <AvatarImg src={row.avatar_url_text}></AvatarImg>
                <ContentContainer>
                  <ContentWrap>
                    <ContentLabel>
                      {i18n.t("affiliate.memberName")}
                    </ContentLabel>
                    <ContentValue>{row.name}</ContentValue>
                  </ContentWrap>
                  <ContentWrap>
                    <ContentLabel>{i18n.t("affiliate.UUID")}</ContentLabel>
                    <ContentValue>{row.uuid}</ContentValue>
                  </ContentWrap>
                </ContentContainer>
              </ItemContainer>
            </ListItem>
          );
        })}
        <BottomScrollListener onBottom={this.handleScrollBottom} />

        <Loading show={this.state.loading}></Loading>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPromoteUserList: (limit, page) =>
      dispatch(accountAction.getPromoteUserList(limit, page)),
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Member);
