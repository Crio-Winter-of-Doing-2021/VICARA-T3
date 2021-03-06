//***********Authentication**********************/
const sign_in_btn = document.querySelector("#auth_sign-in-btn");
const sign_up_btn = document.querySelector("#auth_sign-up-btn");
const auth_container = document.querySelector(".auth_container");

sign_up_btn.addEventListener("click", () => {
    auth_container.classList.add("auth_sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    auth_container.classList.remove("auth_sign-up-mode");
});

const loginForm = document.getElementById('myLoginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var email = document.getElementById("login_email");
    var password = document.getElementById("login_password");

    const user = {
        'email': email.value,
        'password': password.value,
    };

    await fetch('http://localhost:3000/login', {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))

})

const signupForm = document.getElementById('mySignupForm')

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    var name = document.getElementById("signup_name")
    var email = document.getElementById("signup_email")
    var password = document.getElementById("signup_password")

    const user = {
        'name': name.value,
        'email': email.value,
        'password': password.value,
    }

    await fetch('http://localhost:3000/signup', {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))

})

//************************************************/