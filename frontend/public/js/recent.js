async function getRecentFileList() {
    var search = document.getElementById('search')
    search.onkeyup = getRecentFileList
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.parse(JSON.stringify(json))
            var fileList = Object.keys(list).map((key) => [Number(key), list[key]]);
            fileList.sort(function (a, b) {
                return new Date(b[1].updatedAt) - new Date(a[1].updatedAt)
            });
            var htmlValue = document.getElementById("files-list");
            var content = getContent(fileList);
            htmlValue.innerHTML = content;
        })
        .catch(err => console.log(err))
}
