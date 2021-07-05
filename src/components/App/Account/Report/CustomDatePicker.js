import React from "react";
import addMonths from "date-fns/addMonths";
import DateFnsUtils from "@date-io/date-fns"; // import
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

function CustomDatePicker(props) {
  const moment = require("moment");
  const CustomPicker = withStyles({
    root: {
      width: "135px",
      height: "40px",
      float: "left",
      backgroundColor: "#fff",
      "& .MuiInputBase-root": {
        paddingRight: 5,
      },
      "& input": {
        fontFamily: "SimHei",
        fontSize: "14px",
      },
      "& .MuiInputAdornment-positionEnd": {
        width: "45px",
        height: "48px",
        marginRight: "5px",
        maxHeight: "40px",
        borderLeft: "solid 1px #b6b6b6",
        "& .MuiButtonBase-root": {
          padding: "5px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  })(KeyboardDatePicker);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CustomPicker
        disableToolbar
        InputAdornmentProps={{ position: "end" }}
        variant="inline"
        maxDate={new Date()}
        inputVariant="outlined"
        format="yyyy/MM/dd"
        id="date-picker-inline"
        value={props.selectedDate ? props.selectedDate : new Date()}
        onChange={props.onhandleDateChange}
        InputProps={{
          readOnly: true,
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomDatePicker;
