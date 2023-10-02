import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyA4i4Rh8Jsx4OS_ox9AyiE60S-oG_G_lqo",
  authDomain: "fsdtask.firebaseapp.com",
  projectId: "fsdtask",
  storageBucket: "fsdtask.appspot.com",
  messagingSenderId: "983816311525",
  appId: "1:983816311525:web:bbbd83c5ca078f7c593a0c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");

const signin = document.getElementById("signin");
signin.addEventListener("click", (e) => {
    console.log(email.value)
    e.preventDefault();
    console.log('clicking')
    signInWithEmailAndPassword(auth, email.value,password.value)
    .then((usercredentials)=>{
        alert("success");
        sessionStorage.setItem('userid',JSON.stringify(usercredentials.user.uid))
        window.location.assign('profile.html');
    })
    .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // console.log(errorCode);
    // console.log(errorMessage);  
    alert(error)
    });
});

// document.getElementById('loginbtn').addEventListener('click',()=>{
//     window.location.assign('login.html')
// })