import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBgntPab2V8jWBygx1yQ7jrm2QuagtdlFc",
  authDomain: "rn-progiii.firebaseapp.com",
  projectId: "rn-progiii",
  storageBucket: "rn-progiii.appspot.com",
  messagingSenderId: "17230986290",
  appId: "1:17230986290:web:7905408d436fa45d63902b"
};

app.initializeApp(firebaseConfig);

export const storage = app.storage();
export const auth = firebase.auth();
export const db = app.firestore();