import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCC8-kwp8GgWzc9ZUEbq1L2WxrQb1gH9rg",
    authDomain: "discussionforum-8cae5.firebaseapp.com",
    databaseURL: "https://discussionforum-8cae5.firebaseio.com",
    projectId: "discussionforum-8cae5",
    storageBucket: "discussionforum-8cae5.appspot.com",
    messagingSenderId: "1021195839189",
    appId: "1:1021195839189:web:102a2eb670c477cb2da45c"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);


const db =firebaseApp.firestore();

const auth = firebaseApp.auth();

export {auth}
export default db 



