import React, { Component, Fragment } from "react";
// Components and utils
import MyDropzone from "../common/MyDropzone";
import MyTimePicker from "../common/MyTimePicker";
// actions
import { createAuction } from "../../actions/dataActions";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgressIcon from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
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

const displayFiles = files =>
  files.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

class AuctionDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      name: "",
      initialBid: 0,
      condition: "",
      description: "",
      expiredDate: new Date(),
      files: [],
      errors: {},
    };
    // Create an initialState
    this.initialState = this.state;
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState(this.initialState);
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = () => {
    this.setState({ loading: true, errors: {} });

    createAuction(this.state)
      .then(res => {
        this.setState(this.initialState);
        this.setState({ loading: false });
        this.props.parentCallBack()
      })
      .catch(err => err.error ?
        this.setState({ errors: err.error, loading: false }) :
        this.setState({ errors: { general: 'Something happened, please try again' }, loading: false }))
  }
  DropzoneCallBack = childData => this.setState({ files: childData });
  TimePickerCallBack = childData => this.setState({ expiredDate: childData });

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state
    // console.log(this.props)
    // this.props.parentCallBack()
    
    return (
      <Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleOpen}
          tip="Create an Auction"
        >
          <AddCircleOutlineIcon />
          Create an Auction
        </Button>
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
              error={errors.name ? true : false}
              helperText={errors.name}
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
              error={errors.initialBid ? true : false}
              helperText={errors.initialBid}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="condition"
              name="condition"
              label="Condition"
              placeholder="Your auction product's condition"
              error={errors.condition ? true : false}
              helperText={errors.condition}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              placeholder="Your auction's details here"
              error={errors.description ? true : false}
              helperText={errors.description}
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

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Submit
              {loading && (
                <CircularProgressIcon
                  size={30}
                  className={classes.progress}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AuctionDialog);
