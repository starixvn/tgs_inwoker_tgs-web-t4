import React, { Component } from "react";
import styled from "styled-components";
const CustomText = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  margin-top: 25px;
  font-weight: 500;
  border: 0;
  width: 100%;
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText style={{ ...this.props.style }} onClick={this.props.onClick}>
        <CustomLabel>{this.props.label}</CustomLabel>
        <CustomInput
          style={this.props.color ? { color: this.props.color } : {}}
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
        ></CustomInput>
      </CustomText>
    );
  }
}

export default Textbox;
