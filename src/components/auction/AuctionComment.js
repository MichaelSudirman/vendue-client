import React, { Component, Fragment } from "react";
// Components and utils
import countdown from "../../utils/countdown";
import MyButton from '../common/MyButton';
// Actions
import { createComment, readComments } from '../../actions/dataActions'
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
// Material UI icon imports
import SendIcon from '@material-ui/icons/Send';


const styles = (theme) => ({
    ...theme.global,
    root: {
        // maxWidth: 345,
        display: 'flex',
        padding: 10,
        margin: 10
    },
    image: {
        padding: 5
    },
    title: {
        padding: 0,
        lineHeight: 1
    },
    form :{
        display: 'flex',
        justifyContent: 'center'
    }
});

class AuctionComment extends Component {
    state = {
        loading: false,
        comments: [],
        commentInput: '',
        errors: {}
    }

    fetchComments = auctionId =>
        readComments(auctionId)
            .then(res => this.setState({ comments: res.comments, loading: false }))
            .catch(err => this.setState({ loading: false }))

    handleSubmit = e => {
        e.preventDefault()
        const { commentInput } = this.state
        const { auctionId } = this.props
        this.setState({ loading: true, errors: {} })
        createComment(auctionId, commentInput)
            .then(res => { this.setState({ loading: false }); this.fetchComments(auctionId) })
            .catch()
    }

    componentDidMount = () => {
        const { auctionId } = this.props
        this.setState({ loading: true })
        this.fetchComments(auctionId)
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });



    render() {
        const { comments, loading, errors } = this.state
        const { classes } = this.props

        const commentMarkup = comments.map(comment => {
            const {
                _id: { $oid: commentId },
                data,
                createdAt,
                userComment: {
                    imageUrl: userImage,
                    username
                }
            } = comment
            const createdDate = countdown(new Date(createdAt * 1000), null, null, 1).toString()

            return (
                <Fragment>
                    <Card key={commentId} className={classes.root}>
                        <img
                            src={userImage}
                            height={64}
                            width={64}
                            alt="profile"
                            className={classes.image}
                        />
                        <div>
                            <Typography variant="h6" className={classes.title}>{username}</Typography>
                            <Typography variant="caption" className={classes.caption}>
                                {createdDate ? (`${createdDate} ago`) : "just now"}
                            </Typography>
                            <Typography>{data}</Typography>
                        </div>
                    </Card>
                </Fragment>
            )
        })
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        id="commentInput"
                        name="commentInput"
                        label="Add a comment..."
                        placeholder="Place your comment here"
                        error={errors.commentInput ? true : false}
                        helperText={errors.commentInput}
                        className={classes.textField}
                        onChange={this.handleChange}
                        multiline
                        fullWidth
                    />
                    <MyButton tip={"Submit"} onClick={this.handleSubmit}>
                        <SendIcon />
                    </MyButton>
                </form>
                {loading ? ("loading...") : commentMarkup}
            </Fragment>
        )
    }
}

export default withStyles(styles)(AuctionComment);
