async function getFileList() {
    var search = document.getElementById('search')
    search.onkeyup = getFileList
    console.log(search)
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'

    await fetch('http://localhost:3000/files', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.stringify(json)
            var file_list = JSON.parse(list);
            var htmlValue = document.getElementById("files-list");
            htmlValue.innerHTML = getMyStorageContent(file_list);
        })
        .catch(err => console.log(err))
}
