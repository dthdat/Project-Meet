var password = document.getElementById("password");
var repassword = document.getElementById("repassword");
var roomid = document.getElementById("roomid");
var passwordjoin = document.getElementById("passwordjoin");
var signinBtn = document.querySelector(".sign-in-btn");
var signoutBtn = document.querySelector(".sign-out-btn");
// Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCfK7O4-Tpx8_-tABxGiq9lioHi37s6URc",
  authDomain: "project-meet-904f1.firebaseapp.com",
  projectId: "project-meet-904f1",
  storageBucket: "project-meet-904f1.appspot.com",
  messagingSenderId: "895041471133",
  appId: "1:895041471133:web:9b866ae5ebfa73953f0a74",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const roomdb = db.collection("room");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    signinBtn.classList.add("hidden");
    document.querySelector(".profile-photo").src = user.photoURL;
  } else {
    signoutBtn.classList.add("hidden");
  }
});

let createRoom = () => {
  window.location.href = "/createroom";
};

let joinRoom = () => {
  let roomId = prompt("Nhập ID phòng");
  roomdb
    .doc(roomId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        window.location.href = `/room/${roomId}`;
      } else {
        alert("Phòng không tồn tại.");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

// Handle time
let setDay = () => {
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date();
  document.querySelector(
    ".navbar-time"
  ).innerHTML = `${d.getHours()}:${d.getMinutes()} • ${
    day[d.getDay()]
  } ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  setInterval(() => {
    const d = new Date();
    document.querySelector(
      ".navbar-time"
    ).innerHTML = `${d.getHours()}:${d.getMinutes()} • ${
      day[d.getDay()]
    } ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  }, 1000);
  // Auth
};

// Log In
let signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // The signed-in user info.
      var user = result.user;
      location.reload();
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};
let signOut = () => {
  let confirmlogOut = confirm("Đăng xuất ?");
  if (confirmlogOut) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  }
};
document.addEventListener("DOMContentLoaded", setDay);
signinBtn.addEventListener("click", signIn);
