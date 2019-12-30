// import { response } from "express";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
const { db } = require("./utils/admin");
const app = require("express")();
const cors = require("cors");

// app.use(cors({ origin: true }));

const {
  login,
  register,
  getUser,
  updateUser,
  deleteUser
} = require("./handlers/users");

const {
  getAllFolders,
  createFolder,
  updateFolder,
  deleteFolder
} = require("./handlers/folders");

const {
  getAllNotes,
  getNotesByFolder,
  updateNote,
  deleteNote,
  shareNote
} = require("./handlers/folders");

/**
 * User related API paths
 */
app.post("/login", login);
app.post("/register", register);

app.get("/user", getUser);
app.put("/user/:id", udpateUser);
app.delete("/user/:id", deleteUser);

/**
 * Folder related API paths
 */
app.get("/folders", getAllFolders);
app.post("/folder", createFolder);
app.put("/folder/:id", updateFolder);
app.delete("/folder/:id", deleteFolder);

/**
 * Note related API paths
 */
app.get("/folder/note");

app.get("/folder/notes", getAllNotes);

app.get("/folder/:id/notes", getNotesByFolder);

app.put("/folder/:id/note/:noteId", updateNote);

app.delete("/folder/:id/note/:noteId", deleteNote);

app.post("/folder/:id/note/:noteId/share", shareNote);

/**
 *
 */
exports.api = functions.https.onRequest(app);
