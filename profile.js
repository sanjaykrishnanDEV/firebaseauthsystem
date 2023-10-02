import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getAuth,
  deleteUser,
  updateEmail,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
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

let idUrl = new URLSearchParams(location.search);
console.log(idUrl);
const [sid] = idUrl.values();
console.log(sid);

// function get(){
const db = getDatabase(app);
let id = JSON.parse(sessionStorage.getItem("userid"));
console.log(id);

var user_ref = ref(db, "users/" + id);
onValue(user_ref, (snapshot) => {
  let userData = snapshot.val();
  console.log(userData);
  let cardData = document.createElement("div");
  cardData.innerHTML = `
        <p>username : ${userData.username}</p>
        <p>email id : ${userData.email}</p> 
        <p>password : ${userData.password}</p>
        <p>country : ${userData.country}</p>
        <p>Phone number : ${userData.phone}</p>
                
        `;
  document.querySelector("h5").appendChild(cardData);
});
//console.log(user_ref)

//deleteprofile
// document.getElementById('delete').addEventListener('click',()=>{
// let id = sessionStorage.getItem('userid');
// console.log(id)
// const user = firebase.auth().currentUser;
// user.delete().then(() => {
//     // User deleted.
// }).catch((error) => {
//     // An error occurred
//     // ...
// });

// })

const usernameM = document.querySelector("#usernameM");
const emailM = document.querySelector("#emailM");
const passwordM = document.querySelector("#passwordM");
// const confirmPasswordM = document.querySelector("#confirmPasswordM");
const countryM = document.querySelector("#countryM");
const editBtn = document.querySelector("#edit-user");
const phone = document.querySelector("#phone");
const openModal = document.querySelector("#open-modal");

// openModal.addEventListener("click", (e) => {
//   e.preventDefault();
//   let userRef = ref(db, "users/" + id);
//   onValue(userRef, (snapshot) => {
//     const userData = snapshot.val();
//     console.log(userData);
//     usernameM.value = userData?.username;
//     // emailM.value = userData?.email;
//     // passwordM.value = userData?.password;
//     // confirmPasswordM.value = userData?.confirmPassword;
//     countryM.value = userData?.country;
//     phone.value = userData?.phone;
    
//   });
// });

// editBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (confirm("Are you sure to edit the details?")) {
//     let newUserDetails = {
//         country: countryM.value,
//         //email: emailM?.value,
//         password: passwordM?.value,
//         phone: phone?.value,
//         username: usernameM?.value,
//     //   userId: id,
//     };
//     console.log(newUserDetails);
//     let updates = {};
//     updates["/users/" + id] = newUserDetails;
//     update(ref(db), updates);

//     window.location.reload();
//   }
// });

// deletion
const deleteUserBtn = document.querySelector("#delete-user");
deleteUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Are you sure to delete the user?")) {
    let updates = {};
    updates["/userDetails/" + id] = null;
    update(ref(db), updates);
    const auth = getAuth();
    const user = auth?.currentUser;

    deleteUser(user)
      .then(() => {
        alert("User deleted successfully");
        window.location.assign("registration.html");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
//logout
document.getElementById("log").addEventListener("click", () => {
  if (confirm("Are you sure?")) {
    
    window.location.assign("signup.html");
  }
});
