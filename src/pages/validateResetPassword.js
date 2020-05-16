import React, { Component, Fragment } from "react";
import MarketIcon from "../images/market_640.png";
// Actions
import { updateUserPassword, checkResetPasswordToken } from '../actions/userActions'
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
// Material UI icon imports
import CircularProgressIcon from "@material-ui/core/CircularProgress";
// Material UI Lab Imports
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
    ...theme.global,
});


export class validateResetPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        token: '',
        loading: false,
        allow: false,
        success: false,
        errors: {}
    }

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ loading: true, success: false, errors: {} });
        const { password, confirmPassword, token } = this.state
        const data = { password, confirmPassword, token }
        updateUserPassword(data)
            .then(
                this.setState({ loading: false, success: true, password: '', confirmPassword: '' }))
            .catch(err =>
                this.setState({ loading: false, success: false, errors: err.error }))
    }

    componentDidMount() {
        this.setState({ loading: true })
        const token = this.props.match.params.token
        checkResetPasswordToken(token)
            .then(res => this.setState({ loading: false, allow: true, token: res.token }))
            .catch(this.setState({ loading: false, allow: false }))

    }
    render() {
        const { classes } = this.props

        const { password, confirmPassword, loading, allow, success, errors } = this.state
        const loadingMarkup = <Fragment>
            <Typography>Validating... Please wait</Typography>
            <CircularProgressIcon
                size={30}
                className={classes.progress}
            />
            <br />
        </Fragment>
        const formMarkup = allow ?
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    placeholder="Place your password here..."
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                />
                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    placeholder="Place your confirmm password here..."
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={this.state.loading}
                >
                    submit
                        {loading && (
                        <CircularProgressIcon
                            size={30}
                            className={classes.progress}
                        />
                    )}
                </Button>
            </form>
            :
            <Alert severity="error">
                Your token is invalid, please try again
            </Alert>
        const successMarkUp = <Fragment>
            <Alert severity="success">
                Your password has been successfully changed!
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
                                    Reset Password
                                </Typography>
                                {success && successMarkUp}
                                {loading ? loadingMarkup : formMarkup}
                            </Grid>
                            <Grid item sm />
                        </Grid>
                    </CardContent>
                </Card>

            </Fragment>
        )
    }
}

export default withStyles(styles)(validateResetPassword)
