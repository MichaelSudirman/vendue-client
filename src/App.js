import React, { Component, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// Pages
import auctionList from "./pages/auctionList";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
// Components and utils
import PrimarySearchAppBar from "./components/layout/PrimarySearchAppBar";
import Navbar from "./components/layout/Navbar";
import themeObject from "./utils/theme";
import { getUrl } from "./utils/environment";
// Material UI core imports
import Grid from "@material-ui/core/Grid";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

/*
  setting axios default url under the POST bug,
  cannot POST using proxy key under pacakage.json
*/
// axios.defaults.baseURL = "https://us-central1-soc-med.cloudfunctions.net/api";
axios.defaults.baseURL = getUrl();

const theme = createMuiTheme(themeObject);

class App extends Component {
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <Grid container style={{ padding: "1rem" }}>
              <Grid item xs={0} sm={2} />
              <Grid item xs={12} sm={8}>
                <Switch>
                  <Route exact path="/" component={home} />
                  <Route exact path="/login" component={login} />
                  <Route exact path="/signup" component={signup} />
                  <Route
                    exact
                    path="/user_id/auctions"
                    component={auctionList}
                  />
                </Switch>
              </Grid>
              <Grid item xs={0} sm={2} />
            </Grid>
          </Router>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
