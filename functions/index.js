/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions');
const scrapingApp = require('./app.bundle');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.scrapingBaseball = functions.https.onRequest(async (req, res) => {
  // nuxtのlocal環境へのCORS設定
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (!req.body.league || !req.body.type) {
    res.status(400).send('Please define a parameter!');
  } else {
    const scrapingData = await scrapingApp({
      league: req.body.league,
      type: req.body.type
    });
    res.status(200).send(scrapingData);
  }
});
