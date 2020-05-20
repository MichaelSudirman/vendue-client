import React, { Component, Fragment } from "react";
// Components and utils
import AuctionBox from "../components/auction/AuctionBox";
import AuctionDialog from "../components/auction/AuctionDialog";
// Actions
import { userAuctions } from "../actions/dataActions";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.global
});

class auctionList extends Component {
  state = {
    auctions: [],
    loading: true,
  };
  componentDidMount() {
    userAuctions()
      .then((res) => this.setState({ auctions: res, loading: false }))
      .catch((err) => console.log("auctionList", err))
  }

  dialogCallBack = () => {
    this.setState({ loading: true });
    this.fetchUserAuctions()
  }

  render() {
    const { auctions, loading } = this.state;
    const myAuctionMarkup = <Fragment>
      <Typography variant="h5">My Auctions</Typography>
      <Grid container spacing={2}>
        {auctions.map(auction =>
          <AuctionBox auction={auction} key={auction._id.$oid} />
        )}</Grid>
    </Fragment>

    return (
      <Fragment>
        <AuctionDialog parentCallBack={() => this.dialogCallBack()} />
        {loading ? (
          "loading..."
        ) : myAuctionMarkup}
      </Fragment>
    );
  }
}


export default withStyles(styles)(auctionList);
