import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCeva5bteTNdxvH4PWRB_lV3oZNVuoU9s4',
  authDomain: 'superchat-b2d40.firebaseapp.com',
  databaseURL: 'https://superchat-b2d40.firebaseio.com',
  projectId: 'superchat-b2d40',
  storageBucket: 'superchat-b2d40.appspot.com',
  messagingSenderId: '665971931035',
  appId: '1:665971931035:web:1d045499a5181fd62a533e',
  measurementId: 'G-W5EC1HRNGW',
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
