const _ = require('../../../lib/lodash-2.4.1/lodash.compat.js');
const loadPromotions = require('../../spec/fixtures.js').loadPromotions;

module.exports = class CartItem {
    constructor(item, count) {
        this.barcode = item.barcode;
        this.name = item.name;
        this.unit = item.unit;
        this.price = item.price || 0.00;
        this.count = count || 0;
        this.promotionCount = this.count > 2 && this.isPromotion(this.barcode) ? parseInt(this.count / 3, 10) : 0;
    }

    getSubTotal() {
        return this.price * (this.count - this.promotionCount);
    };

    getPromotionSubTotal() {
        return this.promotionCount > 0 ? this.price * this.promotionCount : 0;
    };

    getItemDetail() {
        return `名称：${this.name}，数量：${this.count}${this.unit}，单价：${this.price.toFixed(2)}(元)，小计：${this.getSubTotal().toFixed(2)}(元)<br>`;
    };

    getPromotionDetail() {
        return this.promotionCount > 0 ? `名称：${this.name}，数量：${this.promotionCount}${this.unit}<br>` : "";
    };

    isPromotion(barcode) {
      const promotionBarCodes = loadPromotions()[0].barcodes;
      return _.contains(promotionBarCodes, barcode);
    };
}
