import React, { Component } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  margin: 50px auto 0 auto;

  font-weight: 500;

  box-shadow: none;

  position: relative;

  width: 635px;
  height: 81px;
  border-radius: 6px;
  border: solid 2px #ffffff;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 10px;
`;

const SwitchContainer = styled.div`
  width: 319px;
  height: 81px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const SwitchTextContainerComponent = styled.div`
  width: 319px;
  height: 81px;
  flaot: left;
  text-align: center;
  position: absolute;
  top: 0;

  text-shadow: 0px 2px 1px rgba(24, 28, 31, 0.8);

  font-size: 34px;

  color: #ffffff;

  padding-top: 14px;
`;
const SwitchTextLeftContainer = styled(SwitchTextContainerComponent)`
  left: 0;
`;
const SwitchTextrightContainer = styled(SwitchTextContainerComponent)`
  right: 0;
`;
class ButtonSwitch extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // handleChangeSelection = index => {
  //   this.setState({
  //     ...this.state,
  //     selected: index
  //   });
  // };
  render() {
    return (
      <Container>
        <SwitchContainer
          className={
            this.props.isUpdate === true
              ? this.props.selected === 1
                ? "toggle-button toggle-right"
                : "toggle-button toggle-left"
              : "toggle-button"
          }
        ></SwitchContainer>
        <SwitchTextLeftContainer
          active={this.props.selected === 0}
          onClick={() => this.props.handleChangeSelection(0)}
        >
          {i18n.t("common.login")}
        </SwitchTextLeftContainer>
        <SwitchTextrightContainer
          active={this.props.selected === 1}
          onClick={() => this.props.handleChangeSelection(1)}
        >
          {i18n.t("common.register")}
        </SwitchTextrightContainer>
      </Container>
    );
  }
}
export default ButtonSwitch;
