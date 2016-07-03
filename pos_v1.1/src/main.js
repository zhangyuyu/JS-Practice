//TODO: Please write code in this file.
function printInventory(inputs) {
  "use strict";
  const allItems = loadAllItems();
  let inputsDetail = [];
  let flagCount = {};


  inputs.forEach((line) => {
     let inputArr = line.split("-");
     let barcode = inputArr[0];
     let quantity = inputArr[1] ? Number(inputArr[1]): 1;

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
  let total = 0;
  allItems.forEach((item) => {
    inputsDetail.forEach((inputItem) => {
      if(inputItem.barcode === item.barcode) {
        const {count} = inputItem;
        const {name, price, unit} = item;
        const sum = count * price;
        total += sum;
        const itemDetail = `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}(元)，小计：${sum.toFixed(2)}(元)\n`;
        outputs += itemDetail;
      }
    })
  });
  const bottomMsg = '----------------------\n总计：' + total.toFixed(2) + '(元)\n**********************';
  outputs += bottomMsg;

  console.log(outputs);
}