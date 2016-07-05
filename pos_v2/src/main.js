"use strict";
function printInventory(inputs) {
    let total = 0;
    let promotionTotal = 0;
    let itemDetail = `***<没钱赚商店>购物清单***\n打印时间：${getTime()}\n----------------------\n`;
    let promotionItemDetail = '----------------------\n挥泪赠送商品：\n'

    getOutputItems(inputs).forEach((item) => {
        let sum = 0;
        let promotionCount = 0;

        if(item.count > 2 && isPromotion(item.barcode)) {
            promotionCount = parseInt(item.count / 3, 10);
            sum = (item.count - promotionCount) * item.price;
            promotionItemDetail += `名称：${item.name}，数量：${promotionCount}${item.unit}\n`
        } else {
            sum = item.count * item.price;
        }

        total += sum;
        promotionTotal += promotionCount * item.price;
        itemDetail += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${sum.toFixed(2)}(元)\n`;
    });

    const bottomMsg = `----------------------\n总计：${total.toFixed(2)}(元)\n`;
    const bottomPromotionMsg = `节省：${promotionTotal.toFixed(2)}(元)\n**********************`
    console.log(`${itemDetail}${promotionItemDetail}${bottomMsg}${bottomPromotionMsg}`);
}

function isPromotion(barcode) {
  const promotionBarCodes = loadPromotions()[0].barcodes;
  return _.contains(promotionBarCodes, barcode);
}

function getOutputItems(inputs) {
    const inputMap = getInputMap(inputs);
    let outputItems = [];

    loadAllItems().forEach((item) => {
        if(_.has(inputMap, item.barcode)) {
            outputItems.push(new OutputItem(item, inputMap[item.barcode]));
        }
    });
    return outputItems;
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

function getTime() {
    return moment().format('YYYY[年]MM[月]DD[日] HH:mm:ss');
}