const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

const client = algoliasearch("YourApplicationID", "YourAdminAPIKey");
const index = client.initIndex("your_index_name");

// listen for a delete of a piece of equipment in Firestore
exports.removeFolderFromAlgolia = functions.firestore
  .document("folders/{id}")
  .onCreate(snap => {
    const objectID = snap.params.document;

    // return removeFromAlgolia(objectID, "equipment")
    //   .then(res => console.log("SUCCESS ALGOLIA equipment ADD", res))
    //   .catch(err => console.log("ERROR ALGOLIA equipment ADD", err));
  });

// listen for a delete of a piece of equipment in Firestore
exports.removeNoteFromAlgolia = functions.firestore
  .document("notes/{id}")
  .onCreate(snap => {
    const objectID = snap.params.document;

    // return removeFromAlgolia(objectID, "equipment")
    //   .then(res => console.log("SUCCESS ALGOLIA equipment ADD", res))
    //   .catch(err => console.log("ERROR ALGOLIA equipment ADD", err));
  });
