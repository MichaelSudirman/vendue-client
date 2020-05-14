import React, { Component, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// Components and utils
import Navbar from "./components/layout/Navbar";
import themeObject from "./utils/theme";
import { getUrl } from "./utils/environment";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import profile from "./pages/profile";
import auctionList from "./pages/auctionList";
import auctionDetails from "./pages/auctionDetails.js";
import auctionSearch from './pages/auctionSearch.js';
import validate from './pages/validate.js';
// Actions
import { logoutUser } from "./actions/userActions";
// Material UI core imports
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";

/*
  setting axios default url under the POST bug,
  cannot POST using proxy key under pacakage.json
*/
// axios.defaults.baseURL = getUrl();
axios.defaults.baseURL = "https://vendue.herokuapp.com/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token !== null) config.headers.Authorization = token.split("@")[1];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("axiosInterceptors", error.response);
    const statusUnauthorized = error.response.status === 401;
    const isTokenError = error.response.data.error.token;
    if (statusUnauthorized && isTokenError) logoutUser();
    // Reflect.deleteProperty(axios.defaults.headers.common, "Authorization");
    return Promise.reject(error);
  }
);

const theme = createMuiTheme(themeObject);

class App extends Component {
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <Grid container style={{ padding: "1rem" }}>
              <Grid item xs={false} sm={2} />
              <Grid item xs={12} sm={8}>
                <Switch>
                  <Route exact path="/auction" component={auctionSearch} />
                  <Route exact path="/" component={home} />
                  <Route exact path="/login" component={login} />
                  <Route exact path="/signup" component={signup} />
                  <Route exact path="/validate/:token" component={validate} />
                  <Route exact path="/profile" component={profile} />
                  <Route exact path="/auctions" component={auctionList} />
                  <Route exact path="/auction/:auctionId" component={auctionDetails} />
                </Switch>
              </Grid>
              <Grid item xs={false} sm={2} />
            </Grid>
          </Router>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
