import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
// Material UI Picker Imports
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";

class MyTimePicker extends Component {
  state = {
    date: new Date(),
  };

  handleChange = (e) => {
    this.setState({ date: e });
    this.props.parentCallback(e);
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          margin="normal"
          id="auctionExp"
          name="auctionExp"
          label="Expiration Date"
          // format="dd/MM/yyyy HH:mm:ss"
          value={this.state.date}
          onChange={this.handleChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          fullWidth
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default MyTimePicker;
