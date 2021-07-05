import React from "react";

import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import Button from "../../../Share/Button";

const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 50px;
`;
const SubTitleDesc = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #818181;
  text-align: center;
`;
const ReminderTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 40px;
`;
const CSLink = styled.a`

  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  display: table;
  width: 540px;
`;

function AddCardSuccess(props) {
  return (
    <Container>
      <SubTitle>{i18n.t("card.success.title")}</SubTitle>
      <SubTitleDesc>
        {i18n.t("card.success.successDesc")}
        <br></br>{i18n.t("card.success.bindDesc")}
      </SubTitleDesc>

      <ReminderTitle>{i18n.t("card.success.reminder")}</ReminderTitle>
      <SubTitleDesc>
        {i18n.t("common.contact")} <CSLink onClick={props.onhandleCSClick}>{i18n.t("common.customerService")}</CSLink>
        {" "}{i18n.t("card.success.callHotline")}
      </SubTitleDesc>
      <ButtonContainer>
        <Button
          name={i18n.t("card.success.bindBankCard")}
          width={255}
          handleClick={props.onhandleBindCardClick}
        ></Button>
        <Button
          name={i18n.t("card.success.goWithdrawal")}
          width={255}
          handleClick={props.onhandleGoWithdrawClick}
          float={"right"}
        ></Button>
      </ButtonContainer>
    </Container>
  );
}

export default AddCardSuccess;
