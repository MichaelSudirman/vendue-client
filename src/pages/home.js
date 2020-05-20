import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Component and utils
import AuctionBox from "../components/auction/AuctionBox";
// Actions
import { readAuctions } from "../actions/dataActions";
// Material UI core imports
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Material UI core imports
import StarBorderIcon from "@material-ui/icons/StarBorder";


class auctionList extends Component {
  state = {
    auctions: [],
    loading: true,
  };

  componentDidMount() {
    readAuctions()
      .then((res) => this.setState({ auctions: res, loading: false }))
      .catch((err) => console.log("homeGetAuctions", err))
  }

  render() {
    const { auctions, loading } = this.state;
    const favoriteButtonMarkup =
      <Link to={`/favorites`}>
        <Button
          variant="contained"
          color="primary"
          tip="Create an Auction"
        >
          <StarBorderIcon />
      Favorites
    </Button>
      </Link>
    const auctionMarkup = auctions.map(auction => (
      <AuctionBox auction={auction} key={auction._id.$oid} />
    ));
    return (<Fragment>
      {favoriteButtonMarkup}
      {loading ? (
        "loading..."
      ) : (
          <Fragment>
            <Typography variant="h5">List of Auctions</Typography>
            <Grid container spacing={2}>
              {auctionMarkup}
            </Grid>
          </Fragment>
        )}
    </Fragment>)
  }
}

export default auctionList;
