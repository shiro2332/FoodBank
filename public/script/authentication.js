// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB6k1Q91ZUeRsKneY7El6adwQ1CONAt650",
  authDomain: "freefoodforyou-6dc88.firebaseapp.com",
  projectId: "freefoodforyou-6dc88",
  storageBucket: "freefoodforyou-6dc88.appspot.com",
  messagingSenderId: "1097439533486",
  appId: "1:1097439533486:web:5dd7c3ce83cc6cf2ff503f",
  measurementId: "G-K2439YYX8Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

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
      window.location.href = "user.html";
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
  window.location.href = "index.html";
}

function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      console.log('No User');
    }
  });
}