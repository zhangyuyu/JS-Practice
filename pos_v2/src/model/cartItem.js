function CartItem(item, count) {
    this.barcode = item.barcode;
    this.name = item.name;
    this.unit = item.unit;
    this.price = item.price || 0.00;
    this.isPromotion = false;
    this.count = count || 0;
    this.promotionCount = 0;
}