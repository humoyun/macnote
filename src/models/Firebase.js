const firebaseConfig = {
  apiKey: "AIzaSyDkIcvPCkGuMjU4ZjnBu0UE4rR8aFYYFNU",
  authDomain: "macnote-7c031.firebaseapp.com",
  databaseURL: "https://macnote-7c031.firebaseio.com",
  projectId: "macnote-7c031",
  storageBucket: "macnote-7c031.appspot.com",
  messagingSenderId: "690127207690",
  appId: "1:690127207690:web:95c7ad05b3f17f418d0ef3"
};

import * as fapp from "firebase/app";
import * as fauth from "firebase/auth";
import * as fstore from "firebase/firestore";

class Firebase {
  constructor() {
    this.app = fapp;
    this.auth = null;
    this.db = null;

    this.init();
  }

  init() {
    this.app.initializeApp(firebaseConfig);
    this.auth = this.app.auth();
    this.db = this.app.firestore();
    // update firestore settings
    // this.db.settings({ timestampsInSnapshots: true })
  }

  createUser(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password).then(data => {
      console.log("firebase auth: ", data);
    });
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   if (errorCode == 'auth/weak-password') {
    //     alert('The password is too weak.');
    //   } else {
    //     alert(errorMessage);
    //   }
    //   console.log(error);
  }

  login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then(data => {
      console.log("firebase login: ", data);
    });
  }

  logout() {
    this.auth.signOut(email, password).then(data => {
      console.log("firebase logout: ", data);
    });
    // this.auth.isSignInWithEmailLink
  }
}

export default Firebase;
