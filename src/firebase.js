import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBaoLX9f8OizvXKZzDrXMfw_qqEX9wW8MQ",
    authDomain: "myapp-a33fa.firebaseapp.com",
    databaseURL: "https://myapp-a33fa.firebaseio.com",
    projectId: "myapp-a33fa",
    storageBucket: "myapp-a33fa.appspot.com",
    messagingSenderId: "956408479791",
    appId: "1:956408479791:web:9cf44260aa1a591fddc6da"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);


const db =firebaseApp.firestore();

const auth = firebaseApp.auth();
const storage= firebaseApp.storage();

export {auth,storage}
export default db 



