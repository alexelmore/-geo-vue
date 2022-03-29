// Old Import syntax imployed to work with old FB setup
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbXHvZlcKuZEJ72JX0FaFTrtXhskOPD-A",
  authDomain: "geo-vue-c0a9d.firebaseapp.com",
  projectId: "geo-vue-c0a9d",
  storageBucket: "geo-vue-c0a9d.appspot.com",
  messagingSenderId: "850083295611",
  appId: "1:850083295611:web:34dcf9c5a5c44babc44dde",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
app.firestore().settings({ timestampsInSnapshots: true });
// export firestore database
export default app.firestore();
