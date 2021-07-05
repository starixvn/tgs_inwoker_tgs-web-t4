import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextField from "../../Share/TextField";
import Button from "../../Share/Button";
import { AccountService, UPDATE_INFO } from "@Inwoker/tgs-api";

import { withSnackbar } from "notistack";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 40px;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;

  color: #818181;
  margin-top: 60px;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: table;
`;
const DepositDescContainer = styled.div`
  font-size: 14px;
  line-height: 2;
  color: ${(props) => props.theme.primary};
  margin-top: 60px;
  padding: 0 0 0 120px;
`;

class NameVerification extends Component {
  state = {
    name: "",
  };
  handleChangeName = (e) => {
    this.setState({ ...this.state, name: e.target.value });
  };
  handleNameVerificationClick = () => {
    AccountService.UpdateMemberName(this.props.token, this.state.name).then(
      (response) => {
        if (response.IsSuccess) {
          this.props.dispatch({
            type: UPDATE_INFO,
            payload: {
              member_name: this.state.name,
            },
          });
          this.props.enqueueSnackbar(response.msg, {
            variant: "success",
          });
        } else {
          this.props.enqueueSnackbar(response.msg, {
            variant: "error",
          });
        }
      }
    );
  };
  render() {
    return (
      <Container>
        <SubTitle>姓名设置</SubTitle>
        <TextFieldLabel>请输入真实姓名</TextFieldLabel>
        <TextFieldContainer>
          <TextField
            marginTop={10}
            placeholder={"请输入真实姓名"}
            width={395}
            height={38}
            float={"none"}
            value={this.state.name}
            handleTextFieldChange={this.handleChangeName}
          ></TextField>
        </TextFieldContainer>

        <TextFieldContainer>
          <Button
            name="下一步"
            width={255}
            handleClick={this.handleNameVerificationClick}
          ></Button>
        </TextFieldContainer>
        <DepositDescContainer>
          温馨提醒：
          <br />
          1.因支付宝转银行卡非即时到账，上分将受到到账时间影响，具体请您查看支付宝“到账时间”描述。
          <br />
          2.未申请订单直接存款至账户之前，我司一律不入账。
          <br />
          3.用户存款时请勿修改订单金额，若因此导致无法自动上分，请提交支付宝小票进行核对，需要5-7工作日查核。
          <br />
        </DepositDescContainer>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(NameVerification));
