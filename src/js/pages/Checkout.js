import React from "react";
import CheckoutStore from "../stores/CheckoutStore";
import Summary from "../components/checkout/Summary"

export default class Checkout extends React.Component {
  render() {
    return (
      <Summary/> 
    );
  }
}
