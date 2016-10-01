import React from "react";
import {Label, Button, Fade, FormGroup, FormControl} from 'react-bootstrap';
import * as CheckoutAction from '../../actions/CheckoutActions';

export default class CheckoutItem extends React.Component {
	constructor(props) {
    	super();
    	this.state = {
    		inputError : false
    	}
  	}

  	updateQuantity(e){
  		if(!isNaN(e.target.value)){
  			this.setState({
  				inputError : false
  			});
  			var newQuantity = parseInt(e.target.value);
  			CheckoutAction.updateItemQuantity(this.props.item.productName, (newQuantity>0)?newQuantity:0);

  		}
  		else{
  			this.setState({
  				inputError : true
  			});
  		}
  	}

  	deleteItem(){
  		CheckoutAction.deleteItem(this.props.item.productName);
  	}

  	render(){
  		const item = this.props.item;


  		return(
  			<div class="row checkoutItem">
  				<div class="col-lg-3"><h4>{item.companyName}</h4></div>
  				<div class="col-lg-3"><h4>{item.productName}</h4></div>
  				<div class="col-lg-1 multiply-field"><h4>{item.productPrice}</h4></div>
  				 <div class="col-lg-1 multiply-field"><h4>*</h4></div>


  				  <div class="col-lg-2">
    					<FormGroup controlId="formValidationSuccess1" validationState= {(this.state.inputError)?"error":"success"}>
    			      	<FormControl type="text" defaultValue={item.quantity} onChange={this.updateQuantity.bind(this)}/>
    				</FormGroup>


  				  	</div>
  				 <div class="col-lg-1"><a href="javascript:void" onClick={this.deleteItem.bind(this)}><i class="glyphicon glyphicon-remove" /></a></div>
			</div>
  		);
  	}
}