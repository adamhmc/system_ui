import dispatcher from "../dispatcher";
import axios from "axios";
import moment from "moment";

var baseUrl = "https://serene-springs-13356.herokuapp.com/transactions/"

export function addCheckoutItem(item) {
    dispatcher.dispatch({
    type: "ADD_ITEM",
    data: item
  });
}

export function deleteItem(productName) {
  dispatcher.dispatch({
    type: "DELETE_ITEM",
    productName : productName
  })
}

export function clearCart() {
    dispatcher.dispatch({
    type: "CLEAR_CART"
  });
}

export function updateItemQuantity(productName, quantity){
  dispatcher.dispatch({
    type: "UPDATE_QUANTITY",
    productName: productName,
    quantity: quantity 
  })
}

export function saveTransaction(postBody) {
    axios.post(baseUrl, postBody)
  .then((response) =>{
    this.clearCart();
  })
  .catch((err)=>{
    console.log(err);
  })
}

export function getTransactionHistory(params) {
    dispatcher.dispatch({
        type: "TRASACTIONS_LOADING"
    })
    var getParams = [];
    for (const [key, value] of Object.entries(params)) {
      getParams.push(key + "=" + value);
    }

    axios.get(baseUrl+'?'+getParams.join('&'))
    .then((response)=>{
      dispatcher.dispatch({
        type: "TRASACTIONS_LOADED", transactions: response.data
      })
    })
    .catch((err)=>{
    console.log(err);
  })
}

