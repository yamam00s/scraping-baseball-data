const scrapingApp = require('./app.bundle');

exports.scrapingBaseballData = async (req, res) => {
  const scrapingData = await scrapingApp;

  // local環境へのCORS設定
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.send(scrapingData);
};

// For data Debug
// (async() => {
//   const scrapingData = await scrapingApp;
//   console.log(scrapingData);
// })();
