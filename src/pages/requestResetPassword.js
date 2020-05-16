import React, { Component, Fragment } from "react";
import MarketIcon from "../images/market_640.png";
// Actions
import { requestResetPasswordToken } from '../actions/userActions'
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// Material UI icon imports
import CircularProgressIcon from "@material-ui/core/CircularProgress";
// Material UI Lab Imports
import Alert from "@material-ui/lab/Alert";


const styles = (theme) => ({
    ...theme.global,
});



export class requestResetPassword extends Component {
    state = {
        email: '',
        loading: false,
        success: false,
        errors: {}
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value });

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ loading: true, errors: {}, success: false })
        const data = { email: this.state.email }
        requestResetPasswordToken(data)
            .then(res => this.setState({
                loading: false, success: true, email: ''
            }))
            .catch(err => this.setState({
                loading: false, success: false, errors: err.error
            }))
    }

    render() {
        const { classes } = this.props
        const { email, errors, loading, success } = this.state
        const successMarkUp = success &&
            <Fragment>
                <Alert severity="success">
                    Your reset token have been successfully delievered to your email,
                    please check them
                </Alert>
            </Fragment>

        return (
            <Fragment>

                <Card className={classes.root}>
                    <CardContent>
                        <Grid container className={classes.form}>
                            <Grid item sm />
                            <Grid item sm>
                                {successMarkUp}
                                <img src={MarketIcon} alt="app" className={classes.image} />
                                <Typography variant="h4" className={classes.pageTitle}>
                                    Reset Password
                                </Typography>

                                <Typography>Please type your email below:</Typography>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={email}
                                        placeholder="Place your email here..."
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
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
                                        request token
                                        {loading && (
                                            <CircularProgressIcon
                                                size={30}
                                                className={classes.progress}
                                            />
                                        )}
                                    </Button>
                                </form>
                            </Grid>
                            <Grid item sm />
                        </Grid>
                    </CardContent>
                </Card>

            </Fragment>
        )
    }
}

export default withStyles(styles)(requestResetPassword)
