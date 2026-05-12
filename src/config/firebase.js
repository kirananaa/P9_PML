import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAqCQnXU-AY-VeevBT6munAY0KBxwR_qA",
  authDomain: "pml-p9.firebaseapp.com",
  projectId: "pml-p9",
  storageBucket: "pml-p9.firebasestorage.app",
  messagingSenderId: "677476989997",
  appId: "1:677476989997:web:0be7c9ea5068c6cb3fcca4",
  measurementId: "G-H2B66E85K2"
}

// Cegah duplicate-app error
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth dengan AsyncStorage supaya session persist
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;