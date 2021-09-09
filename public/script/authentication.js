const auth = firebase.auth();

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

//signup function
function signUp() {
  var email = document.getElementById("registerEmail");
  var password = document.getElementById("registerPassword");

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  //
  promise.catch(e => alert(e.message));
  alert("SignUp Successfully");
}

//signIN function
function signIn() {
  var email = document.getElementById("loginEmail");
  var password = document.getElementById("loginPassword");
  auth.signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("Logged in");
      window.location.href = "searchBank.html";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      // ...
    });
}


//signOut
function signOut() {
  const promise = auth.signOut();
  promise.catch(e => alert(e.message));
  alert("SignOut Successfully from System");
  location.href = "login.html";
}

let currentUser = null;


firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log(user);
  } else {
    console.log('No User');
    // alert("Please login");
    // location.href = "index.html";
  }
});