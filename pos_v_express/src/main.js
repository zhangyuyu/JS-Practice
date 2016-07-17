const _ = require('../../lib/lodash-2.4.1/lodash.compat.js');
const loadAllItems = require('../spec/fixtures.js').loadAllItems;
const CartItem = require("./model/cartItem.js");
const Receipt = require("./model/receipt.js");
const ReceiptItem = require("./model/receiptItem.js");
const Present = require("./model/present.js");
const Total = require("./model/total.js");

module.exports = function printInventory(inputs, accept) {
    let itemsInCart = [];
    let presents = [];

    getCartItems(inputs).forEach((item) => {
        if(item.isPromotion()){
            presents.push(new Present(item.name, item.promotionCount, item.unit));
        }
        itemsInCart.push(new ReceiptItem(item.name, item.count, item.unit, item.price, item.getSubTotal()));
    });

    const receipt = new Receipt(itemsInCart, presents);

    if(accept === "text/html"){
        return receipt.toText();
    }

    if(accept === "application/xml"){
        return receipt.toText();
    }
    return receipt;
}

function getCartItems(inputs) {
    const inputMap = getInputMap(inputs);
    let cartItems = [];

    loadAllItems().forEach((item) => {
        if(_.has(inputMap, item.barcode)) {
            cartItems.push(new CartItem(item, inputMap[item.barcode]));
        }
    });
    return cartItems;
}

function getInputMap(inputs) {
    let inputMap = {};

    inputs.forEach((line) => {
        const inputArr = line.split("-");
        const barcode = inputArr[0];
        const count = inputArr[1] ? Number(inputArr[1]): 1;

        inputMap[barcode] = _.has(inputMap, barcode) ? (inputMap[barcode] + count) : count;
    });
    return inputMap;
}