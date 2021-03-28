async function deleteUser() {
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    localStorage.clear()

    await fetch('http://localhost:3000/me', {
        method: 'DELETE',
        headers: myHeaders,
    })
}