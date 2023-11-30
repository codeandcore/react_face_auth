// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp-EeeSUq7HWPimRYWQcOMoW6YHhMrIEA",
  authDomain: "faceauth-7f1ac.firebaseapp.com",
  projectId: "faceauth-7f1ac",
  storageBucket: "faceauth-7f1ac.appspot.com",
  messagingSenderId: "919178339314",
  appId: "1:919178339314:web:1f90f26b207dc1aadcc16b",
  measurementId: "G-1WN17CFMPK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

// const analytics = getAnalytics(firebase);

