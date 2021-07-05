import React, { Component } from "react";
import styled from "styled-components";
const CustomText = styled.div`
  width: 700px;
  height: 150px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  width: 70%;
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
  float: left;
`;
const CustomInput = styled.input`
  font-size: 28px;
  margin-top: 12px;
  border: 0;
  width: 65%;
  color: ${({ theme }) => theme.secondary};
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
`;
const Button = styled.div`
  font-size: 23px;

  text-align: center;
  color: #fefeff;
  float: right;
  padding: 8px 8px 0 8px;
  margin-top: 24px;

  height: 47px;
  border-radius: 10px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText style={{ ...this.props.style }}>
        <Button onClick={this.props.onClick}>{this.props.buttonlabel}</Button>
        <CustomLabel>{this.props.label}</CustomLabel>
        <CustomInput
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={this.props.onChange}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
        ></CustomInput>
      </CustomText>
    );
  }
}

export default Textbox;
