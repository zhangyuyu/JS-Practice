function printInventory(inputs) {
  "use strict";
  const inputItems = getInputItems(inputs);
  const allItems = loadAllItems();

  let total = 0;
  let promotionTotal = 0;
  let itemDetail = '***<没钱赚商店>购物清单***\n';
  let promotionItemDetail = '----------------------\n挥泪赠送商品：\n'

  allItems.forEach((item) => {
        const count = inputItems[item.barcode];
        if(count > 0){
            let sum = 0;
            let promotionCount = 0;
            const {barcode, name, price, unit} = item;

            if(count > 2 && isPromotion(barcode)) {
                promotionCount = parseInt(count / 3, 10);
                sum = (count - promotionCount) * price;
                promotionItemDetail += `名称：${name}，数量：${promotionCount}${unit}\n`
            } else {
                sum = count * price;
            }

        total += sum;
        promotionTotal += promotionCount * price;
        itemDetail += `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}(元)，小计：${sum.toFixed(2)}(元)\n`;
       }
  });
  const bottomMsg = `----------------------\n总计：${total.toFixed(2)}(元)\n`;
  const bottomPromotionMsg = `节省：${promotionTotal.toFixed(2)}(元)\n**********************`
  console.log(`${itemDetail}${promotionItemDetail}${bottomMsg}${bottomPromotionMsg}`);
}

function isPromotion(barcode) {
  const promotionItems = loadPromotions();
  const promotionBarCodes = promotionItems[0].barcodes
  return Array(promotionBarCodes).join(",").indexOf(barcode) >-1;
}

function getInputItems(inputs) {
    let inputBarcodes = [];
    let inputItems = {};

    inputs.forEach((line) => {
        const inputArr = line.split("-");
        const barcode = inputArr[0];
        const count = inputArr[1] ? Number(inputArr[1]): 1;

        if(Array(inputBarcodes).join(",").indexOf(barcode) >-1) {
            inputItems[barcode] += count;
        } else {
            inputBarcodes.push(barcode);
            inputItems[barcode] = count;
        }
    });
    return inputItems;
}