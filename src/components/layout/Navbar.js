import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Component
import MyButton from "../common/MyButton";
import Toolbar from "@material-ui/core/Toolbar";
// Actions
import { logoutUser } from "../../actions/userActions";
// Material UI core imports
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// Material UI icons imports
import Tooltip from "@material-ui/core/Tooltip";
// Material UI core icons
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

const styles = (theme) => ({
  ...theme.global,
  navButton: {
    color: "white",
  },
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: "none",
    flexGrow: 1,
  },
  right: {
    alignContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
});

class Navbar extends Component {
  state = {
    user: null,
  };
  logout = () => {
    logoutUser();
    this.setState({ user: null });
  };

  // TEST
  checkState = () => console.log(this.state);
  render() {
    const { classes } = this.props;
    const authenticated = localStorage.getItem("Authorization");

    const user = authenticated ? (
      <Fragment>
        <Link to="/auctions">
          <MyButton tip={"My Account"}>
            <ShoppingCartIcon />
          </MyButton>
        </Link>
        <Link to="/profile">
          <MyButton tip={"My Account"}>
            <PersonIcon />
          </MyButton>
        </Link>
        <Button className={classes.navButton} onClick={this.logout}>
          logout
        </Button>
      </Fragment>
    ) : (
      <Fragment>
        <Link to="/login">
          <Button className={classes.navButton}>Login</Button>
        </Link>
        <Link to="/signup">
          <Button className={classes.navButton}>Signup</Button>
        </Link>
      </Fragment>
    );
    return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Fragment>
            <Link to="/">
              <MyButton tip={"Home"}>
                <HomeIcon className={classes.navButton} />
              </MyButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Vendue
            </Typography>
            {user}
            {/* <Button onClick={this.checkState}>checkState</Button> */}
          </Fragment>
        </Toolbar>
      </AppBar>
    );
  }
}

// export default Navbar
export default withStyles(styles)(Navbar);
