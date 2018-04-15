import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class CheckoutStore extends EventEmitter {
	constructor() {
    	super()
    	this.cart = {};
  	}

  	getCartItems(){
  		return this.cart;
  	}

    getCount(){
      debugger;
      var count = 0;
      for(var key in this.cart){
        count += parseInt(this.cart[key].quantity);
      }
      return count
    }

  	addCartItem(data){
  		if(this.cart[data.productName]){
  			var checkoutItem = this.cart[data.productName];
  			checkoutItem.quantity +=1;
  		}
  		else{
  			this.cart[data.productName] = {
  				companyName : data.companyName,
   				productName : data.productName,
  				productPrice : data.productPrice,
  				quantity : 1
  			}
  		}
  	}

    deleteCartItem(productName){
      debugger;
      delete this.cart[productName]; 
    }

  	updateCartItemQuantity(productName, quantity){
      this.cart[productName].quantity = quantity;
  	}

    clearCart() {
      this.cart = {};
    }

  	handleActions(action) {
    switch(action.type) {
      case "ADD_ITEM": {
        this.addCartItem(action.data);
        this.emit("change");
        break;
      }
      case "UPDATE_QUANTITY":{
        this.updateCartItemQuantity(action.productName, action.quantity);
        this.emit("change");
        break;
      }

      case "DELETE_ITEM":{
        this.deleteCartItem(action.productName);
        this.emit("change");
        break;
      }
      case "CLEAR_CART":{
        debugger;
        this.clearCart();
        this.emit("clear");
        break;
      }
    }
  }
}

const checkoutStore = new CheckoutStore;
dispatcher.register(checkoutStore.handleActions.bind(checkoutStore));

export default checkoutStore;