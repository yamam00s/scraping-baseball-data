/* eslint-disable import/no-unresolved */
const functions = require('firebase-functions');
const scrapingApp = require('./app.bundle');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.scrapingBaseball = functions.https.onRequest(
  async (request, response) => {
    const scrapingData = await scrapingApp;
    // nuxtのlocal環境へのCORS設定
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.send(scrapingData);
  }
);
