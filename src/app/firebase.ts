// firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD52-KK1dufa_lDE6rxcAhuvvTgXOx_ZMI",
  authDomain: "asset-inventory-a7a55.firebaseapp.com",
  projectId: "asset-inventory-a7a55",
  storageBucket: "asset-inventory-a7a55.firebasestorage.app",
  messagingSenderId: "781170129033",
  appId: "1:781170129033:web:898942460f655278b0ae58",
  measurementId: "G-GDW44MWP1T",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging };
