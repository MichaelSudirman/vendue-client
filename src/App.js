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
import Navbar from "./components/layout/Navbar";
import themeObject from "./utils/theme";
import { getUrl } from "./utils/environment";
// Actions
// import { readUser } from "./actions/userActions";
// Material UI core imports
import Grid from "@material-ui/core/Grid";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { logoutUser } from "./actions/userActions";

/*
  setting axios default url under the POST bug,
  cannot POST using proxy key under pacakage.json
*/
axios.defaults.baseURL = getUrl();

// Add a request interceptor
axios.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token !== null) {
      config.headers.Authorization = token.split("@")[1];
      // console.log('token',token)
      // console.log('token [0]', token.split("@")[0])
    }
    return config;
  },
  // Do something with request error
  (error) => {
    // console.log("req error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response) => response,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  (error) => {
    // console.log("res error", error.toJSON());
    if (error.response.status === 401) {
      // logoutUser();
      // Reflect.deleteProperty(axios.defaults.headers.common, "Authorization");
    }
    return Promise.reject(error);
  }
);

const theme = createMuiTheme(themeObject);
// const user = readUser()
//   .then((res) => res.payload)
//   .catch((err) => console.log(err));

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("Authorization"),
    };
  }
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar token={this.state.token}/>
            <Grid container style={{ padding: "1rem" }}>
              <Grid item xs={false} sm={2} />
              <Grid item xs={12} sm={8}>
                <Switch>
                  <Route exact path="/" component={home} />
                  <Route exact path="/login" component={login} />
                  <Route exact path="/signup" component={signup} />
                  <Route exact path="/auctionform" component={auctionList} />
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
