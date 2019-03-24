const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  // local環境へのCORS設定
  response.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.send('Hello from Firebase!');
});
