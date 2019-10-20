import Firebase from "@/models/Firebase.js";
import DBManager from "@/models/DBManager.js";
import myCookie from "@/models/CkManager.js";

const $firebase = new Firebase();
const $db = new DBManager();

$firebase.init();

console.log("[** macnote-core loaded **]");

export { $firebase, $db };
