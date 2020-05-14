import React, { Component, Fragment } from "react";
// Components and utils
import countdown from "../../utils/countdown";
// Actions
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    ...theme.global,
});
class AuctionInfo extends Component {
    render() {
        const { classes } = this.props
        const { auction: {
            _id: { $oid: auctionId },
            name,
            initialBid,
            condition,
            expiredDate,
            seller: { username: sellerName },
            imageUrls,
            hasFinished,
            createdAt
        } } = this.props
        const start = new Date(expiredDate * 1000);
        const timeLeft = countdown(start).toString();
        const creationDate = new Date(createdAt * 1000).toString();
        const images = <Fragment>
            {imageUrls.map(imageUrl => <div className={classes.imageBox}>
                <img
                    src={imageUrl}
                    height={64}
                    width={64}
                    alt="auction"
                />
            </div>)}
        </Fragment>

        return (
            <Fragment>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" className={`${classes.pageTitle}`}>
                            {name}
                        </Typography>
                        <Typography>Auction Id: {auctionId}</Typography>
                        <Typography>Initial Bid: {initialBid} by {sellerName}</Typography>
                        <Typography>Item Condition {condition}</Typography>
                        <Typography>Auction expired in {timeLeft}</Typography>
                        <Typography>Auction created At{creationDate}</Typography>
                        <Typography>Status: {hasFinished ? 'has finished' : 'on-going'}</Typography>
                        {images}
                        (styling on progress)

                    </CardContent>
                </Card>
            </Fragment>
        )
    }
}

export default withStyles(styles)(AuctionInfo);
