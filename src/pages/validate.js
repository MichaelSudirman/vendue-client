import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Actions
import { validateUserEmail } from '../actions/userActions'
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
// Material UI icon imports
import CircularProgressIcon from "@material-ui/core/CircularProgress";
// Material UI Lab Imports
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
    ...theme.global,
});


class validate extends Component {
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
            <Typography>Validating... Please wait</Typography>
            <CircularProgressIcon
                size={30}
                className={classes.progress}
            />
        </Fragment>

        const resultMarkup = success ?
            <Fragment>
                <Alert severity="success">
                    You have signed up successfully! -
                    <Link to="/login"> Login </Link>
                    to continue
                </Alert>
            </Fragment> :
            <Fragment>
                <Alert severity="error">
                    Validation failed! Please try again
                </Alert>
            </Fragment>

        return (
            <Fragment>
                {loading ?
                    loadingMarkup : resultMarkup
                }

            </Fragment>
        )
    }
}




export default withStyles(styles)(validate);
