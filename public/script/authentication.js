const auth = firebase.auth();

function loginWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(provider).then(() =>{
    alert("Logged in");
      window.location.href = "userMenu.html";
  })
  .catch(error => {
    console.error(error);
  })
}

function loginWithFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithRedirect(provider).then(() =>{
    alert("Logged in");
      window.location.href = "userMenu.html";
  })
  .catch(error => {
    console.error(error);
  })
}

function loginAnnonymous() {
  firebase.auth().signInAnonymously()
  .then(() => {
    // Signed in..
    alert("Logged in");
    window.location.href = "userMenu.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
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
    .then(async (userCredential) => {
      // Signed in
      var user = userCredential.user;
      const snapshot = await firebase.firestore().collection("Admin").doc(email.value).get();
      console.log(snapshot.data());
      if(snapshot.data()){
        alert("Logged in");
        window.location.href = "adminMenu.html";
      } else {
        alert("Logged in");
        sessionStorage.setItem('firsttimelogin', true);
        window.location.href = "userMenu.html";
      }
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