/* eslint-disable no-console */
const puppeteer = require('puppeteer');

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://baseball.yahoo.co.jp/npb/stats/batter?series=5&type=1', {
      waitUntil: 'domcontentloaded',
    });

    const listSelector = 'table.NpbPlSt tr:not(.yjMS)'; // .yjMSはtableの上下にある項目名のため除外
    const extractedDataList = await page.$$eval(listSelector, (element) => {
      const handledDataList = element.map(data => data.textContent.split(/\n/));
      return handledDataList;
    });

    extractedDataList.forEach((data) => {
      console.log(data);
    });

    browser.close();
  })();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
}
