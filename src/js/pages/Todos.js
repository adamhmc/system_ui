import React from "react";
import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";
import CheckoutStore from "../stores/CheckoutStore";
import Loading from "react-loading";
import {Modal, Button} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class Featured extends React.Component {
  constructor() {
    super();
    this.defaultFilter = {
      "companyId" : "",
      "companyName" : "",
      "productName" : "",
      "productPrice" : "",
      "note":""
    }

    this.filters = Object.assign({}, this.defaultFilter)

    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      autoSearch: false,
      showModal: false
    };

    TodoActions.reloadTodos();
  }


  showConfirmationModal(){
    this.setState({showModal: true});
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  setAutoSearch(){
    var newValue = !this.state.autoSearch;
    this.setState({
      autoSearch: newValue
    });
    if(newValue){
      TodoActions.filterTodo(this.filters);
    }
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  addItem(){
    TodoActions.createTodo(this.filters);
  }

  handleInputChange(e){
    this.filters[e.target.id] = e.target.value;
    if(e.target.id !== "note" && this.state.autoSearch){
      TodoActions.filterTodo(this.filters);
    }
  }

  resetFilter(){
    this.filters = Object.assign({}, this.defaultFilter);
    this.refs.companyId.value = "";
    this.refs.companyName.value = "";
    this.refs.productName.value = "";
    this.refs.productPrice.value = "";
    this.ref.note.value = "";

    TodoActions.filterTodo(this.filters);
  }

  renderContent(todos){
      const TodoComponents = todos.map((todo) => {
        if(!todo.hide){
          return <Todo key={todo._id} {...todo}/>;
        }
      });

      return(
        <table>
            <tbody>
              <tr>
            <th>廠商編號</th>
            <th>廠商名稱</th>
            <th>產品名稱</th>
            <th>產品單價</th>
            <th>備註</th>
            <th>最後更新日期</th>
            <th/>
          </tr>
            {TodoComponents}
            </tbody>
          </table>
      );
  }

  render() {
    const { todos } = this.state;

    return (
      <div class = "element">
        <table>
        <tbody>
          <tr>
            <th>廠商編號</th>
            <th>廠商名稱</th>
            <th>產品名稱</th>
            <th>產品單價</th>
            <th>備註</th>
            <th/>
          </tr>
          <tr className="filter">
            <td><input id="companyId" ref="companyId" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="companyName" ref="companyName" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="productName" ref="productName" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="productPrice" ref="productPrice" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="note" ref="note" onChange={this.handleInputChange.bind(this)}/></td>
            <td><button onClick={this.addItem.bind(this)}>新增</button></td>
          </tr>
          <tr>
            <td>自動搜尋 <input id="autoSearch" type="checkbox" defaultChecked={this.state.autoSearch} onChange={this.setAutoSearch.bind(this)}/></td>
            <td><button onClick={this.resetFilter.bind(this)}>清除欄位</button></td>
          </tr>
          </tbody>
        </table>
        <br/>
        {this.renderContent(todos)}
      </div>
    );
  }
}
