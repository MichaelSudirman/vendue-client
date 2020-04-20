import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Component and utils
import AuctionBox from "../components/auction/AuctionBox";
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
      .catch((err) => console.log(err));
  };

  // TEST
  checkState = () => console.log(this.state);

  componentDidMount() {
    this.getAuctions();
  }

  render() {
    const { auctions } = this.state;
    return (
      <Fragment>
        <img
          src="https://storage.cloud.google.com/vendue/no-img.png"
          alt="profile"
        />
        <div>{getUrl()}</div>
        {localStorage.getItem("Authorization")}
        <Link to="/auctionform">
          <Button>get to form</Button>
        </Link>

        <Button onClick={this.checkState}>checkState</Button>
        {auctions.map((auction) => (
          <AuctionBox auction={auction} />
        ))}
      </Fragment>
    );
  }
}

export default auctionList;
