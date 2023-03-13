import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDzx7J7LHz-Jtzt8_4W7HwhFgQ32-unl2U",
    authDomain: "reels-react-8f682.firebaseapp.com",
    projectId: "reels-react-8f682",
    storageBucket: "reels-react-8f682.appspot.com",
    messagingSenderId: "790507002088",
    appId: "1:790507002088:web:6f8a10904eba86ce43d15d"
};

export const AppFire = initializeApp(firebaseConfig);

const firestore = getFirestore(AppFire);
export const fstore = firestore;

export const database = {
    users: collection(firestore, "users"),
    posts: collection(firestore, "posts"),
    comments: collection(firestore, "comments")
}

export const storage = getStorage(AppFire)