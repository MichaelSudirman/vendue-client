import React, { Component, Fragment } from "react";
// Component and utils
import AuctionBox from "../components/auction/AuctionBox";
// Actions
import { readAuctions } from "../actions/dataActions";
// Material UI core imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class auctionList extends Component {
  state = {
    auctions: [],
    loading: true,
  };

  componentDidMount() {
    readAuctions()
      .then((res) => this.setState({ auctions: res, loading: false }))
      .catch((err) => console.log("homeGetAuctions", err))
      // .then(this.setState({ loading: false }))
  }

  render() {
    const { auctions, loading } = this.state;
    const auctionMarkup = auctions.map(auction => (
      <AuctionBox auction={auction} key={auction._id.$oid} />
    ));
    return loading ? (
      "loading..."
    ) : (
        <Fragment>
          <Typography variant="h5">List of Auctions</Typography>
          <Grid container spacing={2}>
            {auctionMarkup}
          </Grid>
        </Fragment>
      );
  }
}

export default auctionList;
