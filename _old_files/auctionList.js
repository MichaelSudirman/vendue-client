import React, { Component } from "react";
import Button from "@material-ui/core/Button";

// Components
import AuctionForm from "../src/components/AuctionForm";
// Material UI Core Imports

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// Material UI Icon Imports
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";

class auctionList extends Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          // className={null}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={null}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">
                react-transition-group animates me.
              </p>
              <AuctionForm />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
              <CloseIcon />
            </div>
          </Fade>
        </Modal>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          <AddCircleOutlineIcon />
          <p>Create an Auction</p>
        </Button>
      </>
    );
  }
}

export default auctionList;
