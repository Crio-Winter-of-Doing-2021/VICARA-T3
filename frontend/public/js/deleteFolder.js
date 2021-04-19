async function deleteFolder(folder_id) {
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/folder/' + folder_id, {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            fileList = data.childFiles
            folderList = data.childFolders
            for (let file of fileList) {
                // console.log(file)
                deleteFile(file._id)
            }

            for (let folder of folderList) {
                // console.log(folder)
                deleteFolder(folder._id)
            }
        })

    await fetch('http://localhost:3000/folders/' + folder_id, {
        method: 'DELETE',
        headers: myHeaders,
    })
}