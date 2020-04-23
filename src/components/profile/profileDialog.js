import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
// Components and utils
import MyDropzone from "../common/MyDropzone";
import MyButton from "../common/MyButton";
// actions
import { updateProfile } from "../../actions/userActions";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// Material UI Icon Imports
import EditIcon from "@material-ui/icons/Edit";

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

class profileDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      description: '',
      location: '',
      files: [],
      error: {},
    };
    // Create an initialState
    this.initialState = this.state;
  }

  componentDidMount() {
    const {
      user: { description, location },
    } = this.props;
    this.setState({ description, location });
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ error: {}, open: false });
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  DropzoneCallBack = childData => this.setState({ files: childData });
  handleSubmit = () =>
    updateProfile(this.state)
      .then(res => {
        this.props.handler()
        this.handleClose()
      })
      .catch(err => this.setState({ error: err }));

  render() {
    const { classes } = this.props;
    const { location, description, imageUrl } = this.state;
    return (
      <Fragment>
        <MyButton tip="Edit Icon" onClick={this.handleOpen}>
          <EditIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Your Profile</DialogTitle>
          <DialogContent>
            {imageUrl}
            <TextField
              id="description"
              name="description"
              label="Description"
              placeholder="Tell more about yourself"
              value={description}
              error={this.state.error.description ? true : false}
              helperText={this.state.error.description}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
              multiline
            />
            <TextField
              id="location"
              name="location"
              label="Location"
              placeholder="Tell more about your current location"
              value={location}
              error={this.state.error.location ? true : false}
              helperText={this.state.error.location}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
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
            <Button onClick={this.handleClose} color="secondary">
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

export default withRouter(withStyles(styles)(profileDialog));
