// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD52-KK1dufa_lDE6rxcAhuvvTgXOx_ZMI",
authDomain: "asset-inventory-a7a55.firebaseapp.com",
   projectId: "asset-inventory-a7a55",
  storageBucket: "asset-inventory-a7a55.firebasestorage.app",
  messagingSenderId: "781170129033",
  appId: "1:781170129033:web:898942460f655278b0ae58",
});

const messaging = firebase.messaging();
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });