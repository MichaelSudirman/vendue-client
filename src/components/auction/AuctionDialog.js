import React, { Component, Fragment } from "react";
import { compose, withState, withHandlers } from "recompose";
// Components and utils
import MyButton from "../utils/MyButton";
import MyDropzone from "../utils/MyDropzone";
import { auctionInitialState as initialState } from "../../utils/auction";
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
import NewDropZone from "../utils/NewDropZone";

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

const createAuction = (data) => {
  console.log(data);
};


class AuctionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      initialBid: 0,
      condition: "",
      description: "",
      file: [],
    };
    // Create a initialState
    this.initialState = this.state;
  }

  callbackFunction = (childData) => {
    this.setState({ file: childData });
    console.log("received ChildData");
    console.log(this.state);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState(this.initialState);
  handleSubmit = () => createAuction(this.state);

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
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="initialBid"
              name="initialBid"
              label="Initial Bid"
              placeholder="Your auction's inital bid"
              type="number"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="condition"
              name="condition"
              label="Condition"
              placeholder="Your auction product's condition"
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              placeholder="Your auction's details here"
              className={classes.textField}
              onChange={this.handleChange}
              multiline
              fullWidth
            />
            <MyDropzone
              parentCallback={this.callbackFunction}
              className={classes.textField}
            />
            {displayFiles(this.state.file)}
          </DialogContent>

          <DialogActions>
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

// const enhance = compose(
//   withState("open", "setOpen", initialState.open),
//   withState("name", "setName", initialState.name),
//   withState("initialBid", "setInitialBid", initialState.initialBid),
//   withState("condition", "setCondition", initialState.condition),
//   withState("description", "setDescription", initialState.description),
//   withState("file", "setFile", initialState.file),
//   withHandlers({clearField: ({setOpen,setName,setCondition,setDescription,setFile}) => () => {

//   }})
// );

export default withStyles(styles)(AuctionDialog);
