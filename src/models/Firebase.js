const firebaseConfig = {
  apiKey: "AIzaSyDkIcvPCkGuMjU4ZjnBu0UE4rR8aFYYFNU",
  authDomain: "macnote-4e531.firebaseapp.com",
  databaseURL: "https://macnote-4e531.firebaseio.com",
  projectId: "macnote-4e531",
  storageBucket: "macnote-4e531.appspot.com",
  messagingSenderId: "690127207690",
  appId: "1:690127207690:web:95c7ad05b3f17f418d0ef3"
};

/**
 * Tutorial
 * https://github.com/Vrijraj/Firebase-For-Web
 */

import * as firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import myCookie from "./CookieManager.js";
import undefined from "firebase/auth";

class Firebase {
  constructor() {
    this.app = firebaseApp;
    this.auth = null;
    this.db = null;
    this.func = null;
    this.user = null;
    this.dataLoaded = false;
  }

  async init() {
    // if (!this.user) return;
    if (this.app.apps.length) return;
    else await this.app.initializeApp(firebaseConfig);
    // firebase.initializeApp({});
    // _isTerminated;
    this.auth = await this.app.auth();
    this.db = await this.app.firestore();
    this.func = await this.app.functions();
    // update firestore settings
    // this.db.settings({ timestampsInSnapshots: true })

    this.auth.onAuthStateChanged(user => {
      console.log("[ auth status change ] ", user);
      this.user = user;
      if (user) {
        console.log("[********* firebase auth: logged in **********]");
      } else {
        console.log("logged out");
        myCookie.clear();
      }
    });
  }

  async getFolders() {
    const folders = [];
    if (!this.$db) this.db = await this.app.firestore();

    try {
      const resp = await this.db.collection("folders").get();
      if (resp) {
        resp.docs.forEach((doc, index) => {
          const folder = doc.data();
          folder.id = doc.id;
          folders.push(folder);
        });
      }
      this.dataLoaded = true;
      console.log("-++++", resp);
    } catch (error) {
      console.error(error);
    }

    return folders;
  }

  async addFolder(folderData) {
    try {
      const docRef = await this.db.collection("folders").add({
        name: folderData.name || "New Folder",
        notes: [],
        created: new Date()
      });

      if (docRef) {
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  addUser(userInfo) {
    // https://github.com/Vrijraj/Firebase-For-Web
    // https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
    this.db
      .collection("users")
      .add({
        id: userInfo.id,
        username: userInfo.username,
        roles: userInfo.roles,
        email: userInfo.email,
        created: new Date()
      })
      .then(docRef => {
        console.log("add doc on users: ", docRef);
      })
      .catch(err => {
        console.error("add user info: ", err);
      });
  }

  isUserLoggedIn() {
    return this.user !== null;
  }

  createUser(email, password, username) {
    // this.func.firestore.document("users/{user}").onCreate((snap, context) => {
    //   // Object representing the document
    //   const userData = snap.data();
    //   console.log("snap: ", snap);
    //   console.log("createUser: ", userData);
    //   console.log("context; ", context);
    // });

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log("firebase auth: ", data.user, data.uid);
        if (username) {
          this.updateUser({ username });
        }
        // we need to create empty collection in firestore
        // using this users' `uid` (e.g. cfXgzeNROsfTdVEOLlOcBl27UVD2)

        // we also need to secure backend (firestore)
        // using firebase firestore data rule. e.g.
        // folders: {
        //   $uid: { .write: auth.uid === $uid }
        // }
      })
      .catch(error => {
        console.error("*** createUser error ***");
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          console.log("The password is too weak.");
        } else {
          console.log(errorMessage);
        }
      });
  }

  updateUser(userInfo) {
    const payload = {};

    payload.displayName = userInfo.username ? userInfo.username : undefined;
    payload.photoURL = userInfo.photoURL ? userInfo.photoURL : undefined;

    this.auth()
      .currentUser.updateProfile(payload)
      .then(resp => {
        // Update successful.
        console.log("User Profile Updated Successfully", resp);
      })
      .catch(err => {
        // An error happened.
        console.error("userProfile update: ", err);
      });
  }

  async login(email, password) {
    try {
      const resp = await this.auth.signInWithEmailAndPassword(email, password);
      if (resp) {
        console.log("Firebase.login() : ", resp.user);
        console.log("Firebase resp : ", resp);
        const token = await resp.user.getIdToken();
        myCookie.set(myCookie.USER, resp.user);
        myCookie.set(myCookie.TOKEN, token);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // exports.login = (req, res) => {
  //   const user = {
  //     email: req.body.email,
  //     password: req.body.password
  //   };

  //   const { valid, errors } = validateLoginData(user);
  //   if (!valid) return res.status(400).json(errors);

  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(user.email, user.password)
  //     .then(data => {
  //       return data.user.getIdToken();
  //     })
  //     .then(token => {
  //       return res.json({ token });
  //     })
  //     .catch(err => {
  //       if (
  //         err.code === "auth/wrong-password" ||
  //         err.code === "auth/user-not-found"
  //       )
  //         return res.status(403).json({ general: "Wrong credentials" });
  //       return res.status(500).json({ error: err.code });
  //     });
  // };

  logout(cb) {
    // temp
    myCookie.clear();
    return this.auth
      .signOut()
      .then(data => {
        console.log("firebase logout: ", data);
        // myCookie.clear();
        cb();
        return Promise.resolve(data);
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
    // this.auth.isSignInWithEmailLink
  }

  static createDate() {}
}

export default Firebase;
