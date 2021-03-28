const signupForm = document.getElementById('mySignupForm')

if (signupForm) {
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
                localStorage.setItem('authToken', json.token)
                localStorage.setItem('authUser', JSON.stringify(json.user))
                window.location.href = "/drive";
            })
            .catch(err => console.log(err))

    })
}