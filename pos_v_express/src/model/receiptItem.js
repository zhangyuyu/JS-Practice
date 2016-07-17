module.exports = class ReceiptItem {
    constructor(name, count, countUnit, price, subTotal) {
        this.name = name;
        this.count = count;
        this.countUnit = countUnit;
        this.price = price;
        this.currencyUnit = "元";
        this.subTotal = subTotal;
    }
}