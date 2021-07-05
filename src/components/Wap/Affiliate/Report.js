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
  padding-bottom: 20px;
`;

const ItemContainer = styled.div`
  float: right;
  width: ${(props) => (props.edit ? `648px` : `688px`)};

  border-radius: 12px;
  box-shadow: 0 4px 12px 0 rgba(58, 58, 58, 0.2);
  border: solid 2px #f3f3f3;
  background-color: #ffffff;
  padding: 20px 20px 20px 30px;
  margin-right: 30px;
`;

const ContentWrap = styled.div`
  float: left;
  width: 600px;

  font-size: 24px;
`;
const ContentLabel = styled.div`
  font-weight: bold;
  float: left;
  width: 300px;
`;
const ContentValue = styled.div`
  float: right;
  text-align: right;
`;
class Report extends Component {
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
    this.getPromoteBillList(0);
  }
  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
      this.getPromoteBillList(0);
    }
  }
  getPromoteBillList = (page) => {
    this.props.getPromoteBillList(this.state.limit, page);
  };
  handleScrollBottom = () => {
    if (
      this.props.account.promote_bill.list.length <
      this.props.account.promote_bill.count
    ) {
      this.props.getPromoteBillList(this.state.limit, this.state.page + 1);
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
          title={i18n.t("affiliate.report")}
        ></Header>
        {this.props.account.promote_bill.list.map((row, index) => {
          return (
            <ListItem key={index}>
              <ItemContainer>
                <ContentWrap>
                  <ContentLabel>{i18n.t("affiliate.dateTime")}</ContentLabel>
                  <ContentValue>{row.create_time}</ContentValue>
                </ContentWrap>
                <ContentWrap>
                  <ContentLabel>{i18n.t("affiliate.transAmount")}</ContentLabel>
                  <ContentValue>{row.valid_amount_text}</ContentValue>
                </ContentWrap>
                <ContentWrap>
                  <ContentLabel>{i18n.t("affiliate.commission")}</ContentLabel>
                  <ContentValue>{row.bonus_text}</ContentValue>
                </ContentWrap>
                <ContentWrap>
                  <ContentLabel>{i18n.t("affiliate.status")}</ContentLabel>
                  <ContentValue>{row.status_text}</ContentValue>
                </ContentWrap>
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
    getPromoteBillList: (limit, page) =>
      dispatch(accountAction.getPromoteBillList(limit, page)),
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Report);
