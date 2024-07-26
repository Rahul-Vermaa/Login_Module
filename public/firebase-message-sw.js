importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBke2bZFJ2xf3EcK0XI1KBvVtPA05eSpTs",
    authDomain: "nene-a41ce.firebaseapp.com",
    projectId: "nene-a41ce",
    storageBucket: "nene-a41ce.appspot.com",
    messagingSenderId: "384233478662",
    appId: "1:384233478662:web:8282355bbda38f71f88187",
    measurementId: "G-3TJJ64624R"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.notification.title || 'Background Message Title';
  const notificationOptions = {
    body: payload.notification.body || 'Background Message body.',
    icon: '/firebase-logo.png',
    data: { url: link }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification click received.");
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        const url = event.notification.data.url;
        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
