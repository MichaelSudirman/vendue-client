import React, { Component, Fragment } from "react";
// Components and utils
import AuctionDetails from '../components/auction/AuctionDetails'
import AuctionComments from '../components/auction/AuctionComments'
// Actions
import { readAuction } from '../actions/dataActions';
// Material UI core imports
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.global,
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
      <AuctionDetails auction={auction} />
      <AuctionComments auctionId={auction._id.$oid} />
    </Fragment> :
      'no auction with such id (styling on progress)'

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
