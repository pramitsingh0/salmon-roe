// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const envVars = require("./config");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: envVars.FIREBASE_APIKEY,
  authDomain: envVars.FIREBASE_AUTHDOMAIN,
  projectId: envVars.PROJECT_ID,
  storageBucket: envVars.STORAGE_BUCKET,
  messagingSenderId: envVars.MESSAGING_SENDER_ID,
  appId: envVars.APP_ID,
  measurementId: envVars.MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseConn = initializeApp(firebaseConfig);
module.exports = firebaseConn;
