import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// Component
import MyButton from "../utils/MyButton";
import Toolbar from "@material-ui/core/Toolbar";
// Material UI core imports
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
// Material UI icons imports
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
// Material UI core icons
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";

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
  render() {
    const { classes } = this.props;
    return (
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Fragment>
              <Link to="/">
                <MyButton edge={"start"} tip={"Home"}>
                  <HomeIcon className={classes.navButton} />
                </MyButton>
              </Link>
              <Typography variant="h6" className={classes.title}>
                Vendue
              </Typography>
              <Link to="/login">
                <Button className={classes.navButton}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className={classes.navButton}>Signup</Button>
              </Link>
            </Fragment>
          </Toolbar>
        </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function Navbar() {
//   const classes = useStyles();

//   return (
// <div className={classes.root}>
//   <AppBar position="static">
//     <Toolbar>
//       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//         <MenuIcon />
//       </IconButton>
//       <Typography variant="h6" className={classes.title}>
//         News
//       </Typography>
//       <Button color="inherit">Login</Button>
//     </Toolbar>
//   </AppBar>
// </div>
//   );
// }
