module.exports = class Present {
    constructor(name, count, countUnit) {
        this.name = name;
        this.count = count;
        this.countUnit = countUnit;
    }

     getPresentDetail() {
        return this.count > 0 ? `名称：${this.name}，数量：${this.count}${this.countUnit}<br>` : "";
     };
}