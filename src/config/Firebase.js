import firebase from "firebase";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyDHnXvSKR8_ERdY66owcLsRW-0wPXls7eQ",
  authDomain: "my-project-tunisietelecom.firebaseapp.com",
  databaseURL: "https://my-project-tunisietelecom.firebaseio.com",
  projectId: "my-project-tunisietelecom",
  storageBucket: "my-project-tunisietelecom.appspot.com",
  messagingSenderId: "907506709062",
  appId: "1:907506709062:web:3803435d3c3f149a721047",
  measurementId: "G-DEKNR7HZCJ",
  storageBucket: "gs://my-project-tunisietelecom.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
