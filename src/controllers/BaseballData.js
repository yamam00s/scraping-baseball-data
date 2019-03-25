const batterColumnList = require('../models/batterColumnList');

module.exports = class BaseballJsonList {
  constructor(dataList = []) {
    this.dataList = dataList;
  }

  createBatterDataList() {
    const resultDataList = this.dataList.map(dataList => {
      const keyAddDataList = dataList.reduce((prev, current, index) => {
        // eslint-disable-next-line no-param-reassign
        prev[batterColumnList[index]] = current;
        return prev;
      }, {});
      return keyAddDataList;
    });

    return resultDataList;
    // For data Debug
    // resultDataList.forEach(data => {
    // console.log(data);
    // });
  }
};
