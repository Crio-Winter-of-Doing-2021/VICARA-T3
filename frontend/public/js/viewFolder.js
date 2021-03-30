async function viewRootFolder(email) {
    const myHeaders = new Headers({
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/root/' + email, {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            fileList = data.childFiles
            folderList = data.childFolders
            var htmlFileValue = document.getElementById("files-list")
            htmlFileValue.innerHTML = getFileContent(fileList)
            var htmlFolderValue = document.getElementById("folders-list")
            htmlFolderValue.innerHTML = getFolderContent(folderList)
        })
}

async function viewFolder(folder_id) {
    const myHeaders = new Headers({
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/folder/' + folder_id, {
        method: 'GET',
        headers: myHeaders,
    }).then(response => response.json())
        .then((data) => {
            localStorage.setItem('currentName', data.folder_name)
            localStorage.setItem('currentId', data._id)
            localStorage.setItem('parentName', data.parentName)
            localStorage.setItem('parentId', data.parentId)
            fileList = data.childFiles
            folderList = data.childFolders
            var htmlFileValue = document.getElementById("files-list")
            htmlFileValue.innerHTML = getFileContent(fileList)
            var htmlFolderValue = document.getElementById("folders-list")
            htmlFolderValue.innerHTML = getFolderContent(folderList)
        })
}


