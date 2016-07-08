"use strict";
function printInventory() {
    const inputs = ['ITEM000001',
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000003-2',
                    'ITEM000005',
                    'ITEM000005',
                    'ITEM000005'];
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

    const output = `${title}${time}${separateLine}${cartItemsMsg}${separateLine}${promotionMsg}${promotionItemsMsg}${separateLine}${totalMsg}`;
    document.addEventListener("click", function(){
        document.getElementById("output_id").innerHTML = output;
    });
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