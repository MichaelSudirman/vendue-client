import React, { Component, Fragment } from "react";
// Components and utils
import MyButton from "../common/MyButton";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
  ...theme.global,
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class AuctionBox extends Component {
  render() {
    const { classes, auction } = this.props;
    return (
      <Fragment>
        <Grid item >
          <Card className={classes.root}>
            <CardContent>{auction._id}</CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AuctionBox);
