const _ = require('../../../lib/lodash-2.4.1/lodash.compat.js');
const loadPromotions = require('../../spec/fixtures.js').loadPromotions;

module.exports = class CartItem {
    constructor(item, count) {
        this.barcode = item.barcode;
        this.name = item.name;
        this.unit = item.unit;
        this.price = item.price || 0.00;
        this.count = count || 0;
        this.promotionCount = this.count > 2 && this.isPromotion() ? parseInt(this.count / 3, 10) : 0;
    }

    getSubTotal() {
        return this.price * (this.count - this.promotionCount);
    };

    isPromotion() {
      const promotionBarCodes = loadPromotions()[0].barcodes;
      return _.contains(promotionBarCodes, this.barcode);
    };
}
