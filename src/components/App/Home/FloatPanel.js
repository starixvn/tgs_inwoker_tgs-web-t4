import React, { useState } from "react";
import styled from "styled-components";

import PanelUserPNG from "../../../assets/images/panel-user.png";
import PanelCSPNG from "../../../assets/images/panel-cs.png";

import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";

const Container = styled.div`
  height: auto;
  position: fixed;
  right: 1%;
  top: 32%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);
  overflow: visible;
  color: white;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.75);
`;

const SidePanel = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: white;
  width: 50px;
  opacity: 0.5;
`;

const Icon = styled.img`
  height: 50px;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }
  .MuiDialog-scrollPaper {
    align-items: flex-start;
  }

  .MuiDialog-paper {
    min-width: 800px;
    margin-top: 200px;
    border-radius: 16px;
    background: #cccccc;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #b3b3b3;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogTitleTwo = styled(DialogTitle)`
  justify-content: center;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const CSSection = styled.div`
  background: #323232;
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

const CSSectionContent = styled.div`
  min-height: 100%;
  min-width: 100%;
  background: white;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const CSActualContent = styled.div`
  min-height: 300px;
`;
const FloatPanel = (props) => {
  const [supportModal, setSupportModal] = useState(false);
  const [csModal, setCsModal] = useState(false);

  const performOpenSupportModal = () => {
    setSupportModal(true);
  };
  const performOpenCsModal = () => {
    setCsModal(true);
  };

  const performCloseSupportModal = () => {
    setSupportModal(false);
  };
  const performCloseCsModal = () => {
    setCsModal(false);
  };
  return (
    <div>
      <Container>
        <SidePanel
          onClick={() => {
            performOpenSupportModal();
          }}
        >
          <Icon src={PanelUserPNG} alt="user-icon" />
        </SidePanel>
        <Divider />
        <SidePanel
          onClick={() => {
            performOpenCsModal();
          }}
        >
          <Icon src={PanelCSPNG} alt="user-cs" />
          <div>{i18n.t("panel.im")}</div>
        </SidePanel>
      </Container>

      <CustomModal open={supportModal} onClose={performCloseSupportModal}>
        <DialogTitle>
          <div>{i18n.t("panel.cs")}</div>
          <CloseButton onClick={performCloseSupportModal}>✖</CloseButton>
        </DialogTitle>
      </CustomModal>

      <CustomModal open={csModal} onClose={performCloseCsModal}>
        <DialogTitleTwo>
          <div>{i18n.t("panel.liveChatWelcome")}</div>
          <CloseButton onClick={performCloseCsModal}>✖</CloseButton>
        </DialogTitleTwo>
        <CSSection>
          <CSSectionContent>
            {i18n.t("panel.liveChatDescription")}
          </CSSectionContent>
        </CSSection>
        <CSActualContent>123</CSActualContent>
      </CustomModal>
    </div>
  );
};

export default FloatPanel;
