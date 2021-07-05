import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";
import { AppHistory } from "../../../history/History";
// import AppBar from "@material-ui/core/AppBar";
// import IconInboxArrowPNG from "../../../assets/images/icon-inbox-arrow.png";
import { InboxService } from "@Inwoker/tgs-api";
import Header from "../../Wap/Share/Header";
import i18n from "../../../utils/i18n";
const Container = styled.div``;
const HeaderEdit = styled.div`
  float: right;
  font-size: 28px;
  width: 80px;
  height: 90px;
  padding-top: 26px;
`;

const MsgTitle = styled.div`
  color: #2e2426;
  word-break: break-all;
  font-weight: 600;
  float: left;
  width: 100%;
  padding: 40px 20px 0px 35px;
`;
const MsgDate = styled.div`
  color: #949494;
  margin: 20px auto;
  font-size: 24px;
  text-align: center;
  float: left;
  padding-left: 35px;
`;
const Spliter = styled.div`
  height: 2px;
  background-color: #f1f1f1;
  width: 100%;
`;

const ItemContainer = styled.div`
  background-color: #fff;

  width: 92%;
  margin: 20px auto;

  border-radius: 20px;
  font-size: 28px;
`;
const PopupContainer = styled.div`
  background-color: rgba(96, 99, 105, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${(props) => (props.edit ? `display:block;` : `display:none;`)}
`;
const Button = styled.div`
  width: 680px;
  height: 88px;

  border-radius: 20px;
  background-color: #fff;
  margin: 0 auto;
  font-weight: 600;
  position: absolute;
  left: 30px;
`;
const ButtonDelete = styled(Button)`
  color: #ea2c4f;
  bottom: 120px;
`;
const ButtonCancel = styled(Button)`
  color: #504b4c;
  bottom: 20px;
`;

const ButtonLabel = styled.div`
  font-size: 28px;

  margin-top: 25px;
  text-align: center;
`;
const LeftLabel = styled.div`
  font-size: 24px;
  color: #979797;
  float: left;
  margin-left: 40px;
`;
const RightLabel = styled.div`
  font-size: 24px;
  color: #333333;
  float: left;
`;
const SplitBoth = styled.div`
  clear: both;
  margin: 30px 0;
`;
class Details extends Component {
  state = {
    edit: false,
    id: -1,
    message: null,
  };
  componentDidMount() {
    // if (this.props.inbox.list.length > 0) {
    //   const id = this.props.match.params.id;
    //
    //   const message = this.props.inbox.list.filter((row) => row.id == id);
    //
    //   this.setState({ ...this.state, message: message[0], id: id });
    // } else {
    //   AppHistory.goBack();
    // }
  }
  componentDidUpdate(preProps) {}
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleEditClick = () => {
    this.setState({ ...this.state, edit: !this.state.edit });
  };

  handleDeleteClick = () => {
    InboxService.DeleteMessage(this.props.token, this.state.id).then(
      (response) => {
        if (response.IsSuccess) {
          AppHistory.goBack();
        }
      }
    );
  };
  handleCancelClick = () => {
    this.setState({ ...this.state, edit: false });
  };
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("inbox.title")}
        ></Header>
        {(() => {
          if (this.state.message !== null) {
            return (
              <ItemContainer>
                <MsgTitle>{this.state.message.title_text}</MsgTitle>
                <MsgDate>
                  <Moment format="YYYY-MM-DD">
                    {this.state.message.create_time}
                  </Moment>
                </MsgDate>
                <Spliter></Spliter>
                <SplitBoth></SplitBoth>
                {(() => {
                  var arr = [];
                  Object.keys(this.state.message.content_text).forEach(
                    (key) => {
                      arr.push({
                        label: key,
                        value: this.state.message.content_text[key],
                      });
                    }
                  );
                  return arr.map((item) => {
                    return (
                      <>
                        <LeftLabel>{item.label} : </LeftLabel>
                        <RightLabel>{item.value}</RightLabel>
                        <SplitBoth></SplitBoth>
                      </>
                    );
                  });
                })()}
              </ItemContainer>
            );
          } else {
            return <></>;
          }
        })()}

        <PopupContainer edit={this.state.edit}>
          <ButtonDelete onClick={this.handleDeleteClick}>
            <ButtonLabel>{i18n.t("common.delete")}</ButtonLabel>
          </ButtonDelete>
          <ButtonCancel onClick={this.handleCancelClick}>
            <ButtonLabel>{i18n.t("common.cancel")}</ButtonLabel>
          </ButtonCancel>
        </PopupContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    MainAccountID: state.account.info.MainAccountID,
    inbox: state.account.inbox,
  };
};

export default connect(mapStateToProps, null)(withRouter(Details));
