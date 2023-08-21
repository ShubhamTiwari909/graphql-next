import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

// Registration
const googleProvider = new GoogleAuthProvider();

export const signupWithGoogle = (router:any,setIsLoggedIn:any) => {
  signInWithPopup(auth, googleProvider)
    .then(response => {
      sessionStorage.setItem("Token", response.user.uid)
      sessionStorage.setItem("email", response.user.email)
      sessionStorage.setItem("username", response.user.displayName)
      sessionStorage.setItem("uid", response.user.email + response.user.uid.slice(0,15))
      router.push("/user_teacher");
      setIsLoggedIn(true)
    })
    .catch(err => console.log("error"));
};



export const signOutWithGoogle = (router:any) => {
  signOut(auth)
    .then((response) => {
      // Sign-out successful.
      sessionStorage.removeItem("Token")
      sessionStorage.removeItem("uid")
      router.push("/"); // Redirect to the login page or any other appropriate location
    })
    .catch((error) => {
      // An error occurred.
      console.error("Error signing out:", error);
    });
};
