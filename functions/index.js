/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions');
const scrapingApp = require('./app.bundle');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.scrapingBaseball = functions.https.onRequest(async (req, res) => {
  // nuxtのlocal環境へのCORS設定
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (!req.query.league || !req.query.type) {
    res.status(400).send('Please define a parameter!');
  } else {
    const scrapingData = await scrapingApp({
      league: req.query.league,
      type: req.query.type
    });
    res.status(200).send(scrapingData);
  }
});
