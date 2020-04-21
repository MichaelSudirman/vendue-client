import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Components and utils
import MyButton from "../common/MyButton";
// Material UI Core Imports
import ImageIcon from "@material-ui/icons/Image";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.global,
  box: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginBottom: 20,
    // padding: 20,
    // margin: 20,
  },
});

class AuctionBox extends Component {
  render() {
    const {
      classes,
      auction: {
        // _id: { $oid: auctionId },
        name,
        initialBid,
        imageUrl,
        createdAt,
        expiredDate,
        seller: { username: sellerName },
      },
    } = this.props;
    // console.log(expiredDate)
    const expiredAt = new Date(expiredDate * 1000).toString();
    console.log(expiredAt);
    return (
      <Fragment>
        <Grid item sm={3} xs={12}>
          <Card className={classes.box}>
            <CardContent>
              <Typography variant="h6">-name-{name}</Typography>
            </CardContent>
            <CardMedia
              image={imageUrl && imageUrl[0]}
              title="Auction image"
              className={classes.image}
            />
            <CardContent>
              <Typography variant="body2">Expired in:{expiredAt}</Typography>
              <Typography variant="body2">
                Initial bid:{initialBid} by {sellerName}
              </Typography>
              <Typography variant="body2">{createdAt}</Typography>
              <Typography variant="body2">
                Highest bid:{0} by {"dummy"}
              </Typography>
              {/* <Typography variant="body2">Bidder:</Typography> */}
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AuctionBox);
