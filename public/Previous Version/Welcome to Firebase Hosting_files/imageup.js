const changeProf = document.querySelector('#photoUp');
changeProf.addEventListener('submit', (e) => {
  e.preventDefault();
  const photoUp = document.querySelector('#cameraInput').files[0];
// File or Blob named mountains.jpg
// const storageRef = storage.ref();
// let imageRef = firebase.storage().ref('photos/myPictureName');
// const file = new File([blob], "profile.png", {type: "image/jpeg"});
// let fileUpload = document.getElementById("cameraInput");
// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
//   contentType: photoUp.type;
};
// photoUp.addEventListener('change', function(evt) {
//     let firstFile = evt.target.files[0] // upload the first file only
//     let uploadTask = storageRef.put(firstFile)
// })

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + photoUp.name).put(photoUp, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      console.log(error);
      break;

    case 'storage/canceled':
      // User canceled the upload
      console.log(error);
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      console.log(error);
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    const image = document.querySelector('#imageUp');
    image.src = downloadURL;
    var downloadLink = downloadURL;
    console.log(downloadLink);
  
  var user = firebase.auth().currentUser;
// var newName = document.getElementById;
const userDocId = user.uid;
db.collection('users').doc(userDocId).set({
    photoURL: downloadLink
    // Date: firebase.firestore.FieldValue.serverTimestamp()
  });
  //update profile name
    user.updateProfile({
      // displayName: flipname.nameUser.value,
      photoURL: downloadLink
    }).then(function() {
      // Update successful.
      alert("Photo changed successfully");
      location.reload();
    }).catch(function(error) {
      // An error happened.
      alert(error);
    });
  });
  });

});
function takePic(){

init();
showWebCam();
document.getElementById('modal-account').style.display="none";
};
const video = document.getElementById('camVideo');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const errorMsgElement = document.querySelector('span#errorMsg');
const constraints = {
    audio:false,
    video: {
        width: 400, height: 400
    }
};
//start webcam
async function init() {
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        // errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        console.log(e);
    }
};
function handleSuccess(stream){
    window.stream = stream;
    video.srcObject = stream;
};

var context = canvas.getContext('2d');

snap.addEventListener('click', function(){
    context.drawImage(video, 0, 0, 640, 480);
    var image = new Image();
    image.src = canvas.toDataURL('image/png');
    console.log(image.src);
    var button =document.createElement('button');
    button.textContent = 'Upload Image';
    document.body.appendChild(button);
    button.onclick = function(){
        storageRef.child(new Date() + '-' + 'base64').putString(image.src, 'data_url')
        .then(function(snapshot){
            console.log("Image Uploaded");
            alert("Image Uploaded");
        })
    }
});

function showWebCam(){
  document.getElementById('canvas').style.display = "block";
  document.getElementById('camVideo').style.display = "block";
  document.getElementById('snap').style.display = "block";
};