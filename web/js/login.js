var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function() {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function() {
    body.className = "sign-up-js";
})

function sendRegister() {
    let name = document.getElementById("register-name").value
    let email = document.getElementById("register-email").value
    let password = document.getElementById("register-password").value

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/user/register`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            picture: "null"
        })
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 201) {
                throw new Error('something went wrong while logging in')
            }
            return response.json()
        })
        .then((data) => {
            localStorage.setItem("epolitica-session", JSON.stringify(data))
            location.pathname = "/account.html"
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendLogin() {
    let email = document.getElementById("login-email").value
    let password = document.getElementById("login-password").value

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/user/login`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify({
            email: email,
            password: password
        })
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while logging in')
            }
            return response.json()
        })
        .then((data) => {
            localStorage.setItem("epolitica-session", JSON.stringify(data))
            location.pathname = "/account.html"
        })
        .catch(function(error) {
            console.log(error)
        })
}


function handleGoogleCredentialResponse(response) {
    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/user/login/google`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify(response.credential)
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while logging in')
            }
            return response.json()
        })
        .then((data) => {
            localStorage.setItem("epolitica-session", JSON.stringify(data))
            location.pathname = "/account.html"
        })
        .catch(function(error) {
            console.log(error)
        })
}