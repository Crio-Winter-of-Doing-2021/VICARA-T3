async function mark_unmark_trash(file_id) {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/trash/' + file_id, {
        method: 'PATCH',
        headers: myHeaders,
    }).then((_) => {
        window.location.href = "/drive?";
    });
}

async function getTrashFileList() {
    var search = document.getElementById('search')
    search.onkeyup = getTrashFileList
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/trash', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.stringify(json)
            var file_list = JSON.parse(list);
            var htmlValue = document.getElementById("files-list");
            htmlValue.innerHTML = getMyStorageContent(file_list);
            var trashLabel = document.getElementById('a4')
            trashLabel.innerHTML = 'Move to Drive'
        })
        .catch(err => console.log(err))
}

