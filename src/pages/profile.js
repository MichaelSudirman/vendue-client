import React, { Component, Fragment } from "react";
import format from "date-fns/format";
// Components and utils
import ProfileDialog from "../components/profile/profileDialog";
// Actions
import { readMyProfile } from "../actions/userActions";
// Material UI core imports
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.global,
  imageBox: {
    textAlign: "center",
    // display:'flex',
    // justifyContent:'center',
    // height: 64,
    // width: '100wh',
    borderRadius: 1,
    border: "1px solid rgb(245, 245, 245)",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
  },
});

class profile extends Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
    this.state = {
      user: null,
      loading: true,
    };
  }
  handler = () => {
    this.setState({ loading: true })
    this.fetchProfile()
  }
  componentDidMount = () => this.fetchProfile()
  fetchProfile = () => {
    readMyProfile()
      .then((res) => this.setState({ loading: false, user: res.user }))
      .catch((err) => console.log(err));
  }
  render() {
    const classes = this.props;
    const { user, loading } = this.state;
    return (
      <Fragment>
        {loading ? (
          "loading..."
        ) : (
            <Fragment>
              <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography variant="h5" className={classes.pageTitle}>
                        Profile
                    </Typography>
                      <ProfileDialog user={user} handler={this.handler} />
                      <div className={classes.imageBox}>
                        <img
                          src={user.imageUrl}
                          height={64}
                          width={64}
                          alt="profile"
                        />
                      </div>
                      <Typography>User: {user._id}</Typography>
                      <Typography>Username: {user.username}</Typography>
                      <Typography>Email: {user.email}</Typography>
                      <Typography>
                        Description:{" "}
                        {user.description ? user.description : "Not available"}
                      </Typography>

                      <Typography>
                        Joined from: {new Date(user.joinedIn.$date).toUTCString()}
                      </Typography>

                      <Typography>
                        Location:{" "}
                        {user.location ? user.location : "Not available"}
                      </Typography>
                      <Typography>Rating: {user.rating}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item sm />
              </Grid>
            </Fragment>
          )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(profile);
