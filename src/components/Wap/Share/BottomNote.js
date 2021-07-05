import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
const Content = styled.div`
  width: 750px;
  margin: 0 auto;
  font-size: 26px;

  text-align: center;
  margin-top: 20px;
  padding: 0 30px;
  color: ${({ theme }) => theme.secondary};
`;
const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
const LabelNormal = styled.span`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
class BottomNote extends Component {
  handleCSClick = () => {
    window.open("/" + i18n.language + "/chat", "_blank");
  };

  render() {
    return (
      <Content>
        {this.props.text1 || i18n.t("share.bottomNote.pleaseContact")}
        {(() => {
          if (this.props.link) {
            return (
              <LabelLink to={this.props.link}>
                {this.props.text2 || i18n.t("share.bottomNote.liveChat")}
              </LabelLink>
            );
          } else {
            return (
              <LabelNormal onClick={this.handleCSClick}>
                {this.props.text2 || i18n.t("share.bottomNote.liveChat")}
              </LabelNormal>
            );
          }
        })()}
      </Content>
    );
  }
}
export default BottomNote;
