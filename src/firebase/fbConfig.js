import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDDdBm7q5_3UK7LSBWVJBXjKUIrBIbAlcY",
    authDomain: "music-search-75d22.firebaseapp.com",
    databaseURL: "https://music-search-75d22.firebaseio.com",
    projectId: "music-search-75d22",
    storageBucket: "music-search-75d22.appspot.com",
    messagingSenderId: "745304854039",
    appId: "1:745304854039:web:c7b8da7a1e318eca225652",
    measurementId: "G-7TSB23P8YK"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;