import dispatcher from "../dispatcher";
import axios from "axios";

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

