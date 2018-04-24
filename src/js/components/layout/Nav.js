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
    CheckoutStore.on("clear", this.updateCount.bind(this));
  }

  componentWillUnmount() {
    CheckoutStore.removeListener("change", this.updateCount.bind(this));
    CheckoutStore.removeListener("clear", this.updateCount.bind(this));
  }

  render() {
    return (
<Grid fluid>
    <Row className="show-grid">
      <Col lg={10} md={10} sm={10}/>
      <Col className="navItems" lg={2} md={2} sm={2}>
        <IndexLink to="/"><i class="glyphicon glyphicon-nav glyphicon-search" title="搜尋"/></IndexLink>
        <Link to="checkout"><i class="glyphicon glyphicon-nav glyphicon-floppy-save" title="新增結算"/><label class="itemInCart">{this.state.itemInCart}</label></Link>
        <Link to="transactions"><i class="glyphicon glyphicon-nav glyphicon-list-alt" title="結算紀錄"/></Link>
      </Col>
    </Row>
</Grid>
    );
  }
}
