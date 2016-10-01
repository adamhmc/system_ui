import React from "react";
import { Link } from "react-router";
import Nav from "../components/layout/Nav";
export default class Main extends React.Component {

  render() {
    return (
      <div className = "container">
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
