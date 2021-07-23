import React, { Component } from "react";
import styled from "styled-components";

import config from "../../config/config";
import UnderconstructionPNG from "../../assets/images/underconstruction.png";
import { isMobileOnly } from "react-device-detect";
import MaintenancePNG from "../../assets/images/maintenance.png";
const Container = styled.div`
  width: 100%;
  background: url(${MaintenancePNG}) no-repeat center;
  background-size: cover;
`;
const MaintenanceImage = styled.img`
  margin: 150px auto 30px auto;
  display: block;
`;
const MaintenanceText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 26px;
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
      <Container style={isMobileOnly ? {} : { minHeight: "800px" }}></Container>
    );
  }
}

export default Maintenance;
