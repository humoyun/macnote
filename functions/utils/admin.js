const admin = require("firebase-admin");
const config = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(require("../keys/admin.json")),
  storageBucket: config.storageBucket
});

const db = admin.firestore();

module.exports = { admin, db };
