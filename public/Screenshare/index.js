const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
var yourId = Math.floor(Math.random()*1000000000);
var database = firebase.database().ref('webrtc/' + yourId);
// var yourVideo = document.getElementById("yourVideo");
// var friendsVideo = document.getElementById("friendsVideo");

// var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'webrtc','username': 'websitebeaver@mail.com'}]};
// var pc = new RTCPeerConnection(servers);
// pc.onicecandidate = (event => event.candidate?sendMessage(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
// pc.onaddstream = (event => friendsVideo.srcObject = event.stream);



 const gdmOptions = {
  video: {
    cursor: "always"
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
}

// start screen share

// async function startCapture(displayMediaOptions) {
//   let captureStream = null;

//   try {
//     captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
//   } catch(err) {
//     console.error("Error: " + err);
//   }
//   return captureStream;
// }


async function startCapture() {
    logElem.innerHTML = "";
  
    try {
      videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
      dumpOptionsInfo();
    } catch(error) {
      console.error("Error: " + error);
    }
  }

  function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
   
    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
    console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
  }

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function(evt) {
    startCapture();
    console.log = msg => logElem.innerHTML += `${msg}<br>`;
console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;
  }, 
  false);
    
  


  function stopCapture() {
    let tracks = videoElem.srcObject.getTracks();
    // console.log("Hey")
    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
    if (videoElem.srcObject == null){
        alert("screenshare stopped");
    }else {
        alert("eror");
    }
    
};

stopElem.addEventListener("click", function(evt) {
    stopCapture();
    // console.log("hi")
  }, false);




/*

  function sendMessage(senderId, data) {
    var msg = database.push({ sender: senderId, message: data });
    
    // msg.remove();
   }
   
   function readMessage(data) {
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    if (sender != yourId) {
    if (msg.ice != undefined)
    pc.addIceCandidate(new RTCIceCandidate(msg.ice));
    else if (msg.sdp.type == "offer")
    pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
    .then(() => pc.createAnswer())
    .then(answer => pc.setLocalDescription(answer))
    .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})));
    else if (msg.sdp.type == "answer")
    pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
   };
   
   database.on('child_added', readMessage);
   
  
function showMyFace() {
  navigator.mediaDevices.getUserMedia({audio:true, video:true})
  .then(stream => yourVideo.srcObject = stream)
  .then(stream => pc.addStream(stream));
 }
 
 function showFriendsFace() {
  pc.createOffer()
  .then(offer => pc.setLocalDescription(offer) )
  .then(() => sendMessage(yourId, JSON.stringify({'sdp': pc.localDescription})) );
 }
 */