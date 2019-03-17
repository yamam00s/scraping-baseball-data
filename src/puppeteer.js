const puppeteer = require('puppeteer');

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.goto('https://baseball.yahoo.co.jp/npb/stats/batter?series=5&type=1', {
      waitUntil: 'domcontentloaded',
    });

    const listSelector = '.NpbPlSt tr:not(.yjMS)';
    const dataList = await page.$$eval(listSelector, text => text.map(data => data.textContent));

    await dataList.forEach((data) => {
      const result = data.split(/\n/);
      console.log(`data: ${result}`);
    });

    browser.close();
  })();
} catch (err) {
  console.error(err);
}
