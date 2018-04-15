import dispatcher from "../dispatcher";
import axios from "axios";

var baseUrl = "https://serene-springs-13356.herokuapp.com/"

export function createTodo(data) {
  axios.post(baseUrl+'items/', {
    companyId: data.companyId,
    companyName: data.companyName,
    productName: data.productName,
    productPrice: data.productPrice,
    note: data.note
  })
  .then(function (response) {
    dispatcher.dispatch({
    type: "CREATE_TODO",
    data: response.data
  });
  })
}

export function deleteTodo(itemId) {
  axios.delete(baseUrl+'items/'+itemId)
  .then((response) => {
    dispatcher.dispatch({ type: "DELETE_TODO", id: itemId });
  });
}

export function filterTodo(criteria){
    dispatcher.dispatch({
      type: "FILTER_TODO",
      criteria,
  });
}

export function updateTodo(item){
  axios.put(baseUrl+'items/'+item._id,{
    companyId: item.companyId,
    companyName: item.companyName,
    productName: item.productName,
    productPrice: item.productPrice,
    note: item.note
  })
  .then((response)=>{
    dispatcher.dispatch({type: "UPDATE_TODOS", updateItem: item});
  });
}

export function reloadTodos() {
  dispatcher.dispatch({type: "FETCH_TODOS"});
  axios.get(baseUrl+'items/')
  .then((response) =>{
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: response.data});
  })
  .catch((err)=>{
    console.log(err);
  })
}
