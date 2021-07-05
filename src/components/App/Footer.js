import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Slick from "react-slick";
import Provider1PNG from "../../assets/images/provider1.png";
import Provider2PNG from "../../assets/images/provider2.png";
import Provider3PNG from "../../assets/images/provider3.png";
import Provider4PNG from "../../assets/images/provider4.png";
import Provider5PNG from "../../assets/images/provider5.png";
import Provider6PNG from "../../assets/images/provider6.png";
import Provider7PNG from "../../assets/images/provider7.png";
import Provider8PNG from "../../assets/images/provider8.png";
import Provider9PNG from "../../assets/images/provider9.png";
import Provider10PNG from "../../assets/images/provider10.png";

import HomeFooterIcon1PNG from "../../assets/images/home-footer-icon1.png";
import HomeFooterIcon1ActivePNG from "../../assets/images/home-footer-icon1-active.png";
import Common from "../../utils/Common";
import config from "../../config/config";
import i18n from "../../utils/i18n";

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const AffAndCSContainer = styled.div`
  width: 238px;
  height: 62px;
  border-radius: 3px;
  border: solid 1px #f6f6f6;
  color: #f6f6f6;
`;

const AffCSRightContentLine1 = styled.span`
  font-size: 14px;
  margin-top: 12px;
  display: block;
`;
const AffCSRightContentLine2 = styled.span`
  font-size: 14px;
  display: block;
`;

const MiddleContainer = styled.div`
  height: 68px;
  width: 100%;
  margin-top: 30px;
  border-bottom: solid 1px ${(props) => props.theme.primaryGradient};
  border-top: solid 1px ${(props) => props.theme.primaryGradient};
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
`;
const ProductUL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px auto;
  display: table;
`;

const ProductLI = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
`;
const ProductImg = styled.img`
  margin: 0 16px;
`;
const BottomContainer = styled.div`
  height: 70px;
  width: 1280px;
  padding-top: 16px;
  margin: 0 auto;
  color: #f6f6f6;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

const FooterIconFrame = styled.div`
  width: 100%;
  height: 50px;
`;

const FooterIcon1 = styled(FooterIconFrame)`
  background: url(${HomeFooterIcon1PNG}) no-repeat center;
`;
const FooterColumn = styled.div`
  border-right: solid 1px #f6f6f6;
  padding-right: 30px;
  float: left;
  padding-top: 15px;
  width: 200px;
  &:hover ${FooterIcon1} {
    background: url(${HomeFooterIcon1ActivePNG}) no-repeat center;
  }
`;
const FooterATag = styled.div`
  font-size: 14px;
  color: #f6f6f6;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
  &:hover ${FooterColumn} {
    color: #fde73f;
  }
`;

const QRContainerVisit = styled.div`
  float: left;
  margin: 0 20px;
`;
const QRImg = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
  padding: 5px;
  background-color: #ffffff;
`;

const QRDownloadImg = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  text-align: center;
  color: #000;
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
`;
const QRRedTitle = styled.div`
  text-align: center;
  font-size: 12px;
  color: #f6f6f6;
  margin-top: 5px;
`;
function handleOpenLink(url) {
  Common.PopupCenter(url, "", 1280, 720);
}
const ATag = styled.a`
  text-decoration: none;
`;
const Img = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  background-position: center center;
  background-size: contain;
  height: 60px;
  width: 120px;
  border: none;
`;
const settings = {
  dots: false,
  adaptiveHeight: true,
  className: "center",
  centerMode: false,
  infinite: true,
  centerPadding: "0px",
  slidesToShow: 11,
  speed: 500,
  arrows: true,
  autoplay: true,
};
function Footer(props) {
  console.log(props.game.providerList);
  return (
    <Container>
      <MiddleContainer>
        <MiddleInnerWrap>
          <Slick {...settings}>
            {(() => {
              return props.game.providerList.map((item, index) => {
                return (
                  <Img
                    key={index}
                    img={
                      process.env.PUBLIC_URL +
                      `/assets/images/provider/${item.abbreviation.toLowerCase()}.png`
                    }
                  ></Img>
                );
              });
            })()}
          </Slick>
          {/* <ProductUL>
            <ProductLI>
              <ProductImg src={Provider1PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider2PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider3PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider4PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider5PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider6PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider7PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider8PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider9PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider10PNG}></ProductImg>
            </ProductLI>
          </ProductUL> */}
        </MiddleInnerWrap>
      </MiddleContainer>
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(/{brand}/g, config.brand)}
        </CopyRightLine2>
        <Version>
          Version {process.env.REACT_APP_VERSION} (
          {process.env.REACT_APP_CUSTOM_NODE_ENV})
        </Version>
      </BottomContainer>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
