// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_FIREBASE_API}`,
  authDomain: "switchoff-admin-v1.firebaseapp.com",
  projectId: "switchoff-admin-v1",
  storageBucket: "switchoff-admin-v1.appspot.com",
  messagingSenderId: "469380366453",
  appId: "1:469380366453:web:63f3656f0eb1fb06bbb83c",
  measurementId: "G-31JZ17NDTD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);