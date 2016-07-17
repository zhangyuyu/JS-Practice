const moment = require('../../../lib/moment-2.8.1/moment-with-locales.js');
const Total = require('./total.js');

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
            price += receiptItem.subTotal;
            saved += receiptItem.price * receiptItem.count - receiptItem.subTotal;
        });
        return new Total(price, saved);
    };
}