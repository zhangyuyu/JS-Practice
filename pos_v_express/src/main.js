const moment = require('../../lib/moment-2.8.1/moment-with-locales.js');
const _ = require('../../lib/lodash-2.4.1/lodash.compat.js');
const loadAllItems = require('../spec/fixtures.js').loadAllItems;
const CartItem = require("./model/cartItem.js");

module.exports = function printInventory(inputs) {
    const newline = "<br>"
    const title = `***<没钱赚商店>购物清单***${newline}`;
    const time = `打印时间：${moment().format('YYYY[年]MM[月]DD[日] HH:mm:ss')}${newline}`;
    const separateLine = `----------------------${newline}`;
    const promotionMsg = `挥泪赠送商品：${newline}`

    let cartTotal = 0;
    let promotionTotal = 0;
    let cartItemsMsg = "";
    let promotionItemsMsg = "";

    getCartItems(inputs).forEach((item) => {
        cartTotal += item.getSubTotal();
        promotionTotal += item.getPromotionSubTotal();
        cartItemsMsg += item.getItemDetail();
        promotionItemsMsg += item.getPromotionDetail();
    });
    const totalMsg = `总计：${cartTotal.toFixed(2)}(元)${newline}节省：${promotionTotal.toFixed(2)}(元)${newline}**********************`;

    return `${title}${time}${separateLine}${cartItemsMsg}${separateLine}${promotionMsg}${promotionItemsMsg}${separateLine}${totalMsg}`;
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