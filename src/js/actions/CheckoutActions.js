import dispatcher from "../dispatcher";
import axios from "axios";

var baseUrl = "https://serene-springs-13356.herokuapp.com/"

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
    axios.post(baseUrl+'transactions/', postBody)
  .then((response) =>{
    this.clearCart();
  })
  .catch((err)=>{
    console.log(err);
  })
}

