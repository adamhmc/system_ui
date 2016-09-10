import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

var ItemEntity = require('../model/ItemEntity');

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [];
    this.criteria;
  }

  createTodo(context) {
    this.todos.push(context);
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  removeItem(itemId){
    console.log(itemId);
    for(var i = 0 ; i < this.todos.length ; i++){
      if(this.todos[i]._id === itemId){
        this.todos.splice(i, 1);
      }
    }

    this.emit("change");
  }

  updateItems(item){
    for(var i in this.todos){
      if(this.todos[i]._id === item._id){
        this.todos[i] = item;
        if(this.criteria !== undefined){
          item.hide = this.isNotMatchedCriteria(item);
        }
      }
    }    
  }

  isNotMatchedCriteria(item){
    if(!item.companyId.includes(this.criteria.companyId)){
        return true;
      } 
      else if(!item.companyName.includes(this.criteria.companyName)){
        return true;
      }
      else if(!item.productName.includes(this.criteria.productName)){
        return true;
      }
      else{
        return false;
      }
  }

  filterItems(){
    for(var i = 0; i < this.todos.length; i++){
      var item = this.todos[i];
      item.hide = this.isNotMatchedCriteria(item, this.criteria);
    }  
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.data);
        break;
      }
      case "DELETE_TODO" : {
        this.removeItem(action.id);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }
      case "FILTER_TODO": {
        this.criteria = action.criteria;
        this.filterItems();
        this.emit("change");
        break;
      }
      case "UPDATE_TODOS" : {
        this.updateItems(action.updateItem);
        this.emit("change");
      }
    }
  }
}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
