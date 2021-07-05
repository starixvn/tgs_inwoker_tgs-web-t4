import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LeftArrowPNG from "../../../assets/images/left-arrow.png";
import Slick from "react-slick";
// import Image1 from "../../../assets/images/slider/banner-1.jpg";
// import Image2 from "../../../assets/images/slider/banner-2.jpg";

// import Image1En from "../../../assets/images/slider/banner-1-en.jpg";
// import Image2En from "../../../assets/images/slider/banner-2-en.jpg";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 600px;
`;
const PreNextContainer = styled.div`
  position: absolute;
  top: 180px;
  width: 29px;
  height: 79px;
  z-index: 1;
  border: solid 1px rgba(255, 255, 255, 0.27);
  background-color: rgba(255, 255, 255, 0.27);
  &:hover {
    cursor: pointer;
  }
`;
const PreContainer = styled(PreNextContainer)`
  left: 0px;
`;
const NextContainer = styled(PreNextContainer)`
  right: 0px;
`;
const PreImg = styled.img`
  width: 9px;
  margin: 31px auto;
  display: block;
`;
const NextImg = styled.img`
  width: 9px;
  margin: 31px auto;
  display: block;
  transform: rotate(180deg);
`;
const ATag = styled.a`
  text-decoration: none;
`;
const Img = styled.img`
  border: none;
  width: 1920px;
  height: 600px;

  margin: 0 auto 0 -960px;
  position: relative;
  left: 50%;
`;

class Slider extends React.Component {
  render() {
    const settings = {
      dots: false,

      className: "center",
      centerMode: false,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 1,
      speed: 500,
      arrows: true,
      autoplay: true,
    };

    return (
      <Container>
        <Slick {...settings}>
          {(() => {
            var banner = [];
            for (var i = 1; i <= config.bannerCount; i++) {
              banner.push(
                process.env.PUBLIC_URL +
                  `/assets/images/banner/${i18n.language}/${config.brand}/${i}.jpg`
              );
            }
            return banner.map((item, index) => {
              return (
                <ATag href={"#"} key={index}>
                  <Img src={item}></Img>
                </ATag>
              );
            });
          })()}

          {/* {this.props.list.map((row, index) => {
            return (
              <ATag href={row.go_url} key={index}>
                <Img src={row.pc_file_url}></Img>
              </ATag>
            );
          })} */}
        </Slick>
      </Container>
    );
  }
}
export default Slider;
