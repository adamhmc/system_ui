import React from "react";
import * as TodoActions from "../actions/TodoActions";
import * as CheckoutActions from "../actions/CheckoutActions";

import moment from 'moment-timezone';

export default class Todo extends React.Component {


  constructor(props) {
    super();
    this.state = {
      editing : false,
    }
    this.latestValue = Object.assign({}, props);
    moment.locale('zh-tw');
  }

  deleteItem(){
    TodoActions.deleteTodo(this.props._id);
  }

  editItem(){
    this.setState({
      editing: true
    });
    console.log(this.latestValue);
  }

  saveItem(){
    this.setState({
      editing: false
    });
    TodoActions.updateTodo(this.latestValue);
  }

  handleInputChange(e){
    this.latestValue[e.target.id] = e.target.value;
  }

  convertToLocalTimeZone(timeStamp){
    return moment(timeStamp).tz("Asia/Taipei").format('LLLL');
  }

  addCheckoutItemToCart(){
    var item = {
      companyName : this.props.companyName,
      productName : this.props.productName,
      productPrice : this.props.productPrice
    }
    CheckoutActions.addCheckoutItem(item);
  }

  getIcon(){
    if(this.state.editing){
      return (<button onClick={this.saveItem.bind(this)}><i class="glyphicon glyphicon-save" title="儲存"/></button>);
    }
    return (
      <div>
        <button class="enlargeAnimation" onClick={this.addCheckoutItemToCart.bind(this)}><i class="glyphicon glyphicon-plus" title="刪除"/></button>
      <button onClick={this.deleteItem.bind(this)}><i class="glyphicon glyphicon-trash" title="刪除"/></button>
      </div>
      );
  }

  render() {
    const { _id, companyId, companyName, productName, productPrice, note, lastUpdatedDate} = this.props;

    return (
      <tr>
        <td onDoubleClick={this.editItem.bind(this)}>{(this.state.editing)?(<input id="companyId" onChange={this.handleInputChange.bind(this)} defaultValue={companyId}/>):companyId}</td>
        <td onDoubleClick={this.editItem.bind(this)}>{(this.state.editing)?(<input id="companyName" onChange={this.handleInputChange.bind(this)} defaultValue={companyName}/>):companyName}</td>
        <td onDoubleClick={this.editItem.bind(this)}>{(this.state.editing)?(<input id="productName" onChange={this.handleInputChange.bind(this)} defaultValue={productName}/>):productName}</td>
        <td onDoubleClick={this.editItem.bind(this)}>{(this.state.editing)?(<input id="productPrice" onChange={this.handleInputChange.bind(this)} defaultValue={productPrice}/>):productPrice}</td>
        <td onDoubleClick={this.editItem.bind(this)}>{(this.state.editing)?(<input id="note" onChange={this.handleInputChange.bind(this)} defaultValue={note}/>):note}</td>
        <td>{this.convertToLocalTimeZone(lastUpdatedDate)}</td>
        <td>{this.getIcon()}</td>
      </tr>
    );
  }
}
