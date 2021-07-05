import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const Container = styled.div``;
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "12px",
  },
  body: {
    fontSize: 14,
    padding: "10px",

    color: "#7b7b7b",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#fdeced",
    },
  },
}))(TableRow);

function BonusComplete(props) {
  return (
    <Container>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ paddingLeft: "20px" }}>
              红利名称
            </StyledTableCell>
            <StyledTableCell align="right">红利金额</StyledTableCell>
            <StyledTableCell>发放时间</StyledTableCell>
            <StyledTableCell>有效时间</StyledTableCell>
            <StyledTableCell align="right" style={{ paddingRight: "20px" }}>
              领取状态
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <StyledTableRow key={row.bore_id}>
              <StyledTableCell
                component="th"
                scope="row"
                style={{ paddingLeft: "20px" }}
              >
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell>{row.received_time}</StyledTableCell>
              <StyledTableCell>{row.expired_time}</StyledTableCell>
              <StyledTableCell align="right" style={{ paddingRight: "20px" }}>
                已领取
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
export default BonusComplete;
