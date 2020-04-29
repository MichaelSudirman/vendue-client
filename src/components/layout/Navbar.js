import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Component
import MyButton from "../common/MyButton";
import SearchBar from './SearchBar'
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from '@material-ui/core/Hidden';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// Actions
import { logoutUser } from "../../actions/userActions";
// Material UI icons imports
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
  menuIcon: {
    color: "black",
  },
  descriptionIcon: {
    paddingRight: 5,
  },
});

class Navbar extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes } = this.props;
    const userId = localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization").split("@")[0]
      : null;
    const profileNavbar = userId ? (
      <Fragment>
        <Link to="/auctions">
          <MyButton tip={"My Auctions"}>
            <ShoppingCartIcon />
          </MyButton>
        </Link>
        <MyButton tip={"My Account"} onClick={this.handleOpen}>
          <PersonIcon />
        </MyButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/profile">
            <MenuItem onClick={this.handleClose} className={classes.menuIcon}>
              <AccountBoxIcon className={classes.descriptionIcon} />
              Profile
            </MenuItem>
          </Link>
          <MenuItem onClick={logoutUser}>
            <ExitToAppIcon className={classes.descriptionIcon} /> Logout
          </MenuItem>
        </Menu>
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
          <Link to="/">
            <MyButton tip={"Home"}>
              <HomeIcon className={classes.navButton} />
            </MyButton>
          </Link>
          <Hidden only="xs">
            <Typography variant="h6" className={classes.title}>
              Vendue
            </Typography>
          </Hidden>
          <SearchBar />
          {profileNavbar}
        </Toolbar>
      </AppBar>
    );
  }
}

// export default Navbar
export default withStyles(styles)(Navbar);
