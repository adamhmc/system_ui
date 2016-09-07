import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.filters = {
      "companyId" : "",
      "companyName" : "",
      "productName" : "",
      "productPrice" : "",
      "note":""
    }
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
      autoSearch: false,
    };
    TodoActions.reloadTodos();
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

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        if(!todo.hide){
          return <Todo key={todo._id} {...todo}/>;
        }
    });

    return (
      <div>
        <table>
        <tbody>
          <tr>
            <th>廠商編號</th>
            <th>廠商名稱</th>
            <th>產品名稱</th>
            <th>產品單價</th>
            <th>備註</th>
          </tr>
          <tr>
            <td><input id="companyId" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="companyName" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="productName" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="productPrice" onChange={this.handleInputChange.bind(this)}/></td>
            <td><input id="note" onChange={this.handleInputChange.bind(this)}/></td>
            <td><button onClick={this.addItem.bind(this)}>新增</button></td>
            <td>自動搜尋 <input id="autoSearch" type="checkbox" defaultChecked={this.state.autoSearch} onChange={this.setAutoSearch.bind(this)}/></td>
          </tr>
          </tbody>
        </table>
        <br/>
          <table border="1" width="100%">
            <tbody>
              <tr>
            <td>廠商編號</td>
            <td>廠商名稱</td>
            <td>產品名稱</td>
            <td>產品單價</td>
            <td>備註</td>
            <td>最後更新日期</td>
          </tr>
            {TodoComponents}
            </tbody>
          </table>
      </div>
    );
  }
}
