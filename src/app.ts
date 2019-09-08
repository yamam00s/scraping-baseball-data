/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require('puppeteer');
const BaseballDataController = require('./controllers/BaseballData.ts');

type apiParam = { league: string; type: number };

const createEndpoint = ({ league, type }: apiParam): string => {
  const SERIES: number = league === 'central' ? 1 : 2;
  return `https://baseball.yahoo.co.jp/npb/stats/${type}?series=${SERIES}`;
};

module.exports = async ({ league, type }: apiParam): Promise<string> => {
  const endPoint: string = createEndpoint({ league, type });

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(endPoint, {
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
  const BaseballDataList = await BaseballData.createList(type);

  await browser.close();

  return BaseballDataList;
};
