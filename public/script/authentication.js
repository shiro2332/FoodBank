import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {$,jQuery} from 'jquery';
window.$ = $;
window.jQuery = jQuery;

function registration(email, password){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
    });
}

$(document).ready(function(){
    $("#test2").click(function(){
        registration($("#text1").val(), $("#pass1").val());
    });
});