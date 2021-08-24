import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
import { connect } from "react-redux";

import { generalAction } from "@Inwoker/tgs-api";

import PanelUserPNG from "../../../assets/images/panel/01-3.png";
import PanelCSPNG from "../../../assets/images/panel/02-3.png";

import Help1PNG from "../../../assets/images/panel/icon-01.png";
import Help2PNG from "../../../assets/images/panel/icon-02.png";
import Help3PNG from "../../../assets/images/panel/icon-03.png";
import Help4PNG from "../../../assets/images/panel/icon-04.png";
import Help5PNG from "../../../assets/images/panel/icon-05.png";
import Help6PNG from "../../../assets/images/panel/icon-06.png";

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
const Icon = styled.img`
  height: 45px;
`;

const Text = styled.div`
  opacity: 0;
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

    ${Icon} {
      margin-top: -10px;
      transition: margin-top 0.25s;
    }

    ${Text} {
      opacity: 1;
      transition: opacity 1s;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: white;
  width: 50px;
  opacity: 0.5;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }

  .MuiDialog-paper {
    min-width: 900px;

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
  display: grid;
  grid-template-columns: auto auto;
  padding: 30px;
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 30px;
`;

const QRCodeHolder = styled.div`
  display: flex;
  padding: 20px;
`;

const QRCodeText = styled.div`
  padding: 5px 0px;
  font-weight: bold;
  font-size: 20px;
`;

const CSButtonContainer = styled.div`
  padding: 5px;
  text-align: center;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
`;

const IconHolder = styled.img`
  height: auto;
  width: 75px;
`;
const QRCodeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  align-items: center;
`;

const QRCodeWrapper = styled.div`
  position: relative;
`;
const Overlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const Icons = styled.img`
  margin-bottom: 10px;
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

  //TODO: Pending CS
  const buttons = [
    {
      icon: Help1PNG,
      name: i18n.t("panel.liveChatOptionFund"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help2PNG,
      name: i18n.t("panel.liveChatOptionBall"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help3PNG,
      name: i18n.t("panel.liveChatOptionLive"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help4PNG,
      name: i18n.t("panel.liveChatOptionLottery"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help5PNG,
      name: i18n.t("panel.liveChatOptionRegister"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help6PNG,
      name: i18n.t("panel.liveChatOptionSlot"),
      click: props.onhandleShowCSClick,
    },
  ];
  return (
    <div>
      <Container>
        {props.general.livechat && (
          <SidePanel
            onClick={() => {
              performOpenCsModal();
            }}
          >
            <Icon src={PanelUserPNG} alt="user-icon" />
            <Text>{i18n.t("panel.cs")}</Text>
          </SidePanel>
        )}
        {props.general.livechat && <Divider />}
        <SidePanel
          onClick={() => {
            performOpenSupportModal();
          }}
        >
          <Icon src={PanelCSPNG} alt="user-cs" />
          <Text>{i18n.t("panel.im")}</Text>
        </SidePanel>
      </Container>

      <CustomModal open={supportModal} onClose={performCloseSupportModal}>
        <DialogTitle>
          <div>{i18n.t("panel.imLong")}</div>
          <CloseButton onClick={performCloseSupportModal}>✖</CloseButton>
        </DialogTitle>
        <QRCodeContainer>
          {props.general.brandsSupport.map((data, index) => {
            return (
              <QRCodeHolder>
                {data.qrcodeurl ? (
                  <QRCodeTextContainer>
                    <QRCode value={data.qrcodeurl} bgColor={"#f6f8f7"} />
                    <QRCodeText>{data.type}</QRCodeText>
                  </QRCodeTextContainer>
                ) : (
                  <QRCodeTextContainer>
                    <Icons
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/icon/${data.type}.png`
                      }
                    />
                    <div>ID: {data.appid}</div>
                    <QRCodeText>{data.type}</QRCodeText>
                  </QRCodeTextContainer>
                )}
              </QRCodeHolder>
            );
          })}
        </QRCodeContainer>
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
        <CSActualContent>
          {buttons.map((data, index) => {
            return (
              <CSButtonContainer onClick={data.click}>
                <div>
                  <IconHolder src={data.icon} alt={data.name} />
                </div>

                <div>{data.name}</div>
              </CSButtonContainer>
            );
          })}
        </CSActualContent>
      </CustomModal>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FloatPanel);
