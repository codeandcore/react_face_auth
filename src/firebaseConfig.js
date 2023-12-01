// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCp-EeeSUq7HWPimRYWQcOMoW6YHhMrIEA",
  authDomain: "faceauth-7f1ac.firebaseapp.com",
  projectId: "faceauth-7f1ac",
  storageBucket: "faceauth-7f1ac.appspot.com",
  messagingSenderId: "919178339314",
  appId: "1:919178339314:web:1f90f26b207dc1aadcc16b",
  measurementId: "G-1WN17CFMPK"
};
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)