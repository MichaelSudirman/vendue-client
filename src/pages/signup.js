import React, { Component, Fragment } from "react";
import MarketIcon from "../images/market_640.png";
import { Link } from "react-router-dom";
// Component
// Actions
import { signupUser } from "../actions/userActions";
// Material UI Core Imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgressIcon from "@material-ui/core/CircularProgress";
// Material UI Lab Imports
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  ...theme.global,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      success: false,
      errors: {},
      loading: false,
    };
    this.initialState = this.state;
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    signupUser(this.state)
      .then((res) => {
        this.setState(this.initialState);
        this.setState({ success: true });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          success: false,
          errors: err.error,
        });
      });
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <Card className={classes.root}>
          <CardContent>
            <Grid container className={classes.form}>
              <Grid item sm />
              <Grid item sm>
                {this.state.success && (
                  <Alert severity="success">
                    You have signed up successfully! -
                    <Link to="/login"> Login </Link>
                    to continue
                  </Alert>
                )}
                <img src={MarketIcon} alt="app" className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>
                  Signup
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    className={classes.textField}
                    helperText={errors.username}
                    error={errors.username ? true : false}
                    value={this.state.username}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    className={classes.textField}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="ConfirmPassword"
                    className={classes.textField}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    fullWidth
                  />

                  {errors.general && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.general}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={this.state.loading}
                  >
                    Signup
                    {this.state.loading && (
                      <CircularProgressIcon
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  <br />
                  <small>
                    Already have an account ?
                    <Link to="/login"> Login Here</Link>
                  </small>
                </form>
              </Grid>
              <Grid item sm />
            </Grid>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(styles)(signup);
