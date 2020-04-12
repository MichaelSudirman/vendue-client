import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// Pages
import auctionList from "./pages/auctionList";
import home from "./pages/home";
// Components and utils
import themeObject from "./utils/theme";
// Material UI core imports
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

/*
  setting axios default url under the POST bug,
  cannot POST using proxy key under pacakage.json
*/
// axios.defaults.baseURL = "https://us-central1-soc-med.cloudfunctions.net/api";
axios.defaults.baseURL = "http://127.0.0.1:5000";



const theme = createMuiTheme(themeObject);

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/user_id/auctions" component={auctionList} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
