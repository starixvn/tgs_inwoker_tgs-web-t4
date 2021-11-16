import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../utils/i18n";
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const Container = styled.div`
  width: 80vw;
  background: #fff;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  padding: 30px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const CloseButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  padding: 20px 30px;
  margin-bottom: 10px;
  font-size: 30px;
  border-radius: 20px;
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 50px;

  color: ${({ theme }) => theme.secondary};
`;
const FormContainer = styled.div`
  margin: 30px 60px 40px 60px;
  padding: 0 3px;
  width: 100%;
  font-size: 30px;
`;
class PopupAnnouncement extends Component {
  render() {
    return (
      <StyledDialog open={this.props.open} onClose={this.props.onClose}>
        <Container>
          <div className="clear"></div>
          <TitleContainer>{this.props.header}</TitleContainer>
          <FormContainer
            dangerouslySetInnerHTML={{
              __html: this.props.text.replace(/\n/g, "<br />"),
            }}
          ></FormContainer>
          <CloseButton onClick={this.props.onClose}>
            {i18n.t("common.confirm")}
          </CloseButton>
        </Container>
      </StyledDialog>
    );
  }
}

export default PopupAnnouncement;
