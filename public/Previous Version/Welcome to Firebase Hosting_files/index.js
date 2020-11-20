const guideList = document.querySelector('.theories');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminLogin = document.querySelectorAll('.admin-login');
const newTheory = document.querySelector('#create-form');
const flipname = document.querySelector('#flipname');
// const 
const photo = (photoURL) => {
  if (photoURL = null) {
    photoURL: "/profil.png"
  } else {
    photoURL: "/profle.png"
  }
}
// Random Pass
var randomstring = Math.random().toString(36).slice(-8);
// function getASecureRandomPassword() {
  
// }

//setup guides
const setupTheories = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const theory = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${theory.Title}</div>
        <div class="collapsible-body white">${theory.content}</div>
          
        </li>
      `;
      html += li
    });
  
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align"> Login to view the Theories.</h5>';
  }
  };


const setupUI = (user) => {
  if (user) {
    
     // account info
     const html = `
     <div>Logged in as ${user.email}</div>
     
     <img src="${user.photoURL}" width="100" height="100" class="center" alt="Profile Picture">
     
     Name: ${user.displayName}
     <br>
     
     Your User ID:    ${user.uid}
     <br>
     Email Verified:${user.emailVerified}
     <br>
     
     <button id="newPasBut" onclick="showChangePass()">Change Password</button>
     <form id="newPassw">
     <input type="email" placeholder="Email..." id="email_field" autocomplete="email" required />
     <input name="newpas" id="newPas" type="password" autocomplete="current-password" required>
     <button id="newPasButF" onclick="changePass()">Change Password</button>
     
   
     </form>
   `;
   accountDetails.innerHTML = html;

   //Get a user's provider-specific profile information
   user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
//update profile infor
    // user.updateProfile({
    //   displayName: "Jane Q. User",
    //   photoURL: photo
    // }).then(function() {
    //   // Update successful.
    // }).catch(function(error) {
    //   // An error happened.
    // });

  });
  
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    adminLogin.forEach(item => item.style.display = 'none');

    if (user != null && user.uid == 'vJgqiFomk0VmlbKEhthOtnq7aKL2'){
      adminLogin.forEach(item => item.style.display = 'block');
    }




  } else {
    // clear account info
    accountDetails.innerHTML = '';
    loggedOutLinks.forEach(item => item.style.display = 'block');
    loggedInLinks.forEach(item => item.style.display = 'none');
    adminLogin.forEach(item => item.style.display = 'none');
  }
}


// // create elements and render cafe
// function renderCafe(doc){
// 	let li = document.createElement('li')
		
// }








// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
  
// saving data
newTheory.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('Theories').add({
      Title: newTheory.title.value,
      content: newTheory.detail.value,
      Date: firebase.firestore.FieldValue.serverTimestamp()
  });
  newTheory.title.value = '';
  newTheory.detail.value = '';
});

flipname.addEventListener('submit', (e) => {
  e.preventDefault();
  var user = firebase.auth().currentUser;
// var newName = document.getElementById;
const userDocId = user.uid;
db.collection('users').doc(userDocId).set({
    Name: flipname.nameUser.value,
    Date: firebase.firestore.FieldValue.serverTimestamp()
  });
  //update profile name
    user.updateProfile({
      displayName: flipname.nameUser.value,
      // photoURL: photo
    }).then(function() {
      // Update successful.
      alert("Name changed successfully");
      location.reload();
    }).catch(function(error) {
      // An error happened.
      alert(error);
    });
});
// flipphotoUrl.addEventListener('submit', (e) => {
//   e.preventDefault();
  
// });


function showChangePass(){
  document.getElementById('newPasBut').style.display = "none";
document.getElementById('newPassw').style.display = "block";
}
// const NewPass = document.getElementById('newPassw')
//Change Pass
function changePass(){
var user = firebase.auth().currentUser;
var newPassword = document.getElementById('newPas').value;
// var newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(function() {
  // Update successful.
  window.alert("Your new Password is" + newPassword)
  document.getElementById('modal-account').style.display = "none";
}).catch(function(error) {
  // An error happened.
});
}


// NewPass.addEventListener('submit', (e) => {
//   e.preventDefault();
//   var user = firebase.auth().currentUser;
//   var newPassword = NewPass.newpas.value;
//   user.updatePassword(newPassword).then(function() {
//       // Update successful.
//       window.alert("Your new Password is" + newPassword)
//     }).catch(function(error) {
//       // An error happened.
//     });
  
  // newTheory.title.value = '';
  // newTheory.detail.value = '';
// });