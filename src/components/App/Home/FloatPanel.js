import React from "react";
import styled from "styled-components";

import FloatingCSPNG from "../../../assets/images/floating-cs.png";
import FloatingCSHoverPNG from "../../../assets/images/floating-cs-hover.png";
import FloatingCSBorderlessBlackPNG from "../../../assets/images/floating-cs-borderless-black.png";
import FloatingCSBorderlessPNG from "../../../assets/images/floating-cs-borderless.png";

import FloatingCSPhoneBlackPNG from "../../../assets/images/floating-cs-phone-black.png";
import FloatingDownloadPNG from "../../../assets/images/floating-download.png";
import FloatingDownloadHoverPNG from "../../../assets/images/floating-download-hover.png";

import Floating4PNG from "../../../assets/images/floating-4.png";
import Floating4HoverPNG from "../../../assets/images/floating-4-hover.png";
import Floating5PNG from "../../../assets/images/floating-5.png";
import Floating5HoverPNG from "../../../assets/images/floating-5-hover.png";
import FloatingQRPNG from "../../../assets/images/floating-qr.png";

import FloatingWalletPNG from "../../../assets/images/floating-wallet.png";
import IconDollarBlackPNG from "../../../assets/images/icon-dollar-black.png";
import IconDollarRedPNG from "../../../assets/images/icon-dollar-red.png";
import i18n from "../../../utils/i18n";

