import React, { Component, Fragment } from "react";
// Components and utils
import MyButton from "../utils/MyButton";
import MyDropzone from "../utils/MyDropzone";
import MyTimePicker from "../utils/MyTimePicker";
// actions
import { createAuction } from "../../action/auctionActions";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// Material UI Icon Imports
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const styles = (theme) => ({
  ...theme.global,
  input: {},
  button: {},
  textField: {
    marginBottom: 20,
  },
});

const displayFiles = (files) =>
  files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

class AuctionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      initialBid: 0,
      condition: "",
      description: "",
      expiredDate: new Date(),
      files: [],
      error: {},
    };
    // Create a initialState
    this.initialState = this.state;
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState(this.initialState);
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = async () =>
    await createAuction(this.state)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  DropzoneCallBack = (childData) => this.setState({ files: childData });
  TimePickerCallBack = (childData) => this.setState({ expiredDate: childData });
  // TEST
  checkState = () => console.log(this.state);

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create an Auction">
          <AddCircleOutlineIcon />
          Create an Auction
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Auction Form</DialogTitle>
          <DialogContent>
            <TextField
              id="name"
              name="name"
              label="Name"
              placeholder="Your auction's display name"
              error={this.state.error.name ? true : false}
              helperText={this.state.error.name}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="initialBid"
              name="initialBid"
              label="Initial Bid"
              placeholder="Your auction's inital bid in Australian Dollar (AUD)"
              type="number"
              error={this.state.error.initialBid ? true : false}
              helperText={this.state.error.initialBid}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="condition"
              name="condition"
              label="Condition"
              placeholder="Your auction product's condition"
              error={this.state.error.condition ? true : false}
              helperText={this.state.error.condition}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              placeholder="Your auction's details here"
              error={this.state.error.description ? true : false}
              helperText={this.state.error.description}
              className={classes.textField}
              onChange={this.handleChange}
              multiline
              fullWidth
            />
            <MyTimePicker parentCallback={this.TimePickerCallBack} />
            <MyDropzone
              parentCallback={this.DropzoneCallBack}
              classes={classes.textField}
            />
            {displayFiles(this.state.files)}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.checkState} color="primary">
              State
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AuctionDialog);
