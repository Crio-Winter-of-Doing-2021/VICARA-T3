async function logoutUser() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    localStorage.clear()

    await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: myHeaders,
    })


}

async function logoutAllUser() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    localStorage.clear()

    await fetch('http://localhost:3000/logoutAll', {
        method: 'POST',
        headers: myHeaders,
    })
}
