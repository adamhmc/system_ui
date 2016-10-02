import React from "react";
import * as TodoActions from "../actions/TodoActions";
import * as CheckoutActions from "../actions/CheckoutActions";
import {Modal, Button} from 'react-bootstrap';
import moment from 'moment-timezone';

export default class Todo extends React.Component {


  constructor(props) {
    super();
    this.state = {
      editing : false,
      showModal: false
    }
    this.latestValue = Object.assign({}, props);
    moment.locale('zh-tw');
  }

  confirmDeletion(){
    TodoActions.deleteTodo(this.props._id);
    this.setState({showModal : false});
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
        <Modal show={this.state.showModal}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">確定刪除資料</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>廠商名稱: {this.props.companyName} 產品名稱: {this.props.productName}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.confirmDeletion.bind(this)}>確定</Button>
            <Button onClick={()=>{this.setState({showModal : false})}}>取消</Button>
          </Modal.Footer>
        </Modal>


        <button class="enlargeAnimation" onClick={this.addCheckoutItemToCart.bind(this)}><i class="glyphicon glyphicon-plus" title="刪除"/></button>
        <button onClick={()=>{this.setState({showModal : true})}}><i class="glyphicon glyphicon-trash" title="刪除"/></button>
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
