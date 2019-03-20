/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const BaseballJsonList = require('./modules/BaseballJsonList');

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://baseball.yahoo.co.jp/npb/stats/batter?series=5&type=1', {
      waitUntil: 'domcontentloaded',
    });

    const listSelector = 'table.NpbPlSt tr:not(.yjMS)'; // .yjMSはtableの上下にある項目名のため除外
    const extractedDataList = await page.$$eval(listSelector, (element) => {
      // puppeteerで取得したDOM情報から空白を除外したテキストの配列を作りたい

      // 案1
      // const textDataList = element.map(data => data.textContent.split(/\n/));
      // const handledDataList = textDataList.filter(data => data);

      // 案2
      const handledDataList = element.reduce((prev, current) => {
        if (current.textContent.split(/\n/) !== 0) prev.push(current.textContent.split(/\n/));
        return prev;
      }, []);

      return handledDataList;
    });

    const BaseballJson = await new BaseballJsonList(extractedDataList);
    await BaseballJson.createBatterDataList();

    browser.close();
  })();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
}
