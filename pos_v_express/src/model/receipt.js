const moment = require('../../../lib/moment-2.8.1/moment-with-locales.js');
const Total = require('./total.js');
const receiptItem = require('./receiptItem.js');
const present = require('./present.js');

module.exports = class Receipt {
    constructor(itemsInCart, presents) {
        this.name = "购物清单";
        this.printDate = moment().format('YYYY[年]MM[月]DD[日] HH:mm:ss');
        this.storeName = "没钱赚商店";
        this.itemsInCart = itemsInCart;
        this.presents = presents;
        this.total = this.getTotal();
    }

    getTotal() {
        let price = 0;
        let saved = 0;
        this.itemsInCart.forEach((receiptItem) => {
            price += parseFloat(receiptItem.subTotal);
            saved += receiptItem.price * receiptItem.count - receiptItem.subTotal;
        });
        return new Total(price, saved);
    };

    toText() {
        const newline = "<br>"
        const title = `***<${this.storeName}>购物清单***${newline}`;
        const printDate = `打印时间：${this.printDate}${newline}`;
        const separateLine = `----------------------${newline}`;
        const presentMsg = `挥泪赠送商品：${newline}`
        const totalMsg = `总计：${this.total.price}(元)${newline}节省：${this.total.saved}(元)${newline}**********************`;

        let receiptItemsMsg = "";
        let presentsMsg = ""

        this.itemsInCart.forEach((receiptItem) => {
            receiptItemsMsg += receiptItem.getItemDetail();
        });
        this.presents.forEach((present) => {
            presentsMsg += present.getPresentDetail();
        });

        return `${title}${printDate}${separateLine}${receiptItemsMsg}${separateLine}${presentMsg}${presentsMsg}${separateLine}${totalMsg}`;
    }
}