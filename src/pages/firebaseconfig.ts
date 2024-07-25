import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBke2bZFJ2xf3EcK0XI1KBvVtPA05eSpTs",
    authDomain: "nene-a41ce.firebaseapp.com",
    projectId: "nene-a41ce",
    storageBucket: "nene-a41ce.appspot.com",
    messagingSenderId: "384233478662",
    appId: "1:384233478662:web:8282355bbda38f71f88187",
    measurementId: "G-3TJJ64624R"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
  
        const token = await getToken(messaging, { vapidKey: 'BIJKafyB-BZj5pD6kED-JjIvL67jSpLNhKVKxqg3SuNFMs-JTmgB0btS_Fo2bPnfA7LADkD8hOYfWOtv27h8hNE' });
        if (token) {
          console.log('FCM token:', token);
          return token;
        } else {
          console.log('No registration token available.');
        }
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error getting FCM token', error);
    }
  };
  

  export const onMessageListener = () =>
    new Promise((resolve, reject) => {
      try {
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
          resolve(payload);
        });
      } catch (error) {
        console.error('Error receiving message', error);
        reject(error);
      }
    });
  

 onMessage(messaging, (payload:any) => {
    
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const link = payload.fcmOptions?.link || payload.data?.link;
  const notificationTitle = payload.notification.title || 'Background Message Title';
  const notificationOptions = {
    body: payload.notification.body || 'Background Message body.',
    icon: '/firebase-logo.png', 
    data:{url:link},
  };
  alert(notificationTitle);
})