module.exports = class Promotion {
    constructor(type, barcodes) {
        this.type = type;
        this.barcodes = barcodes || [];
    }
}
