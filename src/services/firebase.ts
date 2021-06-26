import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCs55lQJMBX6xrl5V-5j1JbI9e37DvgEuk",
  authDomain: "letmeask-45394.firebaseapp.com",
  databaseURL: "https://letmeask-45394-default-rtdb.firebaseio.com",
  projectId: "letmeask-45394",
  storageBucket: "letmeask-45394.appspot.com",
  messagingSenderId: "85479668519",
  appId: "1:85479668519:web:3bbc606e46b772b0580702"
};
firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const database = firebase.database();

 export {firebase,auth,database}