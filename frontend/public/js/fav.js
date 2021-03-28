async function mark_unmark_fav(file_id) {
    let element = document.getElementById(file_id);
    let current_status;
    console.log(element)

    if (element.classList.contains("far")) {
        element.classList.remove("far");
        element.classList.add("fas");
        current_status = "false";
    } else if (element.classList.contains("fas")) {
        element.classList.remove("fas");
        element.classList.add("far");
        current_status = "true";
    }

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/fav/' + file_id + '&' + current_status, {
        method: 'PATCH',
        headers: myHeaders,
    });
}

async function getFavouriteList() {
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files/fav', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.parse(JSON.stringify(json))
            var fileList = Object.keys(list).map((key) => [Number(key), list[key]]);
            var htmlValue = document.getElementById("files-list");
            var content = getContent(fileList);
            htmlValue.innerHTML = content;
        })
        .catch(err => console.log(err))
}
