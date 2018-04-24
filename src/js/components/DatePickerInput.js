import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import moment  from 'moment';

export default class DatePickerInput extends React.Component {
	constructor(){
		super();
		this.state = {
			open : false,
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
    if(this.props.handleDaySelected) {
    	this.props.handleDaySelected(day);
    }
  }

	getCalendarDate() {
		if(this.state.selectedDay) {
			return moment(this.state.selectedDay).format('L');
		} else {
			return "尚未選取日期";
		}
	}

	renderDatePicker() {
		if(this.state.open){
			return(
			  	<div class="datePicker">
  					<DayPicker initialMonth={ new Date() }
        				selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
        				onDayClick={ this.handleDayClick.bind(this) }/>
        		</div>)
		}

	}

	render() {    
    return (
        <div class="dateDiv">
  			<i class="glyphicon glyphicon-calendar"/>
  			<input class="dateInput" 
  				onFocus={()=> this.setState({open : true})} 
  				value={this.getCalendarDate()}
  				size="10"/>
  			{this.renderDatePicker()}
        </div>
    );
  }

}