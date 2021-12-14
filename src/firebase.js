import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0nYwqnACA5VOlZGqqIjbV0YRCK12bn3g",
  authDomain: "clone-91ff8.firebaseapp.com",
  projectId: "clone-91ff8",
  storageBucket: "clone-91ff8.appspot.com",
  messagingSenderId: "1015453525385",
  appId: "1:1015453525385:web:7457550c5825828904ad58",
  measurementId: "G-B75YYGS87X",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
