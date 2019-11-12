// import { response } from "express";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// const firestore = require("firebase-firestore");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.getNoteCreate = functions.firestore
//   .document("notes/{id}")
//   .onCreate()
//   .then(snapshot => {
//     console.log("** [ getNoteCreate func called ] **");
//     console.log(snapshot);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// exports.getNoteUpdate = functions.firestore
//   .document("notes/{id}")
//   .onUpdate()
//   .then(change => {
//     console.log("** [ getNoteUpdate func called ] **");
//     const after = change.after.data();
//     console.log(after);
//   })
//   .catch(err => {
//     console.error(err);
//   });

exports.httpHandler = functions.https.onRequest((req, res) => {
  console.log("** [ httpHandler func called ] **");

  admin
    .firestore()
    .collection("notes")
    .doc("sgr2HAnhFm4NjVA9lv2h")
    .get()
    .then(snapshot => {
      console.log(">. ", snapshot);
      const data = snapshot.data();

      res.send(data);
    })
    .catch(err => {
      res.send(err).status(500);
    });
});
