// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//import firebase from "firebase";
//import "firebase/auth";
//import "firebase/firestore";
//import { rootReducer } from "reducers";
//import { createStore } from "redux";
//import { createFirestoreInstance } from "redux-firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDX8HKfTKYXSCH6aldpbMgFCQA1fnK8tkM',
    authDomain: 'notus-4d809.firebaseapp.com',
    projectId: 'notus-4d809',
    storageBucket: 'notus-4d809.appspot.com',
    messagingSenderId: '586982924616',
    appId: '1:586982924616:web:d8f49a282b2bcf46c2537d',
    measurementId: 'G-8DK36BLZX8',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()
/*
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const initialState = {};
const store = createStore(rootReducer, initialState);


const rrfProps = {
  // firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};
*/

export { auth, db }
