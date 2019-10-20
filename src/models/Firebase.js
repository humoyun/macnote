const firebaseConfig = {
  apiKey: "AIzaSyDkIcvPCkGuMjU4ZjnBu0UE4rR8aFYYFNU",
  authDomain: "macnote-4e531.firebaseapp.com",
  databaseURL: "https://macnote-4e531.firebaseio.com",
  projectId: "macnote-4e531",
  storageBucket: "macnote-4e531.appspot.com",
  messagingSenderId: "690127207690",
  appId: "1:690127207690:web:95c7ad05b3f17f418d0ef3"
};

import * as firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import myCookie from "./CkManager.js";

class Firebase {
  constructor() {
    this.app = firebaseApp;
    this.auth = null;
    this.db = null;
    this.user = null;
    this.ck = myCookie;
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
    // update firestore settings
    // this.db.settings({ timestampsInSnapshots: true })

    this.auth.onAuthStateChanged(user => {
      console.log("[ auth status change ] ", user);
      this.user = user;
      if (user) {
        console.log("[********* firebase auth: logged in **********]");
      } else {
        console.log("logged out");
        this.ck.clear();
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

  addFolder() {
    this.db
      .collection("folder")
      .add({
        name: "new folder",
        notes: [],
        created: new Date()
      })
      .then();
  }

  isUserLoggedIn() {
    return this.user !== null;
  }

  createUser(email, password) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log("firebase auth: ", data.user);

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

  async login(email, password) {
    try {
      const resp = await this.auth.signInWithEmailAndPassword(email, password);
      if (resp) {
        console.log("Firebase.login() : ", resp.user);
        this.ck.set(this.ck.USER, resp.user);
        this.ck.set(this.ck.TOKEN, resp.user.refreshToken);
      }
    } catch (err) {
      console.error(err);
    }
  }

  logout(cb) {
    // temp
    this.ck.clear();
    return this.auth
      .signOut()
      .then(data => {
        console.log("firebase logout: ", data);
        // this.ck.clear();
        cb();
      })
      .catch(err => {
        console.error(err);
      });
    // this.auth.isSignInWithEmailLink
  }
}

export default Firebase;
