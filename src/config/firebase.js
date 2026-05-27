import { getApp, getApps, initializeApp } from "firebase/app";
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
export default app;