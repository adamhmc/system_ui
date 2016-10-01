import React from "react";
import CheckoutStore from "../../stores/CheckoutStore";
import {Label, Button} from 'react-bootstrap';
import CheckoutItem from './CheckoutItem';
import DayPicker, { DateUtils } from "react-day-picker";
import moment  from 'moment';

export default class Summary extends React.Component {
	constructor(){
		super();
		this.state = {
			items : CheckoutStore.getCartItems(),
    		selectedDay: new Date()
		}
	}

	handleDayClick(e, day, { selected, disabled }) {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({ selectedDay: null});
    } else {
      this.setState({ selectedDay: day, open: false });
    }
  }

  getCalendarDate(){
 	return moment(this.state.selectedDay).format('L');

  }

  calculateTotalPrice(items){
 	var totalPrice = 0;
 	for(var key in items){
 		totalPrice += (parseInt(items[key].productPrice) * parseInt(items[key].quantity));
 	}

 	return totalPrice;
  }

  updateItem(){
  	this.setState({
  		item : CheckoutStore.getCartItems()
  	})
  }


 componentWillMount() {
    CheckoutStore.on("change", this.updateItem.bind(this));
  }

  componentWillUnmount() {
    CheckoutStore.removeListener("change", this.updateItem.bind(this));
  }

	renderItems(items){
		const checkoutItemComponents = [];

		if(Object.keys(items).length !== 0){
			checkoutItemComponents.push(
				<div class="row">
  					<div class="col-lg-3"><h4>廠商名稱</h4></div>
  					<div class="col-lg-3"><h4>產品名稱</h4></div>
  					<div class="col-lg-2"><h4>產品單價</h4></div>
  				  <div class="col-lg-2"><h4>產品數量</h4></div>
  				 <div class="col-lg-1"></div>
					</div>
			);
			for (var key in items) {
				checkoutItemComponents.push(
					<CheckoutItem item={items[key]} />
				)
			}
		}
		else{
			checkoutItemComponents.push(
					<div class="row">
						<div class="col-lg-12"><h2 noItem>清單尚無東西</h2></div>
					</div>
			)
		}

		return (<div class="itemList">{checkoutItemComponents}</div>);
	}

	

	openNewTabWithContent(items){
		var htmlContent = "";
		const itemList = this.state.items;
		htmlContent += "<table><tr><th>廠商名稱</th><th>產品名稱</th><th>產品單價</th><th>產品數量</th></tr>";
		for(var itemKey in items){

			var companyName = items[itemKey].companyName;

			htmlContent += "<tr><td>"+companyName+"</td><td>"+itemList[itemKey].productName+"</td><td>"+itemList[itemKey].productPrice+"</td><td>"+itemList[itemKey].quantity+"</td></tr>";
		}

		htmlContent += "</table>";			

		htmlContent +="<script>window.print()</script>";
		var myWindow = window.open("data:text/html;charset=utf-8," + encodeURIComponent(htmlContent),
                       "_blank", "width=600,height=600");
	}

renderDatePicker(){
		debugger;
		if(this.state.open){
			return(
					<div class="datePicker">
  												<DayPicker initialMonth={ new Date() }
        										selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
        										onDayClick={ this.handleDayClick.bind(this) }/>
        										</div>
			);
		}
	}


	render() {
		const { items } = this.state;

		debugger;

  		return(
  			<div className="summary">
  				{this.renderItems(items)}
  				<hr/>
  				<div class="row">
  					<div class="col-lg-2">
  						<div class="dateDiv">
  							<i class="glyphicon glyphicon-calendar"/>
  							<input class="dateInput" 
  								onFocus={()=> this.setState({open : true})} 
  								value={this.getCalendarDate()}>
  							</input>
  								{this.renderDatePicker()}
        				</div>
        			</div>
        			<div class="col-lg-6"/>
        			<div class="col-lg-2"><h4>總價：{this.calculateTotalPrice(items)}</h4></div>
        			<div class="col-lg-2">
        				<Button bsStyle="warning" block disabled={Object.keys(items).length === 0} onClick={()=>{this.openNewTabWithContent(items)}}>儲存</Button>
        			</div>
        		</div>
  			</div>
  		);
  	}
}