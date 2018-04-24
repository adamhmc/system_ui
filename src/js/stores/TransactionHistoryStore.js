import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TransactionHistoryStore extends EventEmitter {
	constructor() {
    	super()
    	this.transactions = [];
  	}

  	getTransactions(){
  		return this.transactions;
  	}

    setTransactions(data) {
      this.transactions = data;
    }

  	handleActions(action) {
    switch(action.type) {
      case "TRASACTIONS_LOADING": {
        this.emit("loading");
        break;
      }
      case "TRASACTIONS_LOADED":{
        this.setTransactions(action.transactions);
        this.emit("change");
        break;
      }
    }
  }
}

const transactionHistoryStore = new TransactionHistoryStore;
dispatcher.register(transactionHistoryStore.handleActions.bind(transactionHistoryStore));

export default transactionHistoryStore;