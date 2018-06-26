import React from "react";
import TransactionHistoryStore from "../stores/TransactionHistoryStore";
import DatePickerInput from "../components/DatePickerInput"
import {Button} from 'react-bootstrap';
import ReactTable from "react-table";
import TransactionDetail from '../components/transaction/TransactionDetail';
import moment  from 'moment';
import * as CheckoutAction from '../actions/CheckoutActions';

export default class TransactionHistory extends React.Component {

  constructor(){
    super();
    this.state = {
      companyName: '',
      loading: false,
      transactionData: [],
      totalAmount: 0,
      tax: 5
    }
  }

  getTransactions() {
  	var latestData = TransactionHistoryStore.getTransactions();
  	var totalAmount = 0;
  	latestData.forEach(function(dataItem){
  		if(dataItem.invoiceDetail) {
  			dataItem.invoiceDetail.forEach(function(detailItem){
  				totalAmount += detailItem.productPrice * detailItem.productQuantity;
  			})
  		}
  	})

  	this.setState({
  		transactionData: latestData,
  		loading : false,
  		totalAmount : totalAmount
  	})
  }

  setLoading() {
  	this.setState({
  		loading : true
  	});
  }

  componentWillMount() {
    TransactionHistoryStore.on("change", this.getTransactions.bind(this));
    TransactionHistoryStore.on("loading", this.setLoading.bind(this));
  }

  componentWillUnmount() {
    TransactionHistoryStore.removeListener("change", this.getTransactions.bind(this));
    TransactionHistoryStore.removeListener("loading", this.setLoading.bind(this));
  }

  updateStartDay(day){
  	this.setState({
  		startDate : day
  	});
  }

  updateEndDay(day){
  	this.setState({
  		endDate : day
  	});
  }

  updateCompanyName(e){
  	this.setState({
  		companyName : e.target.value
  	});
  }

  updateTax(e){
  	this.setState({
  		tax : e.target.value
  	});
  }

  calculateInvoiceTotal(invoiceDetail) {
  	var total = 0;
  	invoiceDetail.forEach(function(detailItem){
  		total += detailItem.productQuantity * detailItem.productPrice;
  	});
  	return total;
  }


  openNewTabWithContent() {
  	var htmlContent = this.getHtmlContent();
  	var url = "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);
  	var win = window.open();
	win.document.write('<iframe src="' + url  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }

  getHtmlContent() {
  	const {transactionData, totalAmount, tax} = this.state;
  	var totalAmountAfterTax = Math.round(totalAmount * (1 + tax/100));
  	var htmlContent = "";
  	var that = this;
  	htmlContent+= "<head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'></head>";
  	htmlContent+= "<h3>" + this.state.companyName+"對帳單</h3><hr/>";
	htmlContent+="<style> table { border-collapse: collapse; width: 100%;}h1, h3 {display: inline-block;padding-left: 10px;	padding-right: 10px;}th, td {padding: 8px;text-align: left;border-bottom: 1px solid #ddd;}</style>";
	htmlContent+="<table><th width='20%'>出貨日期</th><th width='40%'>出貨內容</th><th width='20%'>總額</th><th width='10%'>發票號碼</th><th width='10%'>出貨編號</th>";
	transactionData.forEach(function(transactionItem){
		htmlContent+="<tr>"
		htmlContent+="<td>" + moment(transactionItem.shippingDate).format('MM/DD/YYYY') + "</td>";
		htmlContent+="<td>";
		if(transactionItem.invoiceDetail) {
			transactionItem.invoiceDetail.forEach(function(invoiceItem){
				var entry = "<div class='row'><div class='col-md-5'>" + invoiceItem.productName+ "</div><div class='col-md-4'>數量: " + invoiceItem.productQuantity + " 組</div><div class='col-md-3'>價格: " + invoiceItem.productPrice + "元</div></div>";
				htmlContent += entry;
			});
		}
		htmlContent+="</td>";
		htmlContent+="<td>" + that.calculateInvoiceTotal(transactionItem.invoiceDetail) + " 元</td>";
		htmlContent+="<td>" + transactionItem.invoiceId + "</td>";
		htmlContent+="<td>" + transactionItem.shippingId + "</td>";
		htmlContent+="</tr>"
	})
	htmlContent+="</table><hr/><div style='float:left;'><h3>誠書股份有限公司</h3></div><div style='float:right;'><h3>出貨總額: " + totalAmount + " 元</h3> <h3 >稅: " + tax + "%</h3><h3>稅後總額: "+ totalAmountAfterTax +" 元</h3></div>";
  	return htmlContent;
  }

  search() {
  	const {companyName, startDate, endDate} = this.state;
  	var params = {};
  	if(startDate) {
  		params.startDate = moment(startDate).format('MM/DD/YYYY');
  	}
  	if(endDate) {
  		params.endDate = moment(endDate).format('MM/DD/YYYY');
  	}
  	if(companyName) {
  		params.companyName = companyName;
  	}
  	CheckoutAction.getTransactionHistory(params);
  }

  render() {
  	const {totalAmount, tax} = this.state;
    const totalAmountAfterTax = Math.round(totalAmount* ( 1 + (tax / 100)));
  	const data = this.state.transactionData;
  	const loading = this.state.loading;
  	const columns = [{
  		Header: '公司名稱',
  		accessor: 'companyName'
  	}, {
  		Header: '出貨日期',
  		accessor: 'shippingDate',
  		Cell: row => (
  			<div> { moment(row.value).format('MM/DD/YYYY') } </div>
  		)
  	}, {
  		Header: '出貨內容',
  		accessor: 'invoiceDetail',
  		width: 300,
  		Cell: row => (
  			<TransactionDetail detail={row.value} />
  		)
  	}, {
  		Header: '總額',
  		accessor: 'invoiceDetail',
  		Cell: row => (
  			<div>{this.calculateInvoiceTotal(row.value)}</div>
  		)
  	}, {
  		Header: '發票號碼',
  		accessor: 'invoiceId'
  	}, {
  		Header: '出貨編號',
  		accessor: 'shippingId'
  	}]

    return (
      <div>
      	 <div class="row">
      	 	<div class="col-lg-3">
	  			<h4>開始日期:</h4><DatePickerInput handleDaySelected={this.updateStartDay.bind(this)}/>
	  		</div>
	  		<div class="col-lg-3">
	  			<h4>結束日期:</h4><DatePickerInput handleDaySelected={this.updateEndDay.bind(this)}/>
	  		</div>
	  		<div class="col-lg-3">
	  			<h4>公司名稱:</h4><input onChange={this.updateCompanyName.bind(this)}/>
	  		</div>
	  		<div class="col-lg-1">
	  			<Button onClick={this.search.bind(this)}>搜尋</Button>
	  		</div>
	  		<div class="col-lg-1">
	  			<Button onClick={this.openNewTabWithContent.bind(this)}>輸出</Button>
	  		</div>
	  	</div>
	  	<br/>
	  	<ReactTable data={data} columns={columns} defaultPageSize="10" loading={loading}
	  	previousText="上一頁" rowsText="行" pageText="頁" nextText="下一頁" noDataText="無資料" loadingText="讀取中"/>
	  	<h4>稅前總額: {this.state.totalAmount} 元</h4><h4>稅: <input type="number" style = {{width: 40}} class="text-align-right" value={this.state.tax} onChange={this.updateTax.bind(this)}/>%</h4><h4>稅後總額: {totalAmountAfterTax} 元</h4>
      </div>
    );
  }
}
