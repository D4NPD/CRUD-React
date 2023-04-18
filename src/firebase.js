import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBQQTI5laFMEwxr5SDpOBHlqIUeTZKB7oo",
  authDomain: "crud-react-web2-8aefe.firebaseapp.com",
  projectId: "crud-react-web2-8aefe",
  storageBucket: "crud-react-web2-8aefe.appspot.com",
  messagingSenderId: "733646891053",
  appId: "1:733646891053:web:714305c9a93594a419f0a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}