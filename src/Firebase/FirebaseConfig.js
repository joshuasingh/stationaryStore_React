import firebase from "firebase";
import fireValue from "../security/FirebaseDets.json";

firebase.initializeApp({
  apiKey: "AIzaSyDKlSORLXRiKdsKmJ3IK00dc0jhFZ1bbBs",
  authDomain: "stationarycatalog.firebaseapp.com",
  databaseURL: "https://stationarycatalog.firebaseio.com",
  projectId: "stationarycatalog",
  storageBucket: "stationarycatalog.appspot.com",
  messagingSenderId: "967804794053",
  appId: "1:967804794053:web:134d5a82c09d8f61346cac",
  measurementId: "G-9B3TCH8QD3",
});

export default firebase;
