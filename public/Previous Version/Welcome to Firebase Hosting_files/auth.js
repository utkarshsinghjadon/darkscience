auth.onAuthStateChanged(user => {
    // console.log(user)
        if (user) {
            window.location.href;
            //get data 
            const uid = user.uid;
            
        db.collection('Theories').orderBy("Date", "desc").get().then(snapshot => {
            setupTheories(snapshot.docs);
            setupUI(user);
            // console.log(snapshot.docs);
            // var user = firebase.auth().currentUser;
        });
        const userDocId = user.uid;
        db.collection('users').doc(userDocId).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var users = doc.data();
                const userfire = document.querySelector('.userfire');
                function firestoreUsers () {
                //   const users = db.collection('users').doc(userDocId).data();
                  const html = `
                  DOB: ${users.Date}
                     <br>
                     `;
                   userfire.innerHTML = html;
                }
        firestoreUsers();
            } else {
                //x doc.data() will be undefined in this case
                console.log("No such document!");
            }
            // var user = firebase.auth().currentUser;
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });       
        //get data 
            // db.collection('Guides').get().then(snapshot => {
            //     setupGuides(snapshot.docs);
            // });    
        } else {
            setupTheories([]);
            setupUI()
            window.location.href = "/auth/";
        }
    });

    




//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
//get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // console.log(email, password)

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });

});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log('user signed out')
        window.location
    });
});




// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);

        //close login
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});

  
// function login(){
  
//     var userEmail = document.getElementById("email_field").value;
//     var userPass = document.getElementById("password_field").value;
  
//     firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
  
//       window.alert("Error : " + errorMessage);
  
//       // ...
//     });
  
//   }
  
//   function logout(){
//     firebase.auth().signOut();
//   }