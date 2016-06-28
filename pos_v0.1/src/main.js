//TODO: Please write code in this file.
function printInventory(inputs) {
    "use strict";
    let uniqInputs = [];
    let flagCount = {};
    inputs.forEach((item) => {
        if (!flagCount[item.barcode]) {
            uniqInputs.push(item);
            flagCount[item.barcode] = 1;
        } else {
            flagCount[item.barcode]++;
        }
    });
    uniqInputs.forEach((item) => {
        item.count = flagCount[item.barcode];
    });

    let outputs = '***<没钱赚商店>购物清单***\n';
    let total = 0;

    uniqInputs.forEach((item) => {
        const {name, count, price, unit} = item;
        const sum = count * price;
        total += sum;
        const itemDetail = `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}(元)，小计：${sum.toFixed(2)}(元)\n`;
        outputs += itemDetail;
    });

    const bottomMsg = '----------------------\n总计：' + total.toFixed(2) + '(元)\n**********************';
    outputs += bottomMsg;

    console.log(outputs);
}