import React, { Component, Fragment } from "react";
// Components and utils
import AuctionBox from "../components/auction/AuctionBox";
// Actions
import { likedAuctions } from "../actions/dataActions";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.global
});

class auctionFavorite extends Component {
  state = {
    payload: [],
    loading: true,
  };

  componentDidMount() {
    likedAuctions()
      .then((res) => this.setState({ payload: res, loading: false }))
      .catch((err) => console.log("auctionFavorite", err))
  }

  render() {
    const { payload, loading } = this.state;

    return (
      <Fragment>
        {loading ? (
          "loading..."
        ) :
          <Fragment>
            <Typography variant="h5">My Favorites</Typography>
            <Grid container spacing={2}>
              {payload.map(el => {
                const auction = el.auction
                auction.seller = el.seller
                return <AuctionBox auction={auction} key={auction._id.$oid} />
              }
              )}</Grid>
          </Fragment>}
      </Fragment>
    );
  }
}


export default withStyles(styles)(auctionFavorite);
