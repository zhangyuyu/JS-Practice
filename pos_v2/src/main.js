"use strict";
function printInventory(inputs) {
    const title = "***<没钱赚商店>购物清单***\n";
    const time = `打印时间：${moment().format('YYYY[年]MM[月]DD[日] HH:mm:ss')}\n`;
    const separateLine = "----------------------\n";
    const promotionMsg = "挥泪赠送商品：\n"

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
    const totalMsg = `总计：${cartTotal.toFixed(2)}(元)\n节省：${promotionTotal.toFixed(2)}(元)\n**********************`;

    console.log(`${title}${time}${separateLine}${cartItemsMsg}${separateLine}${promotionMsg}${promotionItemsMsg}${separateLine}${totalMsg}`);
}

function isPromotion(barcode) {
  const promotionBarCodes = loadPromotions()[0].barcodes;
  return _.contains(promotionBarCodes, barcode);
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

        if(_.has(inputMap, barcode)) {
            inputMap[barcode] += count;
        } else {
            inputMap[barcode] = count;
        }
    });
    return inputMap;
}