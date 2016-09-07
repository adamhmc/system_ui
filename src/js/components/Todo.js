import React from "react";
import * as TodoActions from "../actions/TodoActions";

export default class Todo extends React.Component {


  constructor(props) {
    super();
    this.state = {
      editing : false
    }
    this.latestValue = Object.assign({}, props);
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

  getIcon(){
    if(this.state.editing){
      return (<button onClick={this.saveItem.bind(this)}>Save</button>);
    }
    return (<button onClick={this.deleteItem.bind(this)}>Delete</button>);
  }

  render() {
    const { _id, companyId, companyName, productName, productPrice, note, lastUpdatedDate} = this.props;


    return (
      <tr onDoubleClick={this.editItem.bind(this)}>
        <td>{(this.state.editing)?(<input  id="companyId" onChange={this.handleInputChange.bind(this)} defaultValue={companyId}/>):companyId}</td>
        <td>{(this.state.editing)?(<input  id="companyName" onChange={this.handleInputChange.bind(this)} defaultValue={companyName}/>):companyName}</td>
        <td>{(this.state.editing)?(<input  id="productName" onChange={this.handleInputChange.bind(this)} defaultValue={productName}/>):productName}</td>
        <td>{(this.state.editing)?(<input  id="productPrice" onChange={this.handleInputChange.bind(this)} defaultValue={productPrice}/>):productPrice}</td>
        <td>{(this.state.editing)?(<input  id="note" onChange={this.handleInputChange.bind(this)} defaultValue={note}/>):note}</td>
        <td>{lastUpdatedDate}</td>
        <td>{this.getIcon()}</td>
      </tr>
    );
  }
}
