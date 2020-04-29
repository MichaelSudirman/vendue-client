import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom'
// Components and utils
import AuctionBox from "../components/auction/AuctionBox";
// Actions
import { searchAuctions } from '../actions/dataActions';
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    ...theme.global,
});

class auctionDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auctions: [],
            loading: true
        }
    }

    callSearchAuctions = auctionName =>
        searchAuctions(auctionName)
            .then(res => this.setState({ auctions: res }))
            .catch(err => console.log(err))
            .then(this.setState({ loading: false }))

    componentDidUpdate(prevProps, prevState) {
        const currentParam = this.props.location.search
        const prevParam = prevProps.location.search
        if (currentParam !== prevParam) {
            const auctionName = new URLSearchParams(this.props.location.search).get('name')
            this.callSearchAuctions(auctionName)
        }
    }
    componentDidMount() {
        const auctionName = new URLSearchParams(this.props.location.search).get('name')
        this.callSearchAuctions(auctionName)

    }

    render() {
        const { loading, auctions } = this.state
        const auctionName = new URLSearchParams(this.props.location.search).get('name')

        const auctionMarkup = auctions.length > 0 ? (auctions.map(auction => (
            <AuctionBox auction={auction} key={auction._id.$oid} />
        ))) : <Typography variant="body2">There are no auction that has the name</Typography>;
        
        return (
            <Fragment>
                <Typography variant="h5">Searching for "{auctionName}"</Typography>
                {loading ? 'loading...' : <Fragment>
                    <Grid container spacing={2}>
                        {auctionMarkup}
                        <Typography variant="body2">loaded</Typography>
                    </Grid>
                </Fragment>}
            </Fragment>
        );
    }
}

export default withRouter(withStyles(styles)(auctionDetails));
