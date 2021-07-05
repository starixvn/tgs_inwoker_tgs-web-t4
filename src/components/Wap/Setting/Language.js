import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import { AppHistory } from "../../../history/History";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import CheckIcon from "@material-ui/icons/Check";
import i18n from "../../../utils/i18n";
import { withStyles } from "@material-ui/core/styles";
import FlagCNPNG from "../../../assets/images/flag/cn.png";
import FlagENPNG from "../../../assets/images/flag/en.png";
import FlagTWPNG from "../../../assets/images/flag/tw.png";
import CustomButton from "../Share/Button";
import config from "../../../config/config";
const imageMap = {
  "zh-CN": FlagCNPNG,
  "zh-TW": FlagTWPNG,
  "en-US": FlagENPNG,
};
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;
`;

const CustomList = withStyles({
  root: {
    width: "100%",
    maxWidth: 750,
    backgroundColor: "#fff",
    fontSize: "30px",
  },
})(List);
const CustomListItem = withStyles({
  root: {
    padding: "16px 20px",
    borderBottom: "solid 1px #000",
  },
})(ListItem);
const CustomListItemText = withStyles({
  primary: {
    padding: "0px 30px",
    fontSize: "34px",
  },
})(ListItemText);
class Profile extends Component {
  state = {
    checked: i18n.language,
  };
  languages = [
    { name: "简体中文", code: "zh-CN" },
    { name: "繁体中文", code: "zh-TW" },
    { name: "English", code: "en-US" },
  ];
  componentDidMount() {
    if (this.props.account.token === null) {
      AppHistory.replace("/" + i18n.language + "/");
    }
  }
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleToggle = (value) => () => {
    this.setState({ ...this.state, checked: value });
  };
  handleUpdate = () => {
    window.location.href = `/${this.state.checked}`;
  };
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("profile.title")}
        ></Header>
        <CustomList>
          {config.languages.map((value) => {
            const labelId = `checkbox-list-label-${value.name}`;

            return (
              <CustomListItem
                key={value.name}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value.name)}
              >
                <ListItemIcon>
                  <img src={imageMap[value.name]}></img>
                </ListItemIcon>
                <CustomListItemText id={labelId} primary={value.label} />
                <ListItemSecondaryAction>
                  {(() => {
                    if (this.state.checked === value.name) {
                      return <CheckIcon style={{ fontSize: 60 }}></CheckIcon>;
                    } else {
                      return null;
                    }
                  })()}
                </ListItemSecondaryAction>
              </CustomListItem>
            );
          })}
        </CustomList>
        <CustomButton
          label={i18n.t("common.update")}
          style={{ margin: "50px auto" }}
          onClick={this.handleUpdate}
        ></CustomButton>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(withRouter(Profile));
