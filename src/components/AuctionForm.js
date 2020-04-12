import React, { Component, Fragment } from "react";
import axios from "axios";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import InlineDateTimePickerDemo from "./InlineDateTimePickerDemo";
import TextField from "@material-ui/core/TextField";

// const submitForm = (data, bodyFormData) => {
//   console.log("data");
//   console.log(data);
//   //   const date = new Date(data.selectedDate * 1000);
//   //   const actualDate = date.toUTCString();
//   console.log(typeof data.fileData);
//   axios
//     .post("/test/requestcheck", data)
//     .then(res => {
//       console.log("success");
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });

//   axios({
//     method: "post",
//     data: bodyFormData,
//     headers: { "Content-Type": "multipart/form-data" }
//   })
//     .then(res => {
//       console.log("success");
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

const uploadHandler = (data) => {
  console.log("uploading...");
  console.log(data);
  console.log(data.payload.selectedFile.name);
  const formData = new FormData();
  formData.append(
    "image",
    data.payload.selectedFile,
    data.payload.selectedFile.name
  );
  formData.append(
    'name',data.payload.body
  )
  formData.append(
    'date'.data.payload.selectedDate
  )
  const postData = {
    formData,
    data
  }
  axios
    .post("/test/requestcheck", formData)
    .then((res) => {
      console.log("success");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

class AuctionForm extends Component {
  state = {
    body: "",
    selectedDate: new Date(),
    fileData: null,
    selectedFile: null
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("this.state");
    console.log(this.state);
    uploadHandler({ 'payload': this.state });
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  onChange(e) {
    console.log(e.target.files[0]);
    // this.setState({ file: e.target.files[0] });
    const reader = new FileReader();
    // console.log(this.state.bodyFormData)
    reader.onload = function (ee) {
      console.log(ee.target.result);
      this.setState({ fileData: ee.target.result });
      this.setState({
        bodyFormData: this.state.bodyFormData.append(ee.target.result),
      });
    }.bind(this);
    // console.log(this.state.fileData)
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>AuctionForm Testing 1 2 3...</h1>
          <TextField
            name="body"
            type="text"
            label="Comment on post"
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
          />
          <hr />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              id="auctionExp"
              name="auctionExp"
              variant="inline"
              label="Basic example"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
            />

            <KeyboardDateTimePicker
              variant="inline"
              ampm={false}
              label="With keyboard"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              onError={console.log}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
          </MuiPickersUtilsProvider>
          <hr />
          <input
            type="file"
            onChange={this.fileSelectedHandler}
          />
          <hr />
          {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
          <input type="submit" value="Submit"></input>
        </form>
      </>
    );
  }
}

export default AuctionForm;
