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

class Firebase {
  constructor() {
    this.app = firebaseApp;
    this.auth = null;
    this.db = null;
    this.user = null;
  }

  async init() {
    await this.app.initializeApp(firebaseConfig);
    this.auth = this.app.auth();
    this.db = this.app.firestore();
    // update firestore settings
    // this.db.settings({ timestampsInSnapshots: true })

    this.auth.onAuthStateChanged(user => {
      console.log("[ auth status change ] ", user);
      this.user = user;
      if (user) {
        console.log("logged in");

        this.db
          .collection("folders")
          .get()
          .then(snapshot => {
            console.log("memos: snapshot.docs: ", snapshot.docs);
            snapshot.docs.forEach((doc, index) => {
              const data = doc.data();
              console.log(index, " : ", data);
            });
          });

        // this.db.collection('folder').add({
        //   name: 'new folder',
        //   notes: [],
        //   created: new Date
        //
        // }).then();
      } else {
        console.log("logged out");
      }
    });
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

  login(email, password) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log("firebase login: ", data.user);
      })
      .catch(e => {
        console.error("*** sign in error: ", e);
      });
  }

  logout() {
    this.auth.signOut().then(data => {
      console.log("firebase logout: ", data);
    });
    // this.auth.isSignInWithEmailLink
  }
}

export default Firebase;
