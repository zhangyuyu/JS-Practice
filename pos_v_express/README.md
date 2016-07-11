# POS Project Express Version

POS收银机 版本：Express Version

## 教学目标

1. 熟悉Express的基本用法；
2. 熟悉HTTP协议与RESTful风格Web API的实现方式；
3. 熟悉多种View的概念；

## 需求描述

商店里进行购物结算时会使用收银机（POS）系统，这台收银机会在结算时根据客户的购物车（Cart）中的商品（Item）和商店正在进行的优惠活动（Promotion）进行结算和打印购物清单。

已知该商店正在对部分商品进行“买二赠一”的优惠活动。

我们需要实现一个名为```/receipt/print```的post请求，该函数能够将指定格式的数据作为参数输入，然后在浏览器的控制台中输出结算清单的文本。

参数格式（样例）：

```javascript
items:[
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
]
```
其中对'ITEM000003-2'来说,"-"之前的是标准的条形码,"-"之后的是数量。
当我们购买需要称量的物品的时候,由称量的机器生成此类条形码,收银机负责识别生成小票。

根据header不同，要生成不同的内容。

### Accept: text/plain

清单内容（样例，其中的打印时间为打印时的实际时间）：

```
***<没钱赚商店>购物清单***
打印时间：2014年08月04日 08:09:05
----------------------
名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)
名称：羽毛球，数量：5个，单价：1.00(元)，小计：4.00(元)
名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)
----------------------
挥泪赠送商品：
名称：可口可乐，数量：1瓶
名称：羽毛球，数量：1个
----------------------
总计：21.00(元)
节省：4.00(元)
**********************
```

### Accept: application/xml

```
<?xml version="1.0" encoding="utf-8" ?>
<Receipt name="购物清单" printDate="2014年08月04日 08:09:05" storeName="没钱赚商店">
    <ItemsInCart>
        <Item>
            <Name>可口可乐</Name>
            <Count>3</Count>
            <CountUnit>瓶</CountUnit>
            <Price>3.00</Price>
            <CurrencyUnit>元</CurrencyUnit>
            <SubTotal>6.00</SubTotal>
        </Item>
        <!-- 以此类推 -->
    </ItemsInCart>
    <Presents>
        <Item>
            <Name>可口可乐</Name>
            <Count>1</Count>
            <CountUnit>瓶</CountUnit>
        </Item>
        <!-- 以此类推 -->
    </Presents>
    <Total>
        <Price>21.00</Price>
        <Saved>4.00</Saved>
        <CurrencyUnit>元</CurrencyUnit>
    </Total>
</Receipt>
```

### Accept: application/json

```
{
    name        :  "购物清单",
    printDate   :  "2014年08月04日 08:09:05",
    storeName   :  "没钱赚商店"
    itemsInCart : [
                    {
                        name        : "可口可乐",
                        count       : "3",
                        countUnit   : "瓶",
                        price       : "3.00",
                        currencyUnit: "元",
                        subTotal    : "6.00"
                    }
                  ],
    presents    : [
                    {
                        name        : "可口可乐"
                        count       : "1"
                        countUnit   : "瓶"
                    }
                  ],
    total       :  {
                        price : "21.00",
                        saved : "4.00",
                        currencyUnit: "元"
                   }
}
```

## 作业要求

1. 所有的Item，Promotion都是通过Web API取到的，请自行完成这个Web API
2. 请使用Express完成作业；
3. 要求所有的API有测试覆盖，且有token验证；
4. 请将完成后的作业提交到自己的GitHub仓库下；
5. 请保持良好的代码提交（Commit）习惯。

## 作业步骤
### 第一步实现了浏览器发送get请求功能,输入在程序中是硬编码
1. 运行`node app.js`
2. 访问`http://localhost:3000/`即可得到清单内容.
### 第二步实现了利用postman发送post请求,
1. 运行`node app.js`
2. 利用postman
* method: post
* url: `http://localhost:3000/receipt`
* body 选用 x-www-form-urlencoded
`items: ITEM000001,ITEM000001,ITEM000001,ITEM000001,ITEM000001,ITEM000003-2,ITEM000005,ITEM000005,ITEM000005`