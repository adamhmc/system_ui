import React from "react";

export default class TransactionDetail extends React.Component {
	renderDetail() {
		const detailComponents = [];
		if(this.props.detail){
			this.props.detail.forEach(function(detailItem){
				detailComponents.push(
					<div class='row'>
  						<div class="col-lg-4">{detailItem.productName} </div>
  						<div class="col-lg-3">數量: {detailItem.productQuantity} 組</div>
  						<div class="col-lg-4">單價: {detailItem.productPrice} 元</div>
					</div>
				);
			})
		}
		else {
			detailComponents.push(
					<div class="row">
						<div class="col-lg-12"></div>
					</div>
			)
		}

		return (<div>{detailComponents}</div>);
	}

	render() {    
    	return (<div>{this.renderDetail()}</div>);
    }
}