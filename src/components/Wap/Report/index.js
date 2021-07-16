import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { withSnackbar } from "notistack";
import { AppHistory } from "../../../history/History";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import { ReportService, GameService, accountAction } from "@Inwoker/tgs-api";

import BottomScrollListener from "react-bottom-scroll-listener";
import Loading from "../../Wap/Share/Loading";
import Header from "../../Wap/Share/Header";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import NoRecordPNG from "../../../assets/images/wap/no-record.png";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import zhLocale from "date-fns/locale/zh-CN";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import BgProfilePNG from "../../../assets/images/wap/bg-profile2.jpg";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
const moment = require("moment");
const localeMap = {
  zh: zhLocale,
};
const Container = styled.div`
  width: 100%;
  padding-top: 230px;
`;
const StyledAppBar = withStyles((theme) => ({
  root: {
    height: "170px",
    background: theme.palette.primary.main,

    background:
      `linear-gradient(rgba(` +
      theme.palette.primary.mainRgb +
      `, 0.8), rgba(` +
      theme.palette.primary.mainGradientRgb +
      `, 0.8)), url(${BgProfilePNG})`,
    display: "block",
  },
}))(AppBar);
const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: #fff;
  margin: 0 auto 20px auto;
`;

const DateContainer = styled.div`
  padding: 30px 40px;
`;
const DateSpliter = styled.div`
  font-size: 22px;
  font-weight: 600;
  float: left;
  color: #4a4a4a;
  margin: 75px 0 0 10px;
`;
const DateInner = styled.div`
  float: left;
  width: 320px;
  padding: 5px;
`;
const DateLabel = styled.div`
  height: 40px;
  border-left: 5px solid ${({ theme }) => theme.primary};
  padding-left: 20px;
  padding-top: 5px;
  margin-left: 10px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondary};
`;
const DateRangContainer = styled.div`
  margin-top: 20px;
`;
const DateRangSelection = styled.div`
  width: 220px;
  height: 52px;
  float: left;
  font-weight: 600;

  letter-spacing: normal;
  text-align: center;
  font-size: 32px;
  ${(props) =>
    props.selected
      ? `  
  color: ` +
        props.theme.primary +
        `;`
      : `

  color: ` +
        props.theme.secondary +
        `;`}
`;
const DataContent = styled.div`
  width: 690px;

  margin: 0 auto;

  border: solid 2px #f9f9f9;
  background-color: #fff;
  font-size: 26px;
  color: #4a4a4a;
  padding: 0 20px;
`;
const DataHeader = styled.div`
  width: 690px;
  font-weight: 600;
  margin: 0 auto;

  font-size: 26px;
  color: ${({ theme }) => theme.secondary};
  padding: 0 20px;
`;
const DataRowId = styled.div`
  width: 100%;
  min-height: 40px;
  padding: 14px 0px 0px 0px;
  font-weight: 600;
  font-size: 26px;
`;
const IDCell = styled.span`
  font-weight: normal;
  font-size: 26px;
`;
const DataRow = styled.div`
  border-bottom: 2px solid #d7d7d7;
  width: 100%;
  min-height: 78px;
  padding: 20px 0;
`;
const DataHeaderRow = styled(DataRow)`
  border-bottom: none;
`;
const DataDateCell3 = styled.div`
  float: left;
  width: calc(630px / 3 * 1);
  text-align: left;
`;
const DataDateCellAmount = styled.div`
  float: left;
  width: calc(630px / 3 * 1);
  text-align: right;
`;
const DataDateCell = styled.div`
  float: left;
  width: calc(630px / 4 * 1);
  text-align: left;
`;
const DataWinlossCell = styled.div`
  float: left;
  width: calc(630px / 4 * 1);
  text-align: right;
`;
const NoRecordContainer = styled.div`
  background: url(${NoRecordPNG}) no-repeat;
  width: 96px;
  height: 136px;
  margin: 30px auto;
