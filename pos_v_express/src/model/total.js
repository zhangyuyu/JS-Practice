module.exports = class Total {
    constructor(price, saved) {
        this.price = price || 0.00;
        this.saved = saved;
        this.currencyUnit = "元";
    }
}