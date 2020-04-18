import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Component and utils
import { getUrl } from "../utils/environment";
// Actions
import { readAuctions } from "../actions/auctionActions";
// Material UI core imports
import Button from "@material-ui/core/Button";

class auctionList extends Component {
  state = {
    auctions: [],
  };
  getAuctions = () => {
    readAuctions()
      .then((res) => this.setState({ auctions: res }))
      .catch((err) => console.log("err"));
  };

  // TEST
  checkState = () => console.log(this.state);
 
  componentDidMount() {
    this.getAuctions();
  }

  render() {
    return (
      <Fragment>
        <div>{getUrl()}</div>
        {localStorage.getItem("Authorization")}
        <Link to="/auctionform">
        <Button>get to form</Button>
                </Link>

        <Button onClick={this.checkState}>checkState</Button>
        {this.state.auctions.map((auction) => (
          <div ref={auction.id}>
            <li>{auction._id}</li>
          </div>
        ))}
        {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
      </Fragment>
    );
  }
}

export default auctionList;
