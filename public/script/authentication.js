const auth = firebase.auth();

var provider = new firebase.auth.GoogleAuthProvider();  
    function loginWithGoogle(event){ 
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            console.log(user);
        }).catch(function(error) {
            console.log(error);
            console.log(error.message)
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