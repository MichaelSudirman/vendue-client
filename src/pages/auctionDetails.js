import React, { Component, Fragment } from "react";
// Components and utils
// Actions
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.global,
});
class auctionDetails extends Component {
  render() {
    return (
      <Fragment>
        auctionDetails
      </Fragment>
    );
  }
}

export default withStyles(styles)(auctionDetails);
