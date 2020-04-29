import React, { Component, Fragment } from "react";
import MarketIcon from "../images/market_640.png";
import { Link } from "react-router-dom";
// Actions
import { loginUser } from "../actions/userActions";
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// Material UI icon imports
import CircularProgressIcon from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.global,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true, errors: {} });
    loginUser(this.state)
      .then((res) => {
        this.setState(this.initialState);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errors: err.error,
        });
      });
  };
  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

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
                <img src={MarketIcon} alt="app" className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>
                  Login
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <TextField
                    id="username"
                    name="username"
                    type="username"
                    label="Username"
                    className={classes.textField}
                    helperText={errors.username}
                    error={errors.username ? true : false}
                    value={this.state.username}
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
                    login
                    {this.state.loading && (
                      <CircularProgressIcon
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  <br />
                  <small>
                    Dont have an account ?
                    <Link to="/signup"> Sign Up Here</Link>
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

export default withStyles(styles)(login);
