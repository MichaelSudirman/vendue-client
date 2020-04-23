import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Component and utils
import AuctionBox from "../components/auction/AuctionBox";
import { getUrl } from "../utils/environment";
// Actions
import { readAuctions } from "../actions/dataActions";
// Material UI core imports
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class auctionList extends Component {
  state = {
    auctions: [],
    loading: true,
  };
  getAuctions = () => {
    readAuctions()
      .then((res) => this.setState({ auctions: res, loading: false }))
      .catch((err) => console.log("homeGetAuctions", err));
  };

  componentDidMount() {
    this.getAuctions();
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

          <div>{getUrl()}</div>
        </Fragment>
      );
  }
}

export default auctionList;
