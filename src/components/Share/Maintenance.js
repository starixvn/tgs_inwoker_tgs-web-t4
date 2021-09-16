import React, { Component } from "react";
import styled from "styled-components";

import config from "../../config/config";
import UnderconstructionPNG from "../../assets/images/underconstruction.png";
import { isMobileOnly } from "react-device-detect";
import MaintenancePNG from "../../assets/images/maintenance-blank.png";

const Container = styled.div`
  width: 100%;
  background: url(${MaintenancePNG}) no-repeat center;
  background-size: cover;
  position: relative;
  height: calc(100vh - 45px);
`;
const MaintenanceImage = styled.img`
  margin: 150px auto 30px auto;
  display: block;
`;
const MaintenanceText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  color: white;
`;

const MaintenanceTextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
`;

const Text = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
  padding: 20px 0px;
  font-weight: bold;
`;

const Hyperlink = styled.span`
  cursor: pointer;
  :focus,
  :active,
  :hover {
    text-decoration: underline;
  }
`;
class Maintenance extends Component {
  componentDidMount() {
    if (isMobileOnly) {
      document
        .getElementById("viewport")
        .setAttribute("content", "width=750, user-scalable=no");
    }
  }

  render() {
    return (
      <Container style={isMobileOnly ? {} : { minHeight: "800px" }}>
        <MaintenanceTextContainer>
          <Text>我们现正维护中，请稍后再试。 </Text>
          <Text>
            如您有任何问题，请
            <Hyperlink onClick={this.props.onhandleCSClick}>联系客服</Hyperlink>
            。
          </Text>
          <Text>
            We are currently under maintenance, please try again later.
          </Text>
          <Text>
            If you have any questions, please contact our{" "}
            <Hyperlink onClick={this.props.onhandleCSClick}>
              customer service
            </Hyperlink>
            .
          </Text>
        </MaintenanceTextContainer>
      </Container>
    );
  }
}

export default Maintenance;
