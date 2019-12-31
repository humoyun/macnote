const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

const ALGOLIA_INDEX = "notes";
const client = algoliasearch("YourApplicationID", "YourAdminAPIKey");
// const index = client.initIndex("your_index_name");

/**
 * Algolia automatically indexes our data to use for full-text search
 * listen for a delete of a piece of equipment in Firestore
 *
 * onCreate
 */
exports.onNoteCreate = functions.firestore
  .document("notes/{id}")
  .onCreate(async (snap, ctx) => {
    const folder = snap.data();
    folder.objectID = ctx.params.noteId;

    const index = client.initIndex(ALGOLIA_INDEX);
    return index.saveObject(folder);
  });

/**
 * onUpdate
 */
exports.onNoteUpdate = functions.firestore
  .document("notes/{id}")
  .onUpdate(async (snap, ctx) => {
    const noteUpdated = snap.after.data();
    noteUpdated.objectID = ctx.params.noteId;

    const index = client.initIndex(ALGOLIA_INDEX);
    await index.partialUpdateObject(noteUpdated);
  });

/**
 * onDelete
 */
exports.onNoteRemove = functions.firestore
  .document("notes/{id}")
  .onDelete(async (snap, ctx) => {
    const objectID = snap.params.noteId;

    const index = client.initIndex(ALGOLIA_INDEX);
    return index.deleteObject(objectID); // note.id
  });
