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
        .then((json) => {
            sessionStorage.setItem('authToken', json.token)
            sessionStorage.setItem('authUser', JSON.stringify(json.user))
            getFileList()
        })
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

    const response = await fetch('http://localhost:3000/signup', {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => {
            sessionStorage.setItem('authToken', json.token)
            sessionStorage.setItem('authUser', JSON.stringify(json.user))
            getFileList()
        })
        .catch(err => console.log(err))

})

//************************************************/


async function getFileList() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            sessionStorage.setItem('file_list', json);
            window.location.href = "/drive";
        })
        .catch(err => console.log(err))

    document.getElementById("files-list").innerHTML = sessionStorage.getItem('file_list');
    // document.getElementById("files-list").innerHTML = authUser;
}

//******************************************************/


async function uploadFile() {
    var file = document.getElementsByName('uploaded_file_list');

    const myHeaders = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
    })

    var allFile = Object.entries(file[0].files)
    console.log(allFile[0])
    console.log(allFile[1])


    await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: myHeaders,
        body: allFile,
    }).then(
        response => response.json()
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );
}

