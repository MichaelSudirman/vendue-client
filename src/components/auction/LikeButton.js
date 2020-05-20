import React, { Component, Fragment } from "react";
// Actions
import { likeAuction, unlikeAuction } from '../../actions/dataActions'
// Components and utils
import MyButton from "../common/MyButton";
// Material UI icon imports
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

export class LikeButton extends Component {
    state = {
        hasLiked: null
    }

    componentDidMount() {
        this.setState({ hasLiked: this.likedAuction() })
    }

    likedAuction = () => {
        const token = localStorage.getItem("Authorization")
        const userId = token && token.split("@")[0]
        return this.props.userIdList &&
            this.props.userIdList.find(like => like.userId === userId) ? true : false
    }
    likeAuction = () =>
        likeAuction(this.props.auctionId)
            .then(this.setState({ hasLiked: true }))
            .catch(err => console.log(err))
    unlikeAuction = () =>
        unlikeAuction(this.props.auctionId)
            .then(this.setState({ hasLiked: false }))
            .catch(err => console.log(err))

    render() {
        const { hasLiked } = this.state
        const isAuthenticated = localStorage.getItem("Authorization")
            ? true : false;

        return (
            <Fragment>
                {isAuthenticated && (hasLiked ?
                    <MyButton tip="unlike" onClick={this.unlikeAuction}>
                        <StarIcon color="primary" />
                    </MyButton> :
                    <MyButton tip="like" onClick={this.likeAuction}>
                        <StarBorderIcon color="primary" />
                    </MyButton>)}
            </Fragment>
        )
    }
}

export default LikeButton