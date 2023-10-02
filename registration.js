import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4i4Rh8Jsx4OS_ox9AyiE60S-oG_G_lqo",
  authDomain: "fsdtask.firebaseapp.com",
  projectId: "fsdtask",
  storageBucket: "fsdtask.appspot.com",
  messagingSenderId: "983816311525",
  appId: "1:983816311525:web:bbbd83c5ca078f7c593a0c",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const floatingname = document.getElementById("floatingname");
const emailId = document.getElementById("floatingInput");
const password = document.getElementById("floatingPassword");
const cnfPassword = document.getElementById("cnffloatingPassword");
const country = document.getElementById("country");
const phone = document.getElementById("phonenum");
const signup = document.getElementById("signup");

signup.addEventListener("click", (e) => {
  e.preventDefault();
  if (password.value === cnfPassword.value) {
    createUserWithEmailAndPassword(auth, emailId.value, password.value)
      .then((userDetails) => {
        let userId = userDetails.user.uid;
        console.log(userId);

        set(ref(db, "users/" + userDetails.user.uid), {
          username: floatingname.value,
          email: emailId.value,
          password: password.value,
          country: country.value,
          phone: phone.value,
        });
        alert("success add");
        floatingname.value = "";
        password.value = "";
        emailId.value="";
        cnfPassword.value="";
        country.value="";
        phone.value="";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("check both passwords");
  }
});

