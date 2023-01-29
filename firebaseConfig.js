import {initializeApp, getApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAI_XaJ_mwWiQgHeFCdebBwDKDNPlsJZGw',
  authDomain: 'chatapp-55c67.firebaseapp.com',
  projectId: 'chatapp-55c67',
  storageBucket: 'chatapp-55c67.appspot.com',
  messagingSenderId: '406125894753',
  appId: '1:406125894753:web:df0b726350f2f8c3fb5e20',
  measurementId: 'G-V4N9EQ5CHR',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db, auth};
