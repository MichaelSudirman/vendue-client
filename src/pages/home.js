import React, { Component, Fragment } from "react";
// Component and utils

import { getUrl } from "../utils/environment";
// Actions
import { readAuctions } from "../actions/auctionActions";
// Material UI core imports

class auctionList extends Component {
  state = {
    auctions: [],
  };

  // auctions = async () => {
  //   await readAuctions()
  //     .then((res) => {
  //       // const payload = []
  //       // console.log(res.data.payload);
  //       // this.setState({auctions:res.data.payload[0]._id})
  //       // console.log(res.data.payload[0]._id);
  //       // return <div>hi</div>
  //       // return res.data.payload;
  //       // payload = res.data.payload.forEach((auction) => (
  //       //   payload.push(<div>{auction._id}</div>)
  //       // ));
  //       // this.setState({auctions:payload})
  //       // return <div>res.data.payload[0]._id</div>
  //     })
  //     .catch((err) => console.log(err));
  // };
  getAuctions = async () => {
    const payload = await readAuctions();
    this.setState({ auctions: payload.data.payload });
  };

  componentDidMount() {
    this.getAuctions();
  }
  render() {
    return (
      <Fragment>
        {/* <div>{readAuctions()}</div> */}
        {this.state.auctions.map((auction) => (
          <div ref={auction.id}>
            <li>{auction._id}</li>
          </div>
        ))}
        {/* <div>{this.state.auctions}</div> */}
        <div>{getUrl()}</div>
        {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
      </Fragment>
    );
  }
}

export default auctionList;
