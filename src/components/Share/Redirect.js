import React, { Component } from "react";

import Loading from "../App/Loading";

class Redirect extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.location.href = decodeURIComponent(this.props.match.params.url);
  }
  render() {
    return <Loading show={true} opacity={1}></Loading>;
  }
}

export default Redirect;
