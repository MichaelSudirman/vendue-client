import React, { Component, Fragment } from "react";
// Components and utils
import AuctionInfo from '../components/auction/AuctionInfo';
import AuctionComment from '../components/auction/AuctionComment';
// Actions
import { readAuction } from '../actions/dataActions';
// Material UI core imports
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// Material UI Lab Imports
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  ...theme.global,
  discussionBox: {
    padding: 20,
    paddingTop: 50,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingTop: 50,
    },
  }
});

class auctionDetails extends Component {
  state = {
    auction: null,
    loading: true,
    error: null
  }
  componentDidMount() {
    const auctionId = this.props.match.params.auctionId;
    readAuction(auctionId)
      .then(res => this.setState({ auction: res, loading: false }))
      .catch(err => this.setState({ loading: false }))
  }
  render() {
    const { classes } = this.props
    const { auction, loading, error } = this.state
    const auctionMarkup = auction ? <Fragment>
      <AuctionInfo auction={auction} />
      <div className={classes.discussionBox}>
        <Typography variant="h5">Comments and Discussions</Typography>
        <AuctionComment auctionId={auction._id.$oid} />
      </div>
    </Fragment> :
      <Alert severity="error">
        Auction does not exist!
      </Alert>

    return (
      <Fragment>
        {loading ? 'loading...' : (auctionMarkup)}

        {error && (
          <Typography variant="body2" className={classes.customError}>
            {error}
          </Typography>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(auctionDetails);
