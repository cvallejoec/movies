import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAbuOf3EUg53JiMpm9epPt_O2Pw7LdNKJM',
  authDomain: 'whatsapp-mern-c4fea.firebaseapp.com',
  databaseURL: 'https://whatsapp-mern-c4fea.firebaseio.com',
  projectId: 'whatsapp-mern-c4fea',
  storageBucket: 'whatsapp-mern-c4fea.appspot.com',
  messagingSenderId: '260010849098',
  appId: '1:260010849098:web:ddf292a9a80d1e59c187b3',
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
