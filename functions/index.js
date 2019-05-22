/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions');
const scrapingApp = require('./app.bundle');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.scrapingBaseball = functions.https.onRequest(async (req, res) => {
  // CORS設定
  res.set(
    'Access-Control-Allow-Origin',
    'https://sabermetrics-7a6fc.firebaseapp.com'
  );
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

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
