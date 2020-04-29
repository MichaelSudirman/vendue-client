import React, { Component, Fragment } from "react";
// Components and utils
import AuctionDialog from "../components/auction/AuctionDialog";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
// Material UI Icon Imports

const styles = (theme) => ({
  ...theme.global
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
