import { getApp, getApps, initializeApp } from "firebase/app";
<<<<<<< HEAD
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuDBFI5FUuwv3t4M4SvkdhQlb3OKx_p1c",
  authDomain: "pml9-2491c.firebaseapp.com",
  projectId: "pml9-2491c",
  storageBucket: "pml9-2491c.firebasestorage.app",
  messagingSenderId: "895751002824",
  appId: "1:895751002824:web:93ee594c8a6ce4e3d523fd",
  measurementId: "G-K6HST7P5NS"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
=======
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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

>>>>>>> 679f7443df46127fdfb4676497f3f349d9551ae9
export default app;