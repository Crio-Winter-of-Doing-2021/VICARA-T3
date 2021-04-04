async function deleteFile(file_id) {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files/' + file_id, {
        method: 'DELETE',
        headers: myHeaders,
    })

    setTimeOut(() => { getFileList() }, 100)
}