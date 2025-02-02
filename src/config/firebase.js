// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBbZ2X5JmPllMId_jo6VdWiQvz-BTt3Bk",
  authDomain: "chatly-42b48.firebaseapp.com",
  projectId: "chatly-42b48",
  storageBucket: "chatly-42b48.firebasestorage.app",
  messagingSenderId: "648785619107",
  appId: "1:648785619107:web:0b3f517b670e5388a83716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Signup functionality.
const signUp = async(username, email, password) => {
  console.log(username, email, password, "username, email, password");
  
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(credentials, "credentialscredentials");
    
    const user = credentials.user;
    console.log(user, "userUserr");

    // Storing data to user's DB.
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I'm using Chatly.",
      lastseen: Date.now()
    });

    // Storing data to chat's DB.
    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    });

  } catch (error) {
    console.log(error, "error");
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
}

// Login Functionality. 
const signIn = async(email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    console.log("User Signed Successfully.");
  } catch (error) {
    console.log(error, "error");
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
}

// Logout Functionality.
const logout = async() => {
  try {
    await signOut(auth);
    console.log("User logged out.");
    
  } catch (error) {
    console.log(error, "error");
    toast.error(error.code.split("/")[1].split("-").join(""));
  }
}

export {signUp, signIn, logout, auth, db};