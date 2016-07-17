module.exports = class Total {
    constructor(price, saved) {
        this.price = price.toFixed(2);
        this.saved = saved.toFixed(2);
        this.currencyUnit = "元";
    }
}