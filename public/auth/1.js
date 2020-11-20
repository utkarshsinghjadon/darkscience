firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      setNameOnCreate();

      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      }
  
    } else {
      // No user is signed in.
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
    // window.location.href ='/index.html';
  
  }
  function showSignUpOption(){
    document.getElementById("sign_h").style.display = "block";
    document.getElementById("confirm_pass").style.display = "block";
    document.getElementById("sign_but").style.display = "block";
    document.getElementById("log_h").style.display = "none";
    document.getElementById("log_but").style.display = "none";
    document.getElementById("log_p").style.display = "none";
    document.getElementById("log_sign").style.display = "none";
    document.getElementById("newName").style.display = "block";
  }
  function createAccount(){ 
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var confirmPass = document.getElementById("confirm_pass").value;
if (userPass != confirmPass) { 
      alert ("\nPassword did not match: Please try again...") 
      // return false;
    } else {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(error);
      }); 
    // window.location.href ='/index.html';
  }
          
}
  function setNameOnCreate(){
    
      var user = firebase.auth().currentUser;
      const userDocId = user.uid;
    if (newName.length == 0) { 
      const userDocId = user.uid;    
    db.collection('users').doc(userDocId).get().then(function(doc) {
      if (doc.exists) {
        console.log("Data already exists");
        db.collection('users').doc(userDocId).update({
        LastLoginDate: firebase.firestore.FieldValue.serverTimestamp()
      });
      window.location.href ='/index.html';
          } else {
              //x doc.data() will be undefined in this case
              console.log("No such document!");
              db.collection('users').doc(userDocId).set({
                Name: user.displayName,
                CreateAccountDate: firebase.firestore.FieldValue.serverTimestamp(),
                Email : user.email,
                photoUrl : user.photoURL,
                emailVerified : user.emailVerified,
                uid : user.uid
              });
              window.location.href ='/index.html';
          }
          // var user = firebase.auth().currentUser;
      }).catch(function(error) {
          console.log("Error getting document:", error);
          alert("Error");
      });   
    
      
      
    // document.getElementById("user_div").style.display = "block";
    // document.getElementById("login_div").style.display = "none";
  } else {
    // var newName = document.getElementById("newName").value;
    db.collection('users').doc(userDocId).set({
      Name: newName,
      CreateAccountDate: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(){
      user.updateProfile({
        displayName: newName,
        // photoURL: photo
      }).then(function() {
        // Update successful.
        alert("Name changed successfully");
        window.location.href ='/index.html';
      }).catch(function(error) {
        // An error happened.
        alert(error);
      });
    });
  };
  };
  
  function logout(){
    firebase.auth().signOut();
  }

  function googleSignIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    console.log(token);
    console.log(user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        if (errorCode === 'auth/account-exists-with-different-credential') {
          // Step 2.
          // User's email already exists.
          // The pending Google credential.
          // var pendingCred = error.credential;
          // The provider account's email address.
          // var email = error.email;
          // Get sign-in methods for this email.
          auth.fetchSignInMethodsForEmail(email).then(function(methods) {
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.
            if (methods[0] === 'password') {
              // Asks the user their password.
              // In real scenario, you should handle this asynchronously.
              var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
              auth.signInWithEmailAndPassword(email, password).then(function(user) {
                // Step 4a.
                return user.linkWithCredential(credential);
              }).then(function() {
                // Google account successfully linked to the existing Firebase user.
                goToApp();
              });
              return;
            }
            // All the other cases are external providers.
            // Construct provider object for that provider.
            // TODO: implement getProviderForProviderId.
            var provider = getProviderForProviderId(methods[0]);
            // At this point, you should let the user know that they already has an account
            // but with a different provider, and let them validate the fact they want to
            // sign in with this provider.
            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.
            auth.signInWithPopup(provider).then(function(result) {
              // Remember that the user may have signed in with an account that has a different email
              // address than the first one. This can happen as Firebase doesn't control the provider's
              // sign in flow and the user is free to login using whichever account they own.
              // Step 4b.
              // Link to Google credential.
              // As we have access to the pending credential, we can directly call the link method.
              result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                // Google account successfully linked to the existing Firebase user.
                goToApp();
              });
            });
          });
        }
      });
    
    }
    
    function optional(){
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'pt';
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
      });
    }