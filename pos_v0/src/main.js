//TODO: Please write code in this file.
function printInventory(inputs) {
    let outputs = '***<没钱赚商店>购物清单***\n';
    let total = 0;

    inputs.forEach((item) => {
        const {name, count, price, unit} = item;
        const sum = count * price;
        total += sum;
        const itemDetail = '名称：' + name + '，数量：' + count + unit + '，单价：' + price.toFixed(2) + '(元)，小计：' + sum.toFixed(2) + '(元)\n';
        outputs +=  itemDetail;
    });

    const bottomMsg = '----------------------\n总计：' + total.toFixed(2) + '(元)\n**********************';
    outputs += bottomMsg;

    console.log(outputs);
}
