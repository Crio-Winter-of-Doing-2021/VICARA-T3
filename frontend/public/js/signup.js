async function rootFolder(email) {

    const obj = {
        'name': 'root',
        'parentId': email,
        'parentName': email
    }

    const myHeaders = new Headers({
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/folder', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(obj),
    }).then(response => response.json())
        .then((data) => {
            console.log(data._id)
            localStorage.setItem('currentId', data._id)
            localStorage.setItem('currentName', data.folder_name)
            localStorage.setItem('parentId', email)
            localStorage.setItem('parentName', email)
            window.location.href = "/drive"
        })
}


const signupForm = document.getElementById('mySignupForm')

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        var name = document.getElementById("signup_name").value
        var email = document.getElementById("signup_email").value
        var password = document.getElementById("signup_password").value

        const user = {
            'name': name,
            'email': email,
            'password': password,
        }

        const response = await fetch('http://localhost:3000/signup', {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())
            .then(json => {
                localStorage.setItem('authToken', json.token)
                localStorage.setItem('authUser', JSON.stringify(json.user))
                localStorage.setItem('email', email)
            }).then(() => {
                rootFolder(email)
            })
            .catch(err => console.log(err))
    })
}