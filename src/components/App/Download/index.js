import React, { Component } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";
import BGAppDownloadJPG from "../../../assets/images/bg-app-download.jpg";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  background: url(${BGAppDownloadJPG}) no-repeat center bottom;
`;
const Inner = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 90px;
`;
const LeftContainer = styled.div`
  width: 300px;
  height: 600px;
  float: left;
`;
const RightContainer = styled.div`
  width: 490px;
  height: 600px;
  float: right;
`;
const TitleContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/${i18n.language}/appdownload-phone-icon.png`})
    no-repeat center;

  font-weight: bold;
  color: ${({ theme }) => theme.secondary};

  height: 99px;
  width: 450px;
`;
const DescContainer = styled.div`
  font-size: 15px;
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.secondary};
`;
const QRContainer = styled.div`
  margin: 50px 0 0 60px;
  float: left;
  width: 180px;
`;
const QRRedTitle = styled.div`
  text-align: center;

  font-size: 22px;

  color: ${({ theme }) => theme.secondary};
`;
const QRMiniTitle = styled.div`
  text-align: center;

  margin: 8px;

  font-size: 14px;

  color: ${({ theme }) => theme.secondary};
`;
const QRContainerVisit = styled(QRContainer)`
  padding-top: 15px;
`;
const QRImg = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px auto 0 auto;
  display: block;
  padding: 5px;
  background-color: #ffffff;
`;

const QRImgDiv = styled.div`
  width: 103px;
  height: 103px;
  margin: 0 auto;
  display: block;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  text-align: center;
  color: #000;
  font-size: 18px;
  font-weight: bold;
  line-height: 103px;
`;
class Download extends Component {
  render() {
    return (
      <Container>
        <Inner>
          <LeftContainer></LeftContainer>
          <RightContainer>
            <TitleContainer></TitleContainer>
            <DescContainer>
              {i18n
                .t("web.download.titleDesc")
                .replace(/{brand}/g, config.brand)}
            </DescContainer>
            <QRContainer>
              <QRRedTitle>{i18n.t("web.download.supportPlatform")}</QRRedTitle>
              <QRMiniTitle>{i18n.t("web.download.mobileDownload")}</QRMiniTitle>
              <QRImgDiv
                src={`${process.env.PUBLIC_URL}/assets/images/qrcode/appdownload-qr-soon.png`}
              >
                {i18n.t("common.comingSoon")}
              </QRImgDiv>
            </QRContainer>
            <QRContainerVisit>
              <QRRedTitle>{i18n.t("web.download.pcDownload")}</QRRedTitle>

              <QRImg>
                <QRCode
                  value={`${window.location.protocol}//${window.location.hostname}`}
                  size={90}
                />
              </QRImg>
            </QRContainerVisit>
          </RightContainer>
        </Inner>
      </Container>
    );
  }
}

export default Download;
