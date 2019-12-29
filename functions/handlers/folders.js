const { db } = require("../utils/admin");

/**
 *
 */
exports.getAllFolders = async (req, res) => {
  try {
    const snapshot = await db
      .collection("folders")
      // .orderBy("createdAt", "desc")
      .get();

    if (resp) {
      const folders = [];

      snapshot.forEach(doc => {
        folders.push({
          id: doc.id,
          notes: doc.data().notes,
          owner: doc.data().owner,
          createdAt: doc.data().createdAt,
          pinned: doc.data().pinned
        });
      });

      return res.json(folders);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: err.code });
  }
};
/**
 *
 */
exports.createFolder = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Only POST method allowed" });
  }

  try {
    const newFolder = {
      name: req.body.name,
      created: new Date().toISOString(),
      pinned: req.body.pinned,
      notes: [],
      updated: new Date().toISOString()
    };

    const resp = await db.collection("folders").add(newFolder);
    if (resp) {
      res.status(201).json({ id: resp.id, name: resp.name });
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 */
exports.updateFolder = (req, res) => {};

/**
 *
 */

/**
 *
 */
exports.deleteFolder = (req, res) => {};
