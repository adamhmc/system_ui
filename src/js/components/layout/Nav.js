import React from "react";
import { Grid, Row, Col} from 'react-bootstrap';
import { IndexLink, Link } from "react-router";
import CheckoutStore from '../../stores/CheckoutStore'

export default class Nav extends React.Component {
  constructor(){
    super();
    this.state = {
      itemInCart : 0
    }
  }

  updateCount(){
    this.setState({
      itemInCart : CheckoutStore.getCount()
    })
  }


  componentWillMount() {
    CheckoutStore.on("change", this.updateCount.bind(this));
  }

  componentWillUnmount() {
    CheckoutStore.removeListener("change", this.updateCount.bind(this));
  }

  render() {
    return (
<Grid>
    <Row className="show-grid">
      <Col lg={10}/>
      <Col className="navItems" lg={2}>
        <IndexLink to="/"><i class="glyphicon glyphicon-search"/></IndexLink>
        <Link to="checkout"><i class="glyphicon glyphicon-list-alt"/><label class="itemInCart">{this.state.itemInCart}</label></Link>
      </Col>
    </Row>
</Grid>
    );
  }
}
