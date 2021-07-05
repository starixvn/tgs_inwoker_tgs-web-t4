import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AppHistory } from "../../../history/History";

import Header from "../Share/Header";
import Loading from "../../Wap/Share/Loading";
import { withStyles } from "@material-ui/core/styles";
import Common from "../../../utils/Common";
import IconRedInfoPNG from "../../../assets/images/wap/icon-red-info.png";

import { SupportService } from "@Inwoker/tgs-api";
import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;

  background-size: contain;
  padding-top: 73px;
`;

const StyledAppBar = withStyles({
  root: {
    top: "89px",

    backgroundColor: "#f1f1f1",
    boxShadow: "none",
  },
})(AppBar);
const StyledTabs = withStyles((theme) => ({
  root: {
    backgroundImage:
      "linear-gradient(180deg, #393b3a 0%, #272a2a 50%, #1a1e1f 100%);",

    overflow: "visible",
    "& .MuiTabs-indicator": {
      backgroundColor: "#d2a058",
      height: "5px",
    },
    "& .MuiTabs-indicator:before": {
      content: "'\\A'",
      borderStyle: "solid",
      borderWidth: "0 10px 10px 10px",
      borderColor: "transparent transparent #d2a058 transparent",
      position: "absolute",
      left: "50%",
      top: "-6px",
      transform: "translateX(-50%)",
    },
    "& .MuiTabs-flexContainer": {
      overflow: "visible",
    },
  },
}))(Tabs);
const StyledTab = withStyles((theme) => ({
  root: {
    fontSize: "24px",
    height: "74px",
    color: "#9c9c9c",
    minWidth: "375px",

    "&.Mui-selected": {
      color: "#b88f51",
    },
  },
}))(Tab);
const CustomSelect = withStyles((theme) => ({
  root: {
    color: "#d09f58",
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
  },
  select: {
    padding: "18.5px 0px",
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
  },
}))(Select);
const CustomText = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    margin: "10px 0 0 0",
    width: "640px",
    height: "78px",

    border: "none",
    fontSize: "28px",
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);
var csWindowTab = null;
const BottomInfo = styled.div`
  font-size: 22px;
  font-weight: 600;
  height: 30px;
  color: #e23a3f;
  background: url(${IconRedInfoPNG}) no-repeat left center;
  padding-left: 40px;
  display: table;
  margin: 0 auto;
