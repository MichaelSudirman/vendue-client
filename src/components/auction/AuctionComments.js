import React, { Component, Fragment } from "react";
// Components and utils
// Actions
// Material UI core imports
// import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    ...theme.global,
});
class AuctionComments extends Component {
    render() {
        return (
            <Fragment>
                Comment Feature, comming soon
            </Fragment>
        )
    }
}

export default withStyles(styles)(AuctionComments);
