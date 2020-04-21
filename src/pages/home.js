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
  };
  getAuctions = () => {
    readAuctions()
      .then((res) => this.setState({ auctions: res }))
      .catch((err) => console.log('homeGetAuctions',err));
  };

  // TEST
  checkState = () => console.log(this.state);

  componentDidMount() {
    this.getAuctions();
  }

  render() {
    const { auctions } = this.state;
    const auctionMarkup = auctions.map((auction) => (
      <AuctionBox auction={auction} key={auction._id.$oid} />
    ));
    return (
      <Fragment>
        <div>{getUrl()}</div>
        <Link to="/auctionform">
          <Button>get to form</Button>
        </Link>

        <Button onClick={this.checkState}>checkState</Button>
        {/* <AuctionBox auctions={auctions}/> */}
        <Typography variant="h5">List of Auctions</Typography>
        <Grid container spacing={2}>
          {auctionMarkup}
        </Grid>
      </Fragment>
    );
  }
}

export default auctionList;
