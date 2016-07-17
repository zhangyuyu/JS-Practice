module.exports = class ReceiptItem {
    constructor(name, count, countUnit, price, subTotal) {
        this.name = name;
        this.count = count;
        this.countUnit = countUnit;
        this.price = Number(price).toFixed(2);
        this.currencyUnit = "元";
        this.subTotal = Number(subTotal).toFixed(2);
    }

    getItemDetail() {
        return `名称：${this.name}，数量：${this.count}${this.countUnit}，单价：${this.price}(元)，小计：${this.subTotal}(元)<br>`;
    };
}