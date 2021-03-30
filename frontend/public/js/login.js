const loginForm = document.getElementById('myLoginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        var email = document.getElementById("login_email").value;
        var password = document.getElementById("login_password").value;

        const user = {
            'email': email,
            'password': password,
        };

        await fetch('http://localhost:3000/login', {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())
            .then((json) => {
                localStorage.setItem('authToken', json.token)
                localStorage.setItem('authUser', JSON.stringify(json.user))
                localStorage.setItem('parentId', email)
                localStorage.setItem('parentName', email)
                localStorage.setItem('email', email)
                viewRootFolder(email)
                window.location.href = "/drive";
            })
            .catch(err => console.log(err))
    })
}
