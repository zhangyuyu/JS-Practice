function CartItem(item, count) {
    this.barcode = item.barcode;
    this.name = item.name;
    this.unit = item.unit;
    this.price = item.price || 0.00;
    this.count = count || 0;
    this.promotionCount = this.count > 2 && isPromotion(this.barcode) ? parseInt(this.count / 3, 10) : 0;
}

CartItem.prototype.getSubTotal = function() {
    return this.price * (this.count - this.promotionCount);
};

CartItem.prototype.getPromotionSubTotal = function() {
    return this.promotionCount > 0 ? this.price * this.promotionCount : 0;
};

CartItem.prototype.getItemDetail = function() {
    return `名称：${this.name}，数量：${this.count}${this.unit}，单价：${this.price.toFixed(2)}(元)，小计：${this.getSubTotal().toFixed(2)}(元)\n`;
};

CartItem.prototype.getPromotionDetail = function() {
    return this.promotionCount > 0 ? `名称：${this.name}，数量：${this.promotionCount}${this.unit}\n` : "";
};

function isPromotion(barcode) {
  const promotionBarCodes = loadPromotions()[0].barcodes;
  return _.contains(promotionBarCodes, barcode);
};