`;
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersModal: {
      dialogAction: {
        color: "red",
      },
    },
    MuiPaper: {
      root: {
        transform: "scale(1.5)",
      },
    },
    MuiFormControl: {
      root: {
        width: "312px",
        height: "76px",
        marginTop: "10px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px 0 rgba(35, 31, 27, 0.1)",
        border: "solid 1px #f3f3f3",
        backgroundColor: "#ffffff",
      },
    },
    MuiInput: {
      root: {
        fontSize: "30px",
        height: "75px",
        "&::before": {
          display: "none",
        },
        "& input": {
          textAlign: "center",
        },
      },
    },
  },
});
const CustomFormControl = withStyles((theme) => ({
  root: {
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const CustomSelect = withStyles((theme) => ({
  root: {
    height: "50px",
    padding: 0,
    margin: 0,
    width: "460px",
  },
}))(Select);

const SelectContainer = styled.div`
  float: left;
  padding: 0 0 0 30px;
  width: 690px;

  margin: 20px auto 20px 30px;

  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
`;

const SelectLabel = styled.div`
  font-size: 28px;
  color: #303030;
  margin-left: 20px;
  width: 120px;
  float: left;
  margin-top: 20px;
`;
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType:
        this.props.match.params.tab &&
        parseInt(this.props.match.params.tab) > 0 &&
        parseInt(this.props.match.params.tab) <= 5
          ? parseInt(this.props.match.params.tab)
          : 2,
      loading: false,

      tab1: {
        dateFrom: new Date(),
        dateTo: new Date(),
        dateRange: 0,
        type: 0,
      },
      tab2: {
        dateFrom: new Date(),
        dateTo: new Date(),
        dateRange: 0,

        type: 0,
      },
      tab3: {
        dateFrom: new Date(),
        dateTo: new Date(),
        dateRange: 0,
        status: "",
      },
      tab4: {
        dateFrom: new Date(),
        dateTo: new Date(),
        dateRange: 0,
        status: "",
      },
      tab5: {
        dateFrom: new Date(),
        dateTo: new Date(),
        dateRange: 0,
      },
      dateRange: 0,
      pageSize: 20,
      page: 1,
      type: 0,
      status: "",
      betType: 0,
      betType2: 0,
      dataList: [],
      gameList: [],
      isMaxPage: false,
      depositStatusList: {},
      withdrawalStatusList: {},
    };
  }

  componentDidMount() {
    this.GetDepositWithdrawalStatus();
    // this.handleAccountGetReportTrigger(
    //   this.state.page,
    //   this.state.pageSize,
    //   0,
    //   0
    // );
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.selectedType === 1) {
      if (
        preState.type !== this.state.type ||
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page
      ) {
        this.handleAccountGetReportTrigger(
          this.state.page,

          this.state.type
        );
      }
    } else if (this.state.selectedType === 2) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.type !== this.state.type ||
        preState.page !== this.state.page
      ) {
        this.handleTransactionGetReportTrigger(
          this.state.page,

          this.state.type
        );
      }
    } else if (this.state.selectedType === 3) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page
      ) {
        this.handleWithdrawalGetReportTrigger(
          this.state.page,

          this.state.status
        );
      }
    } else if (this.state.selectedType === 4) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page
      ) {
        this.handleDepositGetReportTrigger(
          this.state.page,

          this.state.status
        );
      }
    } else if (this.state.selectedType === 5) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page
      ) {
        this.handleRebateGetReportTrigger(this.state.page);
      }
    }
  }
  GetGameList = () => {
    GameService.GetGameList(this.props.token).then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, gameList: response.data });
      }
    });
  };
  GetDepositWithdrawalStatus = () => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, depositStatusList: response.data });
      }
    });
    ReportService.GetWithdrawalStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, withdrawalStatusList: response.data });
      }
    });
  };
  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleChangeTab = (e, newValue) => {
    let json = {};
    let setDateJson = {};
    if (this.state.selectedType === 1) {
      json = {
        tab1: {
          dateFrom: this.state.dateFrom,
          dateTo: this.state.dateTo,
          type: this.state.type,
          dateRange: this.state.dateRange,
        },
      };
    } else if (this.state.selectedType === 2) {
      json = {
        tab2: {
          dateFrom: this.state.dateFrom,
          dateTo: this.state.dateTo,
          type: this.state.type,
          dateRange: this.state.dateRange,
        },
      };
    } else if (this.state.selectedType === 3) {
      json = {
        tab3: {
          dateFrom: this.state.dateFrom,
          dateTo: this.state.dateTo,
          status: this.state.status,
          dateRange: this.state.dateRange,
        },
      };
    } else if (this.state.selectedType === 4) {
      json = {
        tab4: {
          dateFrom: this.state.dateFrom,
          dateTo: this.state.dateTo,
          status: this.state.status,
          dateRange: this.state.dateRange,
        },
      };
    } else if (this.state.selectedType === 5) {
      json = {
        tab5: {
          dateFrom: this.state.dateFrom,
          dateTo: this.state.dateTo,
          dateRange: this.state.dateRange,
        },
      };
    }
    if (newValue === 1) {
      setDateJson = {
        dateFrom: this.state.tab1.dateFrom,
        dateTo: this.state.tab1.dateTo,
        type: this.state.tab1.type,
        dateRange: this.state.tab1.dateRange,
      };
    } else if (newValue === 2) {
      setDateJson = {
        dateFrom: this.state.tab2.dateFrom,
        dateTo: this.state.tab2.dateTo,
        type: this.state.tab2.type,
        dateRange: this.state.tab1.dateRange,
      };
    } else if (newValue === 3) {
      setDateJson = {
        dateFrom: this.state.tab3.dateFrom,
        dateTo: this.state.tab3.dateTo,
        status: this.state.tab3.status,
        dateRange: this.state.tab3.dateRange,
      };
    } else if (newValue === 4) {
      setDateJson = {
        dateFrom: this.state.tab4.dateFrom,
        dateTo: this.state.tab4.dateTo,
        status: this.state.tab4.status,
        dateRange: this.state.tab4.dateRange,
      };
    } else if (newValue === 5) {
      setDateJson = {
        dateFrom: this.state.tab5.dateFrom,
        dateTo: this.state.tab5.dateTo,
        dateRange: this.state.tab5.dateRange,
      };
    }
    window.scrollTo({ top: 0 });
    this.setState({
      ...this.state,
      selectedType: newValue,
      page: 1,
      ...setDateJson,
      ...json,
    });
  };

  handleWeeklyClick = () => {
    let today = new Date();
    let newdateFrom = addDays(today, -7);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 1,
    });
  };
  handleMontlyClick = () => {
    let today = new Date();
    let newdateFrom = addMonths(today, -1);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 2,
    });
  };
  handleTodayClick = (date) => {
    let today = new Date();

    this.setState({
      ...this.state,
      dateFrom: today,
      dateTo: today,
      dateRange: 0,
    });
  };
  handleDateFromChange = (e) => {
    this.setState({ ...this.state, dateFrom: e });
  };
  handleDateToChange = (e) => {
    this.setState({ ...this.state, dateTo: e });
  };
  handleAccountGetReportTrigger = (page, type) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetAccountDetails(
      moment(this.state.dateFrom).format("YYYY-MM-DD"),
      moment(this.state.dateTo).format("YYYY-MM-DD"),
      page,

      type
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleTransactionGetReportTrigger = (page, game_platform_id) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransactionDetails(
      moment(this.state.dateFrom).format("YYYY-MM-DDT00:00:00.000") + "Z",
      moment(this.state.dateTo).format("YYYY-MM-DDT23:59:59.999") + "Z",
      page,
      this.state.pageSize,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleWithdrawalGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetWithdrawalDetails(
      status,
      moment(this.state.dateFrom).format("YYYY-MM-DDT00:00:00.000") + "Z",
      moment(this.state.dateTo).format("YYYY-MM-DDT23:59:59.999") + "Z",
      page,
      this.state.pageSize,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleDepositGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetDepositDetails(
      status,
      moment(this.state.dateFrom).format("YYYY-MM-DDT00:00:00.000") + "Z",
      moment(this.state.dateTo).format("YYYY-MM-DDT23:59:59.999") + "Z",
      page,
      this.state.pageSize,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleRebateGetReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetRebateDetails(
      moment(this.state.dateFrom).format("YYYY-MM-DDT00:00:00.000") + "Z",
      moment(this.state.dateTo).format("YYYY-MM-DDT23:59:59.999") + "Z",
      page
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
  };
  handleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
  };

  handleScrollBottom = () => {
    if (this.state.isMaxPage === false) {
      this.setState({
        ...this.state,
        page: this.state.page + 1,
        loading: true,
      });
    }
  };
  render() {
    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={(() => {
              switch (this.state.selectedType) {
                case 1:
                  return i18n.t("report.transferDetails");
                case 2:
                  return i18n.t("report.bettingDetails");
                case 3:
                  return i18n.t("report.withdrawalDetails");
                case 4:
                  return i18n.t("report.depositDetails");
                case 5:
                default:
                  return i18n.t("report.rebateDetails");
              }
            })()}
            position={"sticky"}
            backgroundColor={"transparent"}
          ></Header>
          <BalanceLabel>
            {this.props.wallet.mainSymbol}
            {Common.formatNumberWithThousand(this.props.wallet.mainBalance)}
          </BalanceLabel>
          <Tabs value={this.state.selectedType} onChange={this.handleChangeTab}>
            {/*
          <Tab
              style={{ width: "calc(750px/5)" }}
              index={1}
              label={i18n.t("report.transferDetails")}
              value={1}
            />
          */}
            <Tab
              style={{ width: "calc(750px/3)" }}
              index={2}
              label={i18n.t("report.bettingDetails")}
              value={2}
            />
            <Tab
              style={{ width: "calc(750px/3)" }}
              index={3}
              label={i18n.t("report.withdrawalDetails")}
              value={3}
            />
            <Tab
              style={{ width: "calc(750px/3)" }}
              index={4}
              label={i18n.t("report.depositDetails")}
              value={4}
            />
            {/*<Tab
              style={{ width: "calc(750px/5)" }}
              index={5}
              label={i18n.t("report.rebateDetails")}
              value={5}
            /> */}
          </Tabs>
        </StyledAppBar>

        <DateContainer>
          <DateInner>
            <DateLabel>{i18n.t("report.startDate")}</DateLabel>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap["zh"]}
              >
                <DatePicker
                  autoOk
                  clearable
                  disableFuture
                  maxDate={new Date(this.state.dateTo)}
                  format="yyyy/MM/dd"
                  value={this.state.dateFrom}
                  onChange={this.handleDateFromChange}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </DateInner>
          <DateSpliter>-</DateSpliter>
          <DateInner style={{ float: "right" }}>
            <DateLabel>{i18n.t("report.endDate")}</DateLabel>
            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap["zh"]}
              >
                <DatePicker
                  autoOk
                  clearable
                  disableFuture
                  minDate={new Date(this.state.dateFrom)}
                  maxDate={new Date()}
                  format="yyyy/MM/dd"
                  value={this.state.dateTo}
                  onChange={this.handleDateToChange}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </DateInner>
          <div className="clear"></div>
          <DateRangContainer>
            <DateRangSelection
              selected={true}
              onClick={this.handleTodayClick}
              selected={this.state.dateRange === 0}
            >
              {i18n.t("report.today")}
            </DateRangSelection>
            <DateRangSelection
              selected={this.state.dateRange === 1}
              onClick={this.handleWeeklyClick}
            >
              {i18n.t("report.oneWeek")}
            </DateRangSelection>
            <DateRangSelection
              selected={this.state.dateRange === 2}
              onClick={this.handleMontlyClick}
            >
              {i18n.t("report.oneMonth")}
            </DateRangSelection>
          </DateRangContainer>
        </DateContainer>
        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.platform")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomSelect
                    native
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                  >
                    <option value={0}>{i18n.t("report.all")}</option>

                    {(() => {
                      return this.state.gameList.map((row) => {
                        return (
                          <option value={row.id} key={row.id}>
                            {row.name}
                          </option>
                        );
                      });
                    })()}
                  </CustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomSelect
                    native
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>

                    {Object.keys(this.state.withdrawalStatusList).map((key) => {
                      return (
                        <option value={key}>
                          {i18n.t(`report.withdrawal.status${key}`)}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomSelect
                    native
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>
                    {Object.keys(this.state.depositStatusList).map((key) => {
                      return (
                        <option value={key}>
                          {i18n.t(`report.deposit.status${key}`)}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          }
        })()}

        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.submitDate")}</DataDateCell>
                    <DataWinlossCell>{i18n.t("report.status")}</DataWinlossCell>
                    <DataWinlossCell>
                      {i18n.t("report.transferOut")}
                      <br />
                      {i18n.t("report.transferIn")}
                    </DataWinlossCell>

                    <DataWinlossCell>{i18n.t("common.amount")}</DataWinlossCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecordContainer></NoRecordContainer>;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataRow key={index}>
                              <DataDateCell>
                                {row.create_time_text}
                              </DataDateCell>
                              <DataDateCell>{row.status_text}</DataDateCell>
                              <DataDateCell>
                                {row.transform_out}
                                <br />
                                {row.transform_in}
                              </DataDateCell>

                              <DataDateCell>{row.amount_text}</DataDateCell>
                            </DataRow>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </>
            );
          } else if (this.state.selectedType === 2) {
            return (
              <>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.betDateTime")}</DataDateCell>
                    <DataDateCell>{i18n.t("report.platform")}</DataDateCell>
                    <DataWinlossCell>
                      {i18n.t("report.betAmount")}
                    </DataWinlossCell>
                    <DataWinlossCell>
                      {i18n.t("report.winloss")}
                    </DataWinlossCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecordContainer></NoRecordContainer>;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <React.Fragment key={index}>
                              <DataRowId>
                                {i18n.t("report.betid")} :{" "}
                                <IDCell>{row.id}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell> {date}</DataDateCell>
                                <DataDateCell>
                                  {row.gameProviderName}
                                </DataDateCell>
                                <DataWinlossCell>
                                  {row.betAmount}
                                </DataWinlossCell>
                                <DataWinlossCell>{row.winLoss}</DataWinlossCell>
                              </DataRow>
                            </React.Fragment>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell3>{i18n.t("report.dateTime")}</DataDateCell3>

                    <DataDateCell3>{i18n.t("report.status")}</DataDateCell3>
                    <DataDateCellAmount>
                      {i18n.t("common.amount")}
                    </DataDateCellAmount>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecordContainer></NoRecordContainer>;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <React.Fragment key={index}>
                              <DataRowId>
                                {i18n.t("report.OrderNumber")} :{" "}
                                <IDCell>{row.id}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell3>{date}</DataDateCell3>
                                <DataDateCell3>
                                  {i18n.t(
                                    `report.withdrawal.status${row.status}`
                                  )}
                                </DataDateCell3>
                                <DataDateCellAmount>
                                  {row.amount}
                                </DataDateCellAmount>
                              </DataRow>
                            </React.Fragment>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell3>{i18n.t("report.dateTime")}</DataDateCell3>

                    <DataDateCell3>{i18n.t("report.status")}</DataDateCell3>
                    <DataDateCellAmount>
                      {i18n.t("common.amount")}
                    </DataDateCellAmount>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecordContainer></NoRecordContainer>;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <React.Fragment key={index}>
                              <DataRowId>
                                {i18n.t("report.OrderNumber")} :{" "}
                                <IDCell>{row.id}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell3>{date}</DataDateCell3>
                                <DataDateCell3>
                                  {i18n.t(`report.deposit.status${row.status}`)}
                                </DataDateCell3>
                                <DataDateCellAmount>
                                  {row.amount}
                                </DataDateCellAmount>
                              </DataRow>
                            </React.Fragment>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </>
            );
          } else if (this.state.selectedType === 5) {
            return (
              <>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.rebate.sn")}</DataDateCell>
                    <DataDateCell>
                      {i18n.t("report.rebate.cycleDate")}
                    </DataDateCell>
                    <DataDateCell>{i18n.t("report.status")}</DataDateCell>
                    <DataDateCell style={{ "text-align": "right" }}>
                      {i18n.t("report.rebate.validBet")}
                      <br />
                      {i18n.t("report.rebate.amount")}
                    </DataDateCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecordContainer></NoRecordContainer>;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataRow key={index}>
                              <DataDateCell>{row.sn}</DataDateCell>
                              <DataDateCell>{row.date}</DataDateCell>
                              <DataDateCell>{row.status_text}</DataDateCell>
                              <DataDateCell style={{ "text-align": "right" }}>
                                {row.bet_valid_text}
                                <br />
                                {row.rebate_amount_text}
                              </DataDateCell>
                            </DataRow>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </>
            );
          }
        })()}
        <BottomScrollListener onBottom={this.handleScrollBottom} />
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Report)));
