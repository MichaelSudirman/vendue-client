import React, { Component, Fragment } from "react";
// Actions
import { logoutUser } from '../actions/userActions';
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  ...theme.global,
});
class profile extends Component {
  render() {
    return (
      <Fragment>
        <img
          src="https://storage.cloud.google.com/vendue/no-img.png"
          height={64}
          width={64}
          alt="profile"
        />
        <Button variant="contained" color="primary" onClick={logoutUser}>
          logout
        </Button>
      </Fragment>
    );
  }
}

export default withStyles(styles)(profile);
