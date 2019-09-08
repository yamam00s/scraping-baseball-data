/* eslint-disable @typescript-eslint/no-var-requires */
const batterColumnList = require('../models/batterColumnList.ts');
const pitcherColumnList = require('../models/pitcherColumnList.ts');

module.exports = class BaseballJsonList {
  private dataList: stirng[];

  constructor(dataList: stirng[]) {
    this.dataList = dataList;
  }

  createList(type: string): stirng[] {
    const columnList: stirng[] = type === 'batter' ? batterColumnList : pitcherColumnList;
    const resultDataList: stirng[] = this.dataList.map(dataList => {
      const keyAddDataList: stirng[] = dataList.reduce((prev, current, index) => {
        // eslint-disable-next-line no-param-reassign
        prev[columnList[index]] = current;
        return prev;
      }, {});
      return keyAddDataList;
    });

    return resultDataList;
  }
};
