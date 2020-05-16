import React, { Component, Fragment } from "react";
import MarketIcon from "../images/market_640.png";
import { Link } from "react-router-dom";
// Actions
import { validateUserEmail } from '../actions/userActions'
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// Material UI icon imports
import CircularProgressIcon from "@material-ui/core/CircularProgress";
// Material UI Lab Imports
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
    ...theme.global,
});


class validateEmail extends Component {
    state = {
        loading: true,
        success: null
    }
    componentDidMount() {
        const token = this.props.match.params.token
        validateUserEmail(token)
            .then(res => {
                this.setState({ success: true });
                this.setState({ loading: false })
            })
            .catch(err => {
                this.setState({ success: false });
                this.setState({ loading: false })
            })
    }
    render() {
        const { classes } = this.props
        const { loading, success } = this.state

        const loadingMarkup = <Fragment>
            <CircularProgressIcon
                size={30}
                className={classes.progress}
            />
            <Typography>Validating... Please wait</Typography>
        </Fragment>

        const resultMarkup = success ?
            <Fragment>
                <Alert severity="success">
                    You have verified your email successfully! -
                    <Link to="/login"> Login </Link>
                    to continue
                </Alert>
            </Fragment> :
            <Fragment>
                <Alert severity="error">
                    Verification failed! Something went wrong
                </Alert>
            </Fragment>

        return (
            <Fragment>
                <Card className={classes.root}>
                    <CardContent>
                        <Grid container className={classes.form}>
                            <Grid item sm />
                            <Grid item sm>
                                <img src={MarketIcon} alt="app" className={classes.image} />
                                <Typography variant="h4" className={classes.pageTitle}>
                                    Email Verification
                                </Typography>
                                {loading ?
                                    loadingMarkup : resultMarkup
                                }
                            </Grid>
                            <Grid item sm />
                        </Grid>
                    </CardContent>
                </Card>

            </Fragment>
        )
    }
}




export default withStyles(styles)(validateEmail);
