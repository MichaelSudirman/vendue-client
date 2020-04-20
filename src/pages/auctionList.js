import React, { Component, Fragment } from "react";
// Components and utils
import MyButton from "../components/common/MyButton";
import AuctionDialog from "../components/auction/AuctionDialog";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// Material UI Icon Imports
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const styles = (theme) => ({
  ...theme.global,
  input: "",
  button: "",
});

class auctionList extends Component {
  render() {
    return (
      <Fragment>
        <AuctionDialog />
      </Fragment>
    );
  }
}

export default withStyles(styles)(auctionList);
