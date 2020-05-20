import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Components and utils
import countdown from "../../utils/countdown";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const styles = (theme) => ({
  ...theme.global,
  box: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      transform: "scale3d(1.05, 1.05, 1.05)",
    },
    transition: "0.3s ease-in-out",
  },
  imageBox: {
    height: 64,
    width: 64,
    borderRadius: 1,
    border: "1px solid rgb(245, 245, 245)",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
  },
  boxTitle: {
    whiteSpace: 'normal',
    marginLeft: 20,
    marginRight: 20,
    height: 32
  },
  boxText: {
    whiteSpace: 'normal',
    maxHeight: 20,
    marginLeft: 15,
    marginRight: 15
  }
});

class AuctionBox extends Component {
  render() {
    const {
      classes,
      auction: {
        _id: { $oid: auctionId },
        name,
        initialBid,
        imageUrls,
        expiredDate,
        seller: { username: sellerName }
      },
    } = this.props;
    const start = new Date(expiredDate * 1000);
    const timeLeft = countdown(start, null, null, 1).toString();
    return (
      <Fragment>
        <Grid item sm={3} xs={12}>
          <Link to={`/auction/${auctionId}`}>
            <Tooltip title="Go to details" aria-label="add" placement="top">
              <Card
                className={classes.box}
              >
                <CardContent>
                  <Typography variant="h6" noWrap className={classes.boxTitle}>{name}</Typography>
                </CardContent>
                <div className={classes.imageBox}>
                  <img
                    src={imageUrls[0]}
                    height={64}
                    width={64}
                    alt="profile"
                  />
                </div>
                <CardContent>
                  <Typography variant="body2" className={classes.boxText}>
                    <b>{timeLeft}</b> left
                  </Typography>
                  <Typography variant="body2" noWrap className={classes.boxText}>
                    Initial bid: <b>{initialBid}</b> by <b>{sellerName}</b>
                  </Typography>
                  <Typography variant="body2" noWrap className={classes.boxText}>
                    Highest bid: <b>{0}</b> by <b>{"dummy"}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Tooltip>
          </Link>
        </Grid >
      </Fragment >
    );
  }
}

export default withStyles(styles)(AuctionBox);