`;
class CustomerService extends Component {
  state = {
    selectedTab: 0,
    username: "",
    password: "",
    question: "存款事宜",
    name: "",

    loading: false,
  };

  componentDidMount() {
    this.props.GetSupportUrl(
      this.props.account.info.member_id,
      this.props.account.info.member_username,
      ""
    );
    AppHistory.goBack();
    // if (this.props.account.token != null) {
    //   this.GetSupportUrl(
    //     this.props.account.info.member_id,
    //     this.props.account.info.member_username + "(会员)",
    //     this.state.question
    //   );
    //   AppHistory.goBack();
    // }
  }

  handleBackClick = () => {
    AppHistory.goBack();
  };

  handleChangeTab = (event, newValue) => {
    this.setState({
      ...this.state,
      selectedTab: newValue,
      question: "存款事宜",
    });
  };
  handleUsernameChange = (e) => {
    this.setState({ ...this.state, username: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleQuestionChange = (e) => {
    this.setState({ ...this.state, question: e.target.value });
  };
  handleNameChange = (e) => {
    this.setState({ ...this.state, name: e.target.value });
  };
  // handleEmailChange = e => {
  //   this.setState({ ...this.state, email: e.target.value });
  // };
  GetSupportUrl = (userid, name, question) => {
    // if (!csWindowTab || csWindowTab.closed) {
    //   csWindowTab = Common.PopupCenter(
    //     "/" +
    //     i18n.language +
    //     "/chat/" +
    //     encodeURI(userid) +
    //     "/" +
    //     encodeURI(name === "" ? " " : name) +
    //     "/" +
    //     encodeURI(question)
    //   );
    // } else {
    //   csWindowTab.focus();
    // }

    SupportService.GetLiveSupport(
      userid,
      name,
      question,
      document.URL,
      document.referrer
    ).then((response) => {
      if (response.IsSuccess) {
        const isOpen = Common.PopupCenter(response.data, "", 500, 610);
        if (!isOpen) {
          this.props.popup(response.data);
        }
      } else {
        this.props.alert("", response.msg);
        // this.props.enqueueSnackbar(response.msg, {
        //   variant: "error"
        // });
      }
    });
  };
  childWindow = null;
  handleStartClick = async () => {
    if (this.state.selectedTab === 0) {
      if (this.state.name === "") {
        this.props.alert("", "姓名不能为空");

        return;
      }

      this.GetSupportUrl(" ", this.state.name + "(访客)", this.state.question);
    } else if (this.state.selectedTab === 1) {
      if (this.state.username === "") {
        this.props.alert("", "用户名不能为空");

        return;
      }
      if (this.state.password === "") {
        this.props.alert("", "密码不能为空");

        return;
      }
      this.childWindow = window.open(
        "/" + i18n.language + "/chat/%20/%20/" + encodeURI(this.state.question),
        "_blank"
      );
      setTimeout(() => {
        this.childWindow.postMessage(
          JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
          "*"
        );
      }, 3000);

      // this.setState({ ...this.state, loading: true });
      // const responseLogin = await AccountService.LoginWithoutSetToken(
      //   this.state.username,
      //   this.state.password
      // );
      // if (responseLogin.IsSuccess) {
      //   const responseInfo = await AccountService.GetMemberInfo(
      //     responseLogin.data
      //   );
      //   if (responseInfo.IsSuccess) {
      //     this.GetSupportUrl(
      //       responseInfo.data.member_id,
      //       responseInfo.data.member_name,
      //       this.state.question
      //     );
      //   } else {
      //     this.props.alert("", responseInfo.msg);
      //     // this.props.enqueueSnackbar(responseInfo.msg, {
      //     //   variant: "error"
      //     // });
      //   }
      //   //this.GetSupportUrl("", name, question);
      // } else {
      //   this.props.alert("", responseLogin.msg);
      //   // this.props.enqueueSnackbar(responseLogin.msg, {
      //   //   variant: "error"
      //   // });
      // }
    }
    this.setState({ ...this.state, loading: false });
  };
  render() {
    return <></>;
    return (
      <Container>
        <Header onBackClick={this.handleBackClick} title={"客服中心"}></Header>
        <StyledAppBar>
          <StyledTabs
            value={this.state.selectedTab}
            onChange={this.handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
          >
            <StyledTab label={"访客"} value={0} />
            <StyledTab label={"会员"} value={1} />
          </StyledTabs>
        </StyledAppBar>
        {(() => {
          if (this.state.selectedTab === 0) {
            return (
              <>
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder={"请输入姓名"}
                  type={"text"}
                  label={"姓名"}
                ></Textbox>

                {/* <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  placeholder={"请输入邮箱地址"}
                  type={"text"}
                  label={"邮箱地址"}
                ></Textbox> */}
              </>
            );
          } else if (this.state.selectedTab === 1) {
            return (
              <>
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  placeholder={"请输入用户名"}
                  type={"text"}
                  label={"用户名"}
                ></Textbox>

                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder={"请输入密码"}
                  type={"password"}
                  label={"密碼"}
                ></Textbox>
              </>
            );
          }
        })()}

        <CustomText>
          <CustomLabel>问题</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomSelect
              native
              inputProps={{
                name: "age",
              }}
              style={{
                fontSize: "28px",
                height: "78px",
                border: "none",
              }}
              onChange={this.handleQuestionChange}
              value={this.state.question}
            >
              <option value="存款事宜">存款事宜</option>
              <option value="提款事宜">提款事宜</option>
              <option value="账户问题">账户问题</option>
              <option value="网站登录异常">网站登录异常</option>
              <option value="红利优惠">红利优惠</option>
              <option value="结算查询">结算查询</option>
              <option value="代理业务">代理业务</option>
              <option value="投诉与建议">投诉与建议</option>
              <option value="开户谘询">开户谘询</option>
            </CustomSelect>
          </CustomFormControl>
        </CustomText>
        <BottomInfo>填写以上问题即可交谈</BottomInfo>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={"开始交谈"}
          onClick={this.handleStartClick}
        ></Button>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(withSnackbar(CustomerService)));
