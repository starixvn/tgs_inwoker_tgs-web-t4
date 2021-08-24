import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import config from "../../config/config";
import i18n from "../../utils/i18n";
import ArrowDown from "../../assets/images/arrowdown.svg";
import styled from "styled-components";

const ArrowDownImg = styled.img`
  height: 8px;
  margin-left: 2.5px;
  margin-right: 10px;
`;

const LanguangeChanger = ({ language }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {i18n.t("lang.language")} <ArrowDownImg src={ArrowDown} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {language.map((data, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                window.location.href = `/${data.culturecode}`;
              }}
            >
              {i18n.t("lang." + data.culturecode)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguangeChanger;
