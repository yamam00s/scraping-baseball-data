/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const BaseballDataController = require('./controllers/BaseballData');

module.exports = (async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://baseball.yahoo.co.jp/npb/stats/batter?series=2', {
    waitUntil: 'domcontentloaded'
  });

  const listSelector = 'table.NpbPlSt tr:not(.yjMS)'; // .yjMSはtableの上下にある項目名のため除外
  const extractedDataList = await page.$$eval(listSelector, element => {
    const handledDataList = element.reduce((prev, current) => {
      // 多重配列作成時にblankなデータは取り除く
      const currentTextList = current.textContent
        .split(/\n/)
        .filter(data => data !== '');
      prev.push(currentTextList);
      return prev;
    }, []);
    return handledDataList;
  });

  const BaseballData = await new BaseballDataController(extractedDataList);
  const BaseballDataList = await BaseballData.createBatterDataList();

  await browser.close();

  return BaseballDataList;
})();
