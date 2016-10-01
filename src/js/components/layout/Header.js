import React from "react";
import {PageHeader, Grid, Row, Col} from "react-bootstrap"

export default class Header extends React.Component {
  render() {    
    return (
        <PageHeader className="pageHeader">單價查詢系統 <small className="logout">登出</small></PageHeader>
    );
  }
}
