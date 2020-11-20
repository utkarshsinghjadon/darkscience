importScripts('/__/firebase/8.0.2/firebase-app.js');
importScripts('/__/firebase/8.0.2/firebase-messaging.js');
importScripts('/FirebaseSDK/init.js');

// const messaging = firebase.messaging();


//  * Here is is the code snippet to initialize Firebase Messaging in the Service
//  * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
//  importScripts['https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js'];
//  importScripts['https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js'];
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
//  firebase.initializeApp({
//   apiKey: "AIzaSyCcF7hQHvhlEtrpyOpifqhM0QSzm0ljWvo",
//   authDomain: "atomic-airship-284606.firebaseapp.com",
//   databaseURL: "https://atomic-airship-284606.firebaseio.com",
//   projectId: "atomic-airship-284606",
//   storageBucket: "atomic-airship-284606.appspot.com",
//   messagingSenderId: "970606569229",
//   appId: "1:970606569229:web:3ca1af5c6f4e92db593244",
//   measurementId: "G-GJKM57NSQJ"
//  });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]



// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START on_background_message]
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/Messaging/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END on_background_message]