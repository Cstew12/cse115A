// Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import firebase from 'react-native-firebase';

import * as firebase from "firebase";


// import * as firebase from Firebase;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBvA93lHD-A_k9CGbrxUv9fVhD58K0afM",
  authDomain: "fir-auth-9675d.firebaseapp.com",
  projectId: "fir-auth-9675d",
  storageBucket: "fir-auth-9675d.appspot.com",
  messagingSenderId: "236490221309",
  appId: "1:236490221309:web:bf000d94a587b2bbf74094"
};

// Initialize Firebase
// initializeApp(firebase);
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {i
    app = firebase.app()
}
const auth = firebase.auth()
export {auth};