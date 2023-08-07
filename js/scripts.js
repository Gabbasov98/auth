// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9ZiPu_CxGffU6DS5CUsOGx3BaC4-6kFI",
    authDomain: "auth-app-d39a1.firebaseapp.com",
    projectId: "auth-app-d39a1",
    storageBucket: "auth-app-d39a1.appspot.com",
    messagingSenderId: "826235413089",
    appId: "1:826235413089:web:7ebf74df6c7436ffd18020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()


let patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/


let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let email = document.getElementById("email")
let password = document.getElementById("password")

window.signup = function(e) {
    e.preventDefault();

    if(!isFilled(firstname)){
        firstname.classList.add("_required")
        return
    } else{
        firstname.classList.remove("_required")
    }

    if(!isFilled(email)){
        email.classList.add("_required")
        return
    } else{
        email.classList.remove("_required")
    }

    if(!isCorrectPattern(email,patternEmail)){
        email.classList.add("_incorrect-email")
        return
    } else{
        email.classList.remove("_incorrect-email")
    }

    if(!isFilled(password)){
        password.classList.add("_required")
        return
    } else{
        password.classList.remove("_required")
    }

    let userData = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
    }

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(function(success) {
            window.location.replace(`login.html`);
        })
        .catch(function(err) {
            alert("Error" + err)
        })

}


function isFilled(input) {
    if(input.value === ""){
        return false
    }
    return true
}


function isCorrectPattern(input,pattern) {
    if(input.value.match(pattern)){
        return true
    }
    return false
}


import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

const analytics = getAnalytics(app);


window.login= function(e) {
    e.preventDefault();


    if(!isFilled(email)){
        email.classList.add("_required")
        return
    } else{
        email.classList.remove("_required")
    }

    if(!isCorrectPattern(email,patternEmail)){
        email.classList.add("_incorrect-email")
        return
    } else{
        email.classList.remove("_incorrect-email")
    }

    if(!isFilled(password)){
        password.classList.add("_required")
        return
    } else{
        password.classList.remove("_required")
    }




    let userData = {
        email: email.value,
        password: password.value,
    };

    signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(function (success) {
            let userId =  (success.user.uid);
            localStorage.setItem("uid",userId)
            console.log(userId)



            window.location.replace('user.html')
            // localStorage.setItem(success,user,uid)

        })
        .catch(function (err) {
            alert("login error"+err);
        });

    console.log(userData);
}




document.addEventListener("DOMContentLoaded", (event) => {
    if(document.querySelector(".user-page")){
        if(!localStorage.getItem("uid")){
            window.location.replace('login.html')
        } else{
            console.log(true)
        }
    }
});
