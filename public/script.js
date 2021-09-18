//! Firebase
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
var displayName;

let initWeb = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      alert("Bạn phải đăng nhập trước khi sử dụng.");
      window.location.href = "/";
    } else {
      displayName = user.displayName;
      roomdb
        .doc(ROOM_ID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let getPassword = () => {
              let password = prompt("Nhập mật khẩu");
              if (password !== doc.data().password) {
                alert("Sai mật khẩu");
                getPassword();
              } else {
              }
            };
            getPassword();
          } else {
            let createPassword = () => {
              let password = prompt("Tạo mật khẩu");
              if (
                (password.length == 0 && password === null) ||
                password.length == 0 ||
                password === null
              ) {
                alert("Mật khẩu không hợp lệ");
                createPassword();
              } else {
                roomdb.doc(ROOM_ID).set({
                  password: password,
                });
                alert("Tạo phòng thành công");
              }
            };
            createPassword();
          }
        });
    }
  });
};

let countPeople = () => {
  let peopleCount = document.querySelector(".people-count");
  let count = streamGrid.childElementCount;
  peopleCount.innerHTML = count;
};

document.addEventListener("DOMContentLoaded", initWeb);
// ! Socket.io And PeerJs
const socket = io("/");

let myVideoStream;
let streamGrid = document.getElementById("stream-grid");
var peer = new Peer();
var peers = {};

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    let myVideo = document.createElement("video");
    myVideo.setAttribute("class", "rounded-xl");
    myVideo.muted = true;
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      let video = document.createElement("video");
      video.setAttribute("class", "rounded-xl");

      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

let addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  video.setAttribute(
    "class",
    "h-48 w-64 rounded-xl bg-primary flex justify-center items-center m-6"
  );
  let div = document.createElement("div");
  div.innerHTML = "<h1>hi</h1>";
  div.append(video);
  streamGrid.append(div);
  countPeople();
};

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

let connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  video.setAttribute("class", "rounded-xl");

  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
    countPeople();
  });

  peers[userId] = call;
};

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) {
    peers[userId].close();
    countPeople();
  }
});

let msg = document.getElementById("inputChat");
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && msg.value.length !== 0) {
    console.log(displayName);
    let message = {
      name: displayName,
      msg: msg.value,
    };
    socket.emit("message", message);
    msg.value = "";
  }
});

socket.on("createMsg", (message) => {
  // Get time send
  const d = new Date();
  let time;
  if (d.getMinutes() < 10) {
    time = `${d.getHours()}:0${d.getMinutes()}`;
  } else {
    time = `${d.getHours()}:${d.getMinutes()}`;
  }
  // Create message element
  const msg = document.createElement("div");
  msg.setAttribute(
    "class",
    "chat-div flex flex-col mb-2 rounded bg-chatbox m-1 p-1"
  );
  msg.innerHTML = `
  <div class="pb-2 ">
    <span class="chat-user  mr-5 ml-2 font-bold"
      >${message.name}</span>
    <span class="chat-time ">${time}</span>
  </div>
    <span class="chat-content  ml-2">${message.msg}</span>
  `;
  // Append to container
  let chatContainer = document.querySelector(".chat-container");
  chatContainer.append(msg);
  msg.scrollIntoView();
});

// !Time On Screen
let setTime = () => {
  const d = new Date();
  if (d.getMinutes() < 10) {
    document.querySelector(
      ".taskbar-clock"
    ).innerHTML = `${d.getHours()}:0${d.getMinutes()}`;
  } else {
    document.querySelector(
      ".taskbar-clock"
    ).innerHTML = `${d.getHours()}:${d.getMinutes()}`;
  }

  setInterval(() => {
    const d = new Date();
    if (d.getMinutes() < 10) {
      document.querySelector(
        ".taskbar-clock"
      ).innerHTML = `${d.getHours()}:0${d.getMinutes()}`;
    } else {
      document.querySelector(
        ".taskbar-clock"
      ).innerHTML = `${d.getHours()}:${d.getMinutes()}`;
    }
  }, 1000);
};
document.addEventListener("DOMContentLoaded", setTime);

let startScreenShare = () => {
  navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
    myScreenShare = stream;
    let video = document.createElement("video");
    myScreenShare.muted = true;
    addVideoStream(video, stream);
  });
};

// !Button States
// ? Variables and Functions
let mute = document.getElementById("mute");
let camera = document.getElementById("camera");
let sharescreen = document.getElementById("share");
let leave = document.getElementById("leave");

let checkMute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    mute.classList.add("bg-red-500", "hover:bg-red-700");
    mute.classList.remove("bg-primary", "hover:bg-gray-600");
    myVideoStream.getAudioTracks()[0].enabled = false;
  } else {
    mute.classList.add("bg-primary", "hover:bg-gray-600");
    mute.classList.remove("bg-red-500", "hover:bg-red-600");
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

let checkCam = () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    camera.classList.add("bg-red-500", "hover:bg-red-700");
    camera.classList.remove("bg-primary", "hover:bg-gray-600");
    myVideoStream.getVideoTracks()[0].enabled = false;
  } else {
    camera.classList.add("bg-primary", "hover:bg-gray-600");
    camera.classList.remove("active", "bg-red-500", "hover:bg-red-600");
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
};

let checkShare = () => {
  if (sharescreen.classList.contains("active")) {
    // Tailwind
    sharescreen.classList.add("bg-primary", "hover:bg-gray-600");
    sharescreen.classList.remove("active", "bg-red-500", "hover:bg-red-600");
    // stopScreenShare();
  } else {
    // Tailwind
    sharescreen.classList.add("active", "bg-red-500", "hover:bg-red-700");
    sharescreen.classList.remove("bg-primary", "hover:bg-gray-600");
    startScreenShare();
  }
};

let checkQuit = () => {
  let confirmLeave = confirm("Rời cuộc họp ?");
  if (confirmLeave) {
    window.location.href = "/";
  }
};

// ? Event Listeners
mute.addEventListener("click", checkMute);
camera.addEventListener("click", checkCam);
sharescreen.addEventListener("click", checkShare);
leave.addEventListener("click", checkQuit);
