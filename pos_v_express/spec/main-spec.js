describe('pos', function () {
    var inputs, dateDigitToString;

    beforeEach(function () {
        inputs = [
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000001',
                    'ITEM000003-2',
                    'ITEM000005',
                    'ITEM000005',
                    'ITEM000005'
                ];
        dateDigitToString = function (num) {
            return num < 10 ? '0' + num : num;
        };
    });

    it('should print correct text', function () {
       var output = printInventory(inputs);

       var currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

        var expectText =
            '***<没钱赚商店>购物清单***<br>' +
            '打印时间：' + formattedDateString + '<br>' +
            '----------------------<br>' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)<br>' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)<br>' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)<br>' +
            '----------------------<br>' +
            '挥泪赠送商品：<br>' +
            '名称：雪碧，数量：1瓶<br>' +
            '名称：方便面，数量：1袋<br>' +
            '----------------------<br>' +
            '总计：51.00(元)<br>' +
            '节省：7.50(元)<br>' +
            '**********************';

        expect(output).toEqual(expectText);
    });
});