export default function FloatPanel(props) {
  const Container = styled.div`
    width: 62px;
    height: 300px;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    overflow: visible;
  `;
  const ButtonWrap = styled.div`
    width: 62px;
    height: 62px;
    margin: 10px auto;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
  `;

  const FundWifiPopup = styled.div`
    position: absolute;
    width: 185px;
    height: 67px;
    background: url(${FloatingWalletPNG}) no-repeat;
    left: -176px;

    display: none;
  `;
  const HoverContainerIcon = styled.div`
    float: left;
    width: 28px;
    height: 28px;
    background-color: #16242a;
    margin: 16px 0 0 22px;
    background: url(${(props) => props.icon}) no-repeat;

    &:hover {
      background: url(${(props) => props.iconhover}) no-repeat;
    }
  `;
  const HoverText = styled.div`
    font-size: 16px;
    float: left;
    color: #16242a;
    margin: 20px 0px 0 10px;
  `;
  const FundContainer = styled(FundWifiPopup)`
    top: 4px;
    &:hover ${HoverContainerIcon} {
      background: url(${IconDollarRedPNG}) no-repeat;
    }
    &:hover ${HoverText} {
      color: ${({ theme }) => theme.primary};
    }
  `;
  const ButtonFund = styled(ButtonWrap)`
    background: url(${Floating4PNG}) no-repeat center, #a0a0a0;
    &:hover {
      background: url(${Floating4PNG}) no-repeat center,
        ${({ theme }) => theme.primary};
      cursor: pointer;
    }
    &:hover ${FundContainer} {
      display: block;
    }
  `;

  const CSContainer = styled.div`
    position: absolute;
    width: 185px;
    height: 138px;
    background: url(${FloatingQRPNG}) no-repeat;

    bottom: 78px;
    left: -176px;

    display: none;
  `;

  const CSIcon = styled.div`
    background-size: contain;
    width: 25px;
    height: 25px;
    margin: 15px 0 0 15px;
    float: left;

    background: url(${FloatingCSBorderlessBlackPNG}) no-repeat;
  `;
  const CSText = styled.div`
    font-size: 16px;
    float: left;
    color: #16242a;
    margin: 16px 0px 0 10px;
  `;

  const CSPhoneIcon = styled.div`
    background-size: contain;
    width: 25px;
    height: 25px;
    margin: 2px 0 0 15px;
    float: left;

    background: url(${FloatingCSPhoneBlackPNG}) no-repeat;
  `;
  const CSPhoneText = styled.div`
    font-size: 16px;
    float: left;
    color: #16242a;
    margin: 0px 0px 0 10px;
  `;
  const CSPhoneNumber = styled.div`
    font-size: 18px;
    font-weight: bold;

    color: #16242a;
    margin: 5px 0 0 5px;
  `;
  const CSPhoneContainer = styled.div`
    margin: 12px 20px 0 5px;
    height: 58px;
  `;
  const CSOnlineContainer = styled.div`
    border-bottom: solid 1px #cccccc;
    margin: 2px 30px 0 5px;
    height: 58px;

    &:hover {
      cursor: pointer;
    }
    &:hover ${CSIcon} {
      background: url(${FloatingCSBorderlessPNG}) no-repeat;
    }
    &:hover ${CSText} {
      color: ${({ theme }) => theme.primary};
    }
  `;

  const DownloadContainer = styled.div`
    position: absolute;
    width: 185px;
    height: 137px;
    background: url(${FloatingQRPNG}) no-repeat;

    bottom: 6px;
    left: -176px;

    display: none;
  `;
  const ButtonCS = styled(ButtonWrap)`
    background: url(${FloatingCSPNG}) no-repeat center, #a0a0a0;
    &:hover {
      background: url(${FloatingCSPNG}) no-repeat center,
        ${({ theme }) => theme.primary};
      cursor: pointer;
    }

    &:hover ${CSContainer} {
      display: block;
    }
  `;
  const ButtonDownload = styled(ButtonWrap)`
    background: url(${FloatingDownloadPNG}) no-repeat center, #a0a0a0;
    &:hover {
      background: url(${FloatingDownloadPNG}) no-repeat center,
        ${({ theme }) => theme.primary};
      cursor: pointer;
    }

    &:hover ${DownloadContainer} {
      display: block;
    }
  `;
  const ButtonTop = styled(ButtonWrap)`
    background: url(${Floating5PNG}) no-repeat center, #a0a0a0;
    &:hover {
      background: url(${Floating5PNG}) no-repeat center,
        ${({ theme }) => theme.primary};
      cursor: pointer;
    }

    &:hover ${FundContainer} {
      display: block;
    }
  `;
  const QRTitle = styled.div`
    font-size: 16px;

    font-weight: bold;
    width: 156px;
    color: #000;
    text-align: center;
    margin-top: 8px;
    padding-right: 5px;
  `;
  const QRImage = styled.div`
    margin: 5px 0 0 0px;
    height: 100px;
    width: 152px;
    line-height: 100px;
    background: url(${(props) => props.src}) no-repeat center;
    background-size: contain;
    text-align: center;
    color: #000;
    font-size: 18px;
    font-weight: bold;
  `;
  return (
    <Container>
      <ButtonFund>
        <FundContainer onClick={props.onhandleDepositClick}>
          <HoverContainerIcon
            icon={IconDollarBlackPNG}
            iconhover={IconDollarRedPNG}
          ></HoverContainerIcon>
          <HoverText>{i18n.t("web.rightNavBar.wallet")}</HoverText>
        </FundContainer>
      </ButtonFund>

      <ButtonCS>
        <CSContainer>
          <CSOnlineContainer onClick={props.onhandleShowCSClick}>
            <CSIcon></CSIcon>
            <CSText>{i18n.t("web.rightNavBar.cs.csDesc")}</CSText>
          </CSOnlineContainer>
          <CSPhoneContainer>
            <CSPhoneIcon></CSPhoneIcon>
            <CSPhoneText>{i18n.t("web.rightNavBar.cs.contact")}</CSPhoneText>
            <div className="clear"></div>
            <CSPhoneNumber>{i18n.t("common.csPhoneNumber")}</CSPhoneNumber>
          </CSPhoneContainer>
        </CSContainer>
      </ButtonCS>
      <ButtonDownload onClick={props.onDownloadClick}>
        <DownloadContainer>
          <QRTitle>{i18n.t("web.rightNavBar.codeTitle")}</QRTitle>
          <QRImage
            src={`${process.env.PUBLIC_URL}/assets/images/qrcode/appdownload-qr-soon.png`}
          >
            {i18n.t("common.comingSoon")}
          </QRImage>
        </DownloadContainer>
      </ButtonDownload>
      <ButtonTop
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></ButtonTop>
    </Container>
  );
}
