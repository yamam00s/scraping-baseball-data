const batterColumnList = require('../models/batterColumnList');
const pitcherColumnList = require('../models/pitcherColumnList');

module.exports = class BaseballJsonList {
  private dataList: any;

  constructor(dataList: any) {
    this.dataList = dataList;
  }

  createList(type: string) {
    const columnList = type === 'batter' ? batterColumnList : pitcherColumnList;
    const resultDataList = this.dataList.map(dataList => {
      const keyAddDataList = dataList.reduce((prev, current, index) => {
        // eslint-disable-next-line no-param-reassign
        prev[columnList[index]] = current;
        return prev;
      }, {});
      return keyAddDataList;
    });

    return resultDataList;
  }
};
