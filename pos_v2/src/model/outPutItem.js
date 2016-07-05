function OutputItem(item, count) {
    this.barcode = item.barcode;
    this.name = item.name;
    this.unit = item.unit;
    this.price = item.price || 0.00;
    this.count = count || 0;
}