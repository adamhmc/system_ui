import React from "react";
import { Link } from "react-router";
import Todos from "./Todos";
import Main from "./Main";
import Checkout from "./Checkout";

import Footer from "../components/layout/Footer";
import Login from "./Login";
import Header from "../components/layout/Header"
import { Router, Route, IndexRoute, hashHistory } from "react-router";

export default class Layout extends React.Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated : true,
    }
  }


  getRoutingPage() {
        console.log("getRoutingPage");

    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Todos}></IndexRoute>
          <Route path="checkout" name="checkout" component={Checkout}></Route>
        </Route>
      </Router>
    );
  }



  render() {
        console.log("layout");

    return (
      <div><Header/>{(this.state.isAuthenticated)?this.getRoutingPage():<Login/>}<Footer/></div> 
    );
  }
}
