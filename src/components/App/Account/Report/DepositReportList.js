import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
const moment = require("moment");
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "5px 20px 5px 20px",
  },
  body: {
    fontSize: 14,
    padding: "5px 20px 5px 20px",

    color: "#7b7b7b",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#fdeced !important",
      cursor: "pointer",
    },
  },
}))(TableRow);

// function stableSort(array, cmp) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// function getSorting(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => desc(a, b, orderBy)
//     : (a, b) => -desc(a, b, orderBy);
// }
// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

const InnerWrap = styled.div`
  width: 100%;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
`;
const TheDepositButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  padding: 0px 10px;
  color: white;
`;
function DepositReportList(props) {
  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };
  const handleManualDeposit = (id) => {
    AppHistory.push({
      pathname: "/" + i18n.language + "/account/manual/" + id,
    });
  };
  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{i18n.t("report.submitDate")}</StyledTableCell>
            <StyledTableCell>{i18n.t("report.OrderNumber")}</StyledTableCell>

            <StyledTableCell>{i18n.t("report.status")}</StyledTableCell>
            <StyledTableCell align="right">
              {i18n.t("common.amount")}
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            return (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                <StyledTableCell>
                  {moment(row.createdOn).format("YYYY-MM-DD hh:mm a")}
                </StyledTableCell>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>
                  {i18n.t(`report.deposit.status${row.status}`)}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>{" "}
                <StyledTableCell>
                  {row.status === 1 && (
                    <TheDepositButton
                      onClick={() => {
                        handleManualDeposit(row.id);
                      }}
                    >
                      {i18n.t("deposit.uploadReceipt")}
                    </TheDepositButton>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={props.total}
        rowsPerPage={20}
        page={props.page - 1}
        labelRowsPerPage={("asd", "213123", "asdasdasda", "每頁行数")}
        backIconButtonProps={{
          "aria-label": "previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "next page",
        }}
        onChangePage={handleChangePage}
      />
    </InnerWrap>
  );
}
export default DepositReportList;
