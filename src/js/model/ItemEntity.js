module.exports = function ItemEntity(companyId, companyName, productName, productPrice, note, edit){
	this.companyId = companyId;
	this.companyName = companyName;
	this.productName = productName;
	this.productPrice = productPrice;
	this.note = note;
	this.edt = edit;
}