//TODO: Please write code in this file.
function printInventory(inputs) {
  "use strict";
  const allItems = loadAllItems();
  let inputsDetail = [];
  let flagCount = {};

  inputs.forEach((line) => {
     const inputArr = line.split("-");
     const barcode = inputArr[0];
     const quantity = inputArr[1] ? Number(inputArr[1]): 1;

     if (!flagCount[barcode]) {
       inputsDetail.push({barcode});
       flagCount[barcode] = quantity;
     } else {
       flagCount[barcode] = flagCount[barcode] + quantity;
     }

  });

  inputsDetail.forEach((item) => {
    item.count = flagCount[item.barcode];
  });

  let outputs = '***<没钱赚商店>购物清单***\n';
  let promotionItemDetail = '';
  let total = 0;
  let promotionTotal = 0;

  allItems.forEach((item) => {
    inputsDetail.forEach((inputItem) => {
      if(inputItem.barcode === item.barcode) {
        const {count} = inputItem;
        const {name, price, unit} = item;
        let sum = 0
        let promotionCount = 0;

        if(count > 2 && isPromotion(inputItem.barcode)) {
            promotionCount = 1;
            sum = (count - promotionCount) * price;
            promotionItemDetail += `名称：${name}，数量：${promotionCount}${unit}\n`
        } else {
            sum = count * price;
        }

        total += sum;
        promotionTotal += promotionCount * price;
        const itemDetail = `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}(元)，小计：${sum.toFixed(2)}(元)\n`;
        outputs += itemDetail;
      }
    })
  });
  const promotionMsg = '----------------------\n挥泪赠送商品：\n'
  const bottomMsg = '----------------------\n总计：' + total.toFixed(2) + '(元)\n';
  const bottomPromotionMsg = '节省：' + promotionTotal.toFixed(2) + '(元)\n**********************'
  outputs = outputs + promotionMsg + promotionItemDetail + bottomMsg + bottomPromotionMsg;

  console.log(outputs);
}

function isPromotion(barcode) {
  const promotionItems = loadPromotions();
  const promotionBarCodes = promotionItems[0].barcodes
  return Array(promotionBarCodes).join(",").indexOf(barcode) >-1;
